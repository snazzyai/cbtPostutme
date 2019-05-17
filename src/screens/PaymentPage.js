import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import ActivationScreenHeader from '../components/ActivationScreenHeader/ActivationScreenHeader'
import RNPaystack from 'react-native-paystack';
import AsyncStorage from '@react-native-community/async-storage';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import ValidationComponent from 'react-native-form-validator';

// import CardCharge from '../components/CardCharge/CardCharge'





RNPaystack.init({ publicKey: 'pk_test_ad9da22e7023bd7dcf5f91147fc952ded8974ae3' });


class PaymentPage extends ValidationComponent {

    state = {
        isLoading: false,
        isDisabled: false,
        email: "",
        cardNumber: "",
        expiryMonth: "",
        expiryYear: "",
        monthYear: "",
        cvv: "",
        amountInKobo: 200000
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

    chargeCard = () => {
        RNPaystack.chargeCard({
            cardNumber: this.state.cardNumber,
            expiryMonth: this.state.expiryMonth,
            expiryYear: this.state.expiryYear,
            cvc: this.state.cvv,
            email: this.state.email,
            amountInKobo: 150000,
        })
            .then(response => {
                console.warn(response); // card charged successfully, get reference here
                this.setState(prevState => {
                    return {
                        isLoading: !prevState.isLoading,
                        isDisabled: !prevState.isDisabled
                    }
                })
            })
            .catch(error => {
                console.warn(error); // error is a javascript Error object
                console.warn(error.message);
                console.warn(error.code);
                this.setState(prevState => {
                    return {
                        isLoading: !prevState.isLoading,
                        isDisabled: !prevState.isDisabled
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
                            <Text style={styles.amount}>N2000</Text>
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
                            <ButtonComponent onPress={this.validateCard} isDisabled={this.state.isDisabled} text={'PAY N2000'} isLoading={this.state.isLoading} externalStyle={{ marginLeft: 28 }} />
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
    paymentView: {
        width: "90%",
        elevation: 2,
        marginTop: 30,
        backgroundColor: "#fafafa",
        padding: 20,

    },
    cardNumber: {
        height: 70,
        width: "90%",
        fontSize: 20,
    },
    cardNumberText: {
        fontSize: 20
    },
    othersView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    validTill: {
        height: 70,
        width: 100,
        fontSize: 20,
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
        height: 70,
        width: 100,
        fontSize: 20,
    }

});
export default PaymentPage