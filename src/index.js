import './scss/index.scss';
import './app/components/tracking';
import './app/components/vkeyboard';
import Map from './app/components/map';
import change from './app/components/change';
import { getCountrysInfo, getGlobalInfo } from './app/components/api';
import { listOfCounriesHandler } from './app/components/list-of-countries';
import { DATA_TIPE } from './app/components/const';
import { getCountPer100th, getCountPer100thFromMillion } from './app/components/util';

export const countryObj = {
  iso2: 'global',
  get iso() { return this.iso2; },
  set iso(value) {
    this.iso2 = value;
    change();
  },
};
export let objMap;
let сountrysInfo; let
  allIfo;

async function init() {
  allIfo = await getGlobalInfo();
  allIfo[DATA_TIPE.casesPer100th] = getCountPer100thFromMillion(allIfo.casesPerOneMillion);
  allIfo[DATA_TIPE.deathsPer100th] = getCountPer100thFromMillion(allIfo.deathsPerOneMillion);
  allIfo[DATA_TIPE.recoveredPer100th] = getCountPer100thFromMillion(allIfo.recoveredPerOneMillion);
  allIfo[DATA_TIPE.todayCasesPer100th] = getCountPer100th(allIfo.todayCases, allIfo.population);
  allIfo[DATA_TIPE.todayDeathsPer100th] = getCountPer100th(allIfo.todayDeaths, allIfo.population);
  allIfo[DATA_TIPE.todayRecoveredPer100th] = getCountPer100th(allIfo.todayRecovered, allIfo.population);
  const { iso2 } = countryObj;
  table(iso2);

  сountrysInfo = await getCountrysInfo();
  сountrysInfo.forEach((el) => {
    const element = el;
    element[DATA_TIPE.casesPer100th] = getCountPer100thFromMillion(element.casesPerOneMillion);
    element[DATA_TIPE.deathsPer100th] = getCountPer100thFromMillion(element.deathsPerOneMillion);
    element[DATA_TIPE.recoveredPer100th] = getCountPer100thFromMillion(element
      .recoveredPerOneMillion);
    element[DATA_TIPE.todayCasesPer100th] = getCountPer100th(element.todayCases,
      element.population);
    element[DATA_TIPE.todayDeathsPer100th] = getCountPer100th(element.todayDeaths,
      element.population);
    element[DATA_TIPE.todayRecoveredPer100th] = getCountPer100th(element.todayRecovered,
      element.population);
  });
  сountrysInfo = сountrysInfo.filter((el) => el.countryInfo.iso2 !== null);
  listOfCounriesHandler(сountrysInfo);

  objMap = new Map(сountrysInfo);
  objMap.createMap();
// const globalInfo = await getGlobalInfo();
// console.log(globalInfo);
}

init();

export function table(iso2) {
  const name = document.querySelector('.table__country');
  const casesDom = document.querySelector('.table__cases').childNodes[1];
  const deathsDom = document.querySelector('.table__deaths').childNodes[1];
  const recoveredDom = document.querySelector('.table__recovered').childNodes[1];
  const time = document.getElementById('checkboxTime').checked;
  const popul = document.getElementById('checkboxPopul').checked;
  let cases; let deaths; let recovered; let
    country;
  if (time && popul) {
    cases = DATA_TIPE.todayCasesPer100th;
    deaths = DATA_TIPE.todayDeathsPer100th;
    recovered = DATA_TIPE.todayRecoveredPer100th;
  } else if (time && !popul) {
    cases = DATA_TIPE.todayCases;
    deaths = DATA_TIPE.todayDeaths;
    recovered = DATA_TIPE.todayRecovered;
  } else if (!time && popul) {
    cases = DATA_TIPE.casesPer100th;
    deaths = DATA_TIPE.deathsPer100th;
    recovered = DATA_TIPE.recoveredPer100th;
  } else {
    cases = DATA_TIPE.cases;
    deaths = DATA_TIPE.deaths;
    recovered = DATA_TIPE.recovered;
  }
  if (iso2 === 'global') {
    country = 'Global';
    cases = allIfo[cases];
    deaths = allIfo[deaths];
    recovered = allIfo[recovered];
  } else {
    сountrysInfo.forEach((el) => {
      if (el.countryInfo.iso2 === iso2) {
        country = el.country[0].toUpperCase() + el.country.slice(1);
        cases = el[cases];
        deaths = el[deaths];
        recovered = el[recovered];
      }
    });
  }
  name.textContent = country;
  casesDom.textContent = cases.toLocaleString('ru-RU');
  deathsDom.textContent = deaths.toLocaleString('ru-RU');
  recoveredDom.textContent = recovered.toLocaleString('ru-RU');
}
