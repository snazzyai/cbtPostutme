import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native'



const ActivationScreenHeader = ({ processText, myStyle }) => {
    return (
        <ImageBackground source={require("../../../assets/images/background.jpg")} style={[styles.header, myStyle]}>
            <Text style={styles.headerText} > {processText}</Text>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    header: {
        height: 200,
        paddingTop: "25%"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#fff",
        textAlign: "center"

    }
})
export default ActivationScreenHeader