import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Picker, StyleSheet, BackHandler, Alert, ImageBackground, Linking } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import MenuDrawer from '../components/MenuDrawerComponent/MenuDrawerComponent'
import Datastore from 'react-native-local-mongodb'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'





// const db = SQLite.openDatabase('faceyourbook.db', '1.0', '', 1);

const dbstoreSubjects = new Datastore({ filename: 'faceyourbook', autoload: true });

class SelectSubject extends Component {
    name = this.props.navigation.getParam('name')
    subject = this.props.navigation.getParam('subject')

    state = {
        subjectId: "",
        subjects: [],
        pastQuestionName: this.name,
        subjectName: "",


    }

    componentDidMount() {
        const schoolName = this.name || "University of Lagos"
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate("MyExams"));
        // db.transaction((txn)=>{
        //     txn.executeSql('SELECT * FROM subjects WHERE school_name = :school_name ', [this.name], async (tx, res) => {
        //         let subjects = []
        //         for (let i = 0; i < res.rows.length; i++){
        //             subjects.push(res.rows.item(i))
        //         }
        //         await this.setState({ subjects: this.state.subjects.concat(subjects) });
        //     }); 
        // })
        dbstoreSubjects.find({ school_name: `${schoolName}` }, (err, newDoc) => {
            let subjectArray = []
            newDoc.map(items => {
                subjectArray.push(items)
            })
            this.setState({
                subjects: this.state.subjects.concat(subjectArray)

            })
        })





        // const get = await AsyncStorage.getItem("paidExams")
        // const use = JSON.parse(get)
        // console.warn(use[0], use[1])
        // console.warn(this.subject)
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

    handlePress = () => {
        if (this.state.subjectId === "") {
            alert("Please choose a subject")
            return false

        }

        this.state.subjects.map(data => {
            if (this.state.subjectId == data.subject_id) {
                this.props.navigation.navigate('Questions', {
                    subjectId: this.state.subjectId,
                    name: this.state.pastQuestionName,
                    subjectName: data.subject_name
                })
            }
        })

    }

    render() {
        // { console.warn(this.subjects[0].subject_name) }
        return (
            <DrawerLayout
                ref={drawer => this.drawer = drawer}
                drawerWidth={240}
                drawerPosition={DrawerLayout.positions.Left}
                drawerType='front'
                drawerBackgroundColor="#ddd"
                renderNavigationView={this.viewOpened}
            >
                <ImageBackground style={styles.container}>
                    <MenuDrawer styling={{ paddingLeft: 25, marginTop: 15, marginBottom: 15, }} onClickDrawerOpener={() => this.drawer.openDrawer()} />
                    <ScrollView >
                        <View style={{ paddingTop: "40%" }}>
                            <Text style={styles.textSelect}>SELECT A SUBJECT</Text>
                            <Picker
                                selectedValue={this.state.subjectId}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ subjectId: itemValue })
                                }>
                                <Picker.item label="Choose a subject" value="" />
                                {
                                    this.state.subjects.map((sub, i) => {
                                        return (
                                            <Picker.item key={i} label={sub.subject_name} value={sub.subject_id} />
                                        )
                                    })
                                }

                            </Picker>

                            <View style={styles.iconView}>
                                <Icon size={30} color="#5FA046" name="ios-arrow-dropdown" />
                            </View>
                            {

                            }
                            <ButtonComponent textStyle={{ color: "green" }} externalStyle={{ marginLeft: 30, backgroundColor: "#fafafa" }} onPress={this.handlePress} text="SELECT SUBJECT" />

                        </View>

                    </ScrollView>
                </ImageBackground >
            </DrawerLayout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#5FA046"
    },
    textSelect: { fontSize: 25, fontWeight: "bold", textAlign: "center", color: "#fff" },
    picker: { height: 45, width: 300, backgroundColor: "#fafafa", marginTop: 30, color: "green" },
    iconView: {
        position: "relative",
        bottom: 38,
        left: 265


    }


})
export default SelectSubject;