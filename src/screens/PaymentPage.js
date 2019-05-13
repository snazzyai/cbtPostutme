import React, { Component } from 'react';
import { View, Text, Dimensions, } from 'react-native'
import HTML from 'react-native-render-html';

const htmlContent = `
        <h1>working</h1>
        <ul>something</ul>
        <form>
            <h2>something</h2>
        </form>
      
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