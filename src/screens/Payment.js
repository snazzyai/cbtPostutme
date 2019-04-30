import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from "react-native"


class Payment extends Component {
    state = {}
    render() {
        const { navigation } = this.props
        const id = navigation.getParam('id')
        const type = navigation.getParam('type')

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.details}>
                    <View style={styles.paymentImageView}>
                        <Image style={styles.image} source={require("../../assets/images/wallet.png")} />
                    </View>
                    <Text style={styles.detailsText}>CHOOSE A PAYMENT METHOD</Text>
                </ImageBackground>
                <View style={styles.paymentMethodView}>
                    <Text style={styles.paymentMethodText} >PAYMENT METHODS</Text>
                    <TouchableOpacity style={styles.paymentTouch}>
                        <Text style={styles.paymentText}>PAY ONLINE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BankTransfer')} style={styles.paymentTouch}>
                        <Text style={styles.paymentText}>PAY WITH BANK</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.paymentMethodView}>
                    <Text style={styles.paymentMethodText}>SHARE TO OTHER PEOPLE</Text>
                    <TouchableOpacity style={styles.paymentTouch}>
                        <Text style={styles.paymentText}>SHARE</Text>
                    </TouchableOpacity>
                </View>
            </View>


        );
    }
}
const styles = StyleSheet.create({
    container: {

    },
    details: {
        alignItems: "center",
        height: 250,
        paddingTop: 30,
        backgroundColor: "#fafafa",
    },
    detailsText: {
        fontSize: 20,
        padding: 20,
        color: "#fff",
        fontWeight: "bold"

    },

    image: {
        height: 150,
        width: 150,
        borderRadius: 50
    },
    paymentMethodText: {
        color: "#000",
        fontSize: 18,
        fontFamily: 'Arial',
        fontWeight: "bold"
    },
    paymentMethodView: {
        alignItems: "center",
        marginTop: "5%",
        paddingTop: 20
    },
    paymentTouch: {
        backgroundColor: "#5FA046",
        elevation: 1,
        width: "80%",
        borderRadius: 30,
        height: 45,
        alignItems: "center",
        marginTop: 30,
        paddingTop: 10

    },
    paymentText: {
        color: "#fff",
        fontSize: 18

    }
})

export default Payment;