import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView, Image, ImageBackground, Alert, Share, Dimensions, Linking, BackHandler } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import axios from 'axios'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import schools from '../components/SchoolListComponent/SchoolListComponent'
import AsyncStorage from '@react-native-community/async-storage';
import MenuDrawer from '../components/MenuDrawerComponent/MenuDrawerComponent'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'




class MyExams extends Component {

    state = {
        searchValue: "",
        openBar: false,
        paid: [],
        autoClose: false,
        schools: schools
    }


    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate("PastQuestions"));
        await this.setState({
            openBar: false
        })
        const getExams = await AsyncStorage.getItem('paidExams')
        const parsedExams = JSON.parse(getExams)
        const finalArray = []
        if(parsedExams !== null){
            this.state.schools.forEach(question => {
                parsedExams.forEach(exam => {
                    if (question.typeNameFull === exam) {
                        finalArray.push(question)
                    }
                })
            })
        }
      
        this.setState({
            paid: finalArray
        })
    }

    searchFilter = (value) => {
        this.setState({
            searchValue: value
        })

    }

    componentWillUnmount(){
        this.setState({
            paid: []
        })
    }

    //slide drawer component
    viewOpened = () => {
        return (
            <SideDrawerComponent
                handleHomeNavigation={() => {
                    this.props.navigation.navigate('Startup')

                }}
                handleExamsNavigation={() => this.props.navigation.navigate('MyExams')}
                handleAboutNavigation={() => this.props.navigation.navigate('About')}
                inviteFriends={this.inviteFriends}
                goToWhatsApp={this.goToWhatsApp}
                closeDrawer={() => this.drawer.closeDrawer()}
            />
        )
    }

    inviteFriends = async () => {
        await Share.share({
            message: "Share Faceyourbook App to your lovely friends | click this link to download http://www.faceyourbookapp.com"
        })
    }

    goToWhatsApp = () => {
        Linking.openURL(`https://chat.whatsapp.com/CBVGniVkviM5SjPknnDdgz`);
    }
    //end of slide drawer component

    handlePaidExam = async (type) => {
        const getSubjects = await AsyncStorage.getItem(`${type}`)
        const parsedGetSubject = JSON.parse(getSubjects)
        const subjects = parsedGetSubject.subjects
        this.props.navigation.navigate('SelectSubject', {
            subject: subjects
        })
    }

    filteredList = () => {
        this.setState(prevState => {
            return {
                paid: QuestionListFiltered
            }
        })
    }

    render() {

        const QuestionListFiltered = this.state.paid.filter(type => {
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
                    this.handlePaidExam(type.typeNameFull)
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

            <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
                <DrawerLayout
                    ref={drawer => this.drawer = drawer}
                    drawerWidth={240}
                    drawerPosition={DrawerLayout.positions.Left}
                    drawerType='front'
                    drawerBackgroundColor="#ddd"
                    renderNavigationView={this.viewOpened}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                        <View style={styles.container}>
                            <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.topView}>
                                <MenuDrawer onClickDrawerOpener={() => this.drawer.openDrawer()} />
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
                </DrawerLayout>
            </View>
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