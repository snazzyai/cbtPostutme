import React from 'react';
import { View, Image, StyleSheet, ImageBackground } from 'react-native'

const Splashscreen = () => {
    return (
        <ImageBackground source={require('../../assets/images/launch_screen.jpg')} />
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6FD84A"
    },
    logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Splashscreen;