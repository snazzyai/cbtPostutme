import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';










class Signin extends Component {

    state = {
        email: "",
        phone: "",

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



    render() {

        return (
            <View style={styles.container} >
                <View style={styles.logo}>
                    <Text style={styles.logoText}>POST UTME APP</Text>
                </View>
                <View style={styles.inputFieldView}>
                    <TextInput onChangeText={this.handleName} style={styles.inputField} placeholder="Name" underlineColorAndroid="#fff" placeholderTextColor="#fff" />
                    <TextInput keyboardType="email-address" onChangeText={this.handleEmail} style={styles.inputField} placeholder="Email" underlineColorAndroid="#fff" placeholderTextColor="#fff" />
                    <TextInput keyboardType="phone-pad" onChangeText={this.handlePhone} style={styles.inputField} placeholder="Phone Number" underlineColorAndroid="#fff" placeholderTextColor="#fff" />
                </View>

                <View style={styles.clickableView}>
                    <TouchableOpacity onPress={this.props.login} style={styles.clickable}>
                        <Text style={styles.clickableText}>SIGN IN</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00BB27"
    },
    logo: {
        marginTop: hp("10%"),
        alignItems: "center"
    },
    logoText: {
        fontSize: 30,
        color: "#ffffff"
    },
    inputFieldView: {
        marginTop: hp("10%"),
        alignItems: "center"

    },
    inputField: {
        width: wp("95%"),
        height: hp('12%'),
        fontSize: 20
    },
    clickable: {
        marginTop: hp('10%')
    },
    referralView: {
        paddingLeft: wp("3%")
    },
    referralText: {
        fontSize: 18,
        color: "#ffffff",
    },
    clickableView: {
        marginTop: hp("5%"),
        alignItems: "center"

    },
    clickable: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: wp("95%"),
        height: hp('7%'),
        borderRadius: 20,
        paddingTop: 10

    },
    clickableText: {
        fontSize: 20
    }
})

export default Signin;
