import React, {Fragment} from 'react';
import {View, StyleSheet, StatusBar, SafeAreaView} from 'react-native'

import { createAppContainer} from 'react-navigation' 
import { createBottomTabNavigator } from 'react-navigation-tabs' 
import { createStackNavigator } from 'react-navigation-stack'

import { Header } from 'react-native-elements'

import Exercice1 from './components/Exercice1'
import GetGeolocalisationScreen from './components/GetGeolocalisationScreen'
import ListStationVelib from './components/ListStationVelib'
import MyStation from './components/MyStation'

const tabNavigation = createBottomTabNavigator({
  ExerciceUn: {screen: Exercice1},
  Geo: {screen: GetGeolocalisationScreen},
  Liste: {screen: ListStationVelib}
})

const stackNavigator = createStackNavigator({
  Geo: {screen: tabNavigation},
  Liste: {screen: tabNavigation},
  ExerciceUn: {screen: tabNavigation},
  MyStation : {screen: MyStation}
})

const Navigation = createAppContainer(stackNavigator)

export default App = () => {
        return (
          <Fragment>
              <Header
                  centerComponent={{ text: 'Vélib APP', style: { color: 'white' } }}
                  containerStyle={{backgroundColor:'#2a2a2b'}}
                />
                <StatusBar backgroundColor="#2a2a2b" barStyle="light-content" />
              <Navigation/>
          </Fragment>
        )
} 

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#2a2a2b',
  }
});


