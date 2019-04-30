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
                <View style={styles.paymentDetails}>
                    <Text style={styles.headerText}>PAY WITH BANK</Text>

                </View>
                <ScrollView style={styles.faqView} >
                    <Text style={styles.faqText}>Details</Text>
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
        height: 100,
        alignItems: "center",
        paddingTop: 30,
    },
    headerText: {
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: 'monospace',
    },
    DetailsText: {

    },
    faqText: {
        textAlign: "center",
        fontSize: 20,

    },
    faqView: {

    },
    faq: {
        backgroundColor: "#fafafa",
        padding: 15,
        elevation: 2,
        margin: 20
    },
    questionText: {
        fontSize: 15,
        fontWeight: "bold"

    },
    answerText: {
        fontSize: 15,
        textAlign: "justify"

    },
    answerView: {
        marginTop: 5
    }
})

export default BankTransferScreen;