import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

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
        <View style={styles.buttonGroup}>
              <View style>
                
              </View>
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
