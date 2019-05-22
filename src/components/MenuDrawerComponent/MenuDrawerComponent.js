import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

const MenuDrawer = ({ onClickDrawerOpener }) => {
    return (
        <View style={styles.iconView}>
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