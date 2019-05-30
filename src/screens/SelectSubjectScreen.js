import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ActivityIndicator, Picker, StyleSheet, BackHandler, Alert } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import SQLite from 'react-native-sqlite-2';



const db = SQLite.openDatabase('faceyourbook.db', '1.0', '', 1);

class SelectSubject extends Component{
    name = this.props.navigation.getParam('name')
    subject = this.props.navigation.getParam('subject')

        state = {
            db,
            subjectId: "",
            // subjects: this.subject,
            subjects: [],
            pastQuestionName: this.name
        
    
        }

    componentDidMount() {
        const {db} = this.state
        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate("MyExams"));
        db.transaction((txn)=>{
            txn.executeSql('SELECT * FROM subjects WHERE school_name = :school_name ', [this.name], async (tx, res) => {
                let subjects = []
                for (let i = 0; i < res.rows.length; i++){
                    subjects.push(res.rows.item(i))
                }
                await this.setState({ subjects: this.state.subjects.concat(subjects) });
            }); 
        })
        
        // const get = await AsyncStorage.getItem("paidExams")
        // const use = JSON.parse(get)
        // console.warn(use[0], use[1])
        // console.warn(this.subject)
    }

    handlePress = () => {
        if (this.state.subjectId === "") {
            alert("Please choose a subject")
            return false

        }
        this.props.navigation.navigate('Questions', {
            subjectName: this.state.subjectName,
            subjectId: this.state.subjectId,
            name: this.state.pastQuestionName
        })


    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView >
                    <Text style={styles.textSelect}>SELECT A SUBJECT</Text>
                 <Picker
                        selectedValue={this.state.subjectId}
                        style={styles.picker}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ subjectId: itemValue })
                        }>
                        <Picker.item label="Choose a subject" value="" />
                        {
                            this.state.subjects.map(sub => {
                                return (
                                    <Picker.item label={sub.subject_name} value={sub.subject_id} />
                                )
                            })
                        }

                    </Picker> 
                
                    <View style={styles.iconView}>
                        <Icon size={30} color="#fff" name="ios-arrow-dropdown" />
                    </View>
                    <ButtonComponent externalStyle={{ marginLeft: 30 }} onPress={this.handlePress} text="SELECT SUBJECT" />
                </ScrollView>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: "50%"
    },
    textSelect: { fontSize: 25, fontWeight: "bold", textAlign: "center", },
    picker: { height: 45, width: 300, backgroundColor: "#5FA046", marginTop: 30, color: "#fff" },
    iconView: {
        position: "relative",
        bottom: 38,
        left: 265


    }


})
export default SelectSubject;