import React, { Component } from 'react';
import { View, Text } from 'react-native'
import HTML from 'react-native-render-html';

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

class PaymentPage extends Component {

    render() {
        return (
            <View>
                <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} />
            </View>
        )
    }
}

export default PaymentPage