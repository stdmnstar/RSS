import L from '../framework/library/leaflet/leaflet-src';
import '../framework/library/leaflet/leaflet.rrose-src';
import { objMap, countryObj } from '../../index';

export function style() {
  return {
    opacity: 0,
    fillOpacity: 0,
  };
}

export function popupOpen(e) {
  let content;
  const iso2 = e.target.feature.properties.iso_a2;
  objMap.markerArray.forEach((el) => {
    if (el.options.iso2 === iso2) {
      /*eslint-disable */
      content = el._popup._content;
      /* eslint-enable */
    }
  });
  new L.Rrose({
    offset: new L.Point(0, -10),
    closeButton: false,
    autoPan: false,
  })
    .setContent(content)
    .setLatLng(e.latlng)
    .openOn(objMap.map);
}

export function popupClose() {
  objMap.map.closePopup();
}

export function zoomToFeature(e) {
  objMap.clickMap = false;
  const iso2 = e.target.feature.properties.iso_a2;
  countryObj.iso = iso2;
}

export function onEachFeature(feature, layer) {
  layer.on({
    mousemove: popupOpen,
    mouseout: popupClose,
    click: zoomToFeature,
  });
}
