import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import Splashscreen from '../components/Splashscreen/Splashscreen'
import Signin from '../components/Signin/Signin'

// import SplashScreen from 'react-native-splash-screen'


class Startup extends Component {
    state = {
        isLoading: true,
        displayLogin: false,
        isLoggedIn: false
    }


    awaitStartup = async () => {
        return new Promise(resolve => {
            setTimeout(() => resolve('resolve'), 500)
        })
    }

    async componentDidMount() {
        data = await this.awaitStartup()
        if (data !== null) {
            this.setState({
                isLoading: !this.state.isLoading,
                displayLogin: true
            })

        }
    }

    handleSignin = () => {
        this.props.navigation.navigate("Main" )
    }

    handleSignin = async () => {
        this.props.navigation.navigate("Main")
    }




    render() {
        if (!this.state.displayLogin) {
            return <Splashscreen />
        }
        else {
            return (
                <Signin login={this.handleSignin} />
            )
        }

    }
}

export default Startup;
