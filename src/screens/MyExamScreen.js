import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';



class MyExams extends Component {
    state = {
        paidExams: [
            {
                id: 1,
                name: "UNICAL",

            },
            {
                id: 2,
                name: "UNIZIK",

            }
        ]
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={{ padding: 10, backgroundColor: "#fafafa" }} onPress={() => this.props.navigation.openDrawer()}>
                    <Icon name="md-menu" size={40} color="#000" />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    {
                        this.state.paidExams.map(exam => {
                            return <ButtonComponent text={`${exam.name} Questions`} />
                        })
                    }

                </View>

            </View >
        )
    }
}

export default MyExams;