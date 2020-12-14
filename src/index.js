import './scss/index.scss';

import { getCountrysInfo, getGlobalInfo, getCountryInfo } from './app/components/api';

async function init() {
  const сountrysInfo = await getCountrysInfo();
  console.log(сountrysInfo);

  const globalInfo = await getGlobalInfo();
  console.log(globalInfo);
}

init();
