'use strict';
import React from 'react';

const API_KEY = '28252535e4062e2d';
// 天气查询的URL
const BASE_URL = 'http://api.wunderground.com/api/' + API_KEY;

function searchCity(keywords, callback) {
  var url = 'http://autocomplete.wunderground.com/aq?format=JSON&query='+keywords;
  fetch(url,{
    method: 'GET',
     headers: {
       'Accept-Language':'cn',
  }})
    .then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson.RESULTS)
    })
    .catch((error) => {
      console.error(error);
    });
}

function queryHour(zmwCode,callback) {
  var url = BASE_URL + '/hourly/lang:CN/q/zmw:00000.738.58367.json';
  fetch(url,{method: 'GET',}
   ).then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson.hourly_forecast)
    })
    .catch((error) => {
      console.error(error);
    });
}

function queryFuture10Day(zmwCode,callback) {
  var url = BASE_URL + '/forecast10day/lang:CN/q/zmw:00000.738.58367.json';
  fetch(url,{method: 'GET',}
   ).then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson.forecast)
    })
    .catch((error) => {
      console.error(error);
    });
}
function queryToday(zmwCode, callback) {
  var url = BASE_URL + '/conditions/lang:CN/q/zmw:00000.738.58367.json';
  fetch(url,{method: 'GET',}
   ).then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson.current_observation)
    })
    .catch((error) => {
      console.error(error);
    });
}

function appleQueryWeather(areaPosition, callback) {
  var url = 'http://api.weather.com/v1/geocode/31.233334/121.500000/aggregate.json?apiKey=e45ff1b7c7bda231216c7ab7c33509b8&products=conditionsshort,fcstdaily10short,fcsthourly24short,nowlinks&language=zh-CN'
  fetch(url,{method: 'GET',}
   ).then((response) => response.json())
    .then((responseJson) => {
      callback(responseJson)
    })
    .catch((error) => {
      console.warn(error);
    });
}

const Utilies = {
  clearColor:'rgba(0,0,0,0)',
  titleViewHeight:120,
  tempCellHeight:130,
  searchCity:searchCity,
  queryHour:queryHour,
  queryFuture10Day:queryFuture10Day,
  queryToday:queryToday,
  appleAPI:{
    queryWeather:appleQueryWeather
  }
}

module.exports = Utilies;
