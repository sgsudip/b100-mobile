import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { phoneNumberChange, generateCode, updatePhase } from "../actions/index";
import { Header, Button } from "react-native-elements";
import IconEn from "react-native-vector-icons/Entypo";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class GeneticTest extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  UNSAFE_componentWillReceiveProps() {
    // console.log("from genetic test");
    if (this.props.phoneNum !== "") {
      this.setState({ continuebool: false });
    }
  }
  onBackPress = () => {
    this.props.navigation.navigate("Home");
  };
  onStart = () => {
    this.props.navigation.navigate("P3Quest");
  };

  // onDonePress = () => {
  //   this.props.navigation.navigate("P3Quest");
  //   this.props.updatePhase(3, this.props.phaseID);
  // };
  onOrder = () => {
    WebBrowser.openBrowserAsync(
      "https://b100method.com/products/genetic-testing-for-heart-disease"
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          centerComponent={{
            text: "GENETIC TEST",
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

        <View style={styles.container}>
          <View style={styles.mainTextView}>
            <Text style={{ fontSize: 15, marginTop: 10, marginBottom: 10 }}>
              You have selected Genetic Test
            </Text>

            <View style={styles.card}>
              <Image
                source={require("../assets/images/geneticTest.png")}
                resizeMode="cover"
                style={{
                  flex: 2,
                  width: "100%",
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              ></Image>

              <ScrollView
                style={{
                  flex: 3,
                  width: "100%",
                  marginBottom: 0,
                  height: SCREEN_HEIGHT * 0.5,
                }}
                contentContainerStyle={{ alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 0,
                    marginTop: 15,
                    width: "95%",
                  }}
                >
                  Are you making the right choices for your genes to achieve
                  optimal heart health? In this easy-to-use genetic home test
                  for heart disease, we will answer this questions.
                </Text>
              </ScrollView>
              <View style={{ marginTop: 0 }}>
                <Button
                  title="Get My Genetic Test"
                  onPress={this.onOrder}
                  // ViewComponent={require("expo").linearGradient}
                  ViewComponent={require("expo-linear-gradient").LinearGradient}
                  linearGradientProps={{
                    colors: ["#8FA4C4", "#8FA4C4"],
                    start: [1, 0],
                    end: [0.2, 0],
                  }}
                  buttonStyle={{
                    borderRadius: 7,
                    width: SCREEN_WIDTH * 0.75,
                    bottom: 15,
                  }}
                  titleStyle={{ paddingTop: 0, paddingBottom: 0 }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: SCREEN_HEIGHT * 0.1, alignItems: "center" }} />
        <Button
          title="Start Genetic Test"
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
            alignSelf: "center",
            width: SCREEN_WIDTH * 0.65,
            bottom: 25,
          }}
          containerStyle={{
            marginBottom: 20,
          }}
        />
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
  },
  card: {
    flex: 4,
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
});

mapStateToProps = (state) => {
  return {
    phoneNum: state.auth.phoneNumber,
    phaseID: state.phase.ID,
  };
};

export default connect(mapStateToProps, {
  phoneNumberChange,
  generateCode,
  updatePhase,
})(GeneticTest);
