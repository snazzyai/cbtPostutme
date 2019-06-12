import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Linking } from 'react-native';
import ActivationScreenHeader from "../components/ActivationScreenHeader/ActivationScreenHeader"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'



class ActivationScreenTwo extends Component {

    name = this.props.navigation.getParam('name')
    id = this.props.navigation.getParam('id')

    state = {
        value: null
    }

    //slide drawer component
    drawer = null;


    viewOpened = () => {
        return (
            <SideDrawerComponent
                handleHomeNavigation={() => {
                    this.props.navigation.navigate('StartUp')

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

    handlePress = () => {
        //store agents name and check if an agent with that name exists 
        this.props.navigation.navigate('PaymentPage', {
            id: this.id,
            name: this.name
        })
    }


    render() {
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
                    <ActivationScreenHeader onClickDrawerOpen={() => this.drawer.openDrawer()} processText={"Activation Process Two"} />
                    <View style={styles.question}>
                        <Text style={styles.textQuestion}>ENTER AGENTS NAME HERE</Text>
                        <TextInput placeholder="Enter Name here" onChangeText={(value) => this.setState({ value: value })} style={styles.nameInput} underlineColorAndroid="#000" />
                    </View>
                    <View style={styles.radioView}>
                        <ButtonComponent text={"NEXT"} onPress={this.handlePress} />
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
    nameInput: {
        borderColor: "#000",
        marginTop: 25,
        fontSize: 20,
        width: "80%"

    },
    question: {
        marginTop: "10%",
        justifyContent: "center",
        alignItems: "center"
    },
    textQuestion: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold"

    },
    radio: {
        padding: 20
    },
    radioView: {
        paddingTop: "30%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ActivationScreenTwo;