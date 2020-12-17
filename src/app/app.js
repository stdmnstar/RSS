import Grafic from './components/Grafic';
import {
  getCountryPeriod,
} from './utils/api';

const state = {
  target: 'BY',
  days: 30,
  mood: 'deaths',
};

const listOfCountries = document.getElementById('list-of-countries');
state.target = listOfCountries.value;

const listOfDays = document.getElementById('list-of-days');
state.days = listOfDays.value;

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

listOfCountries.addEventListener('change', () => {
  state.target = listOfCountries.value;
  getData();
});

listOfDays.addEventListener('change', () => {
  state.days = listOfDays.value;
  getData();
});

// const graficSection = document.querySelector('.grafic__section');

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
