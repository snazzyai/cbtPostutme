import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ActivationScreenHeader from "../components/ActivationScreenHeader/ActivationScreenHeader"
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'



class ActivationScreenOne extends Component {
    state = {
        value: 0,
        radio_props: [
            { label: 'Yes', value: 0 },
            { label: 'No', value: 1 },
            { label: 'I dont know', value: 2 }
        ]
    }

    handlePress = () => {
        const { value } = this.state
        return value == 0 ? this.props.navigation.navigate('ActivationTwo') : this.props.navigation.navigate('Download')
    }

    render() {
        return (
            <View>
                <ActivationScreenHeader processText={"Activation Process One"} />
                <View style={styles.question}>
                    <Text style={styles.textQuestion}>DO YOU HAVE AN AGENT?</Text>
                    <View style={styles.radioView}>
                        <RadioForm
                            radio_props={this.state.radio_props}
                            initial={0}
                            onPress={(value) => { this.setState({ value: value }) }}
                            buttonColor={'green'}
                        />
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
        paddingTop: 50,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default ActivationScreenOne;