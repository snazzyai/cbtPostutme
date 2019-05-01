import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native'



const ActivationScreenHeader = ({ processNumber }) => {
    return (
        <ImageBackground style={styles.header}>
            <Text style={styles.headerText}>Activation Process {processNumber}</Text>
        </ImageBackground>
    )
}
const style = StyleSheet.create({
    header: {
        height: 200
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#fff",
        textAlign: "center"
    }
})
export default ActivationScreenHeader