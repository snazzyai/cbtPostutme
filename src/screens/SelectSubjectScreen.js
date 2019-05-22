import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Picker, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';





class SelectSubject extends Component {

    name = this.props.navigation.getParam('name')
    subject = this.props.navigation.getParam('subject')

    state = {
        subjectId: "",
        subjects: this.subject,
        pastQuestionName: this.name

    }

    async componentDidMount() {
        // const get = await AsyncStorage.getItem("paidExams")
        // const use = JSON.parse(get)
        // console.warn(use[0], use[1])
        // console.warn(this.subject)
    }

    handlePress = () => {
        if (this.state.subjectId === "") {
            alert("Please choose a subject")
            return false

        }
        this.props.navigation.navigate('Questions', {
            subjectName: this.state.subjectName,
            subjectId: this.state.subjectId,
            name: this.state.pastQuestionName
        })


    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView >
                    <Text style={styles.textSelect}>SELECT A SUBJECT</Text>
                    <Picker
                        selectedValue={this.state.subjectId}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ subjectId: itemValue })
                        }>
                        <Picker.item label="Choose a subject" value="" />
                        {
                            this.state.subjects.data.map(sub => {
                                return (
                                    <Picker.item label={sub.name} value={sub.id} />
                                )
                            })
                        }

                    </Picker>
                    <View style={styles.iconView}>
                        <Icon size={30} color="#fff" name="ios-arrow-dropdown" />
                    </View>
                    <ButtonComponent externalStyle={{ marginLeft: 30 }} onPress={this.handlePress} text="SELECT SUBJECT" />
                </ScrollView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: "50%"
    },
    textSelect: { fontSize: 25, fontWeight: "bold", textAlign: "center", },
    picker: { height: 45, width: 300, backgroundColor: "#5FA046", marginTop: 30, color: "#fff" },
    iconView: {
        position: "relative",
        bottom: 38,
        left: 265


    }


})
export default SelectSubject;