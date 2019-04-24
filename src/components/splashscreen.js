import React from 'react';
import { View, Image, StyleSheet } from 'react-native'

const splashscreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../../assets/images/faceyourbook.jpg')} />
            </View>
        </View>
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

export default splashscreen;