import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button, CheckBox, Card, Header, Icon } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { getTrackingPermissionsAsync } from "expo-tracking-transparency";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class TermsScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  continue = () => {
    this.props.navigation.navigate("phone");
  };
  state = {
    conditionModalbool: false,
    useTermModalbool: false,
    servTermModalbool: false,
    signUpBool: false,
    // permissionStatus: "granted",
  };

  // componentDidMount = async () => {
  //   const { status } = await getTrackingPermissionsAsync();
  //   // this.setState({ permissionStatus: status });
  // };
  componentDidUpdate = () => {
    //  this.checkSignUp()
  };
  onConditionPress = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://app.termly.io/document/disclaimer/6b5b6e28-0a72-483d-a3a9-3b39a53678c7"
    );
  };
  onUseTermPress = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://app.termly.io/document/terms-of-use-for-ecommerce/88f7d716-06c6-4899-b2af-bf792d202ef0"
    );
  };
  onServTermPress = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://app.termly.io/document/privacy-policy/70cf0374-878b-454e-888c-baeba6d1475c"
    );
  };
  agreeAllTermsPress = () => {
    this.setState({ signUpBool: !this.state.signUpBool });
  };

  render() {
    const signUpButtonConditional = this.state
      .signUpBool /* && this.state.permissionStatus === "granted" */ ? (
      <Button
        rounded
        // ViewComponent={require("expo").linearGradient}
        ViewComponent={require("expo-linear-gradient").LinearGradient}
        linearGradientProps={{
          colors: ["#8FA4C4", "#8FA4C4"],
          start: [1, 0],
          end: [0.2, 0],
        }}
        title="Get Started"
        onPress={this.continue}
        buttonStyle={{
          // width: SCREEN_WIDTH * 0.6,
          // height: SCREEN_HEIGHT * 0.07,
          marginTop: 15,
          width: SCREEN_WIDTH * 0.85,
          // width:"100%",
          // height: SCREEN_HEIGHT * 0.08,
          alignSelf: "center",
          position: "absolute",
          top: 0,
          bottom: 20,
          // fontWeight: "bold",
          height: 50,
        }}
        titleStyle={{ paddingTop: 0, paddingBottom: 0, color: "white" }}
      />
    ) : (
      <Button
        rounded
        buttonStyle={{
          opacity: 0.4,
          marginTop: 15,
          width: SCREEN_WIDTH * 0.85,
          // width:"100%",
          // height: SCREEN_HEIGHT * 0.08,
          alignSelf: "center",
          position: "absolute",
          top: 0,
          // bottom: 00,
          // fontWeight: "bold",
          height: 50,
        }}
        title="Get Started"
        // ViewComponent={require("expo").linearGradient}
        ViewComponent={require("expo-linear-gradient").LinearGradient}
        linearGradientProps={{
          colors: ["#8FA4C4", "#8FA4C4"],
          start: [1, 0],
          end: [0.2, 0],
        }}
        titleStyle={{ paddingTop: 0, paddingBottom: 0, color: "white" }}
      />
    );

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Header
          placement="center"
          centerComponent={{
            text: "B100",
            style: {
              fontFamily: "Muli-SemiBold",
              fontSize:
                Platform.OS === "ios" ? 17 : SCREEN_WIDTH < 575 ? 20 : 22,
              color: "#f2f2f2",
              // paddingBottom: 20,
            },
          }}
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
            flex: SCREEN_HEIGHT < 700 ? 2 : 3,
            width: "90%",
            marginTop: "10%",
            alignSelf: "center",
          }}
        >
          <ScrollView>
            <Text
              style={{
                fontSize: 24,
                marginBottom: "2%",
                fontFamily: "Muli-SemiBold",
                textAlign: "center",
              }}
            >
              Finish Signing Up
            </Text>
            <Text style={{ fontSize: 17, fontFamily: "Muli-SemiBold" }}>
              Before we can begin grading your heart's health you must agree to
              our Terms, Disclaimer, and Privacy Policy.
            </Text>

            <Text
              style={{
                textAlign: "left",
                paddingLeft: "3%",
                fontSize: 17,
                fontFamily: "Muli-SemiBold",
              }}
            >
              {"\n\n"}Terms & Conditions
            </Text>
            <View style={{ height: SCREEN_HEIGHT * 0.02 }} />

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
                borderColor: "#cccccc",
                borderRadius: 3,
                borderWidth: 1,
                backgroundColor: "#f5f5f5",
                width: SCREEN_WIDTH * 0.85,
                height: SCREEN_HEIGHT * 0.06,
              }}
              onPress={this.onUseTermPress}
            >
              <View style={{ flex: 6, marginLeft: "5%" }}>
                <Text style={{ textAlign: "left", color: "grey" }}>
                  View Terms of Use
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <MaterialCommunityIcons name="chevron-right" color="grey" />
              </View>
            </TouchableOpacity>
            <View style={{ height: SCREEN_HEIGHT * 0.02 }} />

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
                borderColor: "#cccccc",
                borderRadius: 3,
                borderWidth: 1,
                backgroundColor: "#f5f5f5",
                width: SCREEN_WIDTH * 0.85,
                height: SCREEN_HEIGHT * 0.06,
              }}
              onPress={this.onConditionPress}
            >
              <View style={{ flex: 6, marginLeft: "5%" }}>
                <Text style={{ textAlign: "left", color: "grey" }}>
                  View Disclaimer
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <MaterialCommunityIcons name="chevron-right" color="grey" />
              </View>
            </TouchableOpacity>
            <View style={{ height: SCREEN_HEIGHT * 0.02 }} />

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
                borderColor: "#cccccc",
                borderRadius: 3,
                borderWidth: 1,
                backgroundColor: "#f5f5f5",
                width: SCREEN_WIDTH * 0.85,
                height: SCREEN_HEIGHT * 0.06,
              }}
              onPress={this.onServTermPress}
            >
              <View style={{ flex: 6, marginLeft: "5%" }}>
                <Text style={{ textAlign: "left", color: "grey" }}>
                  View Privacy Policy
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <MaterialCommunityIcons
                  name="chevron-right"
                  // typo"type="en
                  color="grey"
                />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View
          style={{
            flex: 1,
            width: SCREEN_WIDTH,
            borderTopColor: "silver",
            borderTopWidth: 1,
            backgroundColor: "#fbfbfb",
          }}
        >
          <View style={{ justifyContent: "center" }}>
            <CheckBox
              title="I agree with the B100 Terms, Data Policy, & Privacy Policy."
              center
              iconType="material-community"
              // iconType="font-awesome"
              uncheckedIcon="checkbox-blank-circle-outline"
              // checkedIcon="checkbox-marked-circle"
              checkedIcon="check-circle"
              checkedColor="#ff4c6e"
              textStyle={{ textAlign: "left" }}
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              onPress={this.agreeAllTermsPress}
              checked={this.state.signUpBool}
            />
          </View>
          <View style={{}}>{signUpButtonConditional}</View>
        </View>

        <Modal
          animationType="slide"
          transparent
          style={{
            alignItems: "center",
          }}
          visible={this.state.useTermModalbool}
          onRequestClose={this.checkSignUp}
          onDismiss={this.checkSignUp}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <Card title="Terms of Service">
              <Text>Some Text to be confirmed</Text>
              <Button
                rounded
                style={{ padding: 15 }}
                // ViewComponent={require("expo").linearGradient}
                ViewComponent={require("expo-linear-gradient").LinearGradient}
                linearGradientProps={{
                  colors: ["#8FA4C4", "#8FA4C4"],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                title="Close"
                onPress={this.onUseTermPress}
                titleStyle={{ paddingTop: 0, paddingBottom: 0 }}
              />
            </Card>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent
          visible={this.state.conditionModalbool}
          onRequestClose={this.checkSignUp}
          onDismiss={this.checkSignUp}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <Card title="Disclamer">
              <Text>Some Text to be confirmed</Text>
              <Button
                title="Close"
                rounded
                style={{ padding: 15 }}
                // ViewComponent={require("expo").linearGradient}
                ViewComponent={require("expo-linear-gradient").LinearGradient}
                linearGradientProps={{
                  colors: ["#8FA4C4", "#8FA4C4"],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                onPress={this.onConditionPress}
                titleStyle={{ paddingTop: 0, paddingBottom: 0 }}
              />
            </Card>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent
          visible={this.state.servTermModalbool}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <Card title="Privacy Policy">
              <Text>Some Text to be confirmed</Text>
              <Button
                title="Close"
                rounded
                style={{ padding: 15 }}
                // ViewComponent={require("expo").linearGradient}
                ViewComponent={require("expo-linear-gradient").LinearGradient}
                linearGradientProps={{
                  colors: ["#8FA4C4", "#8FA4C4"],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                onPress={this.onServTermPress}
                titleStyle={{ paddingTop: 0, paddingBottom: 0 }}
              />
            </Card>
          </View>
        </Modal>
      </View>
    );
  }
}
export default TermsScreen;
