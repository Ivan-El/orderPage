const token = "3b80da74da1b5ec56886983cccb9b739db72635f";

function getGeolocate(lat, lon, count) {
  const serviceUrl =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
  const query = {
    lat: lat,
    lon: lon,
    count: count,
  };

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify(query),
  };

  return fetch(serviceUrl, options);
}

const getSuggestions = (value, count) => {
  const url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  const query = {
    query: value,
    count: count,
  };

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify(query),
  };

  return fetch(url, options);
};

export { getGeolocate, getSuggestions };
