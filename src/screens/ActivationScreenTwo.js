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
                    <TextInput placeholder="Enter Name here" onChangeText={(value) => this.setState({ value: value })} style={styles.nameInput} underlineColorAndroid="#000" />
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
        marginTop: 25,
        fontSize: 20,
        width: "80%"

    },
    question: {
        marginTop: "10%",
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
        paddingTop: "30%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ActivationScreenTwo;