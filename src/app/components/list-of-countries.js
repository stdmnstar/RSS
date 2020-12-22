import { DATA_TIPE, DATA_TIPE_FOR_PRINT } from './const';
import { numberWithCommas } from './util';
import { countryObj } from '../../index';

const listTitle = document.querySelector('.list-title');
const searchInput = document.getElementById('search');
let searchTerm = '';
let search = false;
let data = [];
let dataTipe = '';

function clickListOfCountries(e) {
  const x = e.target.parentElement;
  if (x.childElementCount === 3) {
    const x2 = x.childNodes[1].innerText;
    const tempData = data.filter((country) => country.country === x2);
    countryObj.iso = tempData[0].countryInfo.iso2;
  }
}

export function showlistOfCountries(dataTipeFrom) {
  listTitle.innerHTML = `${DATA_TIPE_FOR_PRINT[dataTipeFrom]} by country`;
  data.sort((a, b) => b.[dataTipeFrom] - a.[dataTipeFrom]);

  const results = document.getElementById('results');
  results.innerHTML = '';
  const ul = document.createElement('ul');
  ul.classList.add('countries');
  let tempData = [];

  if (countryObj.iso !== 'global') {
    tempData = data.filter((country) => country.countryInfo.iso2 === countryObj.iso);
    searchTerm = tempData[0].country;
  } else if (!search) {
    searchTerm = '';
    searchInput.value = searchTerm;
  }
  search = false;
  data
    .filter((country) => country.country.toLowerCase().startsWith(searchTerm.toLowerCase()))
    .forEach((country) => {
      const li = document.createElement('li');
      const countryFlag = document.createElement('img');
      const countryName = document.createElement('h3');
      const countryInfo = document.createElement('div');

      li.classList.add('country-item');
      countryInfo.classList.add('country-item__info');
      countryInfo.innerText = numberWithCommas(country[dataTipeFrom]);
      countryFlag.src = country.countryInfo.flag;
      countryFlag.classList.add('country-item__flag');

      countryName.innerText = country.country;
      countryName.classList.add('country-item__name');

      li.appendChild(countryInfo);
      li.appendChild(countryName);
      li.appendChild(countryFlag);
      ul.appendChild(li);
      ul.addEventListener('click', clickListOfCountries);
    });
  results.appendChild(ul);
}

export function listOfCounriesHandler(сountrysInfo) {
  dataTipe = DATA_TIPE.cases;
  data = сountrysInfo;

  searchInput.addEventListener('input', (e) => {
    search = true;
    searchTerm = e.target.value;
    const tempData = data.filter((country) => country.country.toLowerCase()
      .startsWith(searchTerm.toLowerCase()));
    const isoOld = countryObj.iso;
    const isoNew = tempData.length === 1 ? tempData[0].countryInfo.iso2 : 'global';
    if (isoOld !== isoNew) {
      countryObj.iso = isoNew;
    } else {
      showlistOfCountries(dataTipe);
    }
  });
  showlistOfCountries(dataTipe);
}
