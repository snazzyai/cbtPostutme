import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-community/async-storage'
import ActivationScreenHeader from '../components/ActivationScreenHeader/ActivationScreenHeader'
import console = require('console');


class DownloadScreen extends Component {

    name = this.props.navigation.getParam('name')
    id = this.props.navigation.getParam('id')
    state = {
        hasDownloaded: false
    }

    // downloadQuestions = async () => {
    //     await AsyncStorage.setItem("WaecQuestions", [
    //         {
    //             question: "What is your name",
    //             option1: "Abdulsalam",
    //             option2: "Taofeeq",
    //             option3: "Abdul",
    //             answer: "Abdulsalam"
    //         }
    //     ])
    //     this.setState({
    //         hasDownloaded: true
    //     })
    // }
    startTimer = async () => {
        return new Promise(setTimeout(resolve => resolve("downloadFunction"), 3000))
    }
    async componentDidMount() {
        console.log('loaded')
        const finished = await this.startTimer()
        if (finished !== null) {
            console.log("has set hasDownloaded")
            this.setState({ hasDownloaded: true })
        }
    }

    render() {
        if (!this.state.hasdownloaded) {
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("WaecScreen")} >
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
export default DownloadScreen;