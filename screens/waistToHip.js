// using component buttongroup
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  Linking,
} from "react-native";
import { connect } from "react-redux";
import { Input, Header, Button, ButtonGroup } from "react-native-elements";
import { phaseTwoResults } from "../actions/index";

const YEAR_IN_MILLI = 31556952000;

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class WaistToHip extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  ////////////////////////////////////////////////////////////////////////////
  //desplayed after the user creates there profile and is needed for the user
  //to proceed to the questionair section, can be skipped but will not let the user
  //into the next section tell this section is done.
  constructor(props) {
    super(props);
    this.state = {
      waist: "",
      hip: "",
    };
  }

  onBack = () => {
    this.props.navigation.navigate("Home");
  };

  onComplete = async () => {
    if (this.state.waist !== "" && this.state.hip !== "") {
      if (this.state.waist.length <= 2 && this.state.hip.length <= 2) {
        this.props.phaseTwoResults(
          { waist: this.state.waist, hip: this.state.hip },
          this.props.userId
        );
        // this.props.navigation.navigate("Labs");
        this.props.navigation.navigate("Home");
      } else {
        alert("enter value must be of 2 digit ");
      }
    } else {
      alert("please enter Valid number");
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
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
            onPress={this.onBack}
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

        <ScrollView style={styles.mainTextView}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "silver",
              width: SCREEN_WIDTH,
            }}
          >
            <Text
              style={{
                fontFamily: "Muli-Bold",
                fontSize: 22,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              {/* Waist-to-Hip Ratio */}
              MEASUREMENTS
            </Text>
          </View>

          <View style={styles.emailViewStyle}>
            <Text
              style={{
                textAlign: "justify",
              }}
            >
              Step-by-step detailed instructions,{" "}
              <Text
                style={{ textDecorationLine: "underline", paddingBottom: 5 }}
                onPress={() =>
                  Linking.openURL(
                    "https://b100method.com/pages/heart-health-home-test-instruction-measurements"
                  )
                }
              >
                click here
              </Text>
              .
            </Text>
            <Text
              style={{
                textAlign: "left",
                // marginStart: 10,
                width: "100%",
                fontSize: 20,
                // marginBottom: 7,
                fontWeight: "bold",
                marginTop: "5%",
              }}
            >
              {/* WAIST CIRCUMFERENCE */}
              Waist Circumference
            </Text>

            {/* <Text
              style={{
                textAlign: "left",
                // marginStart: 10,
                // marginEnd:10,
                width: "100%",
                fontSize: 15,
                marginBottom: 7,
                fontWeight: "bold",
                color: "#8fa4c4",
                // textTransform: "capitalize",
              }}
            > */}
            {/* 1. STAND UP STRAIGHT */}
            {/* 1. Stand up straight
            </Text> */}
            {/* <Text
              style={{
                textAlign: "left",
                // marginStart: 10,
                // marginEnd:10,
                width: "100%",
                fontSize: 15,
                marginBottom: 7,
                fontWeight: "bold",
                color: "#8fa4c4",
                // textTransform: "capitalize",
              }}
            > */}
            {/* 2. BREATHE OUT FOR 10 SECONDS */}
            {/* 2. Breathe out for 10 seconds
            </Text> */}
            {/* <Text
              style={{
                textAlign: "left",
                // marginStart: 10,
                // marginEnd:10,
                width: "100%",
                fontSize: 15,
                marginBottom: 7,
                fontWeight: "bold",
                color: "#8fa4c4",
                // textTransform: "capitalize",
              }}
            >
              3. HOLD
            </Text> */}
            {/* <Text
              style={{
                textAlign: "left",
                // marginStart: 10,
                // marginEnd:20,
                width: "100%",
                fontSize: 15,
                marginBottom: 7,
                fontWeight: "bold",
                color: "#8fa4c4",
                // textTransform: "capitalize",
              }}
            > */}
            {/* 4.MEASURE AROUND THE SMALLEST PART OF YOUR WAIST. DIRECTLY ABOVE
              YOUR BELLY BUTTON */}
            {/* 4. Measure around the smallest part of your waist. Directly above
              your belly button
            </Text> */}
            {/* <Text
              style={{
                textAlign: "left",
                // marginStart: 10,
                // marginEnd:10,
                width: "100%",
                fontSize: 15,
                marginBottom: 7,
                fontWeight: "bold",
                color: "#8fa4c4",
                // textTransform: "capitalize",
              }}
            >
              5. BREATHE
            </Text> */}

            {/* <Text
              style={{
                textAlign: "left",
                // marginStart: 10,
                width: "100%",
                fontSize: 16,
                marginTop: 20,
                marginBottom: 10,
                fontWeight: "bold",
              }}
            > */}
            {/* Measure around the smallest part of your waist, above your belly
              button.{" "} */}
            {/* WHAT IS YOUR WAIST CIRCUMFERENCE?{" "} */}
            {/* What is your WAIST circumference?{" "}
            </Text> */}

            <Input
              value={this.state.waist}
              keyboardType={"numeric"}
              inputStyle={{
                fontFamily: "Muli-SemiBold",
                fontSize: 16,
                paddingLeft: 10,
              }}
              placeholder="Waist-circumference"
              containerStyle={{
                marginBottom: 20,
                paddingHorizontal: 0,
                marginTop: 10,
              }}
              inputContainerStyle={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "silver",
              }}
              onChangeText={(text) => {
                let newText = "";
                let numbers = "0123456789";

                for (var i = 0; i < text.length; i++) {
                  if (numbers.indexOf(text[i]) > -1) {
                    newText = newText + text[i];
                  } else {
                    // your call back function
                    alert("please enter numbers only");
                    return null;
                  }
                }
                this.setState({ waist: text });
              }}
            />
            <View>
              <Text
                style={{
                  textAlign: "left",
                  //marginStart: 10,
                  width: "100%",
                  fontSize: 20,
                  marginBottom: 7,
                  fontWeight: "bold",
                }}
              >
                {/* HIP CIRCUMFERENCE */}
                Hip Circumference
              </Text>
              {/* <Text
                style={{
                  textAlign: "left",
                  //marginStart: 10,
                  width: "100%",
                  fontSize: 15,
                  marginBottom: 7,
                  fontWeight: "bold",
                  color: "#8fa4c4",
                  // textTransform: "capitalize",
                }}
              > */}
              {/* 1. STAND UP STRAIGHT */}
              {/* 1. Stand up straight
              </Text> */}
              {/* <Text
                style={{
                  textAlign: "left",
                  //marginStart: 10,
                  width: "100%",
                  fontSize: 15,
                  marginBottom: 7,
                  fontWeight: "bold",
                  color: "#8fa4c4",
                  // textTransform: "capitalize",
                }}
              > */}
              {/* 2. BREATHE OUT FOR 10 SECONDS */}
              {/* 2. Breathe out for 10 seconds
              </Text> */}
              {/* <Text
                style={{
                  textAlign: "left",
                  //marginStart: 10,
                  width: "100%",
                  fontSize: 15,
                  marginBottom: 7,
                  fontWeight: "bold",
                  color: "#8fa4c4",
                  // textTransform: "capitalize",
                }}
              >
                3. HOLD
              </Text> */}
              {/* <Text
                style={{
                  textAlign: "left",
                  //marginStart: 10,
                  width: "100%",
                  fontSize: 15,
                  marginBottom: 7,
                  fontWeight: "bold",
                  color: "#8fa4c4",
                  // textTransform: "capitalize",
                }}
              > */}
              {/* 4.MEASURE AROUND THE SMALLEST PART OF YOUR WAIST. DIRECTLY ABOVE
                YOUR BELLY BUTTON */}
              {/* 4. Measure around the largest part of your waist. Directly above
                your belly button
              </Text> */}
              {/* <Text
                style={{
                  textAlign: "left",
                  //marginStart: 10,
                  width: "100%",
                  fontSize: 15,
                  marginBottom: 7,
                  fontWeight: "bold",
                  color: "#8fa4c4",
                  // textTransform: "capitalize",
                }}
              >
                5. BREATHE
              </Text> */}
            </View>
            {/* <Text
              style={{
                textAlign: "left",
                //marginStart: 10,
                width: "100%",
                fontSize: 16,
                marginBottom: 10,
                fontWeight: "bold",
              }}
            > */}
            {/* Measure around the largest part of your hips — widest part of your
              buttocks.{" "} */}
            {/* WHAT IS YOUR HIP CIRCUMFERENCE?{" "} */}
            {/* What is your HIP circumference?{" "}
            </Text> */}

            <Input
              value={this.state.hip}
              keyboardType={"numeric"}
              inputStyle={{
                fontFamily: "Muli-SemiBold",
                fontSize: 16,
                paddingLeft: 10,
              }}
              placeholder="hip-circumference"
              inputContainerStyle={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "silver",
              }}
              containerStyle={{ paddingHorizontal: 0 }}
              onChangeText={(text) => {
                let newText = "";
                let numbers = "0123456789";

                for (var i = 0; i < text.length; i++) {
                  if (numbers.indexOf(text[i]) > -1) {
                    newText = newText + text[i];
                  } else {
                    // your call back function
                    alert("please enter numbers only");
                    return null;
                  }
                }
                this.setState({ hip: text });
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonViewStyle}>
          <Button
            // title="Next   >"
            title="Submit"
            onPress={this.onComplete}
            titleStyle={{
              textAlign: "center",
              paddingBottom: 0,
              paddingTop: 0,
            }}
            buttonStyle={{
              backgroundColor: "#8FA4C4",
              // fontWeight: "bold",
              width: "100%",
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
  mainTextText: {
    textAlign: "left",
    fontFamily: "Muli-SemiBold",
    fontSize: 20,
  },
  IconViewStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainTextView: {
    flex: 1,
  },
  IconStyle: {},
  emailViewStyle: {
    flex: 1,
    alignSelf: "flex-start",
    width: "100%",
    marginTop: "5%",
    paddingHorizontal: 20,
  },
  nameViewStyle: {
    flex: 1,
    alignSelf: "flex-start",
    width: "100%",
  },
  buttonViewStyle: {
    alignSelf: "center",
    width: "90%",
    marginTop: "5%",
    // position: "absolute",
    // bottom: 30,
    marginBottom: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    userId: state.auth.uid,
  };
};

export default connect(mapStateToProps, {
  phaseTwoResults,
})(WaistToHip);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    width: "95%",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    alignSelf: "center", // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    width: "95%",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    alignSelf: "center", // to ensure the text is never behind the icon
  },
});
