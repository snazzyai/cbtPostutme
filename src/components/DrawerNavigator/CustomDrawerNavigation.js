import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native'
import { DrawerItems } from 'react-navigation'

const CustomDrawerNavigation = (props) => {
    render()
    {
        return (
            <SafeAreaView>
                <DrawerItems {...props} />
            </SafeAreaView>
        );
    }
}

export default CustomDrawerNavigation;