import React, { Component } from 'react';
import Splashscreen from '../components/Splashscreen/Splashscreen'
import Signin from '../components/SigninComponent/SigninComponent'
import AsyncStorage from '@react-native-community/async-storage'


// import SplashScreen from 'react-native-splash-screen'


class Startup extends Component {
    state = {
        displayLogin: false,
        email: "",
        password: "",
        deviceId: "",

    }

    awaitStartup = async () => {
        const Resolved = new Promise(resolve => setTimeout(() => resolve("resolve"), 300))
        return Resolved
    }


    async componentDidMount() {
        const data = await this.awaitStartup()
        if (data !== null)
            this.setState({
                displayLogin: true
            })
    }


    handleEmail = (value) => {
        this.setState({
            email: value
        })
    }
    handlePassword = (value) => {
        this.setState({
            password: value
        })
    }




    handleSignin = () => {
        this.props.navigation.navigate("Signup")
    }

    handleSignupNavigation = () => {
        this.props.navigation.navigate("Signup")
    }


    render() {
        if (!this.state.displayLogin) {
            return <Splashscreen />
        }
        else {
            return (
                <Signin
                    handleEmail={this.handleEmail}
                    handlePassword={this.handlePassword}
                    login={this.handleSignin}
                    navigateSignup={this.handleSignupNavigation}
                />

            )
        }

    }
}

export default Startup
