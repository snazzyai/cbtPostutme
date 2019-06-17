import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';



class Quiz extends Component {

    qno = 0
    score = 0





    state = {
        questions: [],
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption,
        countCheck: 0
    }



    componentDidMount() {
        const schoolName = this.name
        const filtered = []
        const subject = this.subjectId

        BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.navigate("SelectSubject"))
        //db query
        // db.transaction((txn) => {
        //     // txn.executeSql('DROP TABLE IF EXISTS questions', [], async (tx, res) => {

        //     // });
        //     txn.executeSql('SELECT * FROM questions WHERE school_name = :school_name', ["University of Lagos"], async (tx, res) => {
        //         let questionArray = []
        //         for (let i = 0; i < res.rows.length; i++) {
        //             // console.warn(res.rows.item(i))
        //             questionArray.push(res.rows.item(i))

        //         }
        //         await this.setState({ questions: this.state.questions.concat(questionArray) });
        //     });
        //     txn.executeSql('SELECT * FROM options', [], async (tx, res) => {
        //         let optionArray = []
        //         for (let i = 0; i < res.rows.length; i++) {
        //             console.warn(res.rows.item(i))
        //             optionArray.push(res.rows.item(i))

        //         }
        //         await this.setState({ options: this.state.options.concat(optionArray) });
        //     });
        // })


        dbstoreData.find({ subject_id: subject }, (err, newDoc) => {
            let questionArray = []
            newDoc = lodash.shuffle(newDoc)
            for (let i = 0; i < 20; i++) {
                questionArray.push(newDoc[i])
            }
            newDoc.map(arrnew => {
                this.setState({
                    questions: this.state.questions.concat(questionArray),
                    question: arrnew[this.qno].question_text,
                    options: arrnew[this.qno].options,
                    correctoption: arrnew[this.qno].correctoption,
                    countCheck: 0

                })
            })

        })



        // for (let i = 1; i < 2; i++) {
        //     filtered.push(questions[Math.floor(Math.random() * (1 + 1 - 0)) + 0])
        //     console.warn(filtered)
        // }

    }
    prev() {
        if (this.qno > 0) {
            this.qno--
            this.setState({ question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption: arrnew[this.qno].correctoption })
        }
    }
    next() {
        if (this.qno < arrnew.length - 1) {
            this.qno++

            this.setState({ countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption: arrnew[this.qno].correctoption })
        } else {

            this.props.quizFinish(this.score * 100 / 5)
        }
    }
    _answer(status, ans) {

        if (status == true) {
            const count = this.state.countCheck + 1
            this.setState({ countCheck: count })
            if (ans == this.state.correctoption) {
                this.score += 1
            }
        } else {
            const count = this.state.countCheck - 1
            this.setState({ countCheck: count })
            if (this.state.countCheck < 1 || ans == this.state.correctoption) {
                this.score -= 1
            }
        }

    }
    render() {
        let _this = this
        const currentOptions = this.state.options
        const options = Object.keys(currentOptions).map(function (k) {
            return (<View key={k} style={{ margin: 10 }}>

                <ButtonComponent countCheck={_this.state.countCheck} onColor={"green"} effect={"tada"} _onPress={(status) => _this._answer(status, k)} text={currentOptions[k]} />

            </View>)
        });

        return (
            <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 10 }}>
                <View style={styles.container}>

                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between", alignItems: 'center', }}>

                        <View style={styles.oval} >
                            <Text style={styles.welcome}>
                                {this.state.question}
                            </Text>
                        </View>
                        <View>
                            {options}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            {/*   <Button
            onPress={() => this.prev()}
            title="Prev"
            color="#841584"
          />
          <View style={{margin:15}} />*/}

                            <TouchableOpacity onPress={() => this.next()} >
                                <View style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius: 10, backgroundColor: "green" }}>
                                    <Icon name="md-arrow-round-forward" size={30} color="white" />
                                </View>
                            </TouchableOpacity >

                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({

    oval: {
        width: width * 90 / 100,
        borderRadius: 20,
        backgroundColor: 'green'
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        margin: 15,
        color: "white"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});