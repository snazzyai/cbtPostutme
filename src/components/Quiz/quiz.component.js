import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import HTMLView from "react-native-htmlview";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";

class QuizComponent extends Component {
  constructor(props) {
    super(props);
  }

  state = {
      value: 0
  }

  radio_props = [{ label: "param1", value: 0 }, { label: "param2", value: 1 }];

  onPress = () => {
      console.log('pressed');
  }

  render() {
    return (
      <View style={styles.card}>
        <HTMLView value={this.props.question} stylesheet={styles.question} />
        <View style={styles.buttonGroup}>
            { this.radio_props.map((obj, i) => {    
            <View style={styles.radio} key={i}>
                <RadioButton labelHorizontal={true}>
                            <RadioButtonInput
                                obj={obj}
                                index={i}
                                isSelected={this.state.value === i}
                                borderWidth={1}
                                buttonInnerColor={'#e74c3c'}
                                buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                buttonSize={20}
                                buttonOuterSize={40}
                                buttonStyle={{}}
                                buttonWrapStyle={{marginLeft: 10}}
                        />
                         <RadioButtonLabel
                            obj={obj}
                            index={i}
                            labelHorizontal={true}
                            labelStyle={{fontSize: 20, color: '#2ecc71'}}
                            labelWrapStyle={{}}
                        />
                </RadioButton>
            </View>
            })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 10,
    elevation: 2
  },
  buttonGroup: {},
  question: {
    fontSize: 30
  }
});

export default QuizComponent;
