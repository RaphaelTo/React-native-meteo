import React, {Component} from 'react';
import {View, StyleSheet,  ScrollView, Animated} from 'react-native'
import { getLocalisation } from '../method/getLocalisation'
import { ListItem, Text } from 'react-native-elements'


export default class ListStationVelib extends Component  {
    
    state = {
        myPosition : {},
        stations: [],
        slideLeft: new Animated.Value(0)
    }

    
    componentDidMount = async () => {
        const getVelib = await this.getVelibApi()
        let {records} = getVelib
        records.map(station => (
            this.setState({
                myPosition: {...this.state.myPosition},
                stations:[...this.state.stations, {
                    name: station.fields.station_name,
                    dispobike: station.fields.nbbike,
                    dispoebike: station.fields.nbebike,
                    dispodock: station.fields.nbfreedock,
                    latitude: station.fields.geo[0],
                    longitude: station.fields.geo[1],
                }]
            })
        ))
        Animated.timing(this.state.slideLeft, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
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
    
    
    render() {
        const {stations} = this.state
        const {navigate} = this.props.navigation

        const showStation= stations.map((station, i) => (
                <ListItem
                    key={i}
                    title={station.name}
                    titleStyle={{color:'white', fontWeight: 'bold'}}
                    subtitle={`🚲 Nombre de vélib dispo (electrique + mecanique) ${parseInt(station.dispobike) + parseInt(station.dispoebike)} \n 🔌 Nombre de dock dispo ${station.dispodock}`}
                    subtitleStyle={{ color: 'white' }}
                    containerStyle={{backgroundColor: '#2a2a2b'}}
                    bottomDivider
                    onPress={() => navigate('MyStation', {
                        nameStation: station
                    })}
                />
        ))

        return (
                    <View style={styles.menu}>
                        <View>
                            <Text h3 style={{textAlign:'center', color:'white'}}>Liste de vélib</Text>
                        </View>
                        <ScrollView>
                            <Animated.View
                                style={{
                                    transform: [
                                      {
                                        translateY: this.state.slideLeft.interpolate({
                                          inputRange: [0, 1],
                                          outputRange: [600, 0]
                                        })
                                      }
                                    ],
                                    flex: 1,
                                    backgroundColor: "#347a2a",
                                    justifyContent: "center"
                                }}
                            >
                                { showStation ? showStation : null }
                            </Animated.View>
                        </ScrollView>
                    </View>
        )
    }
} 

const styles = StyleSheet.create({
    menu: {
      flex: 1,
      backgroundColor: '#2a2a2b',
    },
  });
  