import './scss/index.scss';
import './app/components/tracking';
import Map from './app/components/map';
import { getCountrysInfo, getGlobalInfo } from './app/components/api';
import { listOfCounriesHandler } from './app/components/list-of-countries';
import { DATA_TIPE } from './app/components/const';
import { getCountPer100th, getCountPer100thFromMillion } from './app/components/util';

export let country = 'global';
export let objMap;

async function init() {
  let сountrysInfo = await getCountrysInfo();
  сountrysInfo.forEach((el) => {
    el[DATA_TIPE.casesPer100th] = getCountPer100thFromMillion(el.casesPerOneMillion);
    el[DATA_TIPE.deathsPer100th] = getCountPer100thFromMillion(el.deathsPerOneMillion);
    el[DATA_TIPE.recoveredPer100th] = getCountPer100thFromMillion(el.recoveredPerOneMillion);
    el[DATA_TIPE.todayCasesPer100th] = getCountPer100th(el.todayCases, el.population);
    el[DATA_TIPE.todayDeathsPer100th] = getCountPer100th(el.todayDeaths, el.population);
    el[DATA_TIPE.todayRecoveredPer100th] = getCountPer100th(el.todayRecovered, el.population);
  });
  сountrysInfo = сountrysInfo.filter((el) => {
    const obj = el;
    if (obj.countryInfo.iso2 !== null) return obj;
  });
  listOfCounriesHandler(сountrysInfo, DATA_TIPE.cases);

  objMap = new Map(сountrysInfo);
  objMap.createMap();
// const globalInfo = await getGlobalInfo();
// console.log(globalInfo);
}

init();
