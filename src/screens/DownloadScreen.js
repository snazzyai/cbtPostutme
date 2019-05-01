import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-community/async-storage'


class DownloadScreen extends Component {
    state = {
        hasDownloaded: false
    }

    downloadQuestions = async () => {
        await AsyncStorage.setItem("WaecQuestions", [
            {
                question: "What is your name",
                option1: "Abdulsalam",
                option2: "Taofeeq",
                option3: "Abdul",
                answer: "Abdulsalam"
            }
        ])
        this.setState({
            hasDownloaded: true
        })
    }

    handleNavigation = () => {
        this.props.navigation.navigate("WaecScreen")
    }
    componentDidMount() {
        this.downloadQuestions()
    }

    render() {
        if (!this.state.hasdownloaded) {
            return (

                <View style={styles.container}>
                    <ActivationScreenHeader />
                    <Text>Downloading files Please Wait...</Text>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <ActivationScreenHeader />
                    <TouchableOpacity onPress={this.handleNavigation()} >
                        <Text> Click here to go to Waec Screen</Text>
                    </TouchableOpacity>
                </View>

            )
        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },


})
export default DownloadScreen;