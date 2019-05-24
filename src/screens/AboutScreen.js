import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, } from 'react-native'
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import SideDrawerComponent from '../components/SideDrawerComponent/SideDrawerComponent'
import ActivationScreenHeader from "../components/ActivationScreenHeader/ActivationScreenHeader"



class About extends Component {
    state = {
        faq: [
            {
                id: 1,
                question: "How do i get a pin?",
                answer: "About FaceyourbookApp v 1.0"
            },

        ]

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
        const { faq } = this.state
        return (
            <View style={styles.container}>
                <DrawerLayout
                    ref={drawer => this.drawer = drawer}
                    drawerWidth={240}
                    drawerPosition={DrawerLayout.positions.Left}
                    drawerType='front'
                    drawerBackgroundColor="#ddd"
                    renderNavigationView={this.viewOpened}
                >
                    <ActivationScreenHeader onClickDrawerOpen={() => this.drawer.openDrawer()} processText={"ABOUT PAGE"} />
                    <ScrollView style={[styles.faqView, styles]} >
                        {
                            faq.map(item => {
                                return (

                                    <View key={item.id} style={styles.faq}>
                                        <View style={styles.questionView}>
                                            <Text style={styles.questionText}> {item.question} </Text>
                                        </View>
                                        <View style={styles.answerView}>
                                            <Text style={styles.answerText}>{item.answer} </Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </DrawerLayout>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    paymentDetails: {
        height: 180,
        alignItems: "center",
        paddingTop: 70,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: 'monospace',
        color: "#fff"
    },
    DetailsText: {

    },
    faqText: {
        fontSize: 22,
        fontWeight: "bold",
        paddingTop: 10,

        textAlign: "center"


    },
    faqView: {

    },
    faq: {
        backgroundColor: "#fafafa",
        padding: 15,
        elevation: 2,
        margin: 20,
        borderRadius: 10,

    },
    questionText: {
        fontSize: 18,
        fontWeight: "bold",



    },
    answerText: {
        fontSize: 15,
        textAlign: "justify",


    },
    answerView: {
        marginTop: 5
    },
    textPayment: {
        fontSize: 17
    },
    textPaymentBold: {
        fontWeight: "bold"
    },
    textPaymentJustify: {
        textAlign: "justify"
    }
})

export default About;