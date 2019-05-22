import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView, Image, ImageBackground, Alert, Share } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import SideMenu from 'react-native-side-menu'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import Icon from "react-native-vector-icons/Ionicons"








class PastQuestions extends Component {
    state = {

        openBar: false,
        searchValue: "",
        subjects: {},
        schools: [
            {
                id: 1,
                typeName: "WAEC",
                typeNameFull: "WAEC",
                imageSource: require("../../assets/images/waec.png"),
                fullTypeName: "WAEC QUESTIONS"

            },
            {
                id: 2,
                typeName: "UTME",
                typeNameFull: "UTME",
                imageSource: require("../../assets/images/jamb.png"),
                fullTypeName: "UTME QUESTIONS"
            },
            {
                id: 3,
                typeName: "UNILAG",
                typeNameFull: "University of Lagos",
                imageSource: require("../../assets/images/unilag.png"),
                fullTypeName: "UNILAG PUTME QUESTIONS"
            },
            {
                id: 4,
                typeName: "UNICAL",
                typeNameFull: "University of Calabar",
                imageSource: require("../../assets/images/unical.jpg"),
                fullTypeName: "UNICAL PUTME QUESTIONS"
            },
            {
                id: 5,
                typeName: "UNIJOS",
                typeNameFull: "University of Jos",
                imageSource: require("../../assets/images/unijos.jpg"),
                fullTypeName: "UNIJOS PUTUTME QUESTIONS"
            },
            {
                id: 6,
                typeName: "UNIZIK",
                typeNameFull: "Nnamdi Azikiwe University",
                imageSource: require("../../assets/images/unizik.jpg"),
                fullTypeName: "UNIZIK PUTME QUESTIONS"
            },
            {
                id: 7,
                typeName: "UNIBEN",
                typeNameFull: "University of Benin",
                imageSource: require("../../assets/images/uniben.jpg"),
                fullTypeName: "UNIBEN PUTME QUESTIONS"
            },
            {
                id: 8,
                typeName: "UI",
                typeNameFull: "University of Ibadan",
                imageSource: require("../../assets/images/ui.jpg"),
                fullTypeName: "UI POSTUTME QUESTIONS"
            },
            {
                id: 9,
                typeName: "LAUTECH",
                typeNameFull: "Ladoke Akintola University",
                imageSource: require("../../assets/images/lautech.jpg"),
                fullTypeName: "LAUTECH POSTUME QUESTIONS"
            },
            {
                id: 10,
                typeName: "BUK",
                typeNameFull: "Bayero University",
                imageSource: require("../../assets/images/bayero.jpg"),
                fullTypeName: "BUK POSTUME QUESTIONS"
            },
            {
                id: 11,
                typeName: "ABU",
                typeNameFull: "Ahmadu Bello University",
                imageSource: require("../../assets/images/abu.jpg"),
                fullTypeName: "ABU POSTUME QUESTIONS"
            },
            {
                id: 12,
                typeName: "UNN",
                typeNameFull: "University of Nigeria",
                imageSource: require("../../assets/images/unn.jpg"),
                fullTypeName: "UNN POSTUME QUESTIONS"
            },
            {
                id: 13,
                typeName: "UNILORIN",
                typeNameFull: "University of Ilorin",
                imageSource: require("../../assets/images/unilorin.jpg"),
                fullTypeName: "UNILORIN POSTUME QUESTIONS"
            },
            {
                id: 14,
                typeName: "OAU",
                typeNameFull: "Obafemi Awolowo University",
                imageSource: require("../../assets/images/oau.jpg"),
                fullTypeName: "OAU PUTUME QUESTIONS"
            },
            {
                id: 15,
                typeName: "FUTA",
                typeNameFull: "federal university of technology akure",
                typeNameFull: "University of Ilorin",
                imageSource: require("../../assets/images/futa.jpg"),
                fullTypeName: "FUTA PUTME QUESTIONS"
            },
            {
                id: 16,
                typeName: "FUNAAB",
                typeNameFull: "Federal University of Agriculture Abeokuta",
                imageSource: require("../../assets/images/funaab.jpg"),
                fullTypeName: "FUNAAB PUTME QUESTIONS"
            },
            {
                id: 17,
                typeName: "EKSU",
                typeNameFull: "Ekiti State University",
                imageSource: require("../../assets/images/eksu.jpg"),
                fullTypeName: "EKSU PUTME QUESTIONS"
            },
            {
                id: 18,
                typeName: "AAUA",
                typeNameFull: "Adekunle Ajasin University",
                imageSource: require("../../assets/images/aau.jpg"),
                fullTypeName: "AAUA PUTME QUESTIONS"
            },
            {
                id: 19,
                typeName: "OOU",
                typeNameFull: "Olabisi Onabanjo University",
                imageSource: require("../../assets/images/oou.jpg"),
                fullTypeName: "OOU PUTME QUESTIONS"
            },
            {
                id: 20,
                typeName: "MCIU",
                typeNameFull: "Micheal & Cecilia Ibru University",
                imageSource: require("../../assets/images/mc.jpg"),
                fullTypeName: "MCIU PUTME QUESTIONS"
            },


        ],


    }



    //check if user hasPaid and direct as appropriate8ikm
    checkUserPaid = async (type, id) => {
        const getSubjects = await AsyncStorage.getItem(`${type}`)
        if (getSubjects !== null) {
            const parsedGetSubject = JSON.parse(getSubjects)
            const subjects = parsedGetSubject.subjects
            await this.setState({
                subjects: subjects
            })
            this.props.navigation.navigate('SelectSubject', {
                subject: subjects
            })
        }
        else {
            console.warn("second if")
            this.props.navigation.navigate('Payment', {
                id: id,
                name: type
            })
        }

    }

    //checks if user has shared and navigate based on questions been downloaded or not
    checkUserShared = async (type) => {
        const sharingDetail = await AsyncStorage.getItem('sharing')
        const parsedSharingDetail = JSON.parse(sharingDetail)
        if (parsedSharingDetail === null) {
            const data = {
                hasShared: true
            }
            await AsyncStorage.setItem('sharing', JSON.stringify(data))
            console.warn("successfully set hasShared")
            this.handleAlert(type)
        }
        else if (parsedSharingDetail.hasShared) {
            // for testing
            // await AsyncStorage.removeItem(`WAEC`)
            // await AsyncStorage.removeItem(`UTME`)
            console.warn("removed waec and utme")
            const questionType = await AsyncStorage.getItem(`${type}`)
            const parsedType = JSON.parse(questionType)
            if (parsedType !== null) {
                this.props.navigation.navigate('SelectSubject', {
                    name: type
                })
            }
            else {
                this.props.navigation.navigate('Download', {
                    name: type
                })
            }

        }

    }

    //
    onShare = async (type) => {
        const result = Share.share({
            message: "Share Faceyourbook App to your lovely friends | click this link to download http://www.faceyourbookapp.com"
        })
        if (result.action !== Share.sharedAction) {
            ToastAndroid.show('Please make sure you share', ToastAndroid.SHORT);
            new Promise(resolve => {
                resolve(setTimeout(() => {
                    this.props.navigation.navigate('Download', {
                        questionType: type
                    })
                }, 7000))
            })
        }
    }


    handleAlert = (type) => {
        console.warn(type)
        Alert.alert(
            'YOU NEED TO SHARE',
            'Share to your Friends to access this question',
            [
                {
                    text: 'Share',
                    onPress: this.onShare(type)
                },

                { text: 'OK' }
            ],
            { cancelable: false },
        );

    }

    filteredList = () => {
        this.setState(prevState => {

            return {
                schools: QuestionListFiltered
            }
        })
    }

    onClickDrawerOpener = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                openBar: true
            }

        })
    }
    onClickDrawerCloser = () => {
        this.setState(prevState => {
            return {
                ...prevState,
                openBar: false
            }

        })
    }

    searchFilter = (value) => {
        this.setState({
            searchValue: value
        })

    }

    render() {
        const menu = <SideDrawerComponent
            handleHomeNavigation={() => this.props.navigation.navigate('PastQuestions')}
            handleExamsNavigation={() => this.props.navigation.navigate('MyExams')}
            handleAboutNavigation={() => this.props.navigation.navigate('About')}
            onClickDrawerCloser={this.onClickDrawerCloser}
        />
        const QuestionListFiltered = this.state.schools.filter(type => {
            return type.typeName.toLowerCase().includes(this.state.searchValue.toLowerCase())
        })
        const QuestionList = QuestionListFiltered.map((type) => (
            <TouchableOpacity key={type.id} style={styles.typesView} onPress={() => {
                if (type.typeName == "WAEC") {
                    this.checkUserShared(type.typeNameFull)
                }
                else if (type.typeName == "UTME") {
                    this.checkUserShared(type.typeNameFull)
                }
                else {
                    this.checkUserPaid(type.typeNameFull, type.id)
                }
            }
            }>
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
            <SideMenu isOpen={this.state.openBar} menu={menu}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.topView}>
                            <TouchableOpacity onPress={this.onClickDrawerOpener}>
                                <Icon name="ios-menu" size={35} color="#fff" />
                            </TouchableOpacity>

                            <View style={styles.textHeaderView}>
                                <Text style={styles.textHeader}>SELECT AN EXAM</Text>
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
            </SideMenu >
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
        fontSize: 24,
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