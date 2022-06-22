import React from "react";
import { StyleSheet, View, Text, Platform, Dimensions } from "react-native";
import { connect } from "react-redux";
import { phoneNumberChange, generateCode, updatePhase } from "../actions/index";
import { Header, Button } from "react-native-elements";
import IconEn from "react-native-vector-icons/Entypo";
import { ScrollView } from "react-native-gesture-handler";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class B100Map extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  UNSAFE_componentWillReceiveProps() {
    if (this.props.phoneNum !== "") {
      this.setState({ continuebool: false });
    }
  }
  onBackPress = () => {
    this.props.navigation.navigate("Home");
  };
  onDonePress = () => {
    this.props.navigation.navigate("P4Quest");
    this.props.updatePhase(4, this.props.phaseID);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          centerComponent={{
            text: "B100 CENTER",
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
              You have selected B100 Center
            </Text>

            <View style={styles.card}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "grey",
                  width: "100%",
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}
              ></View>

              <ScrollView
                style={{ flex: 3, width: "100%", marginBottom: 15 }}
                contentContainerStyle={{ alignItems: "center" }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 15,
                    marginTop: 15,
                    width: "95%",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  a luctus urna, at iaculis lectus.
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 15,
                    // fontWeight: "bold",
                    width: "95%",
                  }}
                >
                  What you should expect
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 15,
                    textAlign: "left",
                    width: "95%",
                  }}
                >
                  1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Etiam a luctus urna, at iaculis lectus.
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 15,
                    textAlign: "left",
                    width: "95%",
                  }}
                >
                  2. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Etiam a luctus urna, at iaculis lectus.
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    marginBottom: 15,
                    textAlign: "left",
                    width: "95%",
                  }}
                >
                  3. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Etiam a luctus urna, at iaculis lectus.
                </Text>
              </ScrollView>
              <View>
                <Button
                  title="Done"
                  onPress={this.onDonePress}
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
                  }}
                  titleStyle={{
                    textAlign: "center",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: SCREEN_HEIGHT * 0.05 }} />
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
})(B100Map);
