import Geolocation from '@react-native-community/geolocation';
export const getLocalisation = () => {
    return new Promise(next => {
        Geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords
                next(position.coords)
            },
            err => {
                console.log(err)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
    })
}