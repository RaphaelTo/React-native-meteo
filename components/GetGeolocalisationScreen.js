import React, {Component ,Fragment} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {getLocalisation} from '../method/getLocalisation'
import StationVelib from './StationVelib'

export default class GetGeolocalisationScreen extends Component {
    
  state = {
    myPosition: {},
    station: []
  }
  
  componentDidMount = async() => {
    const getVelib = await this.getVelibApi()
    let {records} = getVelib
    
    records.map(station => (
      this.setState(
        { myPosition: {...this.state.myPosition}
          ,station:[...this.state.station, 
            {
              name: station.fields.station_name, 
              latitude: station.fields.geo[0], 
              longitude: station.fields.geo[1]
            }
          ]
        }
      )
    ))
  }
  
  getVelibApi = async () => {
    try{
      const position = await getLocalisation();
      this.setState({myPosition: {latitude: position.latitude, longitude: position.longitude}})
     
      const response = await fetch(`https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&facet=overflowactivation&facet=creditcard&facet=kioskstate&facet=station_state&geofilter.distance=${this.state.myPosition.latitude}%2C${this.state.myPosition.longitude}%2C2000`)
      const responseJson =response.json()
      
      return responseJson
    } catch (err){
      console.log(err)
    }
  }

  render(){
    const {station, myPosition} = this.state

    let stationVelib

    if(station != '' && myPosition != ''){
      stationVelib= <StationVelib 
              station={station}
              position={myPosition}
            />
    }else {
      stationVelib = null
    }

      return (
        <Fragment>
          <View style={styles.menu}>
            {stationVelib}
          </View>
        </Fragment>
        )
      }
  }

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    backgroundColor: '#2a2a2b',
  },
});

