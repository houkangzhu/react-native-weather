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
import { SwipeRow, SwipeListView } from 'react-native-swipe-list-view';
import {
  CityCell,
  AddCityCell,
  OpenWebsitCell
} from './cityListCells'
import AddCityPage from './addCity';
import Utilies from './utilies';

class CityListPage extends Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({rowHasChanged:(r1 , r2) => r1 !== r2})
    this.state = {
      dataSource:ds.cloneWithRows([]),
    }
  }
  componentWillMount() {
    this.loadCitys();
  }
  loadCitys() {
    Utilies.readCityList((citys)=>{
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(citys)
      })
    })
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor:'#111111'}}>
        <StatusBar barStyle="light-content"/>
        <SwipeListView
          disableRightSwipe={true}
					rightOpenValue={-80}
          renderHiddenRow={(data, secId, rowId, rowMap) =>this.renderDeleteRow(data, secId, rowId, rowMap)}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData)=>this.renderRow(rowData)}
          renderFooter={()=>this.renderFooter()}
        />
      </View>
    );
  }

  renderFooter() {
    return(
      <View >
        <AddCityCell addCity={()=>this.addCityAction()}/>
        <OpenWebsitCell />
      </View>
    )
  }
  renderRow(rowData) {
    return(
      <TouchableOpacity activeOpacity={1.0}
          onPress={()=>{
            this.props.onChangeCity(rowData)
            this.props.navigator.pop()}
          }>
          <CityCell cityData={rowData}/>
      </TouchableOpacity>)
  }
  renderDeleteRow(data, secId, rowId, rowMap) {
      return (
        <View style={{flex:1}}>
          <TouchableOpacity style={cityList.deleteBtn} opacity={0.8}
            onPress={()=>{
              rowMap[`${secId}${rowId}`].closeRow()
              var allCity = [...Utilies.allCitys];
              allCity.splice(rowId, 1)
              this.setState({
                dataSource:this.state.dataSource.cloneWithRows(allCity)
              })
              Utilies.saveCityList(allCity)
            }}>
            <Text style={{fontSize:20, color:'white'}}>删除</Text>
          </TouchableOpacity>
        </View>
      )
  }
  // 添加一个城市
  addACity(city) {
    var allCity = Utilies.allCitys;
    allCity.push(city)
    Utilies.saveCityList(Utilies.allCitys);
    this.loadCitys();
  }
  addCityAction() {
    this.props.navigator.push({
      component: AddCityPage,
      type: 'Bottom',
      passProps:{
        selectedCity:(city)=>this.addACity(city),
      }
    })
  }
}

const cityList = StyleSheet.create({
	deleteBtn:{
    position:'absolute',
    top:0,
    bottom:0,
    right:0,
    width:80,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
  }
})

CityListPage.defaultProps = {
  onChangeCity:(city)=>{},
}

module.exports = CityListPage;
