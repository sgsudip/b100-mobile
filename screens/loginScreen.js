import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  // Picker,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import { Input, Avatar, Header, Icon, Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
// import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  emailChanged,
  firstNameChange,
  imageUpload,
  lastNameChange,
  setEducationLevel,
} from "../actions/index";
import RNPickerSelect from "react-native-picker-select";
import images from "../assets/images";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      continuebool: true,
      cameraRollPermistions: false,
      cameraPermission: false,
    };
  }
  UNSAFE_componentWillMount = async () => {
    // console.warn("from login screen" + JSON.stringify(this.props.image));
    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status === "granted") {
      this.setState({ cameraRollPermistions: true });
    } else {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        this.setState({ cameraPermission: true });
      }
    }
  };
  // componentWillReceiveProps() {
  //   console.log("props from update details" + this.props);
  //   if (
  //     this.props.email !== "" &&
  //     this.props.lastName !== "" &&
  //     this.props.firstName !== ""
  //   ) {
  //     this.setState({ continuebool: false });
  //   } else {
  //     this.setState({ continuebool: false });
  //   }
  // }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.image,
    });

    // console.log(result, "thi si result");

    if (!result.cancelled) {
      this.props.imageUpload(result.uri);
    }
  };

  validateProfile = (fname, lname, email) => {
    if (!fname || !lname || !email) {
      alert("All Field Are Required");
    } else {
      let pattern =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const valid = pattern.test(String(email).toLowerCase());
      if (!valid) {
        alert("Enter valid email address");
      } else {
        this.props.navigation.navigate("HealthBackground");
      }
    }
  };
  onSkip = () => {
    this.props.navigation.navigate("Home");
  };
  onComplete = () => {
    this.validateProfile(
      this.props.firstName,
      this.props.lastName,
      this.props.email
    );
    // this.props.navigation.navigate("HealthBackground");
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
            // paddingVertical:30,
          }}
        >
          <Text
            style={{
              fontFamily: "Muli-SemiBold",
              fontSize: 14,
              color: "#f2f2f2",
              marginLeft: "7%",
              // paddingVertical:7,
            }}
            onPress={this.onSkip}
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
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled
          enableOnAndroid
          keyboardOpeningTime={0}
        >
          <View style={styles.mainTextView}>
            <Text
              style={
                (styles.mainTextText,
                { fontSize: 22, marginBottom: 10, marginTop: 15 })
              }
            >
              First Tell Us About Yourself
            </Text>
          </View>
          <View style={{ margin: 5 }} />
          <View style={styles.IconViewStyle}>
            <TouchableWithoutFeedback onPress={this._pickImage.bind(this)}>
              <Avatar
                size={100}
                source={
                  !this.props.image
                    ? require("../assets/images/camera/Group2-2x.png")
                    : this.props.image === "www.google.com"
                    ? require("../assets/images/camera/Group2-2x.png")
                    : { uri: this.props.image }
                  // this.props.image && this.props.image === "www.google.com"
                  //   ? require("../assets/images/camera/Group2-2x.png")
                  //   : { uri: this.props.image }
                }
                imageProps={{ resizeMode: "stretch" }}
                // source={  require("../assets/images/camera/Group2-2x.png") }

                // imageProps={{resizeMode: "cover"}}
                showEditButton
                rounded
              />
            </TouchableWithoutFeedback>
            {this.props.image === "www.google.com" ? (
              <Text style={{ fontSize: 14, color: "grey" }}>Upload Photo</Text>
            ) : null}
          </View>
          <View
            style={{
              marginBottom: 20,
              width: SCREEN_WIDTH,
              borderBottomWidth: 1,
              borderBottomColor: "silver",
            }}
          />
          <View style={styles.emailViewStyle}>
            <Input
              label="Email Address"
              labelStyle={{
                textAlign: "left",
                color: "black",
                fontSize: 16,
                marginBottom: 7,
              }}
              autoCapitalize="none"
              inputStyle={{
                fontFamily: "Muli-SemiBold",
                fontSize: 16,
                // fontWeight: 300,
                paddingLeft: 10,
                // minHeight: 35,
                // color:"lightgray",
              }}
              placeholder="john@example.com"
              value={this.props.email}
              inputContainerStyle={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "silver",
              }}
              containerStyle={{ marginBottom: 25 }}
              onChangeText={(text) => this.props.emailChanged(text)}
            />
            <Input
              label="Your Name"
              autoCapitalize="none"
              labelStyle={{
                textAlign: "left",
                color: "black",
                fontSize: 16,
                marginBottom: 7,
              }}
              inputStyle={{
                fontFamily: "Muli-SemiBold",
                //fontSize: 16,
                paddingLeft: 10,
                fontSize: 16,
                // fontWeight: 300,
                // color:"lightgray",
              }}
              placeholder="First Name"
              value={this.props.firstName}
              inputContainerStyle={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "silver",
              }}
              containerStyle={{ marginBottom: 10 }}
              onChangeText={(text) => this.props.firstNameChange(text)}
            />
            <Input
              inputStyle={{
                fontFamily: "Muli-SemiBold",
                //fontSize: 16,
                paddingLeft: 10,
                fontSize: 16,
                // fontWeight: 300,
                // color:"lightgray",
              }}
              autoCapitalize="none"
              placeholder="Last Name"
              value={this.props.lastName}
              inputContainerStyle={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "silver",
              }}
              onChangeText={(text) => this.props.lastNameChange(text)}
            />
          </View>
          <View
            style={{
              alignContent: "center",
              justifyContent: "center",
              marginTop: "15%",
            }}
          >
            <Text style={styles.disclosureText}>
              We won't share your information with anyone!
            </Text>

            <Button
              title="Continue"
              rounded
              containerStyle={{
                padding: 15,
              }}
              // ViewComponent={require("expo").linearGradient}
              ViewComponent={require("expo-linear-gradient").LinearGradient}
              linearGradientProps={{
                colors: ["#8FA4C4", "#8FA4C4"],
                start: [1, 0],
                end: [0.2, 0],
              }}
              buttonStyle={{
                //width: SCREEN_WIDTH * 0.6,
                // height: SCREEN_HEIGHT * 0.07,
                alignSelf: "center",
                backgroundColor: "#8FA4C4",
                alignContent: "center",
                // width: "90%",
                // fontWeight: "bold",
                width: SCREEN_WIDTH * 0.85,
                height: 50,
                bottom: 20,
                marginTop: 30,
              }}
              titleStyle={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
              onPress={this.onComplete}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: "#fff",
  },
  mainTextText: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 24,
  },
  IconViewStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "5%",
  },

  IconStyle: {},
  emailViewStyle: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
  },
  nameViewStyle: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
  },
  disclosureText: {
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 18,
    width: "80%",
  },
});
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
const mapStateToProps = (state) => {
  return {
    educationLevel: state.auth.educationLevel,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    email: state.auth.email,
    uid: state.auth.uid,
    image: state.auth.image_url,
  };
};
export default connect(mapStateToProps, {
  setEducationLevel,
  imageUpload,
  emailChanged,
  firstNameChange,
  lastNameChange,
})(LoginScreen);
