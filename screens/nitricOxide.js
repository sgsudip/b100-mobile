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
import { Input, Header, Button } from "react-native-elements";
import { phaseTwoResults, updatePhase } from "../actions/index";
import RNPickerSelect from "react-native-picker-select";

const YEAR_IN_MILLI = 31556952000;

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class NitricOxideScreen extends React.Component {
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
      nitricOxide: "",
    };
  }

  onBack = () => {
    // this.props.navigation.navigate("NitricOxideInstructions");
    this.props.navigation.navigate("Home");
  };

  onComplete = async () => {
    if (this.state.nitricOxide !== "") {
      this.props.updatePhase(2, this.props.phaseID);

      this.props.phaseTwoResults(
        { nitricOxide: this.state.nitricOxide },
        this.props.userId
      );
      this.props.navigation.navigate("Home");
    } else {
      alert("Please select best match");
    }
  };

  render() {
    const nitricOxideResult = [
      { label: "Target", value: "Target", color: "#000000" },
      { label: "Threshold", value: "Threshold", color: "green" },
      { label: "Low", value: "Low", color: "blue" },
      { label: "High", value: "High", color: "yellow" },
      { label: "Very High", value: "Very High", color: "yellow" },
      { label: "Depleted", value: "Depleted", color: "red" },
    ];
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
                textTransform: "uppercase",
              }}
            >
              {/* Nitric Oxide */}
              NITRIC OXIDE
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
                    "https://b100method.com/pages/heart-health-home-test-instruction-nitric-oxide"
                  )
                }
              >
                click here
              </Text>
              .
            </Text>
            {/* <Text
              style={{ textAlign: "justify", marginTop: 10, marginBottom: 20 }}
            >
              Begin first thing in the morning prior to eating, drinking, or
              brushing your teeth. Also, no antibiotics or mouthwash within the
              last 24 hours.
            </Text> */}
            {/* <Text
              style={{
                textAlign: "left",
                //marginStart: 10,
                width: "100%",
                fontSize: 15,
                marginBottom: 20,
                fontWeight: "bold",
                color: "#8fa4c4",
                // textTransform: "capitalize",
                //paddingHorizontal: 10,
              }}
            >
              1. Open provided Nitric Oxide test strip.{"\n"}2. Collect saliva
              in your mouth.{"\n"}3. Gently spit saliva into the spoon or small
              cup.{"\n"}4. Dip test strip into saliva for 5 seconds.{"\n"}5.
              Tap off any excess saliva.{"\n"}6. Lay test strip horizontally on
              a flat surface.{"\n"}7. Wait 15 seconds.{"\n"}8. In a well-lit
              area, compare indicator color to chart located on cover of the
              silver pouch.
            </Text> */}
            <View
              style={{
                // display: "flex",
                // flexDirection: "row",
                // alignItems: "center",
                // justifyContent: "space-between",
                marginTop: "5%",
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  // marginStart: 10,
                  // width: "50%",
                  fontSize: 16,
                  marginBottom: 7,
                  fontWeight: "bold",
                }}
              >
                {/* Which color best matches your results? */}
                What is your nitric oxide level:
              </Text>

              <RNPickerSelect
                placeholder={{
                  label: "Select best match....",
                  value: null,
                  // color: "red",
                }}
                items={nitricOxideResult}
                onValueChange={(value) => {
                  value
                    ? this.setState({
                        nitricOxide: value,
                      })
                    : alert("please select another value");
                }}
                // InputAccessoryView={() => {
                //   return (
                //     <View
                //       style={{
                //         display: "flex",
                //         flexDirection: "row",
                //         justifyContent: "space-between",
                //         padding: 10,
                //         backgroundColor: "gray",
                //       }}
                //     >
                //       <Text style={{ color: "black" }}>Cancel</Text>
                //       <Text style={{ color: "blue" }}>Done</Text>
                //     </View>
                //   );
                // }}
                // onUpArrow={() => {
                //   this.inputRefs.firstTextInput.focus();
                // }}
                // onDownArrow={() => {
                //   this.inputRefs.favSport1.togglePicker();
                // }}
                style={{
                  ...pickerSelectStyles,
                  container: {
                    backgroundColor: "black",
                    // maxWidth: "50%",
                  },
                  placeholder: {
                    paddingLeft: 5,
                    // fontWeight: "bold",
                    // color: "red",
                  },
                  iconContainer: {
                    right: 10,
                    top: 10,
                    paddingRight: 10,
                  },
                }}
                value={this.state.nitricOxide}
                // modalProps={{
                //   containerStyle: {
                //     backgroundColor: "red",
                //     textAlign: "center",
                //   },
                // }}
                // doneText="Done"
                textInputProps={{
                  paddingHorizontal: 5,
                  fontSize: 14,
                }}
                useNativeAndroidPickerStyle={false}
                // Icon={() => {
                //   return (
                //     <Icon
                //       name="arrow-down"
                //       style={{
                //         paddingRight: 0,
                //         right: 0,
                //         fontSize: 22,
                //       }}
                //     />
                //   );
                // }}
              />
            </View>
            {/* <Text
              style={{
                textAlign: "justify",
                marginBottom: 20,
                fontSize: 12,
                marginTop: 10,
              }}
            >
              Note: If the indicator test strip does not change colors, please
              repeat with another test strip. If the indicator test strip shows
              “Very High” repeat this test again first thing the next morning to
              confirm your results.
            </Text> */}
          </View>
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
              width: SCREEN_WIDTH * 0.85,
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
    //width: "90%",
    marginTop: "5%",
    position: "absolute",
    bottom: 20,
  },
});
const mapStateToProps = (state) => {
  return {
    phaseID: state.phase.ID,

    userId: state.auth.uid,
  };
};

export default connect(mapStateToProps, {
  phaseTwoResults,
  updatePhase,
})(NitricOxideScreen);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 13,
    width: "100%",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 4,
    color: "black",
    alignSelf: "center", // to ensure the text is never behind the icon
    flex: 1,
    marginHorizontal: 7,
    height: 40,
  },
  inputAndroid: {
    fontSize: 16,
    width: "100%",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 4,
    color: "black",
    paddingRight: 0,
    alignSelf: "center", // to ensure the text is never behind the icon
    flex: 1,
    marginHorizontal: 7,
    height: 40,
  },
});
