import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView, Image, ImageBackground, Alert, Share, Dimensions } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import axios from 'axios'
import SideMenu from 'react-native-side-menu'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import schools from '../components/SchoolListComponent/SchoolListComponent'
import AsyncStorage from '@react-native-community/async-storage';




class MyExams extends Component {
    state = {
        searchValue: "",
        openBar: false,
        paid: [],
        autoClose: false,
        schools: schools
    }


    async componentDidMount() {
        await this.setState({
            openBar: false
        })
        const getExams = await AsyncStorage.getItem('paidExams')
        const parsed = JSON.parse(getExams)
        console.warn(parsed)

    }

    searchFilter = (value) => {
        this.setState({
            searchValue: value
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


    filteredList = () => {
        this.setState(prevState => {
            return {
                schools: QuestionListFiltered
            }
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
            <SideMenu isOpen={this.state.openBar} autoClosing={this.state.autoClose} menu={menu}>
                <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.topView}>
                                <TouchableOpacity onPress={this.onClickDrawerOpener}>
                                    <Icon name="ios-menu" size={35} color="#fff" />
                                </TouchableOpacity>

                                <View style={styles.textHeaderView}>
                                    <Text style={styles.textHeader}>MY EXAMS</Text>
                                </View>
                                <View style={styles.searchBar}>
                                    <TextInput style={styles.searchBarInput} placeholder="Search..." onChangeText={this.searchFilter} />
                                </View>
                            </ImageBackground>
                            <View style={styles.textCategoryView}>
                                <Text style={styles.textCategory}>CATEGORIES</Text>
                            </View>
                            <View style={styles.cardView}>
                                {QuestionList}
                            </View>

                        </View>
                    </ScrollView>
                </View>
            </SideMenu>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f7f7f7",

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
        paddingLeft: "5%",

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
    cardView: {
        // paddingBottom: 100
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

export default MyExams;