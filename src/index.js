import './scss/index.scss';
import './app/components/tracking';
import Map from './app/components/map';
import Grafic from './app/components/Grafic';
import { change } from './app/components/change';
import { getCountrysInfo, getGlobalInfo, getCountryPeriod } from './app/components/api';
import { listOfCounriesHandler } from './app/components/list-of-countries';
import { DATA_TIPE } from './app/components/const';
import { getCountPer100th, getCountPer100thFromMillion } from './app/components/util';

export let countryObj = {
    iso2: 'global',
    get iso() { return this.iso2 },
    set iso(value) {
       this.iso2 = value;
       change();
    }
};

export let objMap;
export let objGrafic;

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


  let globalInfo = await getGlobalInfo();
  objGrafic = new Grafic(globalInfo);
  objGrafic.initChartConfig();
}

init();

const state = {
  target: 'BY',
  days: 30,
  mood: 'recovered',
};

const listOfCountries = document.getElementById('list-of-countries_graf');
state.target = listOfCountries.value;

const listOfDays = document.getElementById('list-of-days');
state.days = listOfDays.value;

// async function getData() {
//   const { target, days, mood } = state;
//   const periodInfo = await getCountryPeriod(target, days);
//   const grafic = new Grafic(periodInfo, mood);
//   const graficTemplate = document.querySelector('.grafic__template');
//   graficTemplate.innerHTML = '';
//   graficTemplate.append(grafic.el);
//   grafic.init();
// }

// getData();

// listOfCountries.addEventListener('change', () => {
//   state.target = listOfCountries.value;
//   getData();
// });

// listOfDays.addEventListener('change', () => {
//   state.days = listOfDays.value;
//   getData();
// });
