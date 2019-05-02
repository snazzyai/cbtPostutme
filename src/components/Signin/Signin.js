import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  ImageBackground,
  Image,
  ScrollView
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Emailsvg from "../../../assets/icons/Emailsvg";

class Signin extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };

  handleEmail = value => {
    this.setState({
      email: value
    });
  };
  handlePhone = value => {
    this.setState({
      phone: value
    });
  };
  handleName = value => {
    this.setState({
      name: value
    });
  };

  render() {
    return (
      <ImageBackground
        source={require("../../../assets/images/signin.jpg")}
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.logo}>
            <Image
              style={styles.imageLogo}
              source={require("../../../assets/images/logo.png")}
            />
          </View>
          <View style={styles.inputFieldView}>
            <Emailsvg />
            <TextInput
              onChangeText={this.handleName}
              style={styles.inputField}
              placeholder="Name"
              underlineColorAndroid="#fff"
              placeholderTextColor="#fff"
            />
            <TextInput
              keyboardType="email-address"
              onChangeText={this.handleEmail}
              style={styles.inputField}
              placeholder="Email"
              underlineColorAndroid="#fff"
              placeholderTextColor="#fff"
            />
            <TextInput
              keyboardType="phone-pad"
              onChangeText={this.handlePhone}
              style={styles.inputField}
              placeholder="Phone Number"
              underlineColorAndroid="#fff"
              placeholderTextColor="#fff"
            />
          </View>
          <View style={styles.clickableView}>
            <TouchableHighlight
              onPress={this.props.login}
              style={styles.clickable}
            >
              <Text style={styles.clickableText}>SIGN IN</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%"
  },
  logo: {
    marginTop: hp("10%"),
    alignItems: "center"
  },
  logoText: {
    fontSize: 35,
    color: "#ffffff"
  },
  inputFieldView: {
    marginTop: hp("8%"),
    alignItems: "center"
  },

  inputField: {
    width: wp("95%"),
    height: hp("10%"),
    fontSize: 18,
    color: "#fff"
  },
  clickable: {
    marginTop: hp("10%")
  },
  referralView: {
    paddingLeft: wp("3%")
  },
  referralText: {
    fontSize: 18,
    color: "#ffffff"
  },
  clickableView: {
    marginTop: hp("5%"),
    alignItems: "center"
  },
  clickable: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    width: wp("95%"),
    height: hp("7%"),
    borderRadius: 25,
    paddingTop: 10,
    elevation: 2
  },
  clickableText: {
    fontSize: 20
  },
  putmeText: {
    fontSize: 25,
    fontFamily: "",
    color: "#fff",
    fontWeight: "bold"
  }
});

export default Signin;
