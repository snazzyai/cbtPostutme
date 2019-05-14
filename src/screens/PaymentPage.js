import React, { Component } from 'react';
import { View, Text, Dimensions, Button } from 'react-native'
import { WebView } from 'react-native-webview'


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const html = `<form>
<button>Submit</button>
</form>`

class PaymentPage extends Component {

    render() {
        return (
            <View>
                <WebView
                    style={styles.webview}
                    source={{ uri: "https://www.google.com" }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={false}
                    scalesPageToFit={true}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    webview: {
        flex: 1,
        backgroundColor: 'yellow',
        width: deviceWidth,
        height: deviceHeight
    }
});
export default PaymentPage