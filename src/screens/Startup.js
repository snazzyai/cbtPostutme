import React, { Component } from 'react';
import Splashscreen from '../components/Splashscreen/Splashscreen'
import Signin from '../components/SigninComponent/SigninComponent'
import AsyncStorage from '@react-native-community/async-storage'
import { Postdata } from '../services/Postdata';
import DeviceInfo from 'react-native-device-info'
import ValidationComponent from 'react-native-form-validator';



// import SplashScreen from 'react-native-splash-screen'

class Startup extends ValidationComponent {
    state = {
        displayLogin: false,
        email: "",
        errorEmail: "",
        errorPassword: "",
        errorDeviceMessage: "",
        password: "",
        device_id: "",
        isLoading: false,
        disabled: false,
        error: [],
        showAlert: false,
        isLoading: false
    }

    awaitStartup = async () => {
        const Resolved = new Promise(resolve => setTimeout(() => resolve("resolve"), 300))
        return Resolved
    }

    errorAdd = () => {
        this.state.error.map(err => {
            this.setState({
                errorPassword: err.password,
                errorEmail: err.email,
                errorDeviceMessage: err.message,
                showAlert: true,
                disabled: false,
                isLoading: false,
            })
        })

    }
    //gets device info and stores in state
    async componentDidMount() {
        const deviceId = DeviceInfo.getDeviceId()
        this.setState(prevState => {
            return {
                ...prevState,
                device_id: deviceId,
                error: []
            }
        }
        )
        // await AsyncStorage.removeItem("userData")//for testing login logout
        const userData = await AsyncStorage.getItem("userData")
        if (userData !== null) {
            this.props.navigation.navigate('Main')
        }
        else {
            const data = await this.awaitStartup()
            if (data !== null)
                this.setState({
                    displayLogin: true
                })
        }
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
    //handles signin
    handleSignin = () => {
        this.validate({
            email: { minlength: 5, email: true, },
            password: { minlength: 5, required: true }
        });

        if (this.getErrorMessages()) {
            alert(this.getErrorMessages())
        }
        else {
            this.setState({
                disabled: true,
                showAlert: false,
                isLoading: true,
                error: []
            })
            Postdata('login', {
                email: this.state.email,
                password: this.state.password,
                device_id: this.state.device_id
            }).then(async result => {
                if (result.status === "success") {
                    const user_id = result.user.id
                    try {
                        const data = {
                            email: this.state.email,
                            device_id: this.state.device_id,
                            user_id: user_id
                        }
                        await AsyncStorage.setItem('userData', JSON.stringify(data))
                    }
                    catch (e) {
                        console.warn(e)
                    }

                    this.props.navigation.navigate('Main')

                }
                else if (result.message) {
                    alert(result.message)
                    this.setState({
                        disabled: false,
                        showAlert: false,
                        isLoading: false,
                    })
                    return false
                }

                else {
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            error: prevState.error.concat(result),
                        }
                    })
                    this.errorAdd()
                }
            }).catch(err => console.warn(err))
        }


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
                    handleDisabled={this.state.disabled}
                    error={this.state.error}
                    errorEmail={this.state.errorEmail}
                    errorPassword={this.state.errorPassword}
                    showAlert={this.state.showAlert}
                    isLoading={this.state.isLoading}
                />
            )
        }

    }
}

export default Startup
