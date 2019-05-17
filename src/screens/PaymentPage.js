import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import ActivationScreenHeader from '../components/ActivationScreenHeader/ActivationScreenHeader'
import RNPaystack from 'react-native-paystack';
import AsyncStorage from '@react-native-community/async-storage';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent'
import ValidationComponent from 'react-native-form-validator';





RNPaystack.init({ publicKey: 'YOUR_PUBLIC_KEY_HERE' });


class PaymentPage extends ValidationComponent {

    state = {
        isLoading: false,
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

    validateCard = () => {
        this.setState(prevState => {
            return {
                isLoading: !prevState.isLoading
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
                    isLoading: !prevState.isLoading
                }
            })
            const splitted = this.monthYearSplitter()
            const splittedFirst = splitted[0]
            const splittedSecond = splitted[1]
            this.setState(prevState => {
                return {
                    ...prevState,
                    expiryMonth: "" + splittedFirst,
                    expiryYear: "" + splittedSecond
                }
            })
            console.warn("d: " + this.state.expiryMonth)

        }
        else {
            const splitted = this.monthYearSplitter()
            const splittedFirst = splitted[0]
            const splittedSecond = splitted[1]
            this.setState(prevState => {
                return {
                    ...prevState,
                    expiryMonth: "" + splittedFirst,
                    expiryYear: "" + splittedSecond
                }
            })

        }
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
                            <ButtonComponent onPress={this.validateCard} text={'PAY N2000'} isLoading={this.state.isLoading} externalStyle={{ marginLeft: 28 }} />
                            <Text>{this.state.expiryMonth}</Text>

                            <CardCharge
                                isLoading={this.state.isLoading}
                                email={this.state.email}
                                cardNumber={this.state.cardNumber}
                                expiryMonth={this.state.expiryMonth}
                                expiryYear={this.state.expiryYear}
                                cvv={this.state.cvv}
                                amountInKobo={this.state.amountInKobo}
                            />
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