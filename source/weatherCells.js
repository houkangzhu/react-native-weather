'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import Utilies from './utilies'


const styles = StyleSheet.create({
    plainText:{
      fontSize:14,
      color:'white',
      backgroundColor:Utilies.clearColor,
    },
    plainText16:{
      fontSize:16,
      color:'white',
      backgroundColor:Utilies.clearColor,
    },
    weatherIcon:{
      width:20,
      height:20,
    }
})

// 今天的简述
class TodayOverviewCell extends Component {
  render() {
    if (this.props.weatherData == null) return (<View />)
    var temps = this.props.weatherData.observation.metric;
    return (
      <View style={todayOverview.container}>
        <Text style={styles.plainText16}>{Utilies.getCurrentWeekDay()}  今天</Text>
      <Text style={styles.plainText16}>{temps.max_temp} {temps.min_temp}</Text>
      </View>
    );
  }
}
const todayOverview = StyleSheet.create({
  container:{
    height:Utilies.tempCellHeight,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end',
    marginLeft:10,
    marginRight:10,
  },
})
TodayOverviewCell.defaultProps = {
  weatherData:null,
}

// 时间点的情况
class HourDetailView extends Component {
  render() {
    return (
      <View style={hourDetail.container}>
        <Text style={styles.plainText}>{this.props.hourStr}</Text>
        {Utilies.iconImage(this.props.iconType)}
        <Text style={styles.plainText}>{this.props.tmpStr}</Text>
      </View>
    );
  }
}
const hourDetail = StyleSheet.create({
  container:{
    width:60,
    justifyContent:'space-around',
    alignItems:'center'
  },
})
HourDetailView.defaultProps = {
  hourStr:'',
  iconType:'',
  tmpStr:'',
}

// 今天的天气详情
class TodayDetailHeader extends Component {

  createDetailViews() {
    var dataList = this.props.weatherData.forecasts;
    var views = [];
    for (var i = 0; i < dataList.length; i++) {
      var data = dataList[i];
      var dateStr = data.dateStr;
      if (dateStr == null) {
          var date = new Date(data.fcst_valid * 1000);
          dateStr = date.getHours()+"时";
          data.dateStr = dateStr;
      }
      var tempStr = data.tempStr;
      if (tempStr == null) {
        tempStr = data.metric.temp+'°';
        data.tempStr = tempStr;
      }
      views.push(
        <HourDetailView hourStr = {dateStr}
          iconType={data.icon_cd}
          tmpStr={tempStr}
          key={i}
        />
      )
    }
    return views;
  }

  render() {
    return (
      <ScrollView style={todayDetail.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false} >
        {this.createDetailViews()}
      </ScrollView>
    );
  }
}
TodayDetailHeader.createCustomData = (timeString, type, tempStr) => {
    return {
      dateStr:timeString,
      type:type,
      tempStr:tempStr
    }
}
const todayDetail = StyleSheet.create({
  container:{
    height:80,
    borderTopWidth:Utilies.lineWidth,
    borderTopColor:Utilies.lineColor,
    borderBottomWidth:Utilies.lineWidth,
    borderBottomColor:Utilies.lineColor,
    backgroundColor:Utilies.commonBgColor
  }
})
TodayDetailHeader.defaultProps = {
  weatherData:{},
}

// 未来几天的天气
class FutureWeatherCell extends Component {
  render() {
    if (this.props.weatherData == null) {return (<View/>)}
    return (
      <View>
        {this.createFutureViews()}
      </View>
    );
  }
  createFutureViews() {
    var viewCreator = function(data, index) {
      return (
        <View style={futureWeather.container} key={i}>
          <Text style={styles.plainText16}>{data.dow}</Text>
         {Utilies.iconImage(data.day.icon_cd)}
        <Text style={styles.plainText16}>{data.metric.max_temp} {data.metric.min_temp}</Text>
       </View>
      )
    }
    var views = [];
    for (var i = 1; i < this.props.weatherData.forecasts.length; i++) {
      views.push(
        viewCreator(this.props.weatherData.forecasts[i], i)
      )
    }
    return views;
  }
}
const futureWeather = StyleSheet.create({
  container:{
    height:30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:10
  }
})
FutureWeatherCell.defaultProps = {
  weatherData:null,
}

// 天气的描述文字
class WeatherDescribeCell extends Component {
  render() {
    var weatherData = this.props.weatherData;
    var describe = '';
    if (weatherData != null) {
      describe = '今天：现在是'+weatherData.conditionsshort.observation.wx_phrase +
      '。最高气温'+ weatherData.conditionsshort.observation.metric.max_temp+'°。今晚是'+
      weatherData.fcstdaily10short.forecasts[0].night.phrase_32char +',最低气温'+
      weatherData.conditionsshort.observation.metric.min_temp+'°。';
    }
    return (
      <View style={weatherDescribe.container}>
        <Text style={styles.plainText16}>{describe}</Text>
      </View>
    );
  }
}
const weatherDescribe = StyleSheet.create({
  container:{
    borderTopWidth:Utilies.lineWidth,
    borderTopColor:Utilies.lineColor,
    borderBottomWidth:Utilies.lineWidth,
    borderBottomColor:Utilies.lineColor,
    padding:10,
  }
})
WeatherDescribeCell.defaultProps = {
  weatherData:null,
}

const DetailNames = {
  sunrise:'日出',
  sunset:'日落',
  relative_humidity:'湿度',

  wind_mph:'风速',
  feelslike_c :'体感温度',

  precip_today_metric:'降水量',
  pressure_mb:'气压',

  visibility_km:'能见度',
  UV:'紫外线指数',
}
class WeatherDetailCell extends Component {
  itemCreate(values, align) {
    var items = [];
    for (var i = 0; i < values.length; i++) {
      items.push(
        <Text style={[styles.plainText16,{paddingTop:i%2==0?5:2, paddingBottom:i%2==0?2:5,textAlign:align, height:24}]}
          key={i}>{values[i]}</Text>
      )
    }
    return items;
  }

  render() {
    if (this.props.weatherData == null) {
      return (<View style={{height:120}} />);
    }
    var createLeftView = ()=> {
      var names = ['日出：','日落：',
                  '降雨概率：','湿度：',
                  '风速：','体感温度：',
                  '降水量：','气压：',
                  '能见度：','紫外线指数：',
                  '空气质量指数：','空气质量：'];
      return (
        <View style={{justifyContent:'flex-end', flex:1}}>
          {this.itemCreate(names, 'right')}
        </View>
      )
    }
    var createRightView = ()=> {
      return (
        <View style={{flex:1,}}>
          {this.itemCreate(this.props.weatherData, 'left')}
        </View>
      )
    }
    return(
      <View style={{flexDirection:'row'}} >
        {createLeftView()}
        {createRightView()}
      </View>
    );
  }
}
WeatherDetailCell.defaultProps = {
  weatherData:null,
}

// ========== 导出 ===========
module.exports = {
  TodayOverviewCell,
  FutureWeatherCell,
  TodayDetailHeader,
  WeatherDescribeCell,
  WeatherDetailCell
}
