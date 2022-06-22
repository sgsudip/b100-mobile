import _ from "lodash";
import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Header, Icon } from "react-native-elements";
import SLIDE_DATA from "../constants/BloodPressureInstructions";
import Slides from "../components/common/Slides";
import Images from "../assets/images";
import { connect } from "react-redux";

const SCREEN_WIDTH = Dimensions.get("window").width * 0.9;

class BPInstructions extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  onSlidesComplete = () => {
    this.props.navigation.navigate("BloodPressure");
  };
  onBackPress = () => {
    this.props.navigation.navigate("Home");
  };
  state = {
    bar: 0,
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          placement="center"
          containerStyle={{
            backgroundColor: "#ff4c6e",
            ...Platform.select({
              ios: {
                height: SCREEN_HEIGHT < 900 ? 85 : 100,
              },
              android: {
                height: SCREEN_HEIGHT * 0.1,
                paddingHorizontal: 7,
                paddingTop: 0,
              },
            }),
          }}
        >
          <Icon
            name="arrow-back"
            color="#f2f2f2"
            underlayColor="transparent"
            onPress={this.onBackPress}
          />
          <Text
            style={{
              fontFamily: "Muli-SemiBold",
              fontSize:
                Platform.OS === "ios" ? 17 : SCREEN_WIDTH < 575 ? 20 : 22,
              color: "#f2f2f2",
            }}
          >
            B100
          </Text>
        </Header>
        <Slides
          notNeeded
          data={SLIDE_DATA}
          onComplete={this.onSlidesComplete}
        />
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

export default connect(mapStateToProps, {})(BPInstructions);
