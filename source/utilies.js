'use strict';
import React from 'react';
import {Image} from 'react-native';
import {
  AsyncStorage,
}  from 'react-native';
import moment from 'moment';

// 随机生成颜色
function randomColor() {
    var color = '#'+Math.floor(Math.random()*16777215).toString(16);
    var subLen = 7-color.length;
    for (var i = 0; i < subLen; i++) {
      color += '0'
    }
    return color
 }
// 天气类型的Icon  0...18
function iconImage(type) {
  var source = require('./../assets/weatherIcon/0.png');
  if (type == 1) { source = require('./../assets/weatherIcon/1.png');}
  if (type == 2) { source = require('./../assets/weatherIcon/2.png');}
  if (type == 3) { source = require('./../assets/weatherIcon/3.png');}
  if (type == 4) { source = require('./../assets/weatherIcon/4.png');}
  if (type == 5) { source = require('./../assets/weatherIcon/5.png');}
  if (type == 6) { source = require('./../assets/weatherIcon/6.png');}
  if (type == 7) { source = require('./../assets/weatherIcon/7.png');}
  if (type == 8) { source = require('./../assets/weatherIcon/8.png');}
  if (type == 9) { source = require('./../assets/weatherIcon/9.png');}
  if (type == 10) { source = require('./../assets/weatherIcon/10.png');}
  if (type == 11) { source = require('./../assets/weatherIcon/11.png');}
  if (type == 12) { source = require('./../assets/weatherIcon/12.png');}
  if (type == 13) { source = require('./../assets/weatherIcon/13.png');}
  if (type == 14) { source = require('./../assets/weatherIcon/14.png');}
  if (type == 15) { source = require('./../assets/weatherIcon/15.png');}
  if (type == 16) { source = require('./../assets/weatherIcon/16.png');}
  if (type == 17) { source = require('./../assets/weatherIcon/17.png');}
  if (type == 18) { source = require('./../assets/weatherIcon/18.png');}
   return (
     <Image style={{width:20,height:20,resizeMode:'contain'}} source={source}
      //  source={{uri:'file://./../assets/weatherIcon/'+type+'.png'}}
     />
   )
 }

const API_KEY = '28252535e4062e2d';
// 天气查询的URL
const BASE_URL = 'http://api.wunderground.com/api/' + API_KEY;
// 这个接口搜出来的是英文的。。。
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
const CurrentDateKey = 'CurrentDateKey';
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
  var m = moment(dateStr)
  return m.toDate();
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

const isIOS = (require('Platform').OS == 'ios');

const Utilies = {
  isIOS: isIOS,
  clearColor:'rgba(0,0,0,0)',
  commonBgColor:'rgb(76,154,194)',
  lineColor:'#FFFFFF88',
  lineWidth:1,    // 小于1 显示有问题
  titleViewHeight:140,
  tempCellHeight:200,
  dimensions:require('Dimensions').get('window'),
  randomColor:randomColor,
  iconImage:iconImage,
  getCurrentWeekDay:getCurrentWeekDay,
  dateFormatter:customDateFomatter,
  saveCityList:saveCityList,
  readCityList:readCityList,
  clearAllCity:clearAllCity,
  allCitys:[],
  searchCity:searchCity,
  appleAPI:{
    queryWeather:appleQueryWeather
  }
}

module.exports = Utilies;
