import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Linking, BackHandler, ImageBackground } from 'react-native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import Html from 'react-native-htmlview';
import Datastore from 'react-native-local-mongodb'
import lodash from 'lodash'
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import { ActivityIndicator, Button, RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'underscore'
import MenuDrawer from '../components/MenuDrawerComponent/MenuDrawerComponent'






const dbstoreSubjects = new Datastore({ filename: 'faceyourbook', autoload: true });
const dbstoreData = new Datastore({ filename: 'questionData', autoload: true });

// <input type="radio name="question${i}" value=${opt.option_text} />





class Questions extends Component {

    subjectId = this.props.navigation.getParam('subjectId')
    name = this.props.navigation.getParam('name')
    subjectName = this.props.navigation.getParam('subjectName')
    state = {
        radioValue: "",
        radioValueArray: [],
        questions: null,


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

        dbstoreData.find({ subject_id: subject, school_name: this.name || "University of Lagos" }, async (err, newDoc) => {
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


    //handle button radio press

    handleRadio = (datakey, optkey, optText) => {
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
            option_id: optkey,
            option_text: optText
        })


        this.setState({
            radioValue: optkey,
            radioValueArray: this.state.radioValueArray.concat(selected)
        })


    }

    onSubmit = () => {
        const { questions, radioValueArray } = this.state

        const filtered = []
        this.state.questions.filter(data => {
            radioValueArray.map(opt => {
                if (opt.option_id === data.answers.option_id) {
                    filtered.push(data)
                }
            })
        })



        this.props.navigation.navigate('QuestionCorrections', {
            filtered: filtered,
            data: questions,
            radioValue: radioValueArray,
            school: this.name,
            subject: this.subjectName
        })

    }

    render() {
        const { questions, radioValue, radioValueArray } = this.state
        const schoolName = this.name
        const subjectName = this.subjectName
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
                <ImageBackground style={styles.container}>
                    <View>
                        <MenuDrawer styling={{ paddingLeft: 20, marginTop: 15, marginBottom: 15, zIndex: 1 }} onClickDrawerOpener={() => this.drawer.openDrawer()} />
                        <Text style={styles.textSelect}>{schoolName || "UNIVERSITY OF LAGOS"} </Text>
                    </View>
                    <ScrollView>
                        <View style={styles.headView}>

                            <View style={styles.subjectName}>
                                <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", color: "#fff" }}>{subjectName}</Text>
                            </View>

                        </View>

                        <View style={styles.outerView}>
                            {
                                //checks the question array and returns question and options
                                questions.map((data, datakey) => {
                                    const letters = ["A.", "B.", "C.", "D."]
                                    const number = datakey + 1
                                    return (
                                        <View style={styles.questionView}>
                                            <Text style={styles.questionText}>Question {number} of 20</Text>
                                            <Html
                                                value={`<h4>${data.question_text}</h4>`}
                                                stylesheet={styles}
                                            />
                                            <View style={styles.answerView}>
                                                {data.options.map((opt, optkey) => {
                                                    return (

                                                        <View style={{ flex: 1, flexDirection: "row" }} key={opt.option_id} >
                                                            {letters[optkey] !== undefined ? <Text style={{ marginTop: 7, fontSize: 17, fontWeight: "bold" }}>{`${letters[optkey]}`}</Text> : <Text style={{ marginTop: 5, fontSize: 17, fontWeight: "bold" }}>E.</Text>}
                                                            <RadioButton
                                                                style={{ zIndex: 1 }}
                                                                value={radioValue}
                                                                status={radioValueArray.filter(data => {
                                                                    return data.id === datakey && data.option_id === opt.option_id
                                                                }).length !== 0 ? 'checked' : 'unchecked'}
                                                                onPress={() => this.handleRadio(datakey, opt.option_id, opt.option_text)}
                                                            />
                                                            <View style={{ paddingTop: 5, paddingRight: 5 }}>
                                                                <Html
                                                                    value={`<div><h4>${opt.option_text}</h4></div>`}
                                                                    stylesheet={styles}
                                                                />
                                                            </View>
                                                        </View>
                                                    )
                                                })}
                                            </View>
                                        </View>
                                    )
                                })
                            }

                        </View>
                        <View style={{ width: "80%", marginLeft: "8%", marginTop: 15, marginBottom: 5, alignItems: "center" }}>
                            <Button mode="outlined" style={{ backgroundColor: "#fff" }} onPress={this.onSubmit}>
                                <Text style={{ fontSize: 18, color: "green" }}>SUBMIT</Text>
                            </Button>
                        </View>
                    </ScrollView>
                </ImageBackground >
            </DrawerLayout >
        )
    }
}

const styles = StyleSheet.create({
    headView: {
        textAlign: 'center',
        padding: 15
    },
    btn: {
        height: 60,
        fontSize: 25
    },
    div: {
        paddingRight: 20
    },
    outerView: {
        borderRadius: 20,
        alignItems: "center"
    },
    subjectName: {
        textAlign: "center"
    },
    container: {
        alignItems: "center",
        backgroundColor: "#5FA046",
        flex: 1,
    },
    textSelect: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        position: "relative",
        bottom: 48,
        marginLeft: 15
    },
    picker: { height: 40, width: 300, backgroundColor: "#5FA046", marginTop: 30, color: "#fff" },
    iconView: {
        position: "relative",
        bottom: 35,
        left: 265


    },
    questionText: {
        paddingBottom: 10,
        fontSize: 17,
        color: "green",
        fontWeight: "bold"
    },
    questionView: {
        padding: 20,
        marginBottom: 10,
        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 20,
        width: "87%"

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