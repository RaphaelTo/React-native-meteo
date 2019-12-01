import React, { Fragment, Component } from 'react'
import { View, Text ,StyleSheet, Animated } from 'react-native'

export default class Exercice1 extends Component {
    
    state= {
        top: new Animated.Value(0),
        bottom: new Animated.Value(0)
    }
    
    componentDidMount() {
        Animated.parallel([
            Animated.timing(this.state.bottom, {
                toValue: 300,
                duration: 500
            }),
            Animated.timing(this.state.top, {
                toValue: 0,
                duration: 500
            }),
        ]).start()
    }
    
    render(){

        const {top, bottom} = this.state
        const styles = StyleSheet.create({
            firstview: {
                flex: 1,
                backgroundColor: '#fff',
                paddingBottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              },
              secondview: {
                  flex: 1,
                  backgroundColor: 'red',
                  paddingTop: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
        })

        return (
            <Fragment>
                <Animated.View>
                    <View style={styles.firstview}>
                        <Text>Slide 1</Text>
                    </View>
                    <View style={styles.secondview}>
                        <Text>Slide 2</Text>
                    </View>
                </Animated.View>
            </Fragment>
        )
    }
}

