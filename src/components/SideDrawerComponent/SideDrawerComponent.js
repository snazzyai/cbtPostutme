import React, { Component } from 'react';
import { TouchableOpacity, View, Text, SafeAreaView, ImageBackground, StyleSheet, Share, Linking } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons"





class SideDrawerComponent extends Component {

    state = {

    }

    inviteFriends = async () => {
        await Share.share({
            message: "Share Faceyourbook App to your lovely friends | click this link to download http://www.faceyourbookapp.com"
        })
    }

    goToWhatsApp = () => {
        Linking.openURL(`https://chat.whatsapp.com/CBVGniVkviM5SjPknnDdgz`);
    }



    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
                <View style={{ height: 240 }}>

                    <ImageBackground style={{ height: 200, width: 240 }} source={require("../../../assets/images/background.jpg")}>
                        <TouchableOpacity style={{ paddingLeft: 200, paddingTop: 10 }} onPress={this.props.onClickDrawerCloser}>
                            <Icon name="ios-close" size={50} color="#fff" />
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.drawerView}>
                        <TouchableOpacity style={styles.touchable} onPress={this.props.handleHomeNavigation} >
                            <Text style={styles.text}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchable} onPress={this.inviteFriends} >
                            <Text style={styles.text}>Invite Friends</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchable} onPress={this.goToWhatsApp} >
                            <Text style={styles.text}>WhatsApp Group</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchable} onPress={this.props.handleExamsNavigation} >
                            <Text style={styles.text}>Exams</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.touchable} onPress={this.props.handleAboutNavigation} >
                            <Text style={styles.text}>About</Text>
                        </TouchableOpacity>
                    </View>

                    {  /*<TouchableOpacity onPress={async () => {
                    await AsyncStorage.removeItem("userData")
                    this.props.navigation.navigate("Startup")
                }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000", paddingLeft: 15 }}>Logout</Text>
            </TouchableOpacity> */}
                </View>
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    drawerView: {
        paddingTop: 20,
        paddingLeft: 20
    },
    touchable: {
        marginBottom: 20
    },
    text: {
        fontSize: 20,
        color: "#000"
    }
})

export default SideDrawerComponent