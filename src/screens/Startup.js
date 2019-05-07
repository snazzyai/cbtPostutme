import React, { Component } from 'react';
import { ActivityIndicator, ToastAndroid } from 'react-native'
import Splashscreen from '../components/Splashscreen/Splashscreen'
import Signin from '../components/SigninComponent/SigninComponent'
import AsyncStorage from '@react-native-community/async-storage'
import { Postdata } from '../services/Postdata';
import DeviceInfo from 'react-native-device-info'



// import SplashScreen from 'react-native-splash-screen'

class Startup extends Component {
    state = {
        displayLogin: false,
        email: "",
        password: "",
        device_id: "",
        isLoading: false,
        disabled: false,
        error: [],
        showAlert: false
    }

    awaitStartup = async () => {
        const Resolved = new Promise(resolve => setTimeout(() => resolve("resolve"), 300))
        return Resolved
    }


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
        // const userData = await AsyncStorage.removeItem("userData")
        // FOR TESTING AUTHENTICATION
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




    handleSignin = () => {
        ToastAndroid.showWithGravity(
            'Verifying...',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        );
        Postdata('login', {
            email: this.state.email,
            password: this.state.password,
            device_id: this.state.device_id
        }).then(async result => {
            await this.setState({
                disabled: true
            })
            if (result.status === "success") {
                try {
                    const data = {
                        email: this.state.email,
                        device_id: this.state.device_id
                    }
                    await AsyncStorage.setItem('userData', JSON.stringify(data))
                    console.warn("successfully stored")
                }
                catch (e) {
                    console.warn(e)
                }

                this.props.navigation.navigate('Main')

            }
            else if (this.state.email === "" || this.state.password === "") {
                alert("Please input a value into the field")
                this.setState({
                    disabled: false,
                })
            }
            else if (result.email) {
                this.setState(prevState => {
                    const newError = prevState.error.concat(result.email)
                    return {
                        ...prevState,
                        disabled: false,
                        error: newError,
                        showAlert: true
                    }

                })
            }
            else if (result.status === "error") {
                alert(result.message)
            }
        }).catch(err => console.warn(err))

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
                    error={this.state.error[0]}
                    showAlert={this.state.showAlert}
                />
            )
        }

    }
}

export default Startup
