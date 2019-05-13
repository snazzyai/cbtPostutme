import React, { Component } from 'react';
import { View, SafeAreaView, Image, TouchableOpacity, Text } from 'react-native'
import { DrawerItems } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'



class CustomDrawerNavigation extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ height: 170 }}>
                    <Image style={{ height: 170, width: 280 }} source={require("../../../assets/images/background.jpg")} />
                </View>
                <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
                    <DrawerItems {...this.props} />
                    <TouchableOpacity onPress={async () => {
                        await AsyncStorage.removeItem("userData")

                        this.props.navigation.navigate("Startup")
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000", paddingLeft: 15 }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

}


export default CustomDrawerNavigation;