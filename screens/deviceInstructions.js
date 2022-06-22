import _ from "lodash";
import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, Alert, Image } from "react-native";
import { Header, Button } from "react-native-elements";
// import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import DatePicker from "react-native-datepicker";
import IconEn from "react-native-vector-icons/Entypo";
import { connect } from "react-redux";
import { updatePhase } from "../actions";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class DeviceInstructions extends Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  state = {
    hasCameraPermission: null,
    date: "",
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    // const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { status } = await Camera.requestCameraPermissionsAsync();
    this.setState({
      hasCameraPermission: status === "granted",
    });
  };

  _handleBarCodeRead = (data) => {
    Alert.alert("Scan successful!", JSON.stringify(data.data));
  };
  onBackPress = () => {
    this.props.navigation.navigate("HomeKit");
  };
  onDonePress = () => {
    this.props.navigation.navigate("P2Quest");
    // need to add the redux action that will set this to true
    this.props.updatePhase(2, this.props.phaseID);
  };

  render() {
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
            onPress={this.onBackPress}
            style={{ marginLeft: "10%", fontSize: 24 }}
            underlayColor="transparent"
            color="black"
          />
        </Header>

        <View style={{ flex: 2 }}>
          <Text style={{ marginTop: "5%", color: "grey", fontSize: 14 }}>
            Home Test received on 8/15/2019
          </Text>

          <View style={styles.container}>
            {this.state.hasCameraPermission === null ? (
              <Text>Requesting for camera permission</Text>
            ) : this.state.hasCameraPermission === false ? (
              <Text>Camera permission is not granted</Text>
            ) : (
              <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={{
                  height: "100%",
                  width: "100%",
                  borderWidth: 5,
                  borderColor: "#8ea6c6",
                }}
              />
            )}
          </View>

          <View style={styles.container}>
            <Image
              source={require("../assets/images/misc/2x/barcode-2x.png")}
              style={{ alignSelf: "center", height: SCREEN_HEIGHT * 0.2 }}
            />
          </View>

          <Text
            style={{
              width: "85%",
              textAlign: "center",
              alignSelf: "center",
              fontSize: 16,
            }}
          >
            Once your Home Test is complete, please enter the date you have
            completed it.
          </Text>

          <DatePicker
            style={{
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 20,
              marginBottom: 20,
            }}
            format="MM-DD-YYYY"
            minDate="01-01-2019"
            placeholder="- Select Date -"
            showIcon={false}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            date={this.state.date}
            onDateChange={(date) => {
              this.setState({ date: date });
            }}
            customStyles={{
              dateTouchBody: {
                width: SCREEN_WIDTH * 0.85,
                alignSelf: "center",
                backgroundColor: "#fbfbfb",
              },
              dateInput: {
                borderRadius: 5,
              },
            }}
          />

          <Button
            title="DONE"
            onPress={this.onDonePress}
            // ViewComponent={require("expo").linearGradient}
            titleStyle={{ fontSize: 16, paddingBottom: 0, paddingTop: 0 }}
            buttonStyle={{ borderRadius: 0, height: SCREEN_HEIGHT * 0.07 }}
            ViewComponent={require("expo-linear-gradient").LinearGradient}
            linearGradientProps={{
              colors: ["#8FA4C4", "#8FA4C4"],
              start: [1, 0],
              end: [0.2, 0],
            }}
          />
        </View>

        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
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
    phaseID: state.phase.ID,
  };
};
export default connect(mapStateToProps, { updatePhase })(DeviceInstructions);

/*
import _ from 'lodash';
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import Slides from '../components/WelcomeSlides';
import Images from "../assets/images";

const SCREEN_WIDTH = Dimensions.get('window').width *.9;
const SLIDE_DATA = [
  { mainText: 'Now it is time to use our custom device',
  subText:"Remove it from the bag",
  image:Images.image1
  },
  { mainText: 'steps 1 through whatever',
  subText:"This is a descrption of what to do!!",
  image:Images.Icon
  },
  //////////////////////////////////////////////////////////////////////
  //add more objects to add more screens to slide componet
  // { mainText: 'Some Main Text 1',
  // subText:"some informtion about the App 1. Change in welcomeSlides.js",
  // image:Images.sample
  // },
  { mainText: "THATS IT!!!!!",
  subText:"Just scan the barcode on the next screen and ship it back so we can process your results!!",
  image:Images.camera}
];

export default class WelcomeScreen extends Component {
    static navigationOptions = {
        header: null,
        tabBarVisible: false
      };
  onSlidesComplete = () => {
    this.props.navigation.navigate('Home');
  }
  state = {
    bar: 0}

  render() {
    return (
      <View
      style={styles.container}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },

});
WelcomeScreen;
*/
