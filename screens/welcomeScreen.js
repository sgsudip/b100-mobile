import _ from "lodash";
import React, { Component } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Slides from "../components/common/Slides";
import Images from "../assets/images";
import { connect } from "react-redux";
// import {
//   getTrackingPermissionsAsync,
//   requestTrackingPermissionsAsync,
// } from "expo-tracking-transparency";

const SCREEN_WIDTH = Dimensions.get("window").width * 0.9;
const SLIDE_DATA = [
  {
    mainText: "Welcome To\nB100!",
    subText: "The first step of accurately knowing your heart's health.",
    image: Images.icon,
  },
];

class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  onSlidesComplete = () => {
    this.props.navigation.navigate("warn");
  };
  state = {
    bar: 0,
  };

  // componentDidMount = async () => {
  //   const { status } = await getTrackingPermissionsAsync();
  //   // console.log(status, "from welcome screen");
  //   if (status === "denied") {
  //     // debugger;
  //     const { status } = await requestTrackingPermissionsAsync();
  //     if (status === "granted") {
  //       console.log("Yay! I have user permission to track data", status);
  //     }
  //   }
  // };

  render() {
    return (
      <View style={styles.container}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
const mapStateToProps = (state) => {
  return {
    progress: state.auth.progress,
  };
};

export default connect(mapStateToProps, {})(WelcomeScreen);
