import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { countryObj } from '../../index';
import { countryLatLon } from './api';
export default class Map {
  constructor(сountrysInfo) {
    this.сountrysArrray = сountrysInfo;
    this.map = {};
    this.marker = {};
  }

  createMap() {
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 2,
      worldCopyJump: true,
      doubleClickZoom: false,
    });
    const layer = new L.TileLayer('https://api.mapbox.com/styles/v1/projmix/ckionvv5b370i17tcoipr6pz8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicHJvam1peCIsImEiOiJja2lvb3U2N2IwNWFoMzRwYTNobTNqd2E4In0.R5fl0lR4MjMPFLeUnkBiCw');
    layer.addTo(this.map);
    this.createMarker('cases');

    this.map.on('click', (e) => {
      this.country(e.latlng.lat, e.latlng.lng);
    });
  }

  async country(lat, lon){
    let country = await countryLatLon(lat, lon);
    if(country.error !== "Unable to geocode"){
      const iso2 = country.features[0].properties.address.country_code.toUpperCase();
      countryObj.iso = iso2;
      this.zoomMap(iso2);
    }
    else {
      countryObj.iso = 'global';
      this.zoomMap(countryObj.iso);
    }
  }

  zoomMap(iso2){
    if(iso2 === 'global') this.map.setView([0,0],2)
    this.сountrysArrray.forEach((el) => {
      if(el.countryInfo.iso2 === iso2){
        this.map.setView([el.countryInfo.lat, el.countryInfo.long], 4);
      }
    });
  }

  clickMarker(element, marker){
    marker.addEventListener(('click'), () => {
      const iso2 = element.countryInfo.iso2;
      countryObj.iso = iso2;
      this.zoomMap(iso2);
    });
    
  }

  createMarker(indicator) {
    this.clearMap();
    this.сountrysArrray.forEach((element) => {
      const setting = this.settingsMarker(element, indicator);

      this.marker = L.circleMarker([element.countryInfo.lat, element.countryInfo.long], {
        radius: setting.rad, color: setting.color, stroke: false, fillOpacity: setting.opacity,
      }).addTo(this.map);
      this.marker.bindPopup(`<h2>${element.country}</h2><p>${indicator[0].toUpperCase() + indicator.slice(1)}: <span  class="${setting.class}">${element[indicator].toLocaleString('ru-RU')}</span></p>`, { closeButton: false, closeOnClick: false });
      this.clickMarker(element, this.marker);
      this.marker.on('mouseover', function open() {
        this.openPopup();
      });
      this.marker.on('mouseout', function close() {
        this.closePopup();
      });
    });
  }

  /*eslint-disable */
  clearMap() {
    Object.keys(this.map._layers).filter((el) => { 
      if (this.map._layers[el] !== undefined && this.map._layers[el]._radius !== undefined) {
        this.map.removeLayer(this.map._layers[el]); 
      }
      return el;
    });
  }
  /* eslint-enable */

  settingsMarker(element, indicator) {
    const objSettings = {};
    let rad = element[indicator].toString().length;
    let opacity;
    switch (indicator) {
      case 'cases':
        rad = rad > 4 ? rad : 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#e60000';
        objSettings.class = 'cases';
        break;
      case 'recovered':
        rad = rad > 4 ? rad : 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#70a800';
        objSettings.class = 'recovered';
        break;
      case 'deaths':
        rad = rad > 2 ? rad : 2;
        rad += 2;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#1D74C5';
        objSettings.class = 'deaths';
        break;
      case 'todayCases':
        rad = rad > 2 ? rad : 2;
        rad += 2;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#e60000';
        objSettings.class = 'cases';
        break;
      case 'todayRecovered':
        rad = rad > 1 ? rad : 1;
        rad += 3;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#70a800';
        objSettings.class = 'recovered';
        break;
      case 'todayDeaths':
        rad = rad > 1 ? rad : 1;
        rad += 3;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#1D74C5';
        objSettings.class = 'deaths';
        break;
      case 'casesPer100th':
        rad = Math.round(element[indicator]).toString().length;
        rad = rad > 2 ? rad * 2 : 2 * 2;
        if (element[indicator].toString()[0] < 5) rad -= 1;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#e60000';
        objSettings.class = 'cases';
        break;
      case 'recoveredPer100th':
        rad = Math.round(element[indicator]).toString().length;
        rad = rad > 2 ? rad * 2 : 2 * 2;
        if (element[indicator].toString()[0] < 5) rad -= 1;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#70a800';
        objSettings.class = 'recovered';
        break;
      case 'deathsPer100th':
        if (element[indicator] > 150) rad = 8;
        else if (element[indicator] > 100)rad = 7;
        else if (element[indicator] > 50) rad = 6;
        else if (element[indicator] > 10) rad = 5;
        else rad = 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#1D74C5';
        objSettings.class = 'deaths';
        break;
      case 'todayCasesPer100th':
        if (element[indicator] > 150) rad = 8;
        else if (element[indicator] > 100)rad = 7;
        else if (element[indicator] > 50) rad = 6;
        else if (element[indicator] > 10) rad = 5;
        else rad = 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#e60000';
        objSettings.class = 'cases';
        break;
      case 'todayRecoveredPer100th':
        if (element[indicator] > 150) rad = 8;
        else if (element[indicator] > 100)rad = 7;
        else if (element[indicator] > 50) rad = 6;
        else if (element[indicator] > 10) rad = 5;
        else rad = 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#70a800';
        objSettings.class = 'recovered';
        break;
      case 'todayDeathsPer100th':
        if (element[indicator] > 2) rad = 8;
        else if (element[indicator] > 1.5)rad = 7;
        else if (element[indicator] > 1) rad = 6;
        else if (element[indicator] > 0.5) rad = 5;
        else rad = 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.rad = rad;
        objSettings.opacity = opacity;
        objSettings.color = '#1D74C5';
        objSettings.class = 'deaths';
        break;
      default:
        break;
    }
    return objSettings;
  }
}
/*eslint-disable */
// radius Marker  от 4 до 8
// fillOpacity    от 0,4 до 0,8
/* LEGEND
cases or  recovered
el < 10'000      4
el < 100'000     5
el < 1000'000    6
el < 10'000'000  7
el < 100'000'000 8

  deaths or today cases
111 111
    el < 100      2 + 2
    el < 1000     3 + 2
    el < 10'000   4 + 2
    el < 100'000  5 + 2
    el < 1000'000 6 + 2

  todayRecovered or todayDeaths
  el < 10       1 + 3
  el < 100      2 + 3
  el < 1000     3 + 3
  el < 10'000   4 + 3
  el < 100'000  5 + 3

  casesPer100th or recoveredPer100th
  el < 100   2*2     = 4
  el < 500   3*2 -1  = 5
  el < 1000  3*2     = 6
  el < 5000  4*2 -1  = 7
  el < 10000 4*2     = 8

  deathsPer100th or todayCasesPer100th or  todayRecoveredPer100th
  4 = 1   >  
  5 = 10  >
  6 = 50  >
  7 = 100 >
  8 = 150 >
  160 max

  todayDeathsPer100th
  4  0.1 >
  5  0.5 >
  6  1   >
  7  1.5 >
  8  2   >



*/
/* eslint-enable */
