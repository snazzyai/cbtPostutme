import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Linking, BackHandler } from 'react-native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import Html from 'react-native-htmlview';
import Datastore from 'react-native-local-mongodb'
import lodash from 'lodash'
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import { ActivityIndicator, Button, RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'underscore'






const dbstoreSubjects = new Datastore({ filename: 'faceyourbook', autoload: true });
const dbstoreData = new Datastore({ filename: 'questionData', autoload: true });

// <input type="radio name="question${i}" value=${opt.option_text} />





class Questions extends Component {

    subjectId = this.props.navigation.getParam('subjectId')
    name = this.props.navigation.getParam('name')
    subjectName = this.props.navigation.getParam('subjectName')



    state = {
        shouldSet: false,
        radioValue: "",
        radioValueArray: [],
        answers: [],
        questions: null,
        score: 0,
        currentQuestionIndex: 0,
        questionNumber: 1,
        selectedAnswer: null,
        selectedArray: []

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

        dbstoreData.find({ subject_id: subject }, async (err, newDoc) => {
            let questionArray = []
            newDoc = lodash.shuffle(newDoc)
            for (let i = 0; i < 20; i++) {
                questionArray.push(newDoc[i])
            }

            await this.setState({
                questions: questionArray,
                currentQuestionIndex: 0
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

    prev = () => {
        if (this.state.questionNumber <= 1) {
            this.setState({
                questionNumber: 20,
                currentQuestionIndex: 19
            })
        }

        else {
            this.setState({
                questionNumber: this.state.questionNumber - 1,
                currentQuestionIndex: this.state.currentQuestionIndex - 1
            })
        }
    }
    next = () => {

        const selected = []
        const { selectedAnswer, questions, currentQuestionIndex } = this.state
        selected.push(selectedAnswer)


        if (this.state.questionNumber >= 20) {
            this.setState({
                questionNumber: 1,
                currentQuestionIndex: 0,
                selectedArray: this.state.selectedArray.concat(selected),

            })
        }

        else {
            this.setState({
                questionNumber: this.state.questionNumber + 1,
                currentQuestionIndex: this.state.currentQuestionIndex + 1,
                selectedArray: this.state.selectedArray.concat(selected),
            })
        }



    }

    //handle button radio press

    handleRadio = (datakey, optkey) => {
        const { radioValueArray } = this.state
        const filteredArray = radioValueArray.filter(data => {
            return data.id === datakey
        })
        if (filteredArray.length > 0) {
            const index = radioValueArray.indexOf(filteredArray[0])
            const newArray = radioValueArray.splice(index, 1)
            this.setState({
                radioValue: optkey,
                radioValueArray: newArray
            })

        }
        const selected = []
        selected.push({
            id: datakey,
            option_id: optkey
        })


        this.setState({
            radioValue: optkey,
            radioValueArray: this.state.radioValueArray.concat(selected)
        })


    }


    onSelectAnswer = (opt, i) => {
        data = this.state.questions[this.state.currentQuestionIndex]
        console.warn(opt.option_id, data.answers.option_id)
        if (this.state.selectedArray.includes(opt.option_id)) {
            return false
        }
        else {
            this.setState({
                selectedAnswer: opt.option_id,
            })
        }


        // selected.push({option_id: opt.option_id})
        // this.setState({
        //     selectedAnswer: this.state.selectedAnswer.concat(selected)
        // })
        // if (opt.option_id === data.answers.option_id) {
        //     console.warn("correct")
        //     // answers.push({ question_id: data.question_id, question_text: data.question_text, explanation: data.question_explanation })
        //     this.setState({
        //         answers: this.state.answers.concat(answers)
        //     })
        // }
        // else {
        //     console.warn("incorrect")
        //     answers = answers.filter(data => {
        //         return opt.option_id == data.answers.option_id
        //     })
        // }
    }

    onSubmit = () => {
        const { radioValueArray } = this.state

        const filtered = []
        this.state.questions.filter(data => {
            radioValueArray.map(opt => {
                if (opt.option_id === data.answers.option_id) {
                    filtered.push(data)
                }
            })
        })

        console.warn("filtered data", filtered)

        alert(`You have ${filtered.length} correct answers`)
    }
    // onButtonPress = (data, optId, optText, qId, key, i) => {

    //     let answers = []
    //     let active = []
    //     if (optId == data.answers.option_id) {
    //         console.warn("correct")
    //         answers.push({ question_id: data.question_id, question_text: data.question_text, explanation: data.question_explanation })
    //         checked.push({ option_id: optId })
    //         this.setState({
    //             checked: optId,
    //             selectedButton: qId
    //         })
    //     }
    //     else {
    //         console.warn("incorrect")
    //         answers = answers.filter(data => {
    //             return optId == data.answers.option_id
    //         })
    //         this.setState({
    //             checked: optId,
    //             selectedButton: qId
    //         })

    //     }

    //     console.warn(answers)


    // }
    render() {
        const { currentQuestionIndex, questions, selectedArray, radioValue, radioValueArray, shouldSet } = this.state
        if (this.state.questions === null) {
            return (<View><ActivityIndicator /></View>)
        }

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
                        <View style={styles.headView}>
                            <Text style={styles.textSelect}>Questions for {this.name || "University of Lagos"}</Text>
                            <View style={styles.subjectName}>
                                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{this.subjectName}</Text>
                            </View>

                        </View>

                        <View style={styles.outerView}>
                            {
                                questions.map((data, datakey) => {
                                    const number = datakey + 1
                                    return (
                                        <View style={styles.questionView}>
                                            <Text style={styles.questionText}>Question {number} of 20</Text>
                                            <Html
                                                value={data.question_text}
                                                stylesheet={styles}
                                            />
                                            <View style={styles.answerView}>
                                                {data.options.map((opt, optkey) => {
                                                    return (

                                                        <View key={opt.option_id} >
                                                            <RadioButton
                                                                value={radioValue}
                                                                status={radioValueArray.filter(data => {
                                                                    return data.id === datakey && data.option_id === opt.option_id
                                                                }).length !== 0 ? 'checked' : 'unchecked'}
                                                                onPress={() => this.handleRadio(datakey, opt.option_id)}
                                                            />
                                                            <Html
                                                                value={`<h4>${opt.option_text}</h4>`}
                                                                stylesheet={styles}
                                                            />

                                                        </View>

                                                    )
                                                })}
                                            </View>

                                        </View>
                                    )
                                })
                            }

                        </View>
                        <View style={{ width: "70%" }}>
                            <Button style={{ backgroundColor: "#5FA046" }} onPress={this.onSubmit}>
                                <Text style={{ fontSize: 18, color: "#fff" }}>SUBMIT</Text>
                            </Button>
                        </View>
                    </ScrollView>
                </View >
            </DrawerLayout >
        )
    }
}

const styles = StyleSheet.create({
    headView: {
        textAlign: 'center',
        padding: 15
    },
    p: {
        fontSize: 18,
        color: "black"
    },

    btn: {
        height: 60,
        fontSize: 25
    },
    outerView: {
        borderRadius: 20,
    },
    subjectName: {
        textAlign: "center"
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
        fontSize: 17,
        fontWeight: "bold",
    },
    questionView: {
        padding: 20,
        margin: 10,
        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 20,

    },
    answerView: {
        padding: 10,
        textAlign: 'center'
    },
    questionNavigation: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10
    },
    btnOption: {
        backgroundColor: "#5FA046",
        margin: 10,
        height: 53,
        borderRadius: 25
    }



})
export default Questions;