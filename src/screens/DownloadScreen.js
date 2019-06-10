import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, BackHandler, Linking } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-community/async-storage'
import ActivationScreenHeader from '../components/ActivationScreenHeader/ActivationScreenHeader'
import Axios from 'axios'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import Datastore from 'react-native-local-mongodb'
import SchoolListComponent from '../components/SchoolListComponent/SchoolListComponent';





// const db = SQLite.openDatabase('faceyourbook.db', '1.0', '', 1);



const dbstoreSubjects = new Datastore({ filename: 'faceyourbook', autoload: true });
const dbstoreData = new Datastore({ filename: 'questionData', autoload: true });


// dbstoreSubjects.remove({}, { multi: true }, function (err, numRemoved) {
//     console.warn("removed mongo")
// });
// dbstoreData.remove({}, { multi: true }, function (err, numRemoved) {
//     console.warn("removed mongo")
// });

// dbstore.insert([{ subject_id: 1, subject_name: "biology", school_name: "Unilag" }], (err, newDoc) => {
//     if (err) {
//         console.warn(err)
//     }
//     console.warn("successfully inserted")
// })
// dbstoreSubjects.find({}, (err, newDoc) => {
//     console.warn(newDoc)
// })
// dbstoreData.find({}, (err, newDoc) => {
//     console.warn(newDoc)
// })


class DownloadScreen extends Component {

    name = this.props.navigation.getParam('name')


    state = {
        isLoading: true,
        error: false,
    }


    setSubjectToDb = (response, schoolName) => {
        // db.transaction(function (txn) {
        //     console.warn("first query")
        //     txn.executeSql('DROP TABLE IF EXISTS subjects', []);
        //     txn.executeSql('CREATE TABLE IF NOT EXISTS subjects(subject_id INTEGER PRIMARY KEY NOT NULL, subject_name VARCHAR(30), school_name VARCHAR(30))', []);
        //     console.warn("second query")
        //     response.data.map(data => {
        //         txn.executeSql('INSERT INTO subjects(subject_id, subject_name, school_name) VALUES (:subject_id, :subject_name, :school_name)', [data.id, data.name, schoolName], function (tx, res) {
        //         });
        //     })
        //     console.warn("third query")
        //     txn.executeSql(`SELECT * 
        //                 FROM subjects`,
        //         [], function (tx, res) {
        //             for (let i = 0; i < res.rows.length; ++i) {
        //                 console.warn('item:', res.rows.item(i));
        //             }
        //         });

        //     console.warn('final query loaded')

        // });

        response.data.map(data => {
            const subjectData = {
                subject_id: data.id,
                subject_name: data.name,
                school_name: schoolName
            }

            dbstoreSubjects.insert(subjectData, (err, newDoc) => {
                console.warn(newDoc)
            })
        })

    }

    populateQuestions = (response, schoolName) => {
        console.warn(schoolName)
        console.warn("now in populate")
        // const response = {
        //     "data": [
        //         {
        //             "id": 10531,
        //             "author_id": 0,
        //             "test_id": 151,
        //             "question": "<p><strong>If the distance between a 13-foot ladder and a vertical wall is 5 feet along the ground, how high can a person climb if the ladder is inclined against the wall?</strong></p>",
        //             "topic_tag": "Trigonometry",
        //             "year_tag": null,
        //             "duplicated": null,
        //             "created_at": "2018-11-23 14:19:28",
        //             "updated_at": "2019-03-23 10:09:29",
        //             "explanation": "<p>Applying Pythagoras theorem, which states that in a right-angled triangle, the square of the hypotenuse(longest) side is equal to the square of the sum of the other two sides.</p>\r\n<p>Thus, the problems above&nbsp;make&nbsp;up a triangle with the ladder inclined to the vertical wall(c).</p>\r\n<p>Thus c<sup>2</sup>=a<sup>2</sup> + b<sup>2</sup></p>\r\n<p>Given that: c = 13ft, b = 5ft, a =?. Therefore, we have:</p>\r\n<p>13<sup>2</sup>=a<sup>2</sup> + 5<sup>2</sup></p>\r\n<p>169 = a<sup>2</sup> + 25</p>\r\n<p>a<sup>2</sup> = 169 - 25</p>\r\n<p>a<sup>2</sup> = 144</p>\r\n<p>a =&nbsp;&radic;144</p>\r\n<p>a = 12feet</p>",
        //             "explanation_by": 19,
        //             "explanation_user_name": "Habeeb bdev",
        //             "deleted_at": null,
        //             "deleted_by": null,
        //             "subject_id": 1,
        //             "difficulty_number": 8,
        //             "track_type": "learning and evaluation",
        //             "topic_id": 29,
        //             "options": [
        //                 {
        //                     "id": 37976,
        //                     "q_id": 10531,
        //                     "option_text": "18 feet",
        //                     "correct": "0",
        //                     "created_at": "2018-11-23 15:32:20",
        //                     "updated_at": "2018-11-23 15:32:20",
        //                     "deleted_at": null,
        //                     "explanation": null
        //                 },
        //                 {
        //                     "id": 37977,
        //                     "q_id": 10531,
        //                     "option_text": "13 feet",
        //                     "correct": "0",
        //                     "created_at": "2018-11-23 15:32:20",
        //                     "updated_at": "2018-11-23 15:32:20",
        //                     "deleted_at": null,
        //                     "explanation": null
        //                 },
        //                 {
        //                     "id": 37978,
        //                     "q_id": 10531,
        //                     "option_text": "8 feet",
        //                     "correct": "0",
        //                     "created_at": "2018-11-23 15:32:20",
        //                     "updated_at": "2018-11-23 15:32:20",
        //                     "deleted_at": null,
        //                     "explanation": null
        //                 },
        //                 {
        //                     "id": 37979,
        //                     "q_id": 10531,
        //                     "option_text": "12 feet",
        //                     "correct": "0",
        //                     "created_at": "2018-11-23 15:32:20",
        //                     "updated_at": "2018-11-23 15:32:20",
        //                     "deleted_at": null,
        //                     "explanation": null
        //                 }
        //             ],
        //             "answer": {
        //                 "id": 135407,
        //                 "q_id": 10531,
        //                 "option_id": 37979,
        //                 "option_text": "12 feet"
        //             }
        //         },
        //         {
        //             "id": 10532,
        //             "author_id": 0,
        //             "test_id": 151,
        //             "question": "<p><strong><span style=\"font-size: 11pt; line-height: 115%; font-family: Calibri, sans-serif;\">What is the length of an arc of a circle with a radius of 5 if it subtends an angle of 60</span><span style=\"font-size: 11pt; line-height: 115%; font-family: Calibri, sans-serif;\">&nbsp;at the center?</span></strong></p>",
        //             "topic_tag": "Circle Geometry",
        //             "year_tag": null,
        //             "duplicated": null,
        //             "created_at": "2018-11-23 14:19:28",
        //             "updated_at": "2019-03-05 00:35:07",
        //             "explanation": "<p><span style=\"text-decoration: underline;\">&nbsp; &nbsp;ϴ&nbsp;&nbsp;</span> X 2&pi;r</p>\r\n<p>360&nbsp;</p>\r\n<p>where r is the radius of the circle and&nbsp;&pi; = <span style=\"text-decoration: underline;\">22</span></p>\r\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;7</p>\r\n<p>So, we have;</p>\r\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>\r\n<p><span style=\"text-decoration: underline;\">&nbsp; &nbsp;60&nbsp;&nbsp;</span> X 2 X <span style=\"text-decoration: underline;\">22</span> X 5</p>\r\n<p>&nbsp; 360&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 7&nbsp;</p>\r\n<p><span style=\"text-decoration: underline;\">110</span>&nbsp;&nbsp;= 5.24m (<strong>B</strong>)</p>\r\n<p>&nbsp; 21</p>",
        //             "explanation_by": 19,
        //             "explanation_user_name": "Habeeb bdev",
        //             "deleted_at": null,
        //             "deleted_by": null,
        //             "subject_id": 1,
        //             "difficulty_number": 100,
        //             "track_type": "learning and evaluation",
        //             "topic_id": 16,
        //             "options": [
        //                 {
        //                     "id": 37980,
        //                     "q_id": 10532,
        //                     "option_text": "3.14",
        //                     "correct": "0",
        //                     "created_at": "2018-11-23 15:32:20",
        //                     "updated_at": "2018-11-23 15:32:20",
        //                     "deleted_at": null,
        //                     "explanation": null
        //                 },
        //                 {
        //                     "id": 37981,
        //                     "q_id": 10532,
        //                     "option_text": "5.24",
        //                     "correct": "0",
        //                     "created_at": "2018-11-23 15:32:20",
        //                     "updated_at": "2018-11-23 15:32:20",
        //                     "deleted_at": null,
        //                     "explanation": null
        //                 },
        //                 {
        //                     "id": 37982,
        //                     "q_id": 10532,
        //                     "option_text": "2.62",
        //                     "correct": "0",
        //                     "created_at": "2018-11-23 15:32:20",
        //                     "updated_at": "2018-11-23 15:32:20",
        //                     "deleted_at": null,
        //                     "explanation": null
        //                 },
        //                 {
        //                     "id": 37983,
        //                     "q_id": 10532,
        //                     "option_text": "4.85",
        //                     "correct": "0",
        //                     "created_at": "2018-11-23 15:32:20",
        //                     "updated_at": "2018-11-23 15:32:20",
        //                     "deleted_at": null,
        //                     "explanation": null
        //                 }
        //             ],
        //             "answer": {
        //                 "id": 135408,
        //                 "q_id": 10532,
        //                 "option_id": 37981,
        //                 "option_text": "5.24"
        //             }

        //         },
        //     ]
        // }
        const lastObject = response.data[response.data.length - 1]

        response.data.map(data => {
            const otherData = {
                question_id: data.id,
                question_text: data.question,
                question_explanation: data.explanation,
                subject_id: data.subject_id,
                answer_id: data.answer.id,
                options: data.options.map(opt => {
                    return {
                        option_id: opt.id,
                        option_text: opt.option_text,
                        question_id: opt.q_id
                    }
                }),
                answers: {
                    answer_id: data.answer.id,
                    question_id: data.answer.q_id,
                    option_id: data.answer.option_id,
                    option_text: data.answer.option_text
                },
                school_name: schoolName
            }
            dbstoreData.insert(otherData, (err, newDoc) => {
                if (err) {
                    console.warn(err)
                }
                if (lastObject.id === newDoc.question_id) {
                    this.props.navigation.navigate("MyExams", {
                        name: this.name
                    })
                }

            })

        })



    }



    getSubjects = (schoolName) => {
        Axios.get(`http://learn.simbibot.com/api/putme_schools/${schoolName}/subjects`)
            .then(async response => {
                // for testing 
                // await AsyncStorage.removeItem(`paidExams`)


                console.warn(response)
                const getPaidExams = await AsyncStorage.getItem(`paidExams`)
                const examToAdd = [`${schoolName}`]

                if (getPaidExams !== null) {
                    const newExam = JSON.parse(getPaidExams).concat(examToAdd);
                    AsyncStorage.setItem('paidExams', JSON.stringify(newExam));
                }
                else {
                    AsyncStorage.setItem('paidExams', JSON.stringify(examToAdd));
                }
                console.warn("has set school as paid")



                console.log("going to setsubject")
                this.setSubjectToDb(response, schoolName)
                await this.getQuestions(schoolName)
                console.warn("in getsubjects")

            })
            .catch(e => console.warn(e))
    }

    getQuestions = (schoolName) => {
        Axios.get(`http://learn.simbibot.com/api/putme_schools/${schoolName}/questions`)
            .then(async response => {
                console.warn("fetched questions")
                await this.populateQuestions(response, schoolName)
                // console.warn("populated")
            }).catch(e => alert(e))
    }


    componentDidMount() {
        const schoolName = this.name || "University of Lagos"

        // testing
        // await AsyncStorage.removeItem(`paidExams`)
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate('PastQuestions'));

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


        // await this.populateQuestions(schoolName)

        this.getSubjects(schoolName)






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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("MyExams")} >
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