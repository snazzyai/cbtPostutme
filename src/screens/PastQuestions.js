import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



class PastQuestions extends Component {
    state = {
        searchInput: "",
        PastQuestions: {
            utme: "UTME",
            waec: "WAEC",
            unilagPostutme: "UNILAG POSTUTME",
            unilorinPostutme: "UNILORIN POSTUTME",
            unibenPostutme: "UNIBEN POSTUME",
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.searchBarView}>
                    <TextInput style={styles.searchBarInput} placeholder="Search question type"></TextInput>
                </View>

                <View style={styles.typeView}>
                    <ScrollView>
                        <View style={styles.typeView}>
                            <TouchableOpacity style={styles.type}><Text>UTME</Text></TouchableOpacity>

                            <TouchableOpacity style={styles.type}><Text>WAEC</Text></TouchableOpacity>
                        </View>
                        <View style={styles.typeView}>
                            <TouchableOpacity style={styles.type}><Text>UTME</Text></TouchableOpacity>

                            <TouchableOpacity style={styles.type}><Text>WAEC</Text></TouchableOpacity>
                        </View>
                        <View style={styles.typeView}>
                            <TouchableOpacity style={styles.type}><Text>UTME</Text></TouchableOpacity>

                            <TouchableOpacity style={styles.type}><Text>WAEC</Text></TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    searchBarView: {
        justifyContent: "center",
        width: "90%",
        height: 55,
        borderRadius: 10,
        elevation: 3,
        paddingLeft: wp("8%"),
        marginTop: hp('5%')

    },
    searchBarInput: {
        fontSize: 20,
        paddingTop: 12,
        color: "#000000"
    },
    typeView: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-evenly",
    },
    typeList: {
        justifyContent: "center"
    },
    type: {
        width: 150,
        height: 150,
        backgroundColor: "blue",
        alignItems: "center"
    }
})

export default PastQuestions;