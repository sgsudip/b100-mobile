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
import DeviceIdImage from "../assets/images/DeviceIdImage.png";

const YEAR_IN_MILLI = 31556952000;

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class RegisterHomeKit extends React.Component {
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
      deviceID: "",
    };
  }

  onBack = () => {
    this.props.navigation.navigate("Home");
  };

  onComplete = async () => {
    if (this.state.deviceID !== "") {
      if (this.state.deviceID.length === 8) {
        if (
          this.state.deviceID >= 80381143 &&
          this.state.deviceID <= 803811459
        ) {
          const data = { bloodTime: Date.now(), deviceID: this.state.deviceID };
          this.props.phaseTwoResults(data, this.props.userId);
          // this.props.navigation.navigate("waistToHip");
          this.props.navigation.navigate("Home");
        } else {
          alert("Invalid ID");
        }
      } else {
        alert("ID can be only of 8 digits. please check and enter.");
      }
    } else {
      alert("Please enter an ID");
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
              {/* DEVICE ID */}
              REGISTER
            </Text>
          </View>

          <View style={styles.emailViewStyle}>
            <Text
              style={{
                textAlign: "justify",
              }}
            >
              Step-by-step detailed instructions,{"  "}
              <Text
                style={{ textDecorationLine: "underline", paddingBottom: 5 }}
                onPress={() =>
                  Linking.openURL(
                    "https://b100method.com/pages/heart-health-home-test-register"
                  )
                }
              >
                click here
              </Text>
              .
            </Text>
            {/* <Text
              style={{
                textAlign: "justify",
                //marginLeft: 10,
                width: "100%",
                fontSize: 16,
                marginBottom: 7,
                // fontWeight: "bold",
              }}
            > */}
            {/* Please Enter The Device ID:{" "} */}
            {/* Please enter your “Unique Test ID” that was provided to you in
              your Choices home test.:{" "} */}
            {/* To activate your Choices home test please enter the 8-digit
              barcode number located on the bottom right corner of the “Blood
              Sample Instructions, Tube Label & Informed Consent” form provided
              to you in your home test.
            </Text> */}

            <Input
              value={this.state.hip}
              keyboardType={"numeric"}
              inputStyle={{
                fontFamily: "Muli-SemiBold",
                fontSize: 14,
                // fontWeight: 300,
                paddingLeft: 10,
              }}
              containerStyle={{
                paddingHorizontal: 0,
                marginBottom: 7,
                marginTop: 10,
              }}
              // placeholder="Device ID"
              placeholder="XXXXXXXX"
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
                this.setState({ deviceID: text });
              }}
            />
          </View>
          {/* <View
            style={{
              margin: 0,
              padding: 0,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../assets/images/1.png")}
              //source={require("../assets/images/geneticTest.png")}
              // source={DeviceIdImage}
              style={{
                height:
                  SCREEN_HEIGHT < 750
                    ? SCREEN_HEIGHT * 0.4
                    : SCREEN_HEIGHT * 0.5,
                width: SCREEN_WIDTH * 0.9,
                margin: 0,
                padding: 0,
                // left: 5,
                // borderColor: "red",
                // borderWidth: 5,
                // backgroundColor: "pink",
              }}
              // resizeMode="contain"
            />
          </View> */}
        </ScrollView>
        <View style={styles.buttonViewStyle}>
          <Button
            // title="Next   >"
            title="Submit"
            onPress={this.onComplete}
            titleStyle={{
              textAlign: "center",
              paddingTop: 0,
              paddingBottom: 0,
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
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 20,
  },
  IconViewStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainTextView: {
    flex: 1,
    // backgroundColor: "yellow",
  },
  IconStyle: {},
  emailViewStyle: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
    marginTop: "5%",
  },
  nameViewStyle: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
  },
  buttonViewStyle: {
    // flex: 1,
    alignSelf: "center",
    width: "90%",
    marginTop: "5%",
    marginBottom: 50,
    // position: "absolute",
    // bottom: 30,
  },
});
const mapStateToProps = (state) => {
  return {
    userId: state.auth.uid,
  };
};
export default connect(mapStateToProps, {
  phaseTwoResults,
})(RegisterHomeKit);

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
