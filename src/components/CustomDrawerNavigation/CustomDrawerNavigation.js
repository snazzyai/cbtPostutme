import React from 'react';
import { View, SafeAreaView } from 'react-native'
import { DrawerItems } from 'react-navigation'


const CustomDrawerNavigation = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 170 }}>
                <Image style={{ height: 170, width: 280 }} source={require("../../../assets/images/background.jpg")} />
            </View>
            <View style={{ flex: 1, backgroundColor: "#fafafa" }}>
                <DrawerItems {...props} />
            </View>
        </SafeAreaView>
    );
}
export default CustomDrawerNavigation;