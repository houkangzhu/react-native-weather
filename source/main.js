'use strict';
import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  StatusBar,
  ListView,
  Navigator
} from 'react-native';

import Utilies from './utilies'
import BackgroundView from './background';
import {
  TitleView,
  TemperatureView,
  BottomToolBar
} from './otherView';
import {
  TodayOverviewCell,
  FutureWeatherCell,
  TodayDetailHeader,
  WeatherDescribeCell,
  WeatherDetailCell
} from './listViewCells';
import CityListPage from './cityList'

class MainPage extends Component {
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
              getSectionData:(dataBlob,sectionID) => dataBlob[sectionID],
              getRowData:(dataBlob,sectionID,rowID) => {
                if (rowID.length < 2) {
                  return dataBlob.futureWeather[rowID]
                }
                return dataBlob[rowID];
              },
              rowHasChanged:(r1 , r2) => r1 !== r2,
              sectionHeaderHasChanged:(s1, s2) => s1 !== s2,
          })
    this.state = {
      dataSource: ds.cloneWithRowsAndSections({},[],[]),
      allData:{},
      headerTopRatio:1.0,
      cityZmw:'',   // 该城市气象台的编码
    };
    this.loadData()
  }
  render() {
    return(
      <View style = {{flex:1}}>
        <StatusBar barStyle="light-content"/>
        <BackgroundView />
       <TitleView topOffset={(30 + (this.state.headerTopRatio * 30))}
          cityName={"上海市"} weatherType={"多云转晴"} />
        <TemperatureView alpha={this.state.headerTopRatio > 0.3 ? this.state.headerTopRatio : 0}
          topOffset={Utilies.titleViewHeight - (50 *(1- this.state.headerTopRatio))}
          temperature={this.state.allData.overview == null ? '-' :
            this.state.allData.overview.high.celsius}
          />
        <ListView style = {{flex:1}}
          enableEmptySections={true}
          onScroll={(event)=>this.onScroll(event)}
          scrollEventThrottle={1}
          showsVerticalScrollIndicator={false}
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow}
          renderSectionHeader = {this.renderSectionHeader}>
        </ListView>
        <BottomToolBar onPressRight={()=>this.toCityList()}/>
      </View>
    )
  }
  loadData(){
    var sectionIDs = ['hidden','hourDetail'];
    var rowIDs = [['overview'],];
    var dataBlob = {};
    var reloadIfNeed = ()=> {
      if (dataBlob.futureWeather == null || dataBlob.hourDetail == null){ return; }
      var row2IDs = [];
      for (var i = 0; i < dataBlob.futureWeather.length; i++) {
        row2IDs.push(''+i);
      }
      row2IDs.push('describe');
      row2IDs.push('detail');
      rowIDs.push(row2IDs);
      this.setState({
        dataSource:this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs),
        allData:dataBlob,
      })
    }
    Utilies.queryHour('', (data)=>{
      dataBlob.hourDetail = data;
      reloadIfNeed()
    })
    Utilies.queryFuture10Day('', (data)=>{
      var dayList = data.simpleforecast.forecastday;
      var today = dayList[0];
      dayList.splice(0, 1);
      dataBlob.futureWeather = dayList;
      dataBlob.overview = today;
      reloadIfNeed()
    })
    Utilies.queryToday('',(data)=>{


    })
    Utilies.appleAPI.queryWeather('', (data)=>{
      console.warn(data.toJSONString());
    })
  }
  renderRow(rowData, sectionID, rowID, highlightRow) {
    if (rowID == 'overview') {
      return (<TodayOverviewCell weatherData={rowData}/>)
    }
    if (rowID == 'describe') {
      return (<WeatherDescribeCell />)
    }
    if (rowID == 'detail') {
      return (<WeatherDetailCell />)
    }
    return (<FutureWeatherCell weatherData={rowData} />)
  }
  renderSectionHeader(sectionData,sectionID) {
    if (sectionID == 'hidden') {
      return (<View style={{height:0}}></View>)
    }
    return (<TodayDetailHeader detailList={sectionData}/>)
  }
  toCityList() {
    this.props.navigator.push({
      component: CityListPage,
      type: 'Bottom'
    })
  }
  onScroll(event) {
    var opacity = event.nativeEvent.contentOffset.y / Utilies.tempCellHeight;
    if (opacity <= 1) {
      var ratio = 1 - opacity ;
      if (ratio > 1) {
        ratio = 1;
      }
      this.setState({
        headerTopRatio: ratio
      })
    }
  }
}

class Main extends Component {
  render() {
    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{component: MainPage}}
        configureScene={this.configureScene}
        renderScene={this.renderScene}/>
    );
  }
  configureScene(route, routeStack) {
    if (route.type == 'Bottom') {
      return Navigator.SceneConfigs.FloatFromBottom; // 底部弹出
    }
    return Navigator.SceneConfigs.PushFromRight; // 右侧弹出
  }
  renderScene(route, navigator) {
   return <route.component navigator={navigator}  {...route.passProps} />;
 }

}

module.exports = Main;
