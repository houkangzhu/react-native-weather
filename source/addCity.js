'use strict';
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Utilies from './utilies';

class AddCityPage extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged:(r1 , r2) => r1 !== r2})
    this.state = {
      dataSource:ds.cloneWithRows([]),
    }
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:'#444444'}}>
        <CitySearchBar cancelAction={()=>{this.props.navigator.pop()}}
          inputTextAction={(text)=>this.searchCity(text)}
        />
      <ListView dataSource={this.state.dataSource}
        enableEmptySections={true}
        renderRow={(rowData)=>this.renderRow(rowData)}/>
      </View>
    );
  }
  renderRow(rowData) {
    var lat = parseFloat(rowData.lat);
    var lon = parseFloat(rowData.lon);
    if(lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        return (<View/>);
    }
    return(
      <TouchableOpacity style={{height:30,marginLeft:10,justifyContent:'center'}}
        onPress={()=>{
          this.props.navigator.pop()
          this.props.selectedCity(rowData)
        }}
        >
        <Text style={{color:'white', fontSize:12}}>{rowData.name}</Text>
      </TouchableOpacity>
    )
  }
  searchCity(text) {
    var reload = (data) => {
        this.setState({
          dataSource:this.state.dataSource.cloneWithRows(
            data == null ? []: data),
        })
    }
    if (text.length == 0) {
      reload(null)
    }
    else {
      Utilies.searchCity(text,(data) => {reload(data)})
    }
  }
}

AddCityPage.defaultProps = {
  selectedCity:(city) =>{},
}

class CitySearchBar extends Component {
  render() {
    return (
      <View style={citySearchBar.container}>
        <Text style={{fontSize:10, color:'white'}}>输入城市，邮政编码或机场位置</Text>
        {this.searchInput()}
      </View>
    );
  }

  searchInput(){
    return (
      <View style={{flexDirection:'row', flex:1,}}>
        <View style={citySearchBar.inputBackground}>
          <Image source={require('./../assets/search.png')} style={{width:20, height:20}}/>
        <TextInput style={citySearchBar.textInput}
          onChangeText={this.props.inputTextAction}
          autoCorrect={false}
          autoFocus={true}
          selectionColor={'white'}
          clearButtonMode={'while-editing'}
          returnKeyType={'search'}
          />
        </View>
        <TouchableOpacity style={{width:40,alignSelf:'center'}}
          onPress={(text)=>{this.props.cancelAction(text)}}>
          <Text style={{fontSize:14, color:'white'}}>取消</Text>
        </TouchableOpacity>
      </View>)
  }
}
const citySearchBar = StyleSheet.create({
  container:{
    paddingTop: Utilies.isIOS ? 20 : 0,
    height:64,
    backgroundColor:'#111111aa',
    alignItems:'center'
  },
  inputBackground:{
    flex:1,
    backgroundColor:'black',
    margin:4,
    borderRadius:4,
    flexDirection:'row',
    padding:2,
  },
  textInput:{
    flex:1,
    fontSize:14,
    color:'white',
  }
})
CitySearchBar.defaultProps = {
  cancelAction:()=>{},
  inputTextAction:(text)=>{},
}

module.exports = AddCityPage;
