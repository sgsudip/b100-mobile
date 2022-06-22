import React from "react";
import { CheckBox, Header, Button } from "react-native-elements";
import { Text, View, ScrollView, Dimensions, Linking } from "react-native";
import { connect } from "react-redux";
import { phaseTwoResults } from "../actions";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class Labs extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  state = {
    Labs: false,
  };

  onBack = () => {
    this.props.navigation.navigate("Home");
  };

  onComplete = () => {
    // this.props.navigation.navigate("BloodPressureInstructions");
    // this.props.navigation.navigate("BloodPressure");
    const data = { labs: this.state.Labs };
    this.props.phaseTwoResults(data, this.props.userId);
    this.props.navigation.navigate("Home");
  };

  Labs = async () => {
    this.setState({ Labs: !this.state.Labs });
    // this.props.labs(this.state.Labs, this.props.userId);
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

        <ScrollView
          style={{}}
          //  keyboardShouldPersistTaps="always"
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              // flex:2,
              borderBottomWidth: 1,
              borderColor: "silver",
              width: SCREEN_WIDTH,
            }}
          >
            <Text
              style={{
                fontFamily: "Muli-SemiBold",
                fontSize: 22,
                marginTop: 5,
                marginBottom: 5,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              LABS
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              width: "90%",
              marginTop: "5%",
            }}
          >
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
                    "https://b100method.com/pages/heart-health-home-test-instruction-blood-sample"
                  )
                }
              >
                click here
              </Text>
              {""}.
            </Text>
          </View>
          {/* <Text
            style={{
              textAlign: "justify",
              marginBottom: 20,
              marginTop: 10,
              paddingHorizontal: 20,
              fontSize: 14,
            }}
          >
            Only water 8 hours prior to start, ensure upper arm is free from
            hair and{" "}
            <Text style={{ fontWeight: "900", fontSize: 16 }}>
              make sure you will have time to take your sample to FedEx TODAY.
            </Text>
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //  textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            1. Remove device from pouch.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            2. Retrieve tube and twist off mint colored cap.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              // marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            3. Insert tube to device, press up for snug fit.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            4. Massage collection site for 60 seconds.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            5. Clean collection site with alcohol pad.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            6. Remove clear plastic cover over red button.
          </Text> */}

          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            7. Peel plastic tab behind the red button
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            8. Stick device to upper arm.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            9. Press button completely down and release.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            10. When blood fills to top line remove device. Do not exceed 5
            minutes.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            11. Place bandage on collection site.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            12. Remove tube with slight twist and pull down.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            13. Snap cap firmly back onto the tube.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            14. Gently shake 10 times to get sample moving.
          </Text> */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <Text>Blood sample complete:</Text>
            <CheckBox
              checked={this.state.Labs}
              onPress={this.Labs}
              checkedColor="#ff4c6e"
            />
          </View>
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            15. Place the provide bar code label on tube.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            16. Place tube in the clear return bag and seal.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            17. Fold over flap, star should be in rectangle.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            18. Place in the provided pre-paid envelope.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "100%",
              fontSize: 14,
              marginBottom: 5,
              fontWeight: "bold",
              color: "#8fa4c4",
              //   textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          >
            19. Drop off at FedEx TODAY.
          </Text> */}
        </ScrollView>
        <View
          style={{
            // flex: 2,
            alignSelf: "center",
            width: "90%",
            //   marginTop: "5%",
            //   position: "absolute",
            //   bottom: 50,
          }}
        >
          <Button
            //   title="Next >"
            title="Submit"
            onPress={this.onComplete}
            titleStyle={{
              textAlign: "center",
              paddingBottom: 0,
              paddingTop: 0,
            }}
            disabled={!this.state.Labs}
            buttonStyle={{
              backgroundColor: "#8FA4C4",
              // fontWeight: "bold",
              width: "100%",
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
            disabledTitleStyle={{
              color: "white",
            }}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.uid,
  };
};

export default connect(mapStateToProps, { phaseTwoResults })(Labs);
