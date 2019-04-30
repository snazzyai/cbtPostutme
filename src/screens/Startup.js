import React, { Component } from 'react';
import Splashscreen from '../components/Splashscreen/Splashscreen'
import Signin from '../components/Signin/Signin'
import AsyncStorage from '@react-native-community/async-storage'


// import SplashScreen from 'react-native-splash-screen'


class Startup extends Component {
    state = {
        isLoading: true,
        displayLogin: false,
        hasLoggedIn: false,
        name: "",
        email: "",
        phone: "",
    }

    setUserData = async () => {
        try {
            await AsyncStorage.setItem('userEmail', this.state.email)
        }
        catch (e) {
            console.log(e)
        }

    }


    getUserData = async () => {
        try {
            await AsyncStorage.getItem('userEmail')
        }
        catch (e) {
            console.log(e)
        }
    }

    awaitStartup = async () => {
        return new Promise(resolve => {
            setTimeout(() => resolve("resolve", 300))
        })
    }

    async componentDidMount() {
        const userId = await AsyncStorage.getItem('userEmail')
        const data = await this.awaitStartup()
        if (data !== null && userId === null)
            this.setState({
                displayLogin: true
            })
        else if (data !== null && userId !== null) {
            this.props.navigation.navigate("Main")
            console.log(userId)
        }

    }
    handleEmail = (value) => {
        this.setState({
            email: value
        })
    }
    handlePhone = (value) => {
        this.setState({
            phone: value
        })
    }
    handleName = (value) => {
        this.setState({
            name: value
        })
    }



    handleSignin = async () => {
        await this.setUserData()
        this.setState({
            hasLoggedIn: true
        })
        this.props.navigation.navigate("Main")
    }




    render() {
        if (!this.state.displayLogin) {
            return <Splashscreen />
        }
        else {
            return (
                <Signin email={this.state.email} handleEmail={this.handleEmail} handleName={this.handleName} handlePhone={this.handlePhone} login={this.handleSignin} />
            )
        }

    }
}

export default Startup
