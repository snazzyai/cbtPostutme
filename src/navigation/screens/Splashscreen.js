import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'



class Splashscreen extends Component {

    state = {
        signedin: false
    }
    // componentDidMount() {
    //     setTimeout(function () {
    //         this.props.navigation.navigate('Signin')
    //     }, 3000)
    // }
    render() {
        return (
            <View>
                <Text>Splashscreen</Text>
            </View>
        );
    }
}

export default Splashscreen;