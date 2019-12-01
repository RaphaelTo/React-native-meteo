import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default MyStation = ({navigation}) => {
    const nameStation = navigation.getParam('nameStation')
    
    const geo = {
        latitude: nameStation.latitude,
        longitude: nameStation.longitude
    }
    
    console.log(geo)
    return(
        <View style={{backgroundColor:'#2a2a2b'}}>
            <MapView
                initialRegion={{
                    latitude: nameStation.latitude,
                    longitude: nameStation.longitude,
                    latitudeDelta: 0.00321,
                    longitudeDelta: 0.0031
                }}
                style= {styles.map}
            >
            <Marker
                coordinate={geo}
                title={nameStation.name}
                description="C'est moi"
            />
            </MapView>
            <View style={styles.text}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 25, marginBottom: 10 }}>Information: </Text>
                <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}> 🚶🏻 Latitude: </Text>{nameStation.latitude}</Text>
                <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}> 🏃 Longitude: </Text>{nameStation.longitude}</Text>
                <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}> 🚌 Nom de la station: </Text> {nameStation.name}</Text>
                <Text style={{ color: 'white' }}><Text style={{ fontWeight: 'bold' }}> 🚴🏻‍♂️ Nombre de vélo dispo : </Text> {parseInt(nameStation.dispobike) + parseInt(nameStation.dispoebike)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        textAlign: "left",
        marginLeft: 10
    },
    map: {
        width: 410,
        height: 300,
        marginBottom: 10
    }
});