import React from 'react';
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import { DrawerItems } from 'react-navigation'

const CustomDrawerNavigation = (props) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ backgroundColor: "green", flex: 1 }}>
                <DrawerItems {...props} />
            </View>

        </SafeAreaView>
    );
}

export default CustomDrawerNavigation;