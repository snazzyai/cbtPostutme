import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"


class PutmeScreen extends Component {

    render() {
        return (
            <View>
                <TouchableOpacity style={{ padding: 10, backgroundColor: "#fafafa" }} onPress={() => this.props.navigation.openDrawer()}>
                    <Icon name="md-menu" size={30} color="#000" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>Putme Questions</Text>
                </View>
            </View >
        )
    }
}

export default PutmeScreen;