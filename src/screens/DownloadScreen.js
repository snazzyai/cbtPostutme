import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-community/async-storage'
import ActivationScreenHeader from '../components/ActivationScreenHeader/ActivationScreenHeader'



class DownloadScreen extends Component {
    state = {
        displayQuestions: false,
    }


    awaitStartup = async () => {
        return new Promise(resolve => {
            setTimeout(() => resolve("resolve"), 3000)
        })
    }

    async componentDidMount() {
        const data = await this.awaitStartup()
        if (data !== null)
            this.setState({
                displayQuestions: true
            })

    }


    render() {
        if (!this.state.displayQuestions) {
            return (
                <View>
                    <ActivationScreenHeader processText={"Download Section"} />
                    <View style={styles.container}>
                        <Text>Downloading files for {this.name} Questions..Please Wait...</Text>
                    </View>
                </View>
            )


        }
        else {
            return (
                <View style={styles.container}>
                    <ActivationScreenHeader processText={"Download Section"} />
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Waec")} >
                        <Text> Click here to go to Waec Screen </Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }
}
const styles = StyleSheet.create({
    container: {

    },


})

export default DownloadScreen