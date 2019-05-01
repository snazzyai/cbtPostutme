import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Share } from "react-native"



class Payment extends Component {
    state = {
        visible: false
    }
    onShare = async () => {
        const result = Share.share({
            title: "Download FaceYourBook App from the playstore",
            message: 'http://www.simbibot.com',
        });
    }
    render() {
        const { navigation } = this.props
        const name = navigation.getParam('name')
        const id = navigation.getParam('id', "some id")

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.details}>
                    <View style={styles.paymentImageView}>
                        <Image style={styles.image} source={require("../../assets/images/wallet.png")} />
                    </View>
                    <Text style={styles.detailsText}>CHOOSE A PAYMENT METHOD</Text>
                </ImageBackground>
                <View style={styles.paymentMethodView}>
                    <Text style={styles.paymentMethodText} >{name}</Text>
                    <TouchableOpacity style={styles.paymentTouch} onPress={() => this.props.navigation.navigate("DrawerNavigation")}>
                        <Text style={styles.paymentText}>PAY ONLINE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('BankTransfer')} style={styles.paymentTouch}>
                        <Text style={styles.paymentText}>PAY WITH BANK</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.paymentMethodView}>
                    <Text style={styles.paymentMethodText}>SHARE TO OTHER PEOPLE</Text>
                    <TouchableOpacity style={styles.paymentTouch} onPress={this.onShare}>
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
        height: 260,
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
        fontWeight: "bold",
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: "center"
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

    },
    headerName: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    }
})

export default Payment;