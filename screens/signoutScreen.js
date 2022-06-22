import React, { Component } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clean } from "../actions";
import { connect } from "react-redux";

class SignOutScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  UNSAFE_componentWillMount = async () => {
    await AsyncStorage.clean();
    this.props.clean();
    this.props.navigation.navigate("phone");
  };
  render() {
    return <View />;
  }
}
export default connect(null, { clean })(SignOutScreen);
