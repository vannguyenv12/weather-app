const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2b9e04271e53bd6af89117dc1ba04e19&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Not found url', undefined);
    } else if (body.error) {
      callback('Not found location', undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} . This temperature current is ${body.current.temperature} degree out. Feels like is ${body.current.feelslike} degree out`
      );
    }
  });
};

module.exports = forecast;
