import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Linking, BackHandler, ImageBackground } from 'react-native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import Html from 'react-native-htmlview';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import { ActivityIndicator, Button, RadioButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import MenuDrawer from '../components/MenuDrawerComponent/MenuDrawerComponent'









let color = "black"


class Corrections extends Component {
    filtered = this.props.navigation.getParam('filtered')
    data = this.props.navigation.getParam('data')
    radioValue = this.props.navigation.getParam('radioValue')
    school = this.props.navigation.getParam('school')
    subject = this.props.navigation.getParam('subject')


    state = {
        questions: [],
        filtered: [],
        radioValue: [],
    }

    componentDidMount() {

        this.setState({
            questions: this.data,
            filtered: this.filtered,
            radioValue: this.radioValue,
        })

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

    onSubmit = () => {
        this.props.navigation.navigate('SelectSubject')
    }

    render() {
        const { filtered, questions, radioValue } = this.state
        const percent = Math.floor((filtered.length / 20) * 100)


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
                        <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: "#fff", marginBottom: 10 }} >{this.name || "UNIVERSITY OF LAGOS"}</Text>
                    </View>

                    <ScrollView>
                        <View style={styles.headView}>

                            <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", color: "#fff" }}>{this.subject} correction</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: filtered.length < 10 ? "yellow" : "#fafafa" }} >Your total score is {filtered.length}/20 </Text>
                            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", color: percent < 50 ? "yellow" : "#fafafa" }}>You got {percent}% </Text>

                        </View>

                        <View style={styles.outerView}>
                            {
                                questions.map((data, datakey) => {
                                    const number = datakey + 1
                                    return (
                                        <View style={styles.questionView}>
                                            <Text style={styles.questionText}>Question {number} of 20</Text>
                                            <Html
                                                value={`<h4>${data.question_text}</h4>`}
                                                stylesheet={styles}
                                            />
                                            <View style={styles.answerView}>
                                                {radioValue.map(value => {

                                                    if (value.id === datakey) {
                                                        if (value.option_text === data.answers.option_text) {
                                                            color = "green"
                                                        }
                                                        else {
                                                            color = "red"
                                                        }
                                                        return (
                                                            <Html
                                                                value={`<h4>Your Answer: ${value.option_text}</h4>`}
                                                                stylesheet={styles}
                                                            />
                                                        )
                                                    }
                                                    else {
                                                        return false
                                                    }
                                                })}

                                                <Html
                                                    value={`<h4>Correct Answer: ${data.answers.option_text}</h4>`}
                                                    stylesheet={styles}
                                                />
                                                <Html
                                                    value={`<h4>Explanation: ${data.question_explanation}</h4>`}
                                                    stylesheet={styles}
                                                />
                                            </View>

                                        </View>
                                    )
                                })
                            }

                        </View>
                        <View style={{ width: "80%", marginLeft: "8%", marginTop: 15, alignItems: "center" }}>
                            <Button mode="outlined" style={{ backgroundColor: "#fff" }} onPress={this.onSubmit}>
                                <Text style={{ fontSize: 18, color: "green" }}>TAKE ANOTHER EXAM</Text>
                            </Button>
                        </View>
                    </ScrollView>
                </ImageBackground>
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
    h4: {
        color: `${color}`,
        fontSize: 18,
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
export default Corrections;