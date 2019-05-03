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
        axios.get('https://learn.simbibot.com/public/api/putme_schools')
            .then((response) => this.setState({
                exams: response.data
            }))

    }
    render() {
        if (this.state.exams.length === 0) {
            return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size='large' color='black' />
                </View>
            )
        }
        return (
            <View>
                <ScrollView>
                    <TouchableOpacity style={{ padding: 10, backgroundColor: "#fafafa" }} onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name="md-menu" size={40} color="#000" />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        {
                            this.state.exams.schools.map((school, i) => {
                                return (
                                    <View style={{ alignItems: "center" }} key={i}>
                                        <ButtonComponent externalStyle={{ width: "90%", height: 55 }} text={school} onPress={() => this.props.navigation.navigate('SelectSubject', {
                                            id: i,
                                            name: school

                                        })} />
                                    </View>

                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View >
        )
    }
}

export default MyExams;