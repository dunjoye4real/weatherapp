const expect = require('chai').expect;
 var chai = require('chai');
var assert = chai.assert;
const app = require('./index');

const fetchWeather = app.fetchWeather;
const fetchForecast = app.fetchForecast;


describe('Test weather app ', function() {

  it('should contain weather info', function () {
    assert(fetchWeather !== null);
  });

  it('should contain forecast info', function () {
    assert(fetchForecast !== null) ;
  });

  it('forecast data should contain temperature info ', function () {
    assert(fetchWeather.main !== null);
  });
});
