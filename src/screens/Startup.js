import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import SplashScreen from 'react-native-splash-screen'


class Startup extends Component {
    state = {

    }

    componenentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.show();
    }

}

render() {
    return (
        <View>
            <Text>Startpage</Text>
        </View>
    );
}
}

export default Startup;
