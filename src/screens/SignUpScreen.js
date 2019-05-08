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
        phone: null,
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



    handleSignup = () => {

        this.setState({
            error: []
        })
        const { email, name, password, phone } = this.state
        const ConvertEmail = email.split("")
        const PhoneValidate = /^\d{11}$/;




        if (email === "" || name === "" || password === "" || phone === "") {
            alert("required fields not filled...")
            console.warn(typeof PhoneConvert)
        }
        else if (name.length < 6 || password.length < 6) {
            alert("Fields must have at least 6 characters...")
        }
        else if (!(phone.length === 11)) {
            alert("Phone Number length must be 11 numbers")
        }
        else if (typeof PhoneConvert === "NaN") {
            alert("Phone Number invalid...")

        }
        else if (!ConvertEmail.includes("@", ".com")) {
            alert("Email not a valid type...")
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
                            device_id: result.user.device_id
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

                        console.warn(this.state.error)
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