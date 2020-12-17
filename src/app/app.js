import Grafic from './components/Grafic';
import {
  getCountrysInfo, getGlobalInfo, getCountryInfo, getCountryPeriod,
} from './utils/api';

const state = {
  target: 'BY',
  days: 30,
  mood: 'deaths',
};

const listOfCountries = document.getElementById('list-of-countries');
state.target = listOfCountries.value;

listOfCountries.addEventListener('change', () => {
  state.target = listOfCountries.value;
  getData();
});

const listOfDays = document.getElementById('list-of-days');
state.days = listOfDays.value;

listOfDays.addEventListener('change', () => {
  state.days = listOfDays.value;
  getData();
});

async function getData() {
  const { target, days, mood } = state;
  const periodInfo = await getCountryPeriod(target, days);
  const grafic = new Grafic(periodInfo, mood);
  const graficTemplate = document.querySelector('.grafic__template');
  graficTemplate.innerHTML = '';
  graficTemplate.append(grafic.el);
  grafic.init();
}

getData();

const graficSection = document.querySelector('.grafic__section');

// graficSection.addEventListener('click', (e) => {
//   if (e.target.closest('#cases')) {
//     console.log('cases');
//   }
//   if (e.target.closest('#deaths')) {
//     console.log('deaths');
//   }
//   if (e.target.closest('#recovered')) {
//     console.log('recovered');
//   }
//   if (e.target.closest('#todayCases')) {
//     console.log('todayCases');
//   }
//   if (e.target.closest('#todayDeaths')) {
//     console.log('todayDeaths');
//   }
//   if (e.target.closest('#todayRecovered')) {
//     console.log('todayRecovered');
//   }
// });

// export default grafic;
