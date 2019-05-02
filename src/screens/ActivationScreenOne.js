import React, { Component } from 'react';
import { StyleSheet, View, Text, ToastAndroid } from 'react-native';
import ActivationScreenHeader from "../components/ActivationScreenHeader/ActivationScreenHeader"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import RadioGroup, { Radio } from "react-native-radio-input";




class ActivationScreenOne extends Component {
    state = {
        value: null,
        radio_props: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
            { label: 'I dont know', value: 2 }
        ]
    }


    getChecked = (value) => {
        this.setState({
            value: value
        })
    }

    handlePress = () => {
        const { value } = this.state
        if (this.state.value === null) {
            ToastAndroid.showWithGravity(
                'Please choose an option',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        else if (this.state.value === 0) {
            this.props.navigation.navigate('ActivationTwo')
        }
        else {
            this.props.navigation.navigate('Download')
        }
    }

    render() {
        const { navigation } = this.props
        const name = navigation.getParam('name')
        const id = navigation.getParam('id')
        return (
            <View>
                <ActivationScreenHeader processText={"Activation Process One"} />
                <View style={styles.question}>
                    <Text style={styles.textQuestion}>DO YOU HAVE AN AGENT FOR?</Text>
                    <View style={styles.radioView}>
                        <RadioGroup getChecked={this.getChecked}
                            RadioGroupStyle={{ flexDirection: "row", marginBottom: 20 }}
                            RadioStyle={{ padding: 20 }}
                            labelStyle={{ fontSize: 20, fontWeight: "bold" }}
                            IconStyle={{ backgroundColor: "#fff", width: 30, height: 30 }}
                            coreStyle={{ color: "#5FA046", fontSize: 20 }}
                        >
                            <Radio iconName={"lens"} label={"Yes"} value={0} />
                            <Radio iconName={"lens"} label={"No"} value={1} />
                            <Radio iconName={"lens"} label={"I dont know"} value={2} />
                        </RadioGroup>
                        <ButtonComponent text={"NEXT"} onPress={this.handlePress} />
                    </View>
                </View>
            </View>

        );
    }
}


const styles = StyleSheet.create({
    question: {
        marginTop: "20%"
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
        backgroundColor: "#fafafa",
        paddingTop: 50,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ActivationScreenOne;