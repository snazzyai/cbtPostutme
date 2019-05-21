import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Picker, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import axios from 'axios'




class SelectSubject extends Component {

    name = this.props.navigation.getParam('name')
    subject = this.props.navigation.getParam('subject')

    state = {
        subject: "",
        subjects: null,
        pastQuestionName: this.name

    }

    componentDidMount() {
        const subjectArray = this.subject
        console.warn(subjectArray)
        this.setState(prevState => {
            return {
                ...prevState,
                subjects: subjectArray
            }
        })
        console.warn(this.state.subjects)

    }

    handlePress = () => {
        if (this.state.subject === "") {
            alert("Please choose a subject")
            return null
        }
        this.props.navigation.navigate('Questions', {
            subject: this.state.subject,
            name: this.state.pastQuestionName
        })

    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView >
                    <Text style={styles.textSelect}>SELECT A SUBJECT</Text>
                    <Picker
                        selectedValue={this.state.subject}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ subject: itemValue })
                        }>
                        <Picker.item label="Choose a subject" value="" />
                        {
                            this.state.subjects.map(sub => {
                                const subject = sub.name
                                return (
                                    <Picker.item label={subject} value={subject} />
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