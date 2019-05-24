import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Share } from "react-native"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import SideMenu from 'react-native-side-menu'
import MenuDrawer from '../components/MenuDrawerComponent/MenuDrawerComponent'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'






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
    viewOpened = () => {
        return (
            <SideDrawerComponent
                handleHomeNavigation={() => {
                    this.props.navigation.navigate('Startup')

                }}
                handleExamsNavigation={() => this.props.navigation.navigate('MyExams')}
                handleAboutNavigation={() => this.props.navigation.navigate('About')}
                inviteFriends={this.inviteFriends}
                goToWhatsApp={this.goToWhatsApp}
                closeDrawer={() => this.drawer.closeDrawer()}
            />
        )
    }

    inviteFriends = async () => {
        await Share.share({
            message: "Share Faceyourbook App to your lovely friends | click this link to download http://www.faceyourbookapp.com"
        })
    }

    goToWhatsApp = () => {
        Linking.openURL(`https://chat.whatsapp.com/CBVGniVkviM5SjPknnDdgz`);
    }
    //end of slide drawer component


    render() {
        const { navigation } = this.props
        return (

            <View style={styles.container}>
                <DrawerLayout
                    ref={drawer => this.drawer = drawer}
                    drawerWidth={240}
                    drawerPosition={DrawerLayout.positions.Left}
                    drawerType='front'
                    drawerBackgroundColor="#ddd"
                    renderNavigationView={this.viewOpened}
                >
                    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.details}>
                        <MenuDrawer onClickDrawerOpener={() => this.drawer.openDrawer()} />
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
                        <ButtonComponent onPress={this.onShare} text={"SHARE"} />
                    </View>
                </DrawerLayout>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f7f7f7",
        flex: 1
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