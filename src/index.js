import './scss/index.scss';
import './app/components/tracking';
import Map from './app/components/map';
import Grafic from './app/components/Grafic';
import { change } from './app/components/change';
import { getCountrysInfo, getGlobalInfo, getCountryPeriod, getCountryInfo } from './app/components/api';
import { listOfCounriesHandler } from './app/components/list-of-countries';
import { DATA_TIPE } from './app/components/const';
import { getCountPer100th, getCountPer100thFromMillion } from './app/components/util';

export let countryObj = {
    iso2: 'BY',
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
}

init();

const state = {
  days: 7,
};

const lineRezime = document.getElementById('line');
const listOfCountries = document.getElementById('list-of-countries_graf');
state.target = listOfCountries.value;

const listOfDays = document.getElementById('list-of-days');
state.days = listOfDays.value;

async function getData() {
  const {days} = state;
  if (countryObj.iso2 === 'global') {
    let globalInfo = await getGlobalInfo();
    objGrafic = new Grafic(globalInfo);
    if (lineRezime.checked) {
      let globalPeriodInfo = await getCountryPeriod('ALL', days);
      objGrafic.setPeriodData(globalPeriodInfo)
      objGrafic.addChart();
    } else {
      objGrafic.initChartConfig();
    }
  } else {
    let countryInfo = await getCountryInfo(countryObj.iso2);
    objGrafic = new Grafic(countryInfo);
    if (lineRezime.checked) {
      let countryPeriodInfo = await getCountryPeriod(countryObj.iso2, days);
      objGrafic.setPeriodData(countryPeriodInfo)
      objGrafic.addChart();
    } else {
      objGrafic.initChartConfig();
    }
  }
}

getData();

// listOfCountries.addEventListener('change', () => {
//   getData();
// });
lineRezime.addEventListener('click', () => {
  getData();
})

listOfDays.addEventListener('change', () => {
  state.days = listOfDays.value;
  getData();
});
