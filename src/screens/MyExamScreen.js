import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import axios from 'axios'



class MyExams extends Component {
    state = {
        exams: [],
        status: ""
    }


    componentDidMount() {

    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size='large' color='black' />
            </View>
        )
    }

}

export default MyExams;