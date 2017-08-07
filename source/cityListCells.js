'use strict';
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import Utilies from './utilies'

class CityCell extends Component {
  render() {
    var nameView = (
      <View >
        <Text style={{color:'white',fontSize:14,}}>{this.props.cityTime}</Text>
        <Text style={{color:'white',fontSize:34,}}>{this.props.cityName}</Text>
      </View>
    )
    return (
      <View style={[cityCell.container, {backgroundColor:this.randomColor()}]}>
        {nameView}
        <Text style={cityCell.temperature}>{this.props.temperature+'°'}</Text>
      </View>
    );
  }
  randomColor() {
     var color = '#'+Math.floor(Math.random()*16777215).toString(16);
     var subLen = 7-color.length;
     for (var i = 0; i < subLen; i++) {
       color += '0'
     }
     return color
  }
}
const cityCell = StyleSheet.create({
  container:{
    height:84,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    padding:10
  },
  temperature:{
    color:'white',
    fontSize:50,
    fontWeight:'100',
    backgroundColor:'rgba(0,0,0,0)',
  }
})
cityCell.defaultProps = {
  cityName:'',
  cityTime:'',
  temperature:'0',
}

// 添加一个城市
class AddCityCell extends Component {
  render() {
    return (
      <View style={cityCell.container}>
        <TouchableOpacity onPress={()=>this.props.changeType()}>
          <Text style={addCityCell.addText}> °C/°F </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.addCity()}>
          <Text style={[addCityCell.addText,{fontSize:20}]}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const addCityCell = StyleSheet.create({
  addText:{
    fontSize:16,
    color:'white',
  },
})
AddCityCell.defaultProps = {
  changeType:()=>{},
  addCity:()=>{}
}

// 打开网站
class OpenWebsitCell extends Component {
  render() {
    return (
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Image source={require('./../assets/weatherIcon.png')} style={{width:30, height:30}}/>
      </View>
    );
  }
}
module.exports = {
  CityCell,
  AddCityCell,
  OpenWebsitCell
};
