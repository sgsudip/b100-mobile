import React from "react";
import {
  View,
  Animated,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Header, Button } from "react-native-elements";
import {
  phoneNumberChange,
  updatePhase,
  sendAnsToServer,
  uploadCustomPhaseOneANS,
} from "../actions/index";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import CircularProgress from "../components/CircularProgress";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const SubmitCircularProgress = React.memo(CircularProgress);

class RewardScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  state = {
    headersList: [],
    // fill: 0,
  };

  spinValue = new Animated.Value(0);

  UNSAFE_componentWillMount = () => {
    this.props.updatePhase(1, this.props.phaseID);
    this.props.uploadCustomPhaseOneANS(
      this.props.fillInAns.numMedicationsPerDay,
      this.props.fillInAns.numCigsSmokedPerDay,
      this.props.fillInAns.numYearsSmoked,
      // this.props.fillInAns.age,
      this.props.uid,
      this.props.fillInAns.weight,
      this.props.fillInAns.height
    );
    const result = this.props.sendAnsToServer(this.props.uid, this.props.ans);
    this.props.updatePhase(1, this.props.phaseID);
  };
  // First set up animation

  componentDidMount() {
    const Headers = this.props.quest[0].Headers.map((item) => item.title);
    this.setState({ headersList: Headers });
  }

  onPressSubmit = () => {
    // console.warn(this.props.fillInAns, "this is answers");
    // this.props.uploadCustomPhaseOneANS(
    //   this.props.fillInAns.numMedicationsPerDay,
    //   this.props.fillInAns.numCigsSmokedPerDay,
    //   this.props.fillInAns.numYearsSmoked,
    //   // this.props.fillInAns.age,
    //   this.props.uid,
    //   this.props.fillInAns.weight,
    //   this.props.fillInAns.height
    // );
    // const result = this.props.sendAnsToServer(this.props.uid, this.props.ans);
    // this.props.updatePhase(1, this.props.phaseID);
    // this.props.navigation.navigate("results");
    this.props.navigation.navigate("Home");
  };

  // componentDidUpdate() {
  //   if (this.state.fill !== 100) {
  //     setTimeout(() => {
  //       this.setState({ fill: this.state.fill + 1 });
  //     }, 50);
  //   }
  // }

  render() {
    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          leftComponent={{ icon: "menu", color: "#fff" }}
          centerComponent={{
            text: "B100",
            style: {
              fontFamily: "Muli-SemiBold",
              fontSize:
                Platform.OS === "ios" ? 17 : SCREEN_WIDTH < 575 ? 20 : 22,
              color: "#f2f2f2",
            },
          }}
          rightComponent={{ icon: "home", color: "#fff" }}
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
        />
        <View
          style={{
            marginBottom: "auto",
            marginTop: "auto",
            left: 0,
            width: "100%",
            zIndex: 999999,
            height: "auto",
          }}
        >
          <Text style={{ fontSize: 28, fontWeight: "700" }}>
            Calculating results...
          </Text>
          <View
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <SubmitCircularProgress />
          </View>
          <ScrollView>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                padding: 20,
                alignItems: "center",
              }}
            >
              {this.state.headersList && this.state.headersList.length
                ? this.state.headersList
                    .filter((item) => !item.toLowerCase().includes("trivia"))
                    .map((item, index) => (
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          justifyContent: "center",
                          width: "60%",
                          marginBottom: 5,
                        }}
                        key={index}
                      >
                        <View
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                          }}
                        >
                          <IconMCI
                            name="check-circle"
                            size={20}
                            color="rgb(255, 76, 110)"
                          />
                          <Text style={{ color: "rgb(255, 76, 110)" }}>
                            {item}
                          </Text>
                        </View>
                      </View>
                    ))
                : null}
            </View>
          </ScrollView>
          {/*  <Video
          source={images.video1}
          resizeMode="contain"
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping={false}
          style={{
            alignSelf: "center",
            width: 400,
            height: 400,
            marginTop: 70,
          }}
        />

        <View style={styles.shadedContainer}>
          <Button
            rounded
            title="Submit"
            onPress={this.onPressSubmit}
            titleStyle={{ paddingTop: 0, paddingBottom: 0 }}
            // ViewComponent={require("expo").linearGradient}
            ViewComponent={require("expo-linear-gradient").LinearGradient}
            linearGradientProps={{
              colors: ["#36d6d7", "#5df7f8"],
              start: [1, 0],
              end: [0.2, 0],
            }}
            buttonStyle={{
              width: SCREEN_WIDTH * 0.85,
              height: SCREEN_HEIGHT * 0.07,
              alignSelf: "center",
              height: 50,
              // fontWeight: "bold",
            }}
          />
        </View> */}
          {/* <View
          style={{
            display: "flex",
            // flex:1,
            justifyContent: "center",
            alignItems: "center",
          
          }}
        >
          <Image
            source={require("../assets/images/submitpage.png")}
            style={{
              height: SCREEN_HEIGHT * 0.5,
              width: SCREEN_WIDTH * 0.9,
              //  backgroundColor: "gray",
              margin: 0,
              padding: 0,
              marginTop:20,
            }}
          />
        </View> */}
          {/* <View
          style={{
            marginBottom: "auto",
            marginTop: "auto",
            left: 0,
            width: "100%",
            zIndex: 999999,
            height: "auto",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "900",
              paddingHorizontal: 10,
              marginVertical: 10,
            }}
          >
            All done with your heart health risk assessment!
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "#8fa4c4",
              paddingHorizontal: 10,
              marginBottom: 15,
            }}
          >
            You will receive a notification when your assessment has been
            reviewed and your LubDub grade has been recorded. You will also
            receive informative suggestions from Dr. B you can use to optimize
            your heart health! If you do not receive a notification after 24
            hours, please email us at: support@B100method.com
          </Text> */}
          {/* <View style={styles.shadedContainer}> */}
          <Button
            rounded
            title="Submit"
            onPress={this.onPressSubmit}
            titleStyle={{
              paddingTop: 0,
              paddingBottom: 0,
              fontSize: 18,
              // backgroundColor: "#db4d69",
            }}
            // ViewComponent={require("expo").linearGradient}
            // ViewComponent={require("expo-linear-gradient").LinearGradient}
            // linearGradientProps={{
            //   colors: ["#36d6d7", "#5df7f8"],
            //   start: [1, 0],
            //   end: [0.2, 0],
            // }}
            buttonStyle={{
              width: SCREEN_WIDTH * 0.65,
              alignSelf: "center",
              height: 50,
              backgroundColor: "#db4d69",
              borderRadius: 50,
              // fontWeight: "bold",
            }}
          />
        </View>
        {/* </View> */}
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
  },
  shadedContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column-reverse",
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#fbfbfb",
    borderTopWidth: 1,
    borderColor: "#d9d9d9",
  },
  mainTextView: {
    marginTop: "10%",
    marginBottom: "10%",
  },
  phoneNumberTextView: {
    textAlign: "center",
    fontSize: 40,
  },
  mainTextText: {
    textAlign: "center",
    fontSize: 26,
  },
  subTextText: {
    textAlign: "center",
    fontSize: 20,
    color: "silver",
    paddingTop: "3%",
  },
});
mapStateToProps = (state) => {
  return {
    phoneNum: state.auth.phoneNumber,
    ans: state.quest.ans,
    uid: state.auth.uid,
    phaseID: state.phase.ID,
    fillInAns: state.quest.fillInAns,
    quest: state.quest.Phase_1,
  };
};
export default connect(mapStateToProps, {
  phoneNumberChange,
  sendAnsToServer,
  uploadCustomPhaseOneANS,
  updatePhase,
})(RewardScreen);
