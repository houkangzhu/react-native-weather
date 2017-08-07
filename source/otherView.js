'use strict';

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Utilies from './utilies'

// 城市名称和天气
class TitleView extends Component {
  render() {
    return (
      <View style={[titleStyles.bgView, {paddingTop:this.props.topOffset}]}>
        <Text style={[titleStyles.cityName, {fontSize:36}]}>{this.props.cityName}
        </Text>
        <Text style={[titleStyles.cityName, {fontSize:14}]}>{this.props.weatherType}
        </Text>
      </View>
    );
  }
}
const titleStyles = StyleSheet.create({
  bgView : {
    height:Utilies.titleViewHeight,
    backgroundColor:'rgba(0,0,0,0)',
    alignItems:'center',
  },
  cityName : {
    color:'white',
    marginBottom:4,
  }
});
TitleView.defaultProps = {
  cityName:'',
  weatherType:'',
  topOffset:30,
}


//  今天的温度
class TemperatureView extends Component {
  render() {
    return (
      <View style={[temperature.container, {opacity:this.props.alpha,top:this.props.topOffset}]}>
        <Text style={temperature.temperature}> {this.props.temperature}°</Text>
      </View>
    );
  }
}
TemperatureView.defaultProps = {
  alpha:1.0,
  topOffset:Utilies.titleViewHeight,
  temperature:'-',
}
const temperature = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    left:0,
    right:0,
  },
  temperature:{
    color:'white',
    fontSize:88,
    fontWeight:'100',
    backgroundColor:Utilies.clearColor,
  }
})

// 下部的工具bar
class BottomToolBar extends Component {
  render() {
    return (
      <View style={bottomBar.container}>
        <TouchableOpacity
          onPress={this.props.onPressLeft}>
          <Image source={require('./../assets/weatherIcon.png')} style={bottomBar.logoIcon}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.props.onPressRight}>
          <Image source={require('./../assets/menu.png')} style={bottomBar.logoIcon}/>
        </TouchableOpacity>
      </View>
    );
  }
}
const bottomBar = StyleSheet.create({
  container:{
    height:40,
    borderTopWidth:0.5,
    borderTopColor:'white',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:10
  },
  logoIcon:{
    width:30,
    height:30,
    resizeMode:'cover'
  }
})
BottomToolBar.defaultProps = {
  onPressLeft:() => {},
  onPressRight:() => {},
}

module.exports = {
  TitleView,
  BottomToolBar,
  TemperatureView
};
