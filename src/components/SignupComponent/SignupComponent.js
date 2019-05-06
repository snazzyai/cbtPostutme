import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'




class Signup extends Component {

    render() {
        return (
            <ImageBackground source={require("../../../assets/images/signin.jpg")} style={styles.container} >
                <ScrollView style={styles.scrollView}>
                    <View style={styles.logo}>
                        <Image style={styles.imageLogo} source={require("../../../assets/images/logo.png")} />

                    </View>
                    <View style={styles.inputFieldView}>

                        <View style={styles.inputContainer}>
                            <TextInput onChangeText={this.props.handleName} style={styles.inputStyle} placeholder="Name" underlineColorAndroid="#fff" placeholderTextColor="#fff" />
                            <Icon style={styles.icon} name="ios-person" size={20} color="#fff" />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput keyboardType="email-address" onChangeText={this.props.handleEmail} style={styles.inputStyle} placeholder="Email" underlineColorAndroid="#fff" placeholderTextColor="#fff" />
                            <Icon style={styles.icon} name="md-mail" size={20} color="#fff" />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput keyboardType="phone-pad" onChangeText={this.props.handlePhone} style={styles.inputStyle} placeholder="Phone Number" underlineColorAndroid="#fff" placeholderTextColor="#fff" />
                            <Icon style={styles.icon} name="md-call" size={20} color="#fff" />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput secureTextEntry={true} onChangeText={this.props.handlePassword} style={styles.inputStyle} placeholder="Password" underlineColorAndroid="#fff" placeholderTextColor="#fff" />
                            <Icon style={styles.icon} name="md-lock" size={20} color="#fff" />
                        </View>
                    </View>
                    <View style={styles.clickableView}>
                        <TouchableOpacity onPress={this.props.handleSignup} style={styles.clickable}>
                            <Text style={styles.clickableText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.clickableView}>
                        <TouchableOpacity onPress={this.props.handleLoginNavigation} style={styles.clickable}>
                            <Text style={styles.clickableText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inputContainer: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingTop: 20
    },
    inputStyle: {
        width: "100%",
        alignItems: "center",
        paddingBottom: 15,
        height: 50,
        fontSize: 19,
        color: "#fff",

    },
    icon: {
        marginTop: 10,
        position: "relative",
        right: 25


    },
    logo: {
        marginTop: "10%",
        alignItems: "center"
    },
    logoText: {
        fontSize: 35,
        color: "#ffffff",

    },
    inputFieldView: {
        marginTop: "1%",
        alignItems: "center",


    },

    inputField: {
        width: "95%",
        height: 40,
        fontSize: 18,
        color: "#fff",
        margin: 10
    },
    clickable: {

    },
    referralView: {
        paddingLeft: "3%"
    },
    referralText: {
        fontSize: 18,
        color: "#ffffff",
    },
    clickableView: {
        marginTop: "5%",
        alignItems: "center",
    },
    clickable: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: "95%",
        height: 45,
        borderRadius: 25,
        paddingTop: 10,
        elevation: 2

    },
    clickableText: {
        fontSize: 20
    },
    putmeText: {
        fontSize: 25,
        fontFamily: '',
        color: "#fff",
        fontWeight: "bold"
    },
    scrollView: {
        marginBottom: 10
    }
})

export default Signup;
