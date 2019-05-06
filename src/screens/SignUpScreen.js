import React, { Component } from 'react'
import Signup from '../components/SignupComponent/SignupComponent'
import { Postdata } from '../../src/services/Postdata'

export default class SignUp extends Component {
    state = {
        email: "",
        name: "",
        password: "",
        phone: "",
        device_id: ""
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