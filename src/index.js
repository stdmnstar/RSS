import './scss/index.scss';

import { getCountrysInfo, getGlobalInfo } from './app/components/api';
import { listOfCounriesHandler } from './app/components/list-of-countries';
import { DATA_TIPE } from './app/components/const';
import { getCountPer100th, getCountPer100thFromMillion } from './app/components/util';

async function init() {
  const сountrysInfo = await getCountrysInfo();
  сountrysInfo.forEach((el) => {
    el[DATA_TIPE.casesPer100th] = getCountPer100thFromMillion(el.casesPerOneMillion);
    el[DATA_TIPE.deathsPer100th] = getCountPer100thFromMillion(el.deathsPerOneMillion);
    el[DATA_TIPE.recoveredPer100th] = getCountPer100thFromMillion(el.recoveredPerOneMillion);
    el[DATA_TIPE.todayCasesPer100th] = getCountPer100th(el.todayCases, el.population);
    el[DATA_TIPE.todayDeathsPer100th] = getCountPer100th(el.todayDeaths, el.population);
    el[DATA_TIPE.todayRecoveredPer100th] = getCountPer100th(el.todayRecovered, el.population);
  });
  listOfCounriesHandler(сountrysInfo, DATA_TIPE.cases);
// const globalInfo = await getGlobalInfo();
// console.log(globalInfo);
}

init();
