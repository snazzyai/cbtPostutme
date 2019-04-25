import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';





class Signin extends Component {
    state = {}

    render() {
        const window = Dimensions.get('window')
        return (
            <View style={styles.container} >
                <View style={styles.logo}>
                    <Text style={styles.logoText}>POST UTME APP</Text>
                </View>
                <View style={styles.inputFieldView}>
                    <TextInput style={styles.inputField} placeholder="Email" underlineColorAndroid="#fff" placeholderTextColor="#fff" />

                    <TextInput style={styles.inputField} placeholder="Pin" underlineColorAndroid="#fff" placeholderTextColor="#fff" />

                    <TextInput style={styles.inputField} placeholder="Referral name" underlineColorAndroid="#fff" placeholderTextColor="#fff" />
                </View>
                <View>
                    <Text>*if you dont have a referral name, type FYB</Text>
                </View>
                <View style={styles.clickable}>
                    <TouchableOpacity style={styles.clickableView}>
                        <Text>SIGN IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.clickableView}>
                        <Text>CLICK HERE TO BUY PIN</Text>
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
        marginTop: 50,
        alignItems: "center"
    },
    logoText: {
        fontSize: 30,
        color: "#ffffff"
    },
    inputFieldView: {
        marginTop: 50,
        alignItems: "center"

    },
    inputField: {
        width: "95%"
    },
    clickable: {

    }

})

export default Signin;
