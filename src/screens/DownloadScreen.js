import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-community/async-storage'
import ActivationScreenHeader from '../components/ActivationScreenHeader/ActivationScreenHeader'




class DownloadScreen extends Component {
    name = this.props.navigation.getParam('name')
    id = this.props.navigation.getParam('id')



    state = {
        isLoading: true
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
                isLoading: false
            })
        console.warn(this.name)

    }


    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivationScreenHeader processText={"Download Section"} />
                    <View style={styles.downloadView}>
                        <Text style={styles.textView}>Downloading files for {this.name} Questions..Please Wait...</Text>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                </View>
            )


        }
        else {
            return (
                <View>
                    <ActivationScreenHeader processText={"Download Section"} />
                    <View style={styles.donwloadView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("My Exams")} >
                            <Text style={styles.textView}> Click here to go to your Exams Screen </Text>
                        </TouchableOpacity>
                        <Text>{this.name}</Text>
                    </View>
                </View>
            )
        }

    }
}
const styles = StyleSheet.create({
    downloadView: {
        textAlign: "center",
        alignItems: 'center',
        fontWeight: "bold",
        padding: 20
    },
    textView: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: 'verdana',
    }

})

export default DownloadScreen