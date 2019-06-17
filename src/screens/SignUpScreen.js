import React, { Component } from 'react'
import Signup from '../components/SignupComponent/SignupComponent'
import { Postdata } from '../../src/services/Postdata'
import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-community/async-storage';
import ValidationComponent from 'react-native-form-validator';




export default class SignUp extends ValidationComponent {
    state = {
        email: "",
        name: "",
        password: "",
        phone: "",
        device_id: "",
        error: [],
        errorEmail: "",
        errorName: "",
        errorPassword: "",
        errorPhone: "",
        disabled: false,
        showAlert: false,
        isLoading: false
    }

    //get device info on mounting
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

    //loops through errors and adds to respective state
    errorAdd = () => {
        this.state.error.map(err => {
            this.setState({
                errorName: err.name,
                errorPassword: err.password,
                errorEmail: err.email,
                errorPhone: err.phone,
                showAlert: true,
                disabled: false,
                isLoading: false,
            })
        })
    }


    //handles signup

    handleSignup = () => {
        this.validate({
            name: { minlength: 6, required: true },
            email: { minlength: 6, email: true, },
            phone: { minlength: 6, numbers: true, minlength: 11, required: true },
            password: { minlength: 6, required: true }
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
            Postdata('register', {
                email: this.state.email,
                name: this.state.name,
                password: this.state.pass,
                phone: this.state.phone,
                device_id: this.state.device_id
            })
                .then(async result => {

                    if (result.status === "success") {
                        alert("successfully registered")
                        const data = {
                            email: result.user.email,
                            device_id: result.user.device_id,
                            user_id: result.user.user_id,
                            phone: result.user.phone
                        }
                        await AsyncStorage.setItem("userData", JSON.stringify(data))
                        this.props.navigation.navigate('Menu')
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


                }).catch((err) => console.warn("there was an error"))
        }


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
                handleDisabled={this.state.disabled}
                errorName={this.state.errorName}
                errorEmail={this.state.errorEmail}
                errorPhone={this.state.errorPhone}
                errorPassword={this.state.errorPassword}
                showAlert={this.state.showAlert}
                isLoading={this.state.isLoading}
                error={this.state.error}
            />
        )
    }
}