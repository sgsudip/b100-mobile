import React from "react";
import { StyleSheet, View, Text, Platform, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Header, Button, Input, Icon } from "react-native-elements";
import { valCodeChange, checkCode, generateCode } from "../actions/index";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class VerifyScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  state = {
    code: "",
    phone: this.props.phoneNum,
    visible: false,
  };
  componentDidMount = () => {
    this.setState({ visible: true });
  };
  componentDidUpdate = () => {
    if (this.props.success) {
      if (this.props.email !== "" && this.state.visible) {
        this.props.navigation.navigate("Home");
      } else if (this.props.success && this.state.visible) {
        // console.log("login" + this.props);
        // this.props.navigation.navigate("Login");
        this.props.navigation.navigate("Home");
        this.setState({ visible: false });
      }
    }
  };
  onComplete = () => {
    this.props.checkCode(
      this.state.code,
      this.props.phoneNum,
      this.props.navigation
    );
  };
  resendCode = () => {
    this.setState({ code: "" });
    alert(`Resending Code to ${this.props.phoneNum}`);
    this.props.generateCode(this.props.phoneNum);
  };
  onback = () => {
    this.props.navigation.navigate("phone");
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          containerStyle={{
            backgroundColor: "#ff4c6e",
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
            onPress={this.onback}
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

        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          {/* <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          > */}
          <View style={styles.mainTextView}>
            <Text style={styles.mainTextText}>Enter Confirmation Code</Text>
          </View>
          <View>
            <Input
              errorMessage={this.props.errMessage}
              inputStyle={{
                fontFamily: "Muli-SemiBold",
                fontSize: 18,
                textAlign: "center",
              }}
              placeholder="Enter 6-Digit Code"
              inputContainerStyle={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "silver",
              }}
              onChangeText={async (text) => {
                this.setState({ code: text }, () => {
                  if (this.state.code.length === 6) {
                    this.props.checkCode(
                      this.state.code,
                      this.props.phoneNum,
                      this.props.navigation
                    );
                  }
                });
              }}
              keyboardType="numeric"
              value={this.state.code}
            />
          </View>
          <View>
            <Button
              // type="outline"
              containerStyle={{
                marginTop: 15,
                width: "75%",
                alignSelf: "center",
              }}
              buttonStyle={{
                backgroundColor: "#8FA4C4",
              }}
              titleStyle={{ fontSize: 15, paddingBottom: 0, paddingTop: 0 }}
              title="Re-send Confirmation Code"
              onPress={this.resendCode}
            />
          </View>
          {/* <View style={{ flex: 1 }} /> */}
          <View
            style={{
              // flex: 1,
              alignContent: "center",
              justifyContent: "center",
              alignSelf: "center",
              paddingVertical: 20,
            }}
          >
            <Text style={{ textAlign: "center", marginBottom: 5 }}>
              We sent a 6 digit confirmation code to
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "700",
                fontSize: 20,
                marginBottom: 5,
              }}
            >
              {this.props.phoneNum}.
            </Text>
            <Text style={{ textAlign: "center" }}>
              You should receive it in a few seconds.
            </Text>
          </View>
          {/* </View> */}
        </KeyboardAwareScrollView>
        {/* <View style={{ flex: 1 }} /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: "5%",
  },
  mainTextView: {
    // marginTop: "10%",
    marginBottom: "10%",
  },
  phoneNumberTextView: {
    textAlign: "center",
    fontSize: 40,
  },
  mainTextText: {
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Muli-SemiBold",
  },
  subTextText: {},
});

mapStateToProps = (state) => {
  return {
    phoneNum: state.auth.phoneNumber,
    valCode: state.auth.valCode,
    success: state.auth.success,
    errMessage: state.auth.errorMessage,
    email: state.auth.email,
  };
};
export default connect(mapStateToProps, {
  valCodeChange,
  generateCode,
  checkCode,
})(VerifyScreen);
