const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || ' ';
const mapURI = process.env.MAP_ENDPOINT || " ";

var targetCity = process.env.TARGET_CITY || " ";


const port = process.env.PORT || 9000;


const app = new Koa();

app.use(cors());

const user_location = async () => {
  const response = await fetch('http://freegeoip.net/json/');

  return response ? response.json(): {}

};


const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {}
};

exports.fetchWeather = fetchWeather;


const fetchForecast = async () => {
  const endpoint = `${mapURI}/forecast?q=${targetCity}&appid=${appId}&`;
  const response = await fetch(endpoint);

  return response ? response.json() : {}
};
exports.fetchForecast = fetchForecast;

router.get('/api/weather', async ctx => {
  var locationData = await user_location();
  targetCity = locationData.city;
  const weatherData = await fetchWeather();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData ? weatherData : {};
});

router.get('/api/location', async ctx => {
  const locationdata = await user_location();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = locationdata ? locationdata : {};
});

router.get('/api/forecast', async ctx => {

  // no need to repeat it since both uri are called at the same time
  // locationData = await user_location();
  // targetCity = locationData.city;


  const weatherData = await fetchForecast();

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData ? weatherData.list[4] : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);