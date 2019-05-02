import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView, Image, ImageBackground, Alert, Share } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';






class PastQuestions extends Component {
    state = {
        schools: [
            {
                id: 1,
                typeName: "WAEC",
                imageSource: require("../../assets/images/waec.png"),
                fullTypeName: "WAEC QUESTIONS "

            },
            {
                id: 2,
                typeName: "UTME",
                imageSource: require("../../assets/images/jamb.png"),
                fullTypeName: "UTME QUESTIONS"
            },
            {
                id: 3,
                typeName: "UNILAG",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "UNILAG PUTME QUESTIONS"
            },
            {
                id: 4,
                typeName: "UNICAL",
                imageSource: require("../../assets/images/unical.png"),
                fullTypeName: "UNICAL PUTME QUESTIONS"
            },
            {
                id: 5,
                typeName: "UNIJOS",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "UNIJOS PUTUTME QUESTIONS"
            },
            {
                id: 6,
                typeName: "UNIZIK",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "UNIZIK PUTME QUESTIONS"
            },
            {
                id: 7,
                typeName: "UNIBEN",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "UNIBEN PUTME QUESTIONS"
            },
            {
                id: 8,
                typeName: "UI",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "UI POSTUTME QUESTIONS"
            },
            {
                id: 9,
                typeName: "LAUTECH",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "LAUTECH POSTUME QUESTIONS"
            },
            {
                id: 10,
                typeName: "BUK",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "BUK POSTUME QUESTIONS"
            },
            {
                id: 11,
                typeName: "ABU",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "ABU POSTUME QUESTIONS"
            },
            {
                id: 12,
                typeName: "UNN",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "UNN POSTUME QUESTIONS"
            },
            {
                id: 13,
                typeName: "UNILORIN",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "UNILORIN POSTUME QUESTIONS"
            },
            {
                id: 14,
                typeName: "OAU",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "OAU PUTUME QUESTIONS"
            },
            {
                id: 15,
                typeName: "FUTA",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "FUTA PUTME QUESTIONS"
            },
            {
                id: 16,
                typeName: "FUNAAB",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "FUNAAB PUTME QUESTIONS"
            },
            {
                id: 17,
                typeName: "EKSU",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "EKSU PUTME QUESTIONS"
            },
            {
                id: 18,
                typeName: "AAUA",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "AAUA PUTME QUESTIONS"
            },


        ]

    }



    onShare = () => {
        const result = Share.share({
            title: "Download FaceYourBook",
            message: "http://www.simbibot.com"
        })
        if (result.action !== Share.sharedAction) {
            ToastAndroid.show('Please make sure you share', ToastAndroid.SHORT);
            new Promise(resolve => {
                if (AsyncStorage.getItem('shared') === null) {
                    resolve(setTimeout(() => this.props.navigation.navigate('Download'), 2000))
                }
                else {

                }
            })

        }

    }


    handleAlert = () => {
        Alert.alert(
            'YOU NEED TO SHARE',
            'Share to your Friends to access this question',
            [
                {
                    text: 'Share',
                    onPress: this.onShare
                },

                { text: 'OK' }
            ],
            { cancelable: false },
        );

    }


    searchFilter = () => {

    }

    render() {
        const { fullTypeName, id } = this.state
        const QuestionList = this.state.schools.map(type => (
            <TouchableOpacity key={type.id} style={styles.typesView} onPress={() => {
                if (type.typeName == "WAEC") {
                    this.handleAlert()

                }
                else if (type.typeName == "UTME") {
                    this.handleAlert()

                }
                else {
                    this.props.navigation.navigate('Payment', {
                        id: type.id,
                        name: type.typeName
                    })
                }
            }} >
                <View style={styles.imageView}>
                    <Image source={type.imageSource} style={styles.image} />
                </View>
                <View style={styles.detailsView}>
                    <Text style={styles.typeName}>{type.typeName}</Text>
                    <Text style={styles.fullTypeName}>{type.fullTypeName}</Text>
                </View>
            </TouchableOpacity>
        ))

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.topView}>
                        <View style={styles.textHeaderView}>
                            <Text style={styles.textHeader}>SELECT A CATEGORY</Text>
                        </View>
                        <View style={styles.searchBar}>
                            <TextInput style={styles.searchBarInput} placeholder="Search..." onChangeText={this.searchFilter} />
                        </View>
                    </ImageBackground>
                    <View style={styles.textCategoryView}>
                        <Text style={styles.textCategory}>CATEGORIES</Text>
                    </View>
                    {QuestionList}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f7f7f7"
    },
    topView: {
        height: 200,
        alignItems: "center",
        paddingTop: 20
    },
    textHeaderView: {
        padding: 30
    },
    textHeader: {
        color: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: 'sans-serif',
    },
    searchBar: {
        borderRadius: 20,
        width: "90%",
        height: 40,
        elevation: 3,
        backgroundColor: "#ffffff",
        paddingLeft: wp("5%"),

    },
    searchBarInput: {
        fontSize: 16,
        color: "#000000"
    },
    textCategoryView: {

    },
    textCategory: {
        color: "#000000",
        fontSize: 16,
        paddingTop: 25,
        paddingLeft: 15,
        fontWeight: "bold"

    },
    imageView: {
        borderRadius: 50,
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 50

    },
    scrollView: {
        padding: 10,
        marginTop: 30

    },
    detailsView: {
        paddingLeft: 20
    },
    typesView: {
        flexDirection: "row",
        padding: 10,
        elevation: 2,
        borderRadius: 5,
        backgroundColor: '#fff',
        margin: 10
        // elevation: 10
    },
    typeName: {
        color: "black",
        fontWeight: "bold",
        fontSize: 18
    },
    fullTypeName: {
        paddingTop: 10,
        color: "#000"
    }

})

export default PastQuestions;