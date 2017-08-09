# react-native-weather

一个React-Native的练习，仿照iPhone的自待天气app写的

效果图如下

![预览图](./preview.gif)

接口抓了**iOS天气app**的和用[**wunderground**](https://www.wunderground.com)的,[**天气图标**](http://www.zcool.com.cn/work/ZMTc0ODI3MzY=.html)是从这里下载导出的

ios端习惯性用cocoapods管理的，所以需要依赖`pod install`

**运行**

```shell
// 1. node_modules
npm install
// 2.1 ios工程
cd ios
pod install
// 2.2 andorid
react-native run-android
// 3. 
npm start
// 4. 运行ios/android工程
```

*仿照但没有完全实现iPhone上的效果，还有就是接口部分难搞定， 城市搜索的是英文的...*