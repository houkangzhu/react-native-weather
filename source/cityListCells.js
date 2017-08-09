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
  constructor(props) {
    super(props);
    this.state = {
        time:'-',
        temperature:'-',
    };
  }
  componentWillMount() {
    Utilies.appleAPI.queryWeather(this.props.cityData.lat, this.props.cityData.lon, (data)=>{
      var str2Bit = (d)=>(d<10?'0'+d:''+d)
      var theDate = new Date(data.conditionsshort.observation.valid_time_gmt * 1000)
      var timeStr = str2Bit(theDate.getHours())+':'+str2Bit(theDate.getMinutes())
      this.setState({
        time:timeStr,
        temperature: data.conditionsshort.observation.metric.temp,
      })
    })
  }

  render() {
    var nameView = (
      <View >
        <Text style={{color:'white',fontSize:14,}}>{this.state.time}</Text>
      <Text style={{color:'white',fontSize:34,}}>{this.props.cityData.name}</Text>
      </View>
    )
    return (
      <View style={[cityCell.container, {backgroundColor:Utilies.randomColor()}, this.props.style]}>
        {nameView}
        <Text style={cityCell.temperature}>{this.state.temperature+'°'}</Text>
      </View>
    );
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
  cityData:null,
  style:{},
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
