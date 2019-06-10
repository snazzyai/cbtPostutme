import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView, Image, ImageBackground, Alert, Share, Linking } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import schools from '../components/SchoolListComponent/SchoolListComponent'
import MenuDrawer from '../components/MenuDrawerComponent/MenuDrawerComponent'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'




class PastQuestions extends Component {

    state = {
        searchValue: "",
        drawerClosed: true,
        subjects: {},
        schools: schools,


    }

    drawer = null;


    async componentDidMount() {
        // await AsyncStorage.removeItem(`hasShared`)
        // await AsyncStorage.removeItem(`paidExams`)
        //shows all AsyncStorage
        // AsyncStorage.getAllKeys((err, keys) => {
        //     AsyncStorage.multiGet(keys, (error, stores) => {
        //       stores.map((result, i, store) => {
        //         console.warn({ [store[i][0]]: store[i][1] });
        //         return true;
        //       });
        //     });
        //   });

    }
    //check if user hasPaid and direct as appropriate
    checkUserPaid = async (type, id) => {
        /*for testing purpose
        await AsyncStorage.removeItem(`${type}`)
        */

        const getPayments = await AsyncStorage.getItem(`paidExams`)
        const parsedGetPayment = JSON.parse(getPayments)


        if (parsedGetPayment.includes(type)) {
            this.props.navigation.navigate('SelectSubject', {
                name: type
            })

        }
        else {
            this.props.navigation.navigate('Payment', {
                name: type
            })
        }

    }

    //checks if user has shared and navigate based on questions been downloaded or not
    checkUserShared = async (type) => {
        //for testing
        // await AsyncStorage.removeItem('sharing')
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
            // const questionType = await AsyncStorage.getItem(`${type}`)
            // const parsedType = JSON.parse(questionType)
            // if (parsedType !== null) {
            //     this.props.navigation.navigate('SelectSubject', {
            //         name: type
            //     })
            // }
            // else {
            //     this.props.navigation.navigate('Download', {
            //         name: type
            //     })
            // }
            //if user has shared check if subjects have been download
            const getSubjects = await AsyncStorage.getItem(`${type}`)
            if (getSubjects !== null) {
                const parsedGetSubject = JSON.parse(getSubjects)
                const subjects = parsedGetSubject.subjects
                this.props.navigation.navigate('SelectSubject', {
                    subject: subjects
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

    searchFilter = (value) => {
        this.setState({
            searchValue: value
        })

    }

    render() {
        // const menu = <SideDrawerComponent
        //     handleHomeNavigation={() => {
        //         this.props.navigation.navigate('PastQuestions') 

        // }}
        //     handleExamsNavigation={() => this.props.navigation.navigate('MyExams')}
        //     handleAboutNavigation={() => this.props.navigation.navigate('About')}
        //     onClickDrawerCloser={this.onClickDrawerCloser}
        // />
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
                                    <Text style={styles.textHeader}>SELECT AN EXAM</Text>
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
        paddingTop: 15
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

export default PastQuestions;