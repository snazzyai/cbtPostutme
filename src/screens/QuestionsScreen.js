import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Picker, StyleSheet, Linking, BackHandler } from 'react-native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import SQLite from 'react-native-sqlite-2';
import HTMLView from 'react-native-htmlview';
import Datastore from 'react-native-local-mongodb'
import console = require('console');

const dbstoreSubjects = new Datastore({ filename: 'faceyourbook', autoload: true });
const dbstoreData = new Datastore({ filename: 'questionData', autoload: true });

// <input type="radio name="question${i}" value=${opt.option_text} />




class Questions extends Component {

    subjectId = this.props.navigation.getParam('subjectId')
    name = this.props.navigation.getParam('name')
    subjectName = this.props.navigation.getParam('subjectName')


    state = {
        questions: [],
        options: [],
        filteredQuestions: []
    }

    componentDidMount() {
        const schoolName = this.name
        const filtered = []
        const subject = this.subjectId

        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate("SelectSubject"))
        //db query
        // db.transaction((txn) => {
        //     // txn.executeSql('DROP TABLE IF EXISTS questions', [], async (tx, res) => {

        //     // });
        //     txn.executeSql('SELECT * FROM questions WHERE school_name = :school_name', ["University of Lagos"], async (tx, res) => {
        //         let questionArray = []
        //         for (let i = 0; i < res.rows.length; i++) {
        //             // console.warn(res.rows.item(i))
        //             questionArray.push(res.rows.item(i))

        //         }
        //         await this.setState({ questions: this.state.questions.concat(questionArray) });
        //     });
        //     txn.executeSql('SELECT * FROM options', [], async (tx, res) => {
        //         let optionArray = []
        //         for (let i = 0; i < res.rows.length; i++) {
        //             console.warn(res.rows.item(i))
        //             optionArray.push(res.rows.item(i))

        //         }
        //         await this.setState({ options: this.state.options.concat(optionArray) });
        //     });
        // })


        dbstoreData.find({ subject_id: subject }).limit(20).exec((err, newDoc) => {
            let questionArray = []
            for (let i = 0; i < newDoc.length; i++) {
                question.
            }

            questionArray
            this.setState({
                questions: this.state.questions.concat(questionArray)
            })
        })


        // for (let i = 1; i < 2; i++) {
        //     filtered.push(questions[Math.floor(Math.random() * (1 + 1 - 0)) + 0])
        //     console.warn(filtered)
        // }

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

        return (
            <DrawerLayout
                ref={drawer => this.drawer = drawer}
                drawerWidth={240}
                drawerPosition={DrawerLayout.positions.Left}
                drawerType='front'
                drawerBackgroundColor="#ddd"
                renderNavigationView={this.viewOpened}
            >
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.textSelect}>Questions for {this.name} ID of {this.subjectId}</Text>
                        <View>
                            <Text>{this.subjectName}</Text>
                        </View>
                        <View style={styles.outerView}>
                            {
                                // console.warn("its here", this.state.questions)

                                this.state.questions.map((data, i) => {
                                    const letters = ["A", "B", "C", "D"]
                                    const number = i + 1
                                    return (
                                        <View style={styles.questionView}>
                                            <Text style={styles.questionText}>Question {number} of 20</Text>
                                            <HTMLView
                                                value={data.question_text}
                                                stylesheet={styles}
                                            />
                                            <View style={styles.answerView}>
                                                {
                                                    data.options.map(opt => {

                                                        if (opt.question_id == data.question_id) {
                                                            letters.map(letter => {
                                                                return (
                                                                    <View>
                                                                        <HTMLView
                                                                            value={
                                                                                `
                                                                                <p>${letter}. &nbsp &nbsp ${opt.option_text}</p>
                                                                                `
                                                                            }
                                                                        />
                                                                    </View>
                                                                )
                                                            })
                                                        }

                                                    })
                                                }
                                            </View>

                                        </View>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View >
            </DrawerLayout>
        )
    }
}

const styles = StyleSheet.create({
    p: {
        fontSize: 17
    },
    outerView: {

    },
    container: {
        alignItems: "center",
        backgroundColor: "#fafafa",
        flex: 1,
    },
    textSelect: { fontSize: 20, fontWeight: "bold", textAlign: "center", },
    picker: { height: 40, width: 300, backgroundColor: "#5FA046", marginTop: 30, color: "#fff" },
    iconView: {
        position: "relative",
        bottom: 35,
        left: 265


    },
    questionText: {
        paddingBottom: 10,
        fontSize: 16
    },
    questionView: {
        padding: 20,
        margin: 10,
        backgroundColor: "#fff"

    },
    answerView: {
        padding: 10
    }



})
export default Questions;