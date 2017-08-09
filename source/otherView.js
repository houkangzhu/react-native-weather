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
      <View style={[titleStyles.bgView, {paddingTop:80}]}
        ref={'titleView'}>
        <Text style={[titleStyles.cityName, {fontSize:36}]}>{this.props.cityName}
        </Text>
        <Text style={[titleStyles.cityName, {fontSize:18}]}>{this.props.weatherType}
        </Text>
      </View>
    );
  }
  setNativeProps(value) {
    this.refs.titleView.setNativeProps(value);
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
}


//  今天的温度
class TemperatureView extends Component {
  render() {
    return (
      <View ref={'temperature'}
        style={[temperature.container, {opacity:1.0,top:Utilies.titleViewHeight }]}>
        <Text style={temperature.temperature}> {this.props.temperature}°</Text>
      </View>
    );
  }
  setNativeProps(value) {
    this.refs.temperature.setNativeProps(value);
  }
}
TemperatureView.defaultProps = {
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
    fontSize:120,
    fontWeight:'100',
    backgroundColor:Utilies.clearColor,
    paddingTop:10,
  }
})

// 下部的工具bar
class BottomToolBar extends Component {
  render() {
    var pageText = ()=>{
      var text = '';
      for (var i = 0; i < this.props.pageCount; i++) {
          text += i == this.props.selectIndex?'●':'○';
      }
      return text
    }
    return (
      <View style={bottomBar.container}>
        <TouchableOpacity
          onPress={this.props.onPressLeft}>
          <Image source={require('./../assets/weatherIcon.png')} style={bottomBar.logoIcon}/>
        </TouchableOpacity>
        <Text style={bottomBar.pageControl}>{pageText()}</Text>
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
    borderTopWidth:Utilies.lineWidth,
    borderTopColor:Utilies.lineColor,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:10
  },
  logoIcon:{
    width:30,
    height:30,
    resizeMode:'cover'
  },
  pageControl:{
    textAlign:'center',
    color:'white',
    fontSize:12,
  }
})
BottomToolBar.defaultProps = {
  onPressLeft:() => {},
  onPressRight:() => {},
  pageCount:0,
  selectIndex:0,
}

module.exports = {
  TitleView,
  BottomToolBar,
  TemperatureView
};
