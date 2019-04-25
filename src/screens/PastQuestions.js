import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



class PastQuestions extends Component {
    state = {

    }



    render() {

        return (
            <View style={styles.container}>

                <View style={styles.typeView}>
                    <ScrollView style={styles.scrollView} >
                        <View style={styles.typeList}>
                            <TouchableOpacity style={[styles.type, styles.color1]}><Text style={styles.typeText}>UTME</Text></TouchableOpacity>

                            <TouchableOpacity style={[styles.type, styles.color2]}><Text style={styles.typeText}>WAEC</Text></TouchableOpacity>
                        </View>
                        <View style={styles.typeList}>
                            <TouchableOpacity style={[styles.type, styles.color3]}><Text style={styles.typeText}>UNILORIN POST UTME</Text></TouchableOpacity>

                            <TouchableOpacity style={[styles.type, styles.color4]}><Text style={styles.typeText}>UNILAG POST UTME</Text></TouchableOpacity>
                        </View>
                        <View style={styles.typeList}>
                            <TouchableOpacity style={[styles.type, styles.color5]}><Text style={styles.typeText}>UNIBEN POST UTME</Text></TouchableOpacity>

                            <TouchableOpacity style={[styles.type, styles.color6]}><Text style={styles.typeText}>OAU POST UTME</Text></TouchableOpacity>
                        </View>
                        <View style={styles.typeList}>
                            <TouchableOpacity style={[styles.type, styles.color7]}><Text style={styles.typeText}>LASU POST UTME</Text></TouchableOpacity>

                            <TouchableOpacity style={[styles.type, styles.color8]}><Text style={styles.typeText}>UNIJOS POST UTME</Text></TouchableOpacity>
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
    // searchBarView: {
    //     justifyContent: "center",
    //     width: "90%",
    //     height: 55,
    //     borderRadius: 10,
    //     elevation: 3,
    //     paddingLeft: wp("8%"),
    //     marginTop: hp('5%')

    // },
    // searchBarInput: {
    //     fontSize: 20,
    //     paddingTop: 12,
    //     color: "#000000"
    // },
    scrollView: {


    },
    typeView: {
        justifyContent: "center"
    },
    typeList: {
        justifyContent: "center",
        flexDirection: "row",
        padding: 10
    },
    type: {
        width: 150,
        height: 150,
        alignItems: "center",
        margin: 20,
        paddingTop: hp("8%"),
    }, color1: {

    },
    typeText: {
        fontFamily: "Helvetica",
        textAlign: "center",
        fontSize: 20,
        color: "#000000"

    },
    color1: {
        backgroundColor: "#b0ff92"
    },
    color2: {
        backgroundColor: "#7d7c7a"
    },
    color3: {
        backgroundColor: "#e0f760"
    },
    color4: {
        backgroundColor: "#f74f4f"
    },
    color5: {
        backgroundColor: "#f7b645"
    },
    color6: {
        backgroundColor: "#f74fe0"
    },
    color7: {
        backgroundColor: "#6b4ff7"
    },
    color8: {
        backgroundColor: "#467a23"
    },
})

export default PastQuestions;