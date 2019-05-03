import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Picker } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import axios from 'axios'




class SelectSubject extends Component {
    name = this.props.navigation.getParam('name')
    id = this.props.navigation.getParam('id')
    state = {
        subject: "",

    }


    render() {

        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <ScrollView>
                    <Picker
                        selectedValue={this.state.language}
                        style={{ height: 50, width: "70%", backgroundColor: "green" }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ subject: itemValue })
                        }>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                    <Text>Select subject for {this.name}</Text>
                </ScrollView>
            </View >
        )
    }
}

export default SelectSubject;