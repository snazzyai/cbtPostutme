import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, BackHandler } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-community/async-storage'
import ActivationScreenHeader from '../components/ActivationScreenHeader/ActivationScreenHeader'
import Axios from 'axios'



class DownloadScreen extends Component {
    name = this.props.navigation.getParam('name')


    state = {
        isLoading: true
    }


    awaitStartup = async () => {

    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        const schoolName = this.name
        console.warn(schoolName)
        await Axios.get(`http://learn.simbibot.com/api/putme_schools/${schoolName}/questions`)
            .then(async response => {
                console.warn(response)
                //And at this point my brain has automatically shutdown!!
            })
            .catch(e => alert(e))

        this.setState({
            isLoading: false
        })
    }


    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <ActivationScreenHeader processText={"Download Section"} />
                    <View style={styles.downloadView}>
                        <Text style={styles.textView}>Downloading files for {this.name} Questions..Please Wait, this might take a few minutes...</Text>
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