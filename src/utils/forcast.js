const request = require("request");
const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/e719f2c229bd5fbd02179ce19a631ccf/" +
    latitude +
    "," +
    longitude;
  console.log(url);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(error, undefined);
    } else if (body.error) {
      callback("cannot connect to web service", undefined);
    } else {
      callback(undefined, {
        temperature: body.currently.temperature + " degree",
        longitude: body.longitude,
        latitude: body.latitude
      });
    }
  });
};
module.exports = forecast;
