import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Splashscreen from '../components/splashscreen'
import SplashScreen from 'react-native-splash-screen'


class Startup extends Component {
    state = {
        isLoading: true
    }
    awaitStartup = async () => {
        return new Promise(resolve => {
            setTimeout(() => resolve('dummyString'), 3000)
        })
    }

    async componentDidMount() {
        data = await this.awaitStartup()
        if (data !== null) {
            this.props.navigation.navigate('Signin')
        }
    }

    render() {
        return <Splashscreen />
    }
}

export default Startup
