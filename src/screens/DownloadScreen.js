import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, BackHandler } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-community/async-storage'
import ActivationScreenHeader from '../components/ActivationScreenHeader/ActivationScreenHeader'
import Axios from 'axios'
import SQLite from 'react-native-sqlite-storage'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import Datastore from 'react-native-local-mongodb'
import SQlite from 'react-native-sqlite-storage'




class DownloadScreen extends Component {
    name = this.props.navigation.getParam('name')


    state = {
        isLoading: true,
        error: false,
        subjects: {}
    }

    db = SQLite.openDatabase({ name: test.db, createFromLocation: '~PastQuestion.db' })
    getSubjects = (schoolName) => {
        Axios.get(`http://learn.simbibot.com/api/putme_schools/${schoolName}/subjects`)
            .then(async response => {
                //for testing 
                // await AsyncStorage.removeItem(`paidExams`)
                console.warn("paid section")
                const subjects = response
                const getSchool = await AsyncStorage.getItem(`${schoolName}`)
                const getExams = await AsyncStorage.getItem(`paidExams`)
                const examToAdd = [`${schoolName}`]
                const data = {
                    subjects: response
                }
                await AsyncStorage.setItem(`${schoolName}`, JSON.stringify(data))
                if (getExams !== null) {
                    const newExam = JSON.parse(getExams).concat(examToAdd);
                    AsyncStorage.setItem('paidExams', JSON.stringify(newExam));
                }
                else {
                    AsyncStorage.setItem('paidExams', JSON.stringify(examToAdd));
                }
                console.warn("this worked")
                this.setState({
                    subjects: subjects
                })
                console.warn("subjects set")
                await this.getQuestions(schoolName)

            })
            .catch(e => console.warn(e))
    }

    getQuestions = (schoolName) => {
        Axios.get(`http://learn.simbibot.com/api/putme_schools/${schoolName}/questions`)
            .then(response => {
                console.warn("fetched questions")



                this.setState({
                    isLoading: false
                })
            }).catch(e => alert(e))
    }

    // storeQuestions = (response, schoolName) => {
    //     var Datastore = require('react-native-local-mongodb')
    //         , db = new Datastore({ filename: '' });
    //     db.loadDatabase(function (err) {   

    //     });
    // }


    async componentDidMount() {
        // BackHandler.addEventListener('hardwareBackPress', () => true);

        if (this.name === "WAEC" || this.name === "UTME") {
            //donwload files for waec or utme using api
            //set as part of paidExams
            alert('waec/putme')
            this.setState({
                isLoading: false,
                error: true
            })
            return false
        }

        const schoolName = this.name
        await this.getSubjects(schoolName)

        console.warn("isloading false")

    }

    //slide drawer component
    drawer = null;


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


    render() {
        if (this.state.isLoading) {
            return (
                <DrawerLayout
                    ref={drawer => this.drawer = drawer}
                    drawerWidth={240}
                    drawerPosition={DrawerLayout.positions.Left}
                    drawerType='front'
                    drawerBackgroundColor="#ddd"
                    renderNavigationView={this.viewOpened}
                >
                    <View>

                        <ActivationScreenHeader onClickDrawerOpen={() => this.drawer.openDrawer()} processText={"DOWNLOAD SCREEN"} />
                        <View style={styles.downloadView}>
                            <Text style={styles.textView}>Downloading files for {this.name} Questions..Please Wait, this might take a few minutes...</Text>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>
                    </View>
                </DrawerLayout>
            )


        }
        else if (this.state.error === true && !this.state.isLoading) {
            return (
                <DrawerLayout
                    ref={drawer => this.drawer = drawer}
                    drawerWidth={240}
                    drawerPosition={DrawerLayout.positions.Left}
                    drawerType='front'
                    drawerBackgroundColor="#ddd"
                    renderNavigationView={this.viewOpened}
                >
                    <View>

                        <ActivationScreenHeader onClickDrawerOpen={() => this.drawer.openDrawer()} processText={"DOWNLOAD SCREEN"} />
                        <View style={styles.donwloadView}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("")} >
                                <Text style={styles.textView}>There was an error fetching file</Text>
                            </TouchableOpacity>
                            <Text>{this.name}</Text>
                        </View>
                    </View>
                </DrawerLayout>
            )
        }
        else if (!this.state.loading) {
            return (
                <DrawerLayout
                    ref={drawer => this.drawer = drawer}
                    drawerWidth={240}
                    drawerPosition={DrawerLayout.positions.Left}
                    drawerType='front'
                    drawerBackgroundColor="#ddd"
                    renderNavigationView={this.viewOpened}
                >
                    <View>

                        <ActivationScreenHeader onClickDrawerOpen={() => this.drawer.openDrawer()} processText={"DOWNLOAD SCREEN"} />
                        <View style={styles.donwloadView}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("SelectSubject", {
                                subject: this.state.subjects
                            })} >
                                <Text style={styles.textView}> Click here to go to your Exams Screen </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </DrawerLayout>
            )
        }

    }
}
const styles = StyleSheet.create({
    downloadView: {
        textAlign: "center",
        alignItems: 'center',
        fontWeight: "bold",
        padding: 20
    },
    textView: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        fontFamily: 'verdana',
    }

})

export default DownloadScreen