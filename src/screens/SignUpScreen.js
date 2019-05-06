import React, { Component } from 'react'
import Signup from '../components/SignupComponent/SignupComponent'
import { Postdata } from '../../src/services/Postdata'
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-community/async-storage';



export default class SignUp extends Component {
    state = {
        email: "",
        name: "",
        password: "",
        phone: "",
        device_id: ""
    }


    componentDidMount() {
        const buildId = DeviceInfo.getDeviceId()
        this.setState({ device_id: buildId })
    }


    handleEmail = (value) => {

        this.setState({
            email: value
        })

    }
    handleName = (value) => {
        this.setState({
            name: value
        })

    }
    handlePhone = (value) => {

        this.setState({
            phone: value
        })

    }
    handlePassword = (value) => {

        this.setState({
            password: value
        })

    }




    handleSignup = () => {
        const deviceId = this.state.device_id
        const email = this.state.email
        const phone = this.state.phone
        const pass = this.state.password
        const name = this.state.name

        Postdata('register', {
            email: email,
            name: name,
            password: pass,
            phone: phone,
            device_id: deviceId
        })
            .then(result => {
                if (result.status === "success") {
                    alert("successfully registered")
                    this.props.navigation.navigate('Startup')
                }
                else {
                    for (let i in result) {
                        alert(result[i][0])
                    }
                }
            }).catch((err) => console.warn(err))
    }

    loginNavigation = () => {
        this.props.navigation.navigate("Startup")
    }

    render() {
        return (
            <Signup
                handleEmail={this.handleEmail}
                handleName={this.handleName}
                handlePhone={this.handlePhone}
                handlePassword={this.handlePassword}
                handleSignup={this.handleSignup}
                handleLoginNavigation={this.loginNavigation}

            />
        )
    }
}