import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const MenuDrawer = ({ onClickDrawerOpener, styling }) => {
    return (
        <View style={[styles.iconView, styling]}>
            <TouchableOpacity onPress={onClickDrawerOpener}>
                <Icon name="ios-menu" size={35} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    iconView: {
        paddingRight: "80%"
    }
})

export default MenuDrawer;