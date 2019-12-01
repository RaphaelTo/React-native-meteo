import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types'
import MapView, { Marker} from 'react-native-maps'

export default class StationVelib extends Component {
    state = {
        geo: {
            latitude: '',
            longitude: ''
        },
        stationName: '',
        stationCode: '',
    }

    render() {
        const {position, station} = this.props

        return (
            <View style={styles.menu}>
                <MapView
                    initialRegion={{
                        latitude: position.latitude,
                        longitude: position.longitude,
                        latitudeDelta: 0.00321,
                        longitudeDelta: 0.0031,
                    }}
                    style={styles.map}
                    showsUserLocation={true}
                >
                 {station.map(marker => (
                     <Marker
                        coordinate={{latitude:marker.latitude, longitude:marker.longitude}}
                        title={marker.name}
                        description="C'est moi"
                    />
                 ))}   
                    
                </MapView>
            </View>
        )
    }
}

StationVelib.propTypes = {
    station: PropTypes.array,
    position: PropTypes.object
}


const styles = StyleSheet.create({
    map: {
        width: 410,
        height: 645,
    }
});