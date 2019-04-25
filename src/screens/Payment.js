import React, { Component } from 'react';
import { View, Text } from "react-native"


class Payment extends Component {
    state = {}
    render() {
        const { navigation } = this.props
        const id = navigation.getParam('id')
        const type = navigation.getParam('type')

        return (
            <View><Text>Payment for <Text>{JSON.stringify(type)}</Text></Text></View>
        );
    }
}

export default Payment;