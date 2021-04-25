import { DATA_TIPE_FOR_PRINT } from './const';

export default function settingsMarker(element, indicator, settingFirst) {
  const objSettings = {};
  Object.assign(objSettings, settingFirst);
  let rad = element[indicator].toString().length;
  let opacity;
  switch (indicator) {
    case 'cases':
      rad = rad > 4 ? rad : 4;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.cases;
      break;
    case 'recovered':
      rad = rad > 4 ? rad : 4;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.recovered;
      break;
    case 'deaths':
      rad = rad > 2 ? rad : 2;
      rad += 2;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.deaths;
      break;
    case 'todayCases':
      rad = rad > 2 ? rad : 2;
      rad += 2;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.todayCases;
      break;
    case 'todayRecovered':
      rad = rad > 1 ? rad : 1;
      rad += 3;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.todayRecovered;
      break;
    case 'todayDeaths':
      rad = rad > 1 ? rad : 1;
      rad += 3;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.todayDeaths;
      break;
    case 'casesPer100th':
      rad = Math.round(element[indicator]).toString().length;
      rad = rad > 2 ? rad * 2 : 2 * 2;
      if (element[indicator].toString()[0] < 5) rad -= 1;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.casesPer100th;
      break;
    case 'recoveredPer100th':
      rad = Math.round(element[indicator]).toString().length;
      rad = rad > 2 ? rad * 2 : 2 * 2;
      if (element[indicator].toString()[0] < 5) rad -= 1;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.recoveredPer100th;
      break;
    case 'deathsPer100th':
      if (element[indicator] > 150) rad = 8;
      else if (element[indicator] > 100)rad = 7;
      else if (element[indicator] > 50) rad = 6;
      else if (element[indicator] > 10) rad = 5;
      else rad = 4;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.deathsPer100th;
      break;
    case 'todayCasesPer100th':
      if (element[indicator] > 150) rad = 8;
      else if (element[indicator] > 100)rad = 7;
      else if (element[indicator] > 50) rad = 6;
      else if (element[indicator] > 10) rad = 5;
      else rad = 4;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.todayCasesPer100th;
      break;
    case 'todayRecoveredPer100th':
      if (element[indicator] > 150) rad = 8;
      else if (element[indicator] > 100)rad = 7;
      else if (element[indicator] > 50) rad = 6;
      else if (element[indicator] > 10) rad = 5;
      else rad = 4;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.todayRecoveredPer100th;
      break;
    case 'todayDeathsPer100th':
      if (element[indicator] > 2) rad = 8;
      else if (element[indicator] > 1.5)rad = 7;
      else if (element[indicator] > 1) rad = 6;
      else if (element[indicator] > 0.5) rad = 5;
      else rad = 4;
      opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
      objSettings.text = DATA_TIPE_FOR_PRINT.todayDeathsPer100th;
      break;
    default:
      break;
  }
  objSettings.rad = rad;
  objSettings.opacity = opacity;
  return objSettings;
}
