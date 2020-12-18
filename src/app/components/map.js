import L from '../framework/library/leaflet/leaflet-src';
import '../framework/library/leaflet/leaflet.rrose-src';
import '../framework/library/leaflet/leaflet.css';
import '../framework/library/leaflet/leaflet.rrose.css';
import { countryObj } from '../../index';
import statesData from './countries.geojson.json';
import { style, onEachFeature } from './geojson';

export default class Map {
  constructor(сountrysInfo) {
    this.сountrysArrray = сountrysInfo;
    this.map = {};
    this.marker = {};
    this.markerArray = [];
    this.legend = undefined;
    this.clickMap = true;
  }

  createMap() {
    this.map = L.map('map', {
      center: [0, 0], zoom: 2, worldCopyJump: true, doubleClickZoom: false,
    });
    const layer = new L.TileLayer('https://api.mapbox.com/styles/v1/projmix/ckionvv5b370i17tcoipr6pz8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicHJvam1peCIsImEiOiJja2lvb3U2N2IwNWFoMzRwYTNobTNqd2E4In0.R5fl0lR4MjMPFLeUnkBiCw');
    layer.addTo(this.map);

    // add layer
    L.geoJSON(statesData, { style, onEachFeature }).addTo(this.map);

    this.createMarker('cases');

    // click on the map
    this.map.on('click', () => {
      if (this.clickMap) {
        const iso2 = 'global';
        countryObj.iso = iso2;
      } else this.clickMap = true;
    });
  }

  zoomMap(iso2) {
    if (iso2 === 'global') this.map.setView([0, 0], 2);
    this.сountrysArrray.forEach((el) => {
      if (el.countryInfo.iso2 === iso2) {
        this.map.setView([el.countryInfo.lat, el.countryInfo.long], 4);
      }
    });
  }

  clickMarker(element) {
    this.marker.addEventListener(('click'), () => {
      const { iso2 } = element.countryInfo;
      countryObj.iso = iso2;
    });
  }

  createMarker(indicator) {
    this.clearMap();
    const settingFirst = this.createLegend(indicator);
    this.сountrysArrray.forEach((element) => {
      const setting = this.settingsMarker(element, indicator, settingFirst); // create setting
      // Marker
      this.marker = L.circleMarker([element.countryInfo.lat, element.countryInfo.long], {
        radius: setting.rad,
        color: setting.color,
        stroke: false,
        fillOpacity: setting.opacity,
        iso2: element.countryInfo.iso2,
      }).addTo(this.map);
      const roz = new L.Rrose({
        autoPan: false, closeButton: false, closeOnClick: false, offset: new L.Point(0, -10),
      }).setContent(`<h2>${element.country}</h2><p>${setting.text}: <span  class="${setting.class}">${element[indicator].toLocaleString('ru-RU')}</span></p>`);
      this.marker.bindPopup(roz);
      this.markerArray.push(this.marker);

      this.clickMarker(element); // click on the market

      this.marker.on('mouseover', function op() {
        this.openPopup();
      });
      this.marker.on('mouseout', function cl() {
        this.closePopup();
      });
    });
  }

  /*eslint-disable */
  clearMap() {
    this.markerArray = [];
    Object.keys(this.map._layers).filter((el) => { 
      if (this.map._layers[el] !== undefined && this.map._layers[el]._radius !== undefined) {
        this.map.removeLayer(this.map._layers[el]); 
      }
      return el;
    });
  }
  /* eslint-enable */

  createLegend(indicator) {
    // color and class setting
    const objSettings = {};
    if (indicator === 'cases' || indicator === 'todayCases' || indicator === 'casesPer100th' || indicator === 'todayCasesPer100th') {
      objSettings.color = '#e60000';
      objSettings.class = 'cases';
    }
    if (indicator === 'recovered' || indicator === 'todayRecovered' || indicator === 'recoveredPer100th' || indicator === 'todayRecoveredPer100th') {
      objSettings.color = '#70a800';
      objSettings.class = 'recovered';
    }
    if (indicator === 'deaths' || indicator === 'todayDeaths' || indicator === 'deathsPer100th' || indicator === 'todayDeathsPer100th') {
      objSettings.color = '#1D74C5';
      objSettings.class = 'deaths';
    }
    // legend
    let segment;
    if (indicator === 'cases' || indicator === 'recovered') {
      segment = [10000, 100000, 1000000, 10000000, 100000000];
    }
    if (indicator === 'deaths' || indicator === 'todayCases') {
      segment = [100, 1000, 10000, 100000, 1000000];
    }
    if (indicator === 'todayRecovered' || indicator === 'todayDeaths') {
      segment = [10, 100, 1000, 10000, 100000];
    }
    if (indicator === 'casesPer100th' || indicator === 'recoveredPer100th') {
      segment = [100, 500, 1000, 5000, 10000];
    }
    if (indicator === 'deathsPer100th' || indicator === 'todayCasesPer100th' || indicator === 'todayRecoveredPer100th') {
      segment = [1, 10, 50, 100, 150];
    }
    if (indicator === 'todayDeathsPer100th') {
      segment = [0.1, 0.5, 1, 1.5, 2];
    }
    if (this.legend !== undefined) this.legend.remove();
    this.legend = L.control({ position: 'bottomright' });

    this.legend.onAdd = function leg() {
      const div = L.DomUtil.create('div', 'info legend');
      const grades = segment;

      for (let i = 0; i < grades.length; i += 1) {
        div.innerHTML += `<p><i style="background:${objSettings.color}; opacity:${0.4 + (i / 10)}; border-radius:50%"></i><span class="${objSettings.class}"> < ${grades[i]}</span></p>`;
      }
      return div;
    };
    this.legend.addTo(this.map);

    return objSettings;
  }

  settingsMarker(element, indicator, settingFirst) {
    const objSettings = {};
    Object.assign(objSettings, settingFirst);
    let rad = element[indicator].toString().length;
    let opacity;
    switch (indicator) {
      case 'cases':
        rad = rad > 4 ? rad : 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = 'Cases';
        break;
      case 'recovered':
        rad = rad > 4 ? rad : 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = 'Recovered';
        break;
      case 'deaths':
        rad = rad > 2 ? rad : 2;
        rad += 2;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = 'Deaths';
        break;
      case 'todayCases':
        rad = rad > 2 ? rad : 2;
        rad += 2;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = "Today's cases";
        break;
      case 'todayRecovered':
        rad = rad > 1 ? rad : 1;
        rad += 3;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = "Today's recovered";
        break;
      case 'todayDeaths':
        rad = rad > 1 ? rad : 1;
        rad += 3;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = "Today's deaths";
        break;
      case 'casesPer100th':
        rad = Math.round(element[indicator]).toString().length;
        rad = rad > 2 ? rad * 2 : 2 * 2;
        if (element[indicator].toString()[0] < 5) rad -= 1;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = 'Cases per 100 th';
        break;
      case 'recoveredPer100th':
        rad = Math.round(element[indicator]).toString().length;
        rad = rad > 2 ? rad * 2 : 2 * 2;
        if (element[indicator].toString()[0] < 5) rad -= 1;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = 'Recovered per 100 th';
        break;
      case 'deathsPer100th':
        if (element[indicator] > 150) rad = 8;
        else if (element[indicator] > 100)rad = 7;
        else if (element[indicator] > 50) rad = 6;
        else if (element[indicator] > 10) rad = 5;
        else rad = 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = 'Deaths per 100 th';
        break;
      case 'todayCasesPer100th':
        if (element[indicator] > 150) rad = 8;
        else if (element[indicator] > 100)rad = 7;
        else if (element[indicator] > 50) rad = 6;
        else if (element[indicator] > 10) rad = 5;
        else rad = 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = 'Cases today per 100 th';
        break;
      case 'todayRecoveredPer100th':
        if (element[indicator] > 150) rad = 8;
        else if (element[indicator] > 100)rad = 7;
        else if (element[indicator] > 50) rad = 6;
        else if (element[indicator] > 10) rad = 5;
        else rad = 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = 'Recovered today per 100 th';
        break;
      case 'todayDeathsPer100th':
        if (element[indicator] > 2) rad = 8;
        else if (element[indicator] > 1.5)rad = 7;
        else if (element[indicator] > 1) rad = 6;
        else if (element[indicator] > 0.5) rad = 5;
        else rad = 4;
        opacity = rad / 10 >= 0.4 ? rad / 10 : 0.4;
        objSettings.text = 'Deaths today per 100 th';
        break;
      default:
        break;
    }
    objSettings.rad = rad;
    objSettings.opacity = opacity;
    return objSettings;
  }
}
