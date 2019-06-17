import React, { Component } from 'react';
import { StyleSheet, View, Text, ToastAndroid, TouchableOpacity, Linking} from 'react-native';
import ActivationScreenHeader from "../components/ActivationScreenHeader/ActivationScreenHeader"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import Icon from "react-native-vector-icons/Ionicons"
import MenuDrawer from '../components/MenuDrawerComponent/MenuDrawerComponent'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'






class ActivationScreenOne extends Component {

    name = this.props.navigation.getParam('name')
    id = this.props.navigation.getParam('id')






    state = {
        radioBtnsData: ['Yes', 'No'],
        checked: 0
    }

    //slide drawer component
    drawer = null;


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



    handlePress = () => {

        const { value } = this.state
        if (this.state.checked === null) {
            ToastAndroid.showWithGravity(
                'Please choose an option',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        else if (this.state.checked === 0) {
            this.props.navigation.navigate('ActivationTwo', {
                name: this.name
            })
        }
        else {
            this.props.navigation.navigate('PaymentPage', {
                name: this.name
            })
        }
    }

    radioClick(id) {
        this.setState({
            value: id
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

                    <ActivationScreenHeader onClickDrawerOpen={() => this.drawer.openDrawer()} processText={"Activation Process One"} />

                    <View style={styles.question}>
                        <Text style={styles.textQuestion}>DO YOU HAVE AN AGENT?</Text>
                        <View style={styles.radioView}>
                            {this.state.radioBtnsData.map((data, key) => {
                                return (
                                    <View key={key}>
                                        {this.state.checked == key ?
                                            <TouchableOpacity style={styles.btn}>
                                                <Icon color="green" size={30} name="md-radio-button-on" />
                                                <Text style={{ fontSize: 20, paddingRight: 20, paddingLeft: 5 }}>{data}</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity onPress={() => { this.setState({ checked: key }) }} style={styles.btn}>
                                                <Icon color="green" size={30} name="md-radio-button-off" />
                                                <Text style={{ fontSize: 20, paddingRight: 20, paddingLeft: 5 }}>{data}</Text>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                )
                            })}
                        </View>
                        <ButtonComponent text={'NEXT'} onPress={this.handlePress} />
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
    question: {
        marginTop: "20%",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
    },
    textQuestion: {
        fontSize: 20,
        fontWeight: "bold",
    },
    // radio: {
    //     padding: 20
    // },
    radioView: {
        flexDirection: "column",
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingBottom: 30,
        // paddingLeft: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f7f7f7",
    },
    btn: {
        flexDirection: 'row',
        padding: 10,
        marginRight: 120
    },
})

export default ActivationScreenOne;