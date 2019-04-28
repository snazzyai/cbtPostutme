import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import QuizComponent from '../components/Quiz/quiz.component';

class Quiz extends Component {
    constructor() {
        super();
    }
    state = {
        questions: [],
        score: 0,
        selectedQuestion: [],
        result: [],
        data: {
            question: `<p> My name is ? </p>`,
            options: [
                {
                    option_text: `<p> hafeez </p>`
                },
                {
                    option_text: `<p> hafeez </p>`
                },{
                    option_text: `<p> hafeez </p>`
                },{
                    option_text: `<p> hafeez </p>`
                }
            ]
        }
    }

    populateSelected = () => {
        this.state.questions.map(question=> {
            this.state.selectedQuestion.push({
                questionId: question.id,
                answerId: null
            })
        })
    }

    selectQuestion = (i, anwser_id) => {
        this.selectedQuestion[i].answerId = anwser_id;
    }

    submit = () => {
        for( let i = 0;  i < this.state.questions; i++) {
            if ( this.state.questions[i].id == this.state.selectedQuestion[i].questionId) {
                if ( this.state.selectedQuestion[i].answer == this.state.questions[i].answer.option_id) {
                    this.setState({
                        score:  score++
                    });
                }
            }
        }
    }

    render() {
        return(
            <View style={styles.bg}>         
                <QuizComponent  question={this.state.data.question}  option={this.state.data.options} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bg: {

    },
    text: {
        color: 'black'
    }
})

export default Quiz;