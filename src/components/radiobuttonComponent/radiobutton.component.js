import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import HTMLView from "react-native-htmlview";

class RadioButtonComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.flex}>
             <View style={[{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }, props.style]}>
        {
          props.selected ?
            <View style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#000',
            }}/>
            : null
        }
      </View>
        <HTMLView value={this.props.option} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    display: flex,
    flexDirection: row
  }
});

export default RadioButtonComponent;
