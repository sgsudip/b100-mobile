import React from "react";
// import { Video } from "expo-av";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { Button, Header } from "react-native-elements";
import images from "../assets/images";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class Phase2Video extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  state = {
    isComplete: false,
    paused: false,
  };
  onPress = () => {
    // console.log("onPress")
    this.setState({ paused: true });
    this.props.navigation.navigate("phase2instructionScreen");
  };
  onBackPress = () => {
    this.props.navigation.navigate("Home");
  };
  render() {
    return (
      <View style={styles.slide}>
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
          <Text
            style={{
              fontFamily: "Muli-SemiBold",
              fontSize: 14,
              color: "#f2f2f2",
              marginLeft: "5%",
            }}
            onPress={this.onBackPress}
          >
            Back
          </Text>
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

        {/* <Video
          source={{
            uri: "https://lubdub-media.s3-us-west-1.amazonaws.com/instructional.mp4",
          }}
          rate={1.0}
          volume={1.0}
          isMuted={this.state.paused}
          shouldPlay
          isLooping={false}
          style={{
            height: SCREEN_HEIGHT * 0.6,
            width: SCREEN_WIDTH,
          }}
        /> */}

        <View
          style={{
            height: SCREEN_HEIGHT * 0.3,
            width: SCREEN_WIDTH * 0.7,
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Muli-SemiBold",
              fontSize: 20,
              marginTop: "0%",
              marginBottom: " 0%",
            }}
          >
            Please sit back and watch this Video
          </Text>
        </View>
        <View>
          <Button
            title="Next"
            // ViewComponent={require("expo").linearGradient}
            ViewComponent={require("expo-linear-gradient").LinearGradient}
            linearGradientProps={{
              colors: ["#8FA4C4", "#8FA4C4"],
              start: [1, 0],
              end: [0.2, 0],
            }}
            onPress={() => this.onPress()}
            buttonStyle={styles.buttonStyle}
            titleStyle={{
              textAlign: "center",
              paddingTop: 0,
              paddingBottom: 0,
            }}
          />
        </View>
      </View>
    );
  }
}

export default Phase2Video;

const styles = {
  B100Style: {
    alignItems: "center",
    alignSelf: "center",
    flex: 4,
  },
  accStyle: {
    alignItems: "center",
    alignSelf: "center",
    flex: 2,
  },
  slideStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: SCREEN_WIDTH,
  },
  firstScreenTextView: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.9,
    fontFamily: "Muli-SemiBold",
    flex: 1,
    bottom: 0,
  },

  ViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    width: SCREEN_WIDTH * 0.8,
  },
  HeaderStyle: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#484649",
  },
  mainTextStyle: {
    fontFamily: "Muli-SemiBold",
    fontSize: 30,
  },
  subTextStyle: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 15,
  },
  buttonStyle: {
    //marginTop: 15,
    width: SCREEN_WIDTH * 0.85,
    alignSelf: "center",
    position: "absolute",
    bottom: 80,
    // fontWeight: "bold",
    height: 50,
  },
};
