import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { connect } from "react-redux";
// import { BarCodeScanner } from "expo-barcode-scanner";
// import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import * as WebBrowser from "expo-web-browser";
import { phoneNumberChange, generateCode } from "../actions/index";
import { Header, Button } from "react-native-elements";
import IconEn from "react-native-vector-icons/Entypo";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class HomeKit extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  state = {
    barCodeScannerView: false,
    scanned: false,
    hasCameraPermission: null,
    hasScanned: false,
  };

  async componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({ hasCameraPermission: status === "granted" });
  };

  handleBarCodeScanned = async (data) => {
    if (!this.state.hasScanned) {
      codeInfo = data.data;
      this.setState({ hasScanned: true });
      // console.log(codeInfo);
      if (codeInfo.includes("B100 qr code |")) {
        this.setState({ scanned: true });
        await Alert.alert(
          "Scan Successful!",
          `Home test code is ${codeInfo.substring(
            codeInfo.lastIndexOf("|") + 1
          )}`,
          [
            {
              text: "OK",
              onPress: () => {
                this.setState({ barCodeScannerView: false, hasScanned: false });
              },
            },
          ]
        );
        this.props.navigation.navigate("DeviceInfo");
      } else {
        Alert.alert("Scan Faild!", "not a B 100 QR code", [
          {
            text: "OK",
            onPress: () => {
              // this.props.navigation.navigate('HomeKitInfo');
              this.setState({ hasScanned: false });
            },
          },
        ]);
      }
    }
  };
  UNSAFE_componentWillReceiveProps() {
    if (this.props.phoneNum !== "") {
      this.setState({ continuebool: false });
    }
  }
  onCancelPress = () => {
    this.props.navigation.navigate("Home");
  };
  onBackScanScreen = () => {
    this.setState({ barCodeScannerView: !this.state.barCodeScannerView });
  };
  onOrder = () => {
    WebBrowser.openBrowserAsync("https://b100method.com/products/lifestyle");
  };
  onStart = () => {
    // debugger;
    // this.props.navigation.navigate("PhaseTwoVideo");
    // this.props.navigation.navigate("ChoicesHomeScreen");
    this.props.navigation.navigate("phase2instructionScreen");
  };
  onShip = () => {
    this.props.navigation.navigate("Home");
  };
  render() {
    switch (this.state.barCodeScannerView) {
      case false:
        return (
          <View style={{ flex: 1 }}>
            <Header
              placement="center"
              centerComponent={{
                text: "HOME TEST",
                style: {
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  color: "black",
                },
              }}
              containerStyle={{
                backgroundColor: "#fff",
                ...Platform.select({
                  ios: {
                    height: SCREEN_HEIGHT < 900 ? 85 : 100,
                  },
                  android: {
                    height: SCREEN_HEIGHT * 0.1,
                    paddingHorizontal: 0,
                    paddingTop: 0,
                  },
                }),
              }}
            >
              <IconEn
                name="chevron-thin-left"
                onPress={this.onCancelPress}
                style={{ marginLeft: "10%", fontSize: 24 }}
                underlayColor="transparent"
                color="black"
              />
            </Header>

            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              You have selected the B100 Home Test
            </Text>
            <View
              style={[
                styles.container,
                SCREEN_HEIGHT < 700 ? { flex: 7 } : { flex: 3 },
              ]}
            >
              {/* <View style={styles.mainTextView}> */}
              {/* <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10, marginBottom: 10 }}>
                  You have selected the B100 Home Kit
                </Text> */}

              <View style={styles.card}>
                <Image
                  source={require("../assets/images/homeKit.png")}
                  resizeMode="cover"
                  style={{
                    flex: 2,
                    backgroundColor: "grey",
                    width: "100%",
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                  }}
                ></Image>
                <View
                  style={{
                    alignItems: "center",
                    width: "85%",
                    marginBottom: 0,
                  }}
                >
                  <Text
                    style={{ fontSize: 16, marginBottom: 15, marginTop: 15 }}
                  >
                    What role do your lifestyle and diet choices play in the
                    current state of your cardiac wellness? Order your home test
                    to fine out.
                  </Text>
                </View>
                <View>
                  <Button
                    title="Order Your Home Test"
                    titleStyle={{
                      fontSize: 16,
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                    onPress={this.onOrder}
                    // ViewComponent={require("expo").linearGradient}
                    ViewComponent={
                      require("expo-linear-gradient").LinearGradient
                    }
                    linearGradientProps={{
                      colors: ["#8FA4C4", "#8FA4C4"],
                      start: [1, 0],
                      end: [0.2, 0],
                    }}
                    buttonStyle={{
                      borderRadius: 7,
                      width: SCREEN_WIDTH * 0.65,
                    }}
                    containerStyle={{
                      marginBottom: 20,
                    }}
                  />
                </View>
              </View>
              {/* </View>/ */}
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column-reverse",
                alignItems: "center",
                marginTop: 50,
                marginBottom: 30,
              }}
            >
              <Button
                title="START HOME TEST"
                titleStyle={{ fontSize: 16, paddingBottom: 0, paddingTop: 0 }}
                onPress={this.onStart}
                // ViewComponent={require("expo").linearGradient}
                ViewComponent={require("expo-linear-gradient").LinearGradient}
                linearGradientProps={{
                  colors: ["#E54360", "#E54360"],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                buttonStyle={{
                  borderRadius: 7,
                  width: SCREEN_WIDTH * 0.65,
                }}
                containerStyle={{
                  marginBottom: 20,
                }}
              />
              <Text style={{ fontSize: 16, marginBottom: 5 }}>
                Already received your Home Test?
              </Text>
            </View>
          </View>
        );
      case true:
        return (
          <View style={{ flex: 1 }}>
            <Header
              placement="center"
              centerComponent={{
                text: "HOME TEST",
                style: {
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  color: "black",
                },
              }}
              containerStyle={{ backgroundColor: "#fff" }}
            >
              <IconEn
                name="chevron-thin-left"
                onPress={this.onBackScanScreen}
                style={{ marginLeft: "10%", fontSize: 24 }}
                underlayColor="transparent"
                color="black"
              />
            </Header>
            <View style={styles.barCodeContainer}>
              <Text style={{ marginBottom: "5%", fontSize: 18 }}>
                Please scan your Home Test
              </Text>
              {
                this.state.hasCameraPermission === null ? (
                  <Text>Requesting for camera permission</Text>
                ) : this.state.hasCameraPermission === false ? (
                  <Text>Camera permission is not granted</Text>
                ) : null /* (
                <BarCodeScanner
                  // onBarCodeRead={this._handleBarCodeRead}
                  onBarCodeScanned={
                    this.state.scanned ? undefined : this.handleBarCodeScanned
                  }
                  style={{
                    height: "50%",
                    width: "95%",
                    borderWidth: 5,
                    borderColor: "silver",
                    alignSelf: "center",
                  }}
                />
              ) */
              }
            </View>
            <View style={{ margin: "15%" }} />
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  ListItem: {
    paddingTop: 2,
    paddingBottom: 2,
    marginRight: 10,
    marginLeft: 2,
    borderColor: "rgb(237,238,239)",
    borderBottomWidth: 1,
  },
  container: {
    // flex: 3,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "90%",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    width: SCREEN_WIDTH * 0.9,
    marginTop: "4%",
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 12,
  },
  countryCodeTouch: {
    paddingRight: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 2 : -4,
  },
  countryCode: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 25,
  },
  mainTextView: {
    flex: 1,
  },
  CodeInput: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 25,
    height: 60,
  },
  phoneNumberTextView: {
    textAlign: "center",
    fontSize: 40,
  },
  mainTextText: {
    textAlign: "center",
    fontSize: 20,
  },
  barCodeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "90%",
    marginTop: 10,
    marginBottom: 10,
  },
});

mapStateToProps = (state) => {
  return {
    phoneNum: state.auth.phoneNumber,
  };
};

export default connect(mapStateToProps, { phoneNumberChange, generateCode })(
  HomeKit
);
