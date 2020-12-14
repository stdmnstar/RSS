
 export async function getGlobalInfo() {
  let response = await fetch('https://disease.sh/v3/covid-19/all');
  return await response.json();
}

export async function getCountrysInfo() {
  let response = await fetch(`https://disease.sh/v3/covid-19/countries`);
    return await response.json();
}

export async function getCountryInfo(iso2) {
  let response = await fetch(`https://disease.sh/v3/covid-19/countries/${iso2}`);
  return await response.json();
}

export async function getCountryPeriod(iso2, day) {
  let response = await fetch(`https://disease.sh/v3/covid-19/historical/${iso2}?lastdays=${day}`);
  return await response.json();
}