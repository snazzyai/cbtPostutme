import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Picker, StyleSheet } from 'react-native'





class Questions extends Component {

    subjectId = this.props.navigation.getParam('subjectId')
    name = this.props.navigation.getParam('name')


    state = {
        questions: []

    }


    render() {

        return (
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.textSelect}>Questions for id {this.subjectId}</Text>
                </ScrollView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center"
    },
    textSelect: { fontSize: 20, fontWeight: "bold", textAlign: "center", },
    picker: { height: 40, width: 300, backgroundColor: "#5FA046", marginTop: 30, color: "#fff" },
    iconView: {
        position: "relative",
        bottom: 35,
        left: 265


    }


})
export default Questions;