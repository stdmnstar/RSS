import { DATA_TIPE } from './const';
import {
  countryObj, objMap, table, objGrafic,
} from '../../index';
import { showlistOfCountries } from './list-of-countries';

const lineRezime = document.getElementById('line');
export let rejime;

export function change() {
  const time = document.getElementById('checkboxTime').checked;
  const popul = document.getElementById('checkboxPopul').checked;
  const list = document.getElementById('select').value.toString();
  let rezult;
  switch (list) {
    case 'cases':
      if (time && popul) rezult = DATA_TIPE.todayCasesPer100th;
      if (!time && popul) rezult = DATA_TIPE.casesPer100th;
      if (time && !popul) rezult = DATA_TIPE.todayCases;
      if (!time && !popul) rezult = DATA_TIPE.cases;
      break;
    case 'deaths':
      if (time && popul) rezult = DATA_TIPE.todayDeathsPer100th;
      if (!time && popul) rezult = DATA_TIPE.deathsPer100th;
      if (time && !popul) rezult = DATA_TIPE.todayDeaths;
      if (!time && !popul) rezult = DATA_TIPE.deaths;
      break;
    case 'recovered':
      if (time && popul) rezult = DATA_TIPE.todayRecoveredPer100th;
      if (!time && popul) rezult = DATA_TIPE.recoveredPer100th;
      if (time && !popul) rezult = DATA_TIPE.todayRecovered;
      if (!time && !popul) rezult = DATA_TIPE.recovered;
      break;
    default:
      break;
  }

  objMap.createMarker(rezult);
  showlistOfCountries(rezult);
  objMap.zoomMap(countryObj.iso2);
  table(countryObj.iso2);

  rejime = rezult;

  if (!lineRezime.checked) {
    objGrafic.changeMood(rezult);
    objGrafic.resetLineChart();
  } else {
    objGrafic.initChartConfig(rezult);
  }
  objGrafic.addChart();
}
