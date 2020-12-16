import { DATA_TIPE } from './const';
import { country, objMap } from '../../index';

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
  }
  console.log(rezult);
  objMap.createMarker(rezult);
  // objMap.zoom(country);
  // create(rezult, country)
}
