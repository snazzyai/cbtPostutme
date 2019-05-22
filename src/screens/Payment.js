import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Share } from "react-native"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import SideMenu from 'react-native-side-menu'
import MenuDrawer from '../components/MenuDrawerComponent/MenuDrawerComponent'





class Payment extends Component {
    name = this.props.navigation.getParam('name')
    id = this.props.navigation.getParam('id')
    state = {
        visible: false,
        openBar: false,
    }
    onShare = async () => {
        console.log("working")
        const result = await Share.share({
            title: "Download FaceYourBook App from the playstore",
            message: 'http://www.simbibot.com',
        });
    }
    //slide drawer component
    onClickDrawerOpener = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                openBar: true
            }

        })
    }
    onClickDrawerCloser = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                openBar: false
            }

        })
    }
    //end of slide drawer components


    render() {
        const { navigation } = this.props
        const menu = <SideDrawerComponent
            handleHomeNavigation={() => this.props.navigation.navigate('PastQuestions')}
            handleExamsNavigation={() => this.props.navigation.navigate('MyExams')}
            handleAboutNavigation={() => this.props.navigation.navigate('About')}
            onClickDrawerCloser={this.onClickDrawerCloser}
        />
        return (
            <SideMenu isOpen={this.state.openBar} menu={menu}>
                <View style={styles.container}>
                    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.details}>
                        <MenuDrawer onClickDrawerOpener={this.onClickDrawerOpener} />
                        <View style={styles.paymentImageView}>
                            <Image style={styles.image} source={require("../../assets/images/wallet.png")} />
                        </View>
                        <Text style={styles.detailsText}>CHOOSE A PAYMENT METHOD</Text>
                    </ImageBackground>
                    <View style={styles.paymentMethodView}>
                        <Text style={styles.paymentMethodText} >{this.name.toUpperCase()}</Text>
                        <ButtonComponent onPress={() => this.props.navigation.navigate('ActivationOne', {
                            id: this.id,
                            name: this.name
                        })} text={"PAY ONLINE"} />
                        <ButtonComponent onPress={() => this.props.navigation.navigate('BankTransfer')} text={"BANK TRANSFER"} />
                    </View>
                    <View style={styles.paymentMethodView}>
                        <Text style={styles.paymentMethodText}>SHARE TO OTHER PEOPLE</Text>
                        <TouchableOpacity style={styles.paymentTouch} onPress={this.onShare}>
                            <Text style={styles.paymentText}>SHARE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SideMenu>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f7f7f7"
    },
    details: {
        alignItems: "center",
        height: 260,
        paddingTop: 15,
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