import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Picker, StyleSheet } from 'react-native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'




class Questions extends Component {

    subjectId = this.props.navigation.getParam('subjectId')
    name = this.props.navigation.getParam('name')


    state = {
        questions: []

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


    render() {

        return (
            <DrawerLayout
                ref={drawer => this.drawer = drawer}
                drawerWidth={240}
                drawerPosition={DrawerLayout.positions.Left}
                drawerType='front'
                drawerBackgroundColor="#ddd"
                renderNavigationView={this.viewOpened}
            >
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.textSelect}>Questions for id {this.subjectId}</Text>
                    </ScrollView>
                </View >
            </DrawerLayout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    textSelect: { fontSize: 20, fontWeight: "bold", textAlign: "center", },
    picker: { height: 40, width: 300, backgroundColor: "#5FA046", marginTop: 30, color: "#fff" },
    iconView: {
        position: "relative",
        bottom: 35,
        left: 265


    }


})
export default Questions;