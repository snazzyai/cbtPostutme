import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native'



class BankTransferScreen extends Component {
    state = {
        faq: [
            {
                id: 1,
                question: "How do i get a pin?",
                answer: "Visit any GTBank Outlet(You can also make use of internet bank transfer) and pay N1500 only into Account Name: Brimatel Global Network.Account Number: 0117562221. Then contact Olamide via whatsapp on this number(09093905099) to get your pin"
            },
            {
                id: 2,
                question: "What is the app all about:",
                answer: "CBT application is a world class mobile Application developed and enriched with UNILAG'S Post UTME past questions. Answers and detailed explanations in othre to guarantee users a successful application"
            },
            {
                id: 3,
                question: "What is the app all about:",
                answer: "CBT application is a world class mobile Application developed and enriched with UNILAG'S Post UTME past questions. Answers and detailed explanations in othre to guarantee users a successful application"
            },
            {
                id: 4,
                question: "What is the app all about:",
                answer: "CBT application is a world class mobile Application developed and enriched with UNILAG'S Post UTME past questions. Answers and detailed explanations in othre to guarantee users a successful application"
            }
        ]

    }
    render() {
        const { faq } = this.state
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../../assets/images/background.jpg")} style={styles.paymentDetails}>
                    <Text style={styles.headerText}>BANK PAYMENT</Text>
                </ImageBackground>
                <ScrollView style={[styles.faqView, styles]} >
                    <Text style={styles.faqText}>Payment Details</Text>
                    <View style={styles.faq}>
                        <Text style={[styles.textPayment, styles.texPaymentJustify]}>Visit any GTBank Outlet(You can also make use of internet bank transfer) and pay N1500 only into:</Text>
                        <Text></Text>
                        <Text style={[styles.textPayment, styles.textPaymentBold]}>Account Name: Brimatel Global Network</Text>
                        <Text></Text>
                        <Text style={[styles.textPayment, styles.textPaymentBold]}>Account Number: 0117562221</Text>
                        <Text ></Text>
                        <Text style={[styles.textPayment, styles.texPaymentJustify]}>Then contact Olamide via whatsapp on this phone number (09093905099) to get your pin.</Text>
                    </View>
                    <Text style={styles.faqText} >F.A.Qs</Text>
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

export default BankTransferScreen;