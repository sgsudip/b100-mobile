import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconSLI from "react-native-vector-icons/SimpleLineIcons";
import IconAD from "react-native-vector-icons/AntDesign";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import IconFE from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Header } from "react-native-elements";
import { clean } from "../actions";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class MenuScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  state = {
    letterScore: "?",
  };
  onBack = () => {
    this.props.navigation.navigate("Home");
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps) {
      if (
        nextProps.score &&
        nextProps.score.numericScore &&
        nextProps.score.masterScore
      ) {
        const scoreData = nextProps.score.masterScore;
        const numericScore = nextProps.score.numericScore;
        const recommandation = scoreData.filter(function (e) {
          return e.option.score.recommendations !== "";
        });
        if (numericScore === 0 || numericScore < 1) {
          return {
            letterScore: "NULL",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (numericScore >= 1 && numericScore < 2) {
          return {
            letterScore: "A+",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (numericScore >= 2 && numericScore < 3) {
          return {
            letterScore: "A",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (numericScore >= 3 && numericScore < 4) {
          return {
            letterScore: "A-",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (numericScore >= 4 && numericScore < 5) {
          return {
            letterScore: "B+",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (numericScore >= 5 && numericScore < 6) {
          return {
            letterScore: "B",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (numericScore >= 6 && numericScore < 7) {
          return {
            letterScore: "B-",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (numericScore >= 7 && numericScore < 8) {
          return {
            letterScore: "C+",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (numericScore >= 8 && numericScore < 9) {
          return {
            letterScore: "C",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (numericScore >= 9 && numericScore < 10) {
          return {
            letterScore: "C-",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (numericScore >= 10) {
          return {
            letterScore: "D",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        }
        /* if (nextProps.score.numericScore <= 0) {
          // this.setState({ letterScore: "?" });
          return { letterScore: "?", generalRecommendation: recommandation };
        } else if (nextProps.score.numericScore > 8) {
          // this.setState({ letterScore: "D" });
          return {
            letterScore: "D",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (nextProps.score.numericScore > 5) {
          // this.setState({ letterScore: "C" });
          return {
            letterScore: "C",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else if (nextProps.score.numericScore > 2) {
          // this.setState({ letterScore: "B" });
          return {
            letterScore: "B",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } else {
          // this.setState({ letterScore: "A" });
          return {
            letterScore: "A",
            testReultsReady: true,
            generalRecommendation: recommandation,
          };
        } */
      }
    }
    return null;

    // if (prevState.someMirroredValue !== nextProps.someValue) {
    //   return {
    //     derivedData: computeDerivedState(nextProps),
    //     someMirroredValue: nextProps.someValue
    //   };
    // }
  }

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
          <View />
          <Text
            style={{
              fontFamily: "Muli-SemiBold",
              fontSize:
                Platform.OS === "ios" ? 17 : SCREEN_WIDTH < 575 ? 20 : 22,
              color: "#f2f2f2",
            }}
          >
            MENU
          </Text>
          <Icon
            name="close"
            size={22}
            onPress={this.onBack}
            underlayColor="transparent"
            color="#f2f2f2"
          />
        </Header>

        <View
          style={{ flex: 1, backgroundColor: "#4c4b4e", alignItems: "center" }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}
              style={{
                // borderBottomWidth:0.50,
                // borderBottomColor:"#e9ecef",
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderBottomColor: "#696969",
                borderBottomWidth: 0.5,
                width: SCREEN_WIDTH,
                // height: SCREEN_HEIGHT * 0.1,
                // height: SCREEN_HEIGHT * 0.1,
                // marginTop:20,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "flex-end",
                alignSelf: "center",
              }}
            >
              <View
                style={{ alignSelf: "flex-end", width: SCREEN_WIDTH * 0.14 }}
              >
                <IconMCI
                  name="home-outline"
                  size={24}
                  underlayColor="transparent"
                  color="#f2f2f2"
                />
              </View>
              <View style={{ alignSelf: "flex-end" }}>
                <Text
                  style={{ textAlign: "left", color: "white", fontSize: 20 }}
                >
                  Home
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("results")}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderBottomColor: "#696969",
                borderBottomWidth: 0.5,
                width: SCREEN_WIDTH,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "flex-end",
                alignSelf: "center",
              }}
            >
              <View
                style={{ alignSelf: "flex-end", width: SCREEN_WIDTH * 0.14 }}
              >
                <IconMCI
                  name="star-box-outline"
                  size={24}
                  underlayColor="transparent"
                  color="#f2f2f2"
                />
              </View>
              <View style={{ alignSelf: "flex-end" }}>
                <Text
                  style={{ textAlign: "left", color: "white", fontSize: 20 }}
                >
                  Report Card
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://b100method.com/pages/our-history")
              }
              style={{
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderBottomColor: "#696969",
                borderBottomWidth: 0.5,
                width: SCREEN_WIDTH,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "flex-end",
                alignSelf: "center",
                // borderBottomWidth:0.50,
                // borderBottomColor:"#e9ecef",
                // paddingBottom:20,
              }}
            >
              <View
                style={{ alignSelf: "flex-end", width: SCREEN_WIDTH * 0.14 }}
              >
                <IconMCI
                  name="history"
                  size={24}
                  underlayColor="transparent"
                  color="#f2f2f2"
                />
              </View>
              <View style={{ alignSelf: "flex-end" }}>
                <Text
                  style={{ textAlign: "left", color: "white", fontSize: 20 }}
                >
                  Our History
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://b100method.com/pages/arash-bereliani-m-d-m-s-f-a-c-c"
                )
              }
              style={{
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderBottomColor: "#696969",
                borderBottomWidth: 0.5,
                width: SCREEN_WIDTH,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "flex-end",
                alignSelf: "center",
              }}
            >
              <View
                style={{ alignSelf: "flex-end", width: SCREEN_WIDTH * 0.14 }}
              >
                <IconFE
                  name="user"
                  // name="user-md"
                  size={24}
                  underlayColor="transparent"
                  color="#f2f2f2"
                />
              </View>
              <View style={{ alignSelf: "flex-end" }}>
                <Text
                  style={{ textAlign: "left", color: "white", fontSize: 20 }}
                >
                  About Dr. B
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://b100method.com/blogs/heart-health-tips"
                )
              }
              style={{
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderBottomColor: "#696969",
                borderBottomWidth: 0.5,
                width: SCREEN_WIDTH,
                // borderBottomWidth:0.50,
                // borderBottomColor:"#e9ecef",
                // paddingBottom:20,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "flex-end",
                alignSelf: "center",
              }}
            >
              <View
                style={{ alignSelf: "flex-end", width: SCREEN_WIDTH * 0.14 }}
              >
                <IconMCI
                  name="lightbulb-on-outline"
                  size={24}
                  underlayColor="transparent"
                  color="#f2f2f2"
                />
              </View>
              <View style={{ alignSelf: "flex-end" }}>
                <Text
                  style={{ textAlign: "left", color: "white", fontSize: 20 }}
                >
                  Heart Health tips
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL("app-settings:");
              }}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderBottomColor: "#696969",
                borderBottomWidth: 0.5,
                width: SCREEN_WIDTH,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "flex-end",
                alignSelf: "center",
              }}
            >
              <View
                style={{ alignSelf: "flex-end", width: SCREEN_WIDTH * 0.14 }}
              >
                <IconAD
                  name="setting"
                  size={24}
                  underlayColor="transparent"
                  color="#f2f2f2"
                />
              </View>
              <View style={{ alignSelf: "flex-end" }}>
                <Text
                  style={{ textAlign: "left", color: "white", fontSize: 20 }}
                >
                  Settings
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => Linking.openURL("mailto: Support@B100Method.com")}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderBottomColor: "#696969",
                borderBottomWidth: 0.5,
                width: SCREEN_WIDTH,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "flex-end",
                alignSelf: "center",
              }}
            >
              <View
                style={{ alignSelf: "flex-end", width: SCREEN_WIDTH * 0.14 }}
              >
                <IconSLI
                  name="question"
                  size={24}
                  underlayColor="transparent"
                  color="#f2f2f2"
                />
              </View>

              <View style={{ alignSelf: "flex-end" }}>
                <Text
                  style={{ textAlign: "left", color: "white", fontSize: 20 }}
                >
                  Help
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                await AsyncStorage.clear();
                this.props.clean();
                this.props.navigation.navigate("phone");
              }}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 15,
                borderBottomColor: "#696969",
                borderBottomWidth: 0.5,
                width: SCREEN_WIDTH,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "flex-end",
                alignSelf: "center",
              }}
            >
              <View
                style={{ alignSelf: "flex-end", width: SCREEN_WIDTH * 0.14 }}
              >
                <IconMCI
                  // name="exit-run"
                  name="exit-to-app"
                  size={24}
                  underlayColor="transparent"
                  color="#f2f2f2"
                />
              </View>

              <View style={{ alignSelf: "flex-end" }}>
                <Text
                  style={{ textAlign: "left", color: "white", fontSize: 20 }}
                >
                  Sign Out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    backgroundColor: "#fff",
  },
  mainTextView: {
    flex: 1,
    top: "5%",
    width: "90%",
    marginBottom: "10%",
  },
  mainTextText: {
    textAlign: "center",
    fontSize: 20,
  },
  IconViewStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
  },

  IconStyle: {
    alignSelf: "center",
  },
  DOBViewStyle: {
    flex: 1,
    alignSelf: "center",
    marginBottom: "10%",
    width: "90%",
  },
  CommentViewStyle: {
    flex: 1,
    alignSelf: "center",

    width: "90%",
  },
  GenderViewStyle: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
  },
  LocationViewStyle: {
    flex: 1,
    alignSelf: "center",

    width: "90%",
  },
  ButtonViewStyle: {
    height: "10%",
    alignSelf: "center",
    marginBottom: "5%",
    width: "90%",
  },
});

export default connect(null, { clean })(MenuScreen);
