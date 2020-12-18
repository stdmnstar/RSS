import { DATA_TIPE_FOR_PRINT } from './const';
import { numberWithCommas } from './util';

export function listOfCounriesHandler(data, dataTipe) {
  const searchInput = document.getElementById('search');
  const listTitle = document.querySelector('.list-title');
  let searchTerm = '';

  listTitle.innerHTML = `${DATA_TIPE_FOR_PRINT[dataTipe]} by country`;

  data.sort((a, b) => b.[dataTipe] - a.[dataTipe]);

  function showCountries() {
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
        const cases = country[dataTipe];

        // if (dataTipe === DATA_TIPE.casesPer100th ||
        //   dataTipe === DATA_TIPE.deathsPer100th ||
        //   dataTipe === DATA_TIPE.recoveredPer100th) {
        //   cases = +(cases / 10).toFixed(3);
        // }
        countryInfo.innerText = numberWithCommas(cases);
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

  searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    showCountries();
  });

  showCountries();
}
