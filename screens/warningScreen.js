import React, { Component } from "react";
import { View, Text, Linking, Dimensions, Platform } from "react-native";
import { Button, Header } from "react-native-elements";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class WarningScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  continue = () => {
    this.props.navigation.navigate("terms");
  };
  linkToPhone = () => {
    Linking.openURL(`tel:911`);
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          centerComponent={{
            text: "B100",
            style: {
              fontFamily: "Muli-SemiBold",
              fontSize:
                Platform.OS === "ios" ? 17 : SCREEN_WIDTH < 575 ? 20 : 22,
              color: "#f2f2f2",
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
            // flex: 1,
            alignItems: "center",
            alignSelf: "center",
            width: "100%",
            borderBottomColor: "silver",
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Muli-SemiBold",
              marginTop: "10%",
              marginBottom: "5%",
            }}
          >
            Warning!
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontFamily: "Muli-SemiBold",
              marginBottom: "5%",
            }}
          >
            B100 is not for emergency use.
          </Text>
        </View>

        <View style={{ flex: 1, backgroundColor: "#fbfbfb" }}>
          <Text
            style={{
              marginTop: "10%",
              marginBottom: "5%",
              width: SCREEN_WIDTH * 0.8,
              alignSelf: "center",
              fontSize: 17,
              fontFamily: "Muli-SemiBold",
              color: "#ff4c6e",
            }}
          >
            If you think you may be having a heart attack please call 911.
          </Text>
          <Text>Ready to grade your heart's health?</Text>
          {/* <Button
            title="Call 911"
            titleStyle={{ fontSize: 15, padding: 0, margin: 0 }}
            buttonStyle={{
              backgroundColor: "#ff4c6e",
              height: SCREEN_HEIGHT * 0.06,
            }}
            containerStyle={{ alignSelf: "center", width: SCREEN_WIDTH * 0.85 }}
            onPress={this.linkToPhone}
          /> */}
        </View>

        <View style={{ backgroundColor: "#fbfbfb" }}>
          <Button
            title="Next"
            // ViewComponent={require("expo").linearGradient}
            ViewComponent={require("expo-linear-gradient").LinearGradient}
            linearGradientProps={{
              colors: ["#8FA4C4", "#8FA4C4"],
              start: [1, 0],
              end: [0.2, 0],
            }}
            onPress={this.continue}
            buttonStyle={{
              width: SCREEN_WIDTH * 0.85,
              alignSelf: "center",
              backgroundColor: "#8FA4C4",
              alignContent: "center",
              height: 50,
              bottom: 20,
            }}
            containerStyle={
              {
                // alignSelf: "center",
                // marginTop: "7%",
                // marginBottom: "7%",
              }
            }
            titleStyle={{ paddingTop: 0, paddingBottom: 0 }}
          />
        </View>

        {/* <View style={{flex: 1, flexDirection: 'column', justifyContent:"flex-end", alignSelf:"center", backgroundColor:"#fbfbfb"}}>
          <Text style={{marginBottom: "5%"}}>Ready to grade your heart's health?</Text>
          <Button
          title="Next"
          // ViewComponent={require("expo").linearGradient}
          ViewComponent={require("expo-linear-gradient").LinearGradient}
            linearGradientProps={{
              colors: ["#8FA4C4","#8FA4C4"],
              start: [1, 0],
              end: [0.2, 0],
            }}
          onPress={this.continue}
          />
        </View> */}
      </View>
    );
  }
}
export default WarningScreen;
