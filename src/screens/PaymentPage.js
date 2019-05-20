import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import ActivationScreenHeader from '../components/ActivationScreenHeader/ActivationScreenHeader'
import RNPaystack from 'react-native-paystack';
import AsyncStorage from '@react-native-community/async-storage';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import ValidationComponent from 'react-native-form-validator';
import Axios from 'axios';

// import CardCharge from '../components/CardCharge/CardCharge'





RNPaystack.init({ publicKey: 'pk_test_a3c6507e7a82c63308de9c5863bbe0950492d508' });


class PaymentPage extends ValidationComponent {
    name = this.props.navigation.getParam('name')
    id = this.props.navigation.getParam('id')

    state = {
        isLoading: false,
        isDisabled: false,
        email: "",
        cardNumber: "",
        testcardNumber: "4084084084084081",
        expiryMonth: "",
        testexpiryMonth: "10",
        expiryYear: "",
        testexpiryYear: "25",
        monthYear: "",
        cvv: "",
        testcvv: "408",
        schoolName: this.name
    }



    async componentDidMount() {
        const data = await AsyncStorage.getItem('userData')
        const converted = JSON.parse(data)
        const email = converted.email
        this.setState({
            email: email
        })
    }

    monthYearSplitter = () => {
        let toSplit = this.state.monthYear.split("")
        let month = toSplit.slice(0, 2)
        month = month.join("")
        let year = toSplit.slice(3, 5)
        year = year.join("")
        return [month, year]

    }

    validateCard = async () => {
        this.setState(prevState => {
            return {
                isLoading: !prevState.isLoading,
                isDisabled: !prevState.isDisabled
            }
        })


        this.validate({
            cardNumber: { minlength: 15, maxlength: 17, numbers: true, required: true },
            monthYear: { minlength: 3, maxlength: 5, required: true },
            cvv: { minlength: 2, maxlength: 3, numbers: true, required: true }
        });

        if (this.getErrorMessages()) {
            alert(this.getErrorMessages())
            this.setState(prevState => {
                return {
                    ...prevState,
                    isLoading: !prevState.isLoading,
                    isDisabled: !prevState.isDisabled
                }
            })

        }
        else {
            const splitted = this.monthYearSplitter()
            const splittedFirst = splitted[0]
            const splittedSecond = splitted[1]
            await this.setState(prevState => {
                return {
                    ...prevState,
                    expiryMonth: splittedFirst,
                    expiryYear: splittedSecond
                }
            })
            this.chargeCard()

        }
    }

    chargeCard = async () => {
        const data = await AsyncStorage.getItem('userData')
        const converted = JSON.parse(data)
        const userId = converted.user_id
        const deviceId = converted.device_id
        //testmode
        this.setState(prevState => {
            return {
                isLoading: true,
                isDisabled: true
            }
        })

        RNPaystack.chargeCard({
            cardNumber: this.state.testcardNumber,
            expiryMonth: this.state.testexpiryMonth,
            expiryYear: this.state.testexpiryYear,
            cvc: this.state.testcvv,
            email: this.state.email,
            amountInKobo: 200000,
        })
            .then(response => {

                const reference = response.reference
                const schoolName = this.state.schoolName

                Axios.get(`http://backend.faceyourbookapps.com/verify-transaction?transaction_ref=${reference}&user_id=${userId}&exam_name=${schoolName}&device_id=${deviceId}`)
                    .then((response) => {
                        if (response.status === "error") {
                            alert("unable to successfully validate")
                        }
                        this.props.navigation.navigate('Download', {
                            name: this.name
                        })
                    }).catch(e => console.warn(e))


                this.setState(prevState => {
                    return {
                        isLoading: false,
                        isDisabled: false
                    }
                })

            })
            .catch(error => {

                console.warn(error.message);

                this.setState(prevState => {
                    return {
                        isLoading: false,
                        isDisabled: false
                    }
                })
            })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container} >
                    <ActivationScreenHeader processText={"Payment Page"} />

                    <View style={styles.paymentMain}>
                        <View>
                            <Text style={styles.email}>{this.state.email}</Text>
                            <Text style={{ fontSize: 30, color: "#5FA046", textAlign: "center" }}>N2000</Text>
                        </View>

                        <View style={styles.paymentView}>
                            <View style={styles.cardNumberView}>
                                <Text style={styles.cardNumberText}>CARD NUMBER</Text>
                                <TextInput keyboardType="phone-pad" style={styles.cardNumber} onChangeText={(value) => this.setState({ cardNumber: value })} placeholder={`0000 0000 0000 0000`} />
                            </View>
                            <View style={styles.othersView}>
                                <View style={styles.othersViewOne}>
                                    <Text style={styles.cardNumberText}>VALID TILL</Text>
                                    <TextInput keyboardType="phone-pad" onChangeText={(value) => this.setState({ monthYear: value })} style={styles.validTill} placeholder={`MM/YY`} />
                                </View>
                                <View style={styles.othersViewTwo}>
                                    <View style={styles.othersViewCvv}><Text style={styles.cardNumberText}>CVV</Text><TouchableOpacity><Text style={{ color: "blue", paddingTop: 5 }}>Help?</Text></TouchableOpacity></View>
                                    <TextInput secureTextEntry keyboardType="phone-pad" onChangeText={(value) => this.setState({ cvv: value })} style={styles.cvv} placeholder={`123`} />
                                </View>
                            </View>
                            <ButtonComponent onPress={this.chargeCard} isDisabled={this.state.isDisabled} text={'PAY N2000'} isLoading={this.state.isLoading} externalStyle={{ marginLeft: 28 }} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    paymentMain: {
        justifyContent: "center",
        alignItems: 'center',
    },
    amount: {

    },
    paymentView: {
        width: "90%",
        elevation: 3,
        marginTop: 30,
        backgroundColor: "#fff",
        padding: 20,
        marginBottom: 10

    },
    cardNumber: {
        height: 50,
        width: "100%",
        fontSize: 18,
        backgroundColor: "#ECF2F3",
        borderRadius: 10,
        paddingLeft: 5
    },
    cardNumberText: {
        fontSize: 20
    },
    othersView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    validTill: {
        height: 50,
        width: 100,
        fontSize: 18,
        backgroundColor: "#ECF2F3",
        borderRadius: 10
    },
    email: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold"
    },
    othersViewOne: {
        marginTop: 20

    },
    othersViewTwo: {
        paddingTop: 20
    },
    othersViewCvv: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    amount: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: "bold"
    },
    cvv: {
        height: 50,
        width: 100,
        fontSize: 18,
        backgroundColor: "#ECF2F3",
        borderRadius: 10
    }

});
export default PaymentPage