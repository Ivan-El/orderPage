import { setAddressInputValue } from "./address.js";
import { getGeolocate } from "./api.js";

let myMap;

const initMap = () => {
  myMap = new ymaps.Map("map", {
    center: [55.7522, 37.6156],
    zoom: 10,
    controls: [
      "geolocationControl",
      "typeSelector",
      "fullscreenControl",
      "zoomControl",
    ],
  });

  myMap.events.add("click", function (evt) {
    const coords = evt.get("coords");
    loadAddress(coords[0], coords[1]);
    myMap.setCenter([coords[0], coords[1]], 15, {
      duration: 300,
      timingFunction: "ease-in",
    });

    myMap.geoObjects.get(0).geometry.setCoordinates([coords[0], coords[1]]);
  });

  const myPlacemark = new ymaps.Placemark(
    myMap.getCenter(),
    {
      hintContent: "Адрес доставки",
    },
    {
      iconLayout: "default#image",
      iconImageHref: "../img/map_pin.svg",
      iconImageSize: [27, 39],
      iconImageOffset: [-13, -39],
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myMap.cursors.push("arrow");
};

function loadAddress(lat, lon) {
  const promise = getGeolocate(lat, lon, 1);

  promise
    .then((response) => {
      return response.json();
    })
    .then((result) => setAddressInputValue(result.suggestions[0]))
    .catch((error) => {
      console.log("error", error);
    });
}

export { myMap, initMap };
