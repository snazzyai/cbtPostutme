import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import ActivationScreenHeader from "../components/ActivationScreenHeader/ActivationScreenHeader"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'



class ActivationScreenTwo extends Component {
    state = {
        value: null
    }

    handlePress = () => {

    }

    render() {
        return (
            <View>
                <ActivationScreenHeader processText={"Activation Process Two"} />
                <View style={styles.question}>
                    <Text style={styles.textQuestion}>ENTER AGENTS NAME HERE</Text>
                    <TextInput placeholder="Enter Name here" style={styles.nameInput} />
                </View>
                <View style={styles.radioView}>
                    <ButtonComponent text={"NEXT"} onPress={this.handlePress} />
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    nameInput: {
        borderColor: "#000",
        elevation: 1,
        borderWidth: 2,
        borderRadius: 20,
        width: "80%",
        marginTop: "20%",
        fontSize: 18

    },
    question: {
        marginTop: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    textQuestion: {
        fontSize: 25,
        textAlign: "center",
        fontWeight: "bold"

    },
    radio: {
        padding: 20
    },
    radioView: {
        paddingTop: 50,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ActivationScreenTwo;