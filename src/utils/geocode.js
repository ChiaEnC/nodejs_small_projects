const request = require("request");
const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiY2NoaWFuZzY3NiIsImEiOiJjanN1aG9tOW8xejE0NDRvMDc0am0xMDNpIn0.BJ9LuargL3y8zAzAgKo5XQ";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
