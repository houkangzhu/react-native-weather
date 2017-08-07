'use strict';
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ListView,
  TouchableOpacity
} from 'react-native';
import {
  CityCell,
  AddCityCell,
  OpenWebsitCell
} from './cityListCells'
import AddCityPage from './addCity';

class CityListPage extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged:(r1 , r2) => r1 !== r2})
    this.state = {
      dataSource:ds.cloneWithRows(['row 1', 'row 2','add','about']),
    }
  }
  render() {
    return (
      <View style={{flex:1, backgroundColor:'#111111'}}>
        <StatusBar barStyle="light-content"/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData)=>this.renderRow(rowData)}
        />
      </View>
    );
  }
  renderRow(rowData) {
    if (rowData == 'add') {
      return (
        <AddCityCell
          addCity={()=>this.addCityAction()}/>)
    }
    if (rowData == 'about') {
      return (<OpenWebsitCell />)
    }
    return(
      <TouchableOpacity activeOpacity={0.8}
          onPress={()=>{this.props.navigator.pop()}
          }>
          <CityCell
            cityName={'上海市'}
            cityTime={'12:22'}
            temperature={33}/>
      </TouchableOpacity>)
  }

  addCityAction() {
    this.props.navigator.push({
      component: AddCityPage,
      type: 'Bottom'
    })
  }
}

module.exports = CityListPage;
