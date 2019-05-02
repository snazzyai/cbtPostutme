import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"



class WaecScreen extends Component {

    render() {
        return (
            <View>
                <TouchableOpacity style={{ padding: 10, backgroundColor: "#fafafa" }} onPress={() => this.props.navigation.openDrawer()}>
                    <Icon name="md-menu" size={40} color="#000" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: "center" }}>Waec Questions</Text>
                </View>

            </View >
        )
    }
}

export default WaecScreen;