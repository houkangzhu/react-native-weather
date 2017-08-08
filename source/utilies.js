'use strict';
import React from 'react';
import {
  AsyncStorage,
}
 from 'react-native';

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

const cityWeathers = {};
function appleQueryWeather(lat, lon, callback) {
  var key = lat + '/' + lon ;
  if (cityWeathers[key] != null) {
    callback(cityWeathers[key])
    return;
  }
  var url = 'http://api.weather.com/v1/geocode/' + key + '/aggregate.json?apiKey=e45ff1b7c7bda231216c7ab7c33509b8&products=conditionsshort,fcstdaily10short,fcsthourly24short,nowlinks&language=zh-CN'
  fetch(url,{method: 'GET',}
   ).then((response) => response.json())
    .then((responseJson) => {
      cityWeathers[key] = responseJson;
      callback(responseJson)
    })
    .catch((error) => {
      console.warn(error);
    });
}

const weekdayStrings = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
function getCurrentWeekDay() {
  var date = new Date()
  return weekdayStrings[date.getDay()]
}

// 2017-08-07T19:00:00+0800
function customDateFomatter(dateStr) {
  var formatStr = dateStr.split('+')[0]
  return new Date(formatStr)
}

const CitySaveKey = 'CitySaveKey';
function saveCityList(citys) {
  Utilies.allCitys = citys;
  var jsonString = JSON.stringify(citys)
  AsyncStorage.setItem(CitySaveKey, jsonString, (error) =>{

  })
}

function readCityList(callback) {
  AsyncStorage.getItem(CitySaveKey, (error, result) =>{
      var allCity = JSON.parse(result);
      if (allCity == null) {
        allCity = [{
          lat:'31.230000',
          lon:'121.470001',
          name:'上海'}];
      }
      Utilies.allCitys = allCity;
      callback(allCity)
  })
}

function clearAllCity() {
  AsyncStorage.removeItem(CitySaveKey);
}

const Utilies = {
  clearColor:'rgba(0,0,0,0)',
  titleViewHeight:120,
  tempCellHeight:130,
  dimensions:require('Dimensions').get('window'),
  getCurrentWeekDay:getCurrentWeekDay,
  dateFormatter:customDateFomatter,
  saveCityList:saveCityList,
  readCityList:readCityList,
  clearAllCity:clearAllCity,
  allCitys:[],
  commonIconURI:'http://icons.wxug.com/i/c/k/chancetstorms.gif',
  searchCity:searchCity,
  appleAPI:{
    queryWeather:appleQueryWeather
  }
}

module.exports = Utilies;
