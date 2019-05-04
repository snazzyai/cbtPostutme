import React, { Component } from 'react';
import { StyleSheet, View, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import ActivationScreenHeader from "../components/ActivationScreenHeader/ActivationScreenHeader"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import Icon from "react-native-vector-icons/Ionicons"






class ActivationScreenOne extends Component {

    name = this.props.navigation.getParam('name')
    id = this.props.navigation.getParam('id')


    state = {
        radioBtnsData: ['Yes', 'No', 'I dont know'],
        checked: 0
    }



    handlePress = () => {
        const { value } = this.state
        if (this.state.checked === null) {
            ToastAndroid.showWithGravity(
                'Please choose an option',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        else if (this.state.checked === 0) {
            this.props.navigation.navigate('ActivationTwo', {
                id: this.id,
                name: this.name
            })
        }
        else {
            this.props.navigation.navigate('Download', {
                id: this.id,
                name: this.name
            })
        }
    }

    radioClick(id) {
        this.setState({
            value: id
        })
    }

    render() {

        return (
            <View>
                <ActivationScreenHeader processText={"Activation Process One"} />
                <View style={styles.question}>
                    <Text style={styles.textQuestion}>DO YOU HAVE AN AGENT FOR?</Text>
                    <View style={styles.radioView}>
                        {this.state.radioBtnsData.map((data, key) => {
                            return (
                                <View key={key}>
                                    {this.state.checked == key ?
                                        <TouchableOpacity style={styles.btn}>
                                            <Icon color="green" size={30} name="md-radio-button-on" />
                                            <Text style={{ fontSize: 20, paddingRight: 20, paddingLeft: 5 }}>{data}</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => { this.setState({ checked: key }) }} style={styles.btn}>
                                            <Icon color="green" size={30} name="md-radio-button-off" />
                                            <Text style={{ fontSize: 20, paddingRight: 25, paddingLeft: 5 }}>{data}</Text>
                                        </TouchableOpacity>
                                    }
                                </View>
                            )
                        })}
                    </View>
                    <ButtonComponent text={'NEXT'} onPress={this.handlePress} />
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    question: {
        marginTop: "20%",
        alignItems: "center"
    },
    textQuestion: {
        fontSize: 25,
        fontWeight: "bold",
    },
    radio: {
        padding: 20
    },
    radioView: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingTop: 50,
        paddingBottom: 30,
        paddingLeft: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    btn: {
        flexDirection: 'row'
    }
})

export default ActivationScreenOne;