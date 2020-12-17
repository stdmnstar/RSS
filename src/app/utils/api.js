export async function getGlobalInfo() {
  const response = await fetch('https://disease.sh/v3/covid-19/all');
  return await response.json();
}

export async function getCountrysInfo() {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  return await response.json();
}

export async function getCountryInfo(iso2) {
  const response = await fetch(`https://disease.sh/v3/covid-19/countries/${iso2}`);
  return await response.json();
}

export async function getCountryPeriod(iso2, day) {
  const response = await fetch(`https://disease.sh/v3/covid-19/historical/${iso2}?lastdays=${day}`);
  return await response.json();
}
