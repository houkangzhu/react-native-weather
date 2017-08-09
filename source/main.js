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
import WeatherView from './weatherView'
import CityListPage from './cityList'

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList:null,
      selectIndex:0,
    };
  }
  componentWillMount() {
    this.reloadView(null);
  }

  reloadView(selectCity) {
    Utilies.readCityList((citys) => {
      var index = 0;
      if (selectCity != null) {
          for (var i = 0; i < citys.length; i++) {
            if (selectCity.name == citys[i].name) {
                index = i;
                break;
            }
          }
      }
      this.setState({
        cityList:citys,
        selectIndex:index,
      })
      this.refs.rootScroll.scrollTo({x: Utilies.dimensions.width * index, y: 0, animated: false})
    })
  }
  createWeatherViews() {
    var views = []
    var cityList = this.state.cityList;
    if (cityList == null ) {return views}
    for (var i = 0; i < cityList.length; i++) {
      views.push(
        <WeatherView city={cityList[i]} key={i}/>
      )
    }
    return views;
  }
  render() {
    return(
      <View style = {{flex:1, backgroundColor:Utilies.commonBgColor}}>
        <StatusBar barStyle="light-content"/>
        <BackgroundView />
      <ScrollView style={{flex:1}} ref={'rootScroll'}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
          onMomentumScrollEnd={(event)=>this.onMomentumScrollEnd(event)}>
          {this.createWeatherViews()}
        </ScrollView>
        <BottomToolBar onPressRight={()=>this.toCityList()}
         pageCount={this.state.cityList==null?0:this.state.cityList.length} selectIndex={this.state.selectIndex}/>
      </View>
    )
  }
  onMomentumScrollEnd(event) {
    var index = (event.nativeEvent.contentOffset.x/Utilies.dimensions.width);
    this.setState({
      selectIndex:index
    })
  }
  toCityList() {
    this.props.navigator.push({
      component: CityListPage,
      type: 'Bottom',
      passProps:{
        onChangeCity:(city)=>this.reloadView(city)
      }
    })
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
