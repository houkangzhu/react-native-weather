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
    weatherIcon:{
      width:20,
      height:20,
    }
})

// 今天的简述
class TodayOverviewCell extends Component {
  render() {
    if (this.props.weatherData == null) return (<View />)
    return (
      <View style={todayOverview.container}>
        <Text style={styles.plainText}>{this.props.weatherData.date.weekday}  今天</Text>
        <Text style={styles.plainText}>{this.props.weatherData.high.celsius} {this.props.weatherData.low.celsius}</Text>
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
      <Image style={styles.weatherIcon} source={{uri:this.props.iconUrl}}/>
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
  iconUrl:'',
  tmpStr:'',
}

// 今天的天气详情
class TodayDetailHeader extends Component {
  render() {
    return (
      <ScrollView style={todayDetail.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false} >
        {this.createDetailViews()}
      </ScrollView>
    );
  }
  createDetailViews() {
    var views = [];
    for (var i = 0; i < this.props.detailList.length; i++) {
      var data = this.props.detailList[i];
      views.push(
        <HourDetailView hourStr = {data.FCTTIME.hour+"时"}
          iconUrl={data.icon_url}
          tmpStr={data.temp.metric+'°'}
          key={i}
        />
      )
    }
    return views;
  }
}
const todayDetail = StyleSheet.create({
  container:{
    height:80,
    borderTopWidth:0.5,
    borderTopColor:'white',
    borderBottomWidth:0.5,
    borderBottomColor:'white',
    backgroundColor:'#abcdedaa'
  }
})
TodayDetailHeader.defaultProps = {
  detailList:[],
}

// 未来几天的天气
class FutureWeatherCell extends Component {
  render() {
    if (this.props.weatherData == null) {return (<View/>)}
    return (
      <View style={futureWeather.container}>
        <Text style={styles.plainText}>{this.props.weatherData.date.weekday}</Text>
        <Image style={styles.weatherIcon} source={{uri:this.props.weatherData.icon_url}}/>
        <Text style={styles.plainText}>{this.props.weatherData.high.celsius} {this.props.weatherData.low.celsius}</Text>
      </View>
    );
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
    return (
      <View style={weatherDescribe.container}>
        <Text style={[styles.plainText,{fontSize:16}]}>今天：见天天气很好，不错不错，见天天气很好，不错不错，见天天气很好，不错不错，见天天气很好，不错不错，</Text>
      </View>
    );
  }
}
const weatherDescribe = StyleSheet.create({
  container:{
    borderTopWidth:0.5,
    borderTopColor:'white',
    borderBottomWidth:0.5,
    borderBottomColor:'white',
    padding:10,
  }
})

class WeatherDetailCell extends Component {
  render() {
    return (
      <View style={{height:120}}>
      </View>
    );
  }
}

// ========== 导出 ===========
module.exports = {
  TodayOverviewCell,
  FutureWeatherCell,
  TodayDetailHeader,
  WeatherDescribeCell,
  WeatherDetailCell
}
