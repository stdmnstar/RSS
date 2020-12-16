export async function getGlobalInfo() {
  const response = await fetch('https://disease.sh/v3/covid-19/all');
  return response.json();
}

export async function getCountrysInfo() {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  return response.json();
}

export async function getCountryInfo(iso2) {
  const response = await fetch(`https://disease.sh/v3/covid-19/countries/${iso2}`);
  return response.json();
}

export async function getCountryPeriod(iso2, day) {
  const response = await fetch(`https://disease.sh/v3/covid-19/historical/${iso2}?lastdays=${day}`);
  return response.json();
}
export async function countryLatLon(lat, lon) {
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lon}`);
  return response.json();
}