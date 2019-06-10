import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';


const ButtonComponent = ({ onPress, text, externalStyle, textStyle, isLoading, isDisabled, htmlView }) => {
    return (
        <TouchableOpacity disabled={isDisabled} style={[styles.paymentTouch, externalStyle]} onPress={onPress}>
            {isLoading ? <ActivityIndicator size="small" color="#00ff00" /> : <Text style={[styles.paymentText, textStyle]}>{text}{htmlView}</Text>}
        </TouchableOpacity >

    )
}

const styles = StyleSheet.create({
    paymentTouch: {
        backgroundColor: "#5FA046",
        // elevation: 1,
        width: "80%",
        borderRadius: 30,
        height: 45,
        alignItems: "center",
        marginTop: 30,
        paddingTop: 10

    },
    paymentText: {
        color: "#fff",
        fontSize: 18

    },
})

export default ButtonComponent