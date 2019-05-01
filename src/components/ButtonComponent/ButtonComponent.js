import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonComponent = ({ onPress, text }) => {
    return (
        <TouchableOpacity style={styles.paymentTouch} onPress={onPress}>
            <Text style={styles.paymentText}>{text}</Text>
        </TouchableOpacity >

    )


}

const styles = StyleSheet.create({
    paymentTouch: {
        backgroundColor: "#5FA046",
        elevation: 1,
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