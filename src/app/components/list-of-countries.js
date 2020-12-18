import { DATA_TIPE, DATA_TIPE_FOR_PRINT } from './const';
import { numberWithCommas } from './util';

const listTitle = document.querySelector('.list-title');
const searchInput = document.getElementById('search');
let searchTerm = '';
let data = [];
let dataTipe = '';

export function showlistOfCountries(dataTipe) {
   
  listTitle.innerHTML = `${DATA_TIPE_FOR_PRINT[dataTipe]} by country`;
  data.sort((a, b) => b.[dataTipe] - a.[dataTipe]);

  const results = document.getElementById('results');
  results.innerHTML = '';
  const ul = document.createElement('ul');
  ul.classList.add('countries');
  data
    .filter((country) => country.country.toLowerCase().startsWith(searchTerm.toLowerCase()))
    .forEach((country) => {
      const li = document.createElement('li');
      const countryFlag = document.createElement('img');
      const countryName = document.createElement('h3');
      const countryInfo = document.createElement('div');

      li.classList.add('country-item');
      countryInfo.classList.add('country-item__info');
      countryInfo.innerText = numberWithCommas(country[dataTipe]);
      countryFlag.src = country.countryInfo.flag;
      countryFlag.classList.add('country-item__flag');

      countryName.innerText = country.country;
      countryName.classList.add('country-item__name');

      li.appendChild(countryInfo);
      li.appendChild(countryName);
      li.appendChild(countryFlag);
      ul.appendChild(li);
    });
  results.appendChild(ul);
}

export function listOfCounriesHandler(сountrysInfo) {
  dataTipe = DATA_TIPE.cases;
  data = сountrysInfo;
  console.log(data);

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    showlistOfCountries(dataTipe);
  });
  showlistOfCountries(dataTipe);
}
