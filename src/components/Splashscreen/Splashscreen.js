import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native'

const Splashscreen = () => {
    return (
        <ImageBackground style={styles.backgroundImage} source={require('../../../assets/images/splashscreen.png')} >

        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        height: "100%"
    }
})

export default Splashscreen;