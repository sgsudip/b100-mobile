import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import { updatePhase, dateChange } from "../actions";
import { Button, Header } from "react-native-elements";
import IconEn from "react-native-vector-icons/Entypo";
import Axios from "axios";
import * as API from "../constants/api";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class CompareScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  state = {
    initialTimeAfterQuestion: "",
    newTimeOnCheck: "",
    showGradeScreen: true,
    fetching: true,
    token: "",
    letterScore: "?",
    subText: "",
    description: "",
    meaning: "",
    communityDescription: "",
    communityLetterScore: "",
    communitySubText: "",
    communityMeaning: "",
  };

  componentDidMount = async () => {
    if (this.props.score.numericScore <= 0) {
      // if(true)
      this.setState({ letterScore: "?", showGradeScreen: false });
    } else if (this.props.score.numericScore > 8) {
      this.setState({
        letterScore: "D",
        subText: "Established",
        description: "Treatment and monitoring required.",
        meaning: "Dangerous",
      });
    } else if (this.props.score.numericScore > 5) {
      this.setState({
        letterScore: "C",
        subText: "Moderate",
        description: "Preventative actions to be implemented immediately.",
        meaning: "Cautious",
      });
    } else if (this.props.score.numericScore > 2) {
      this.setState({
        letterScore: "B",
        subText: "Low",
        description:
          "Precautions given to maintain. Repeat modified testing annually",
        meaning: "Borderline",
      });
    } else {
      this.setState({
        letterScore: "A",
        subText: "Very Low",
        description: "Keep it Up! \n Repeat modified testing annually",
        meaning: "Awesome",
      });
    }

    const res = await API.get("api/community/score");
    // console.log("RES", res.data)
    const communityAverage = res.data.communityAverage;
    if (communityAverage > 8) {
      this.setState({
        communityLetterScore: "D",
        communitySubText: "Establisded",
        communityDescription: "Treatment and monitoring required.",
        communityMeaning: "Dangerous",
      });
    } else if (communityAverage > 5) {
      this.setState({
        communityLetterScore: "C",
        communitySubText: "Moderate",
        communityDescription:
          "Preventative actions to be implemented immediately.",
        communityMeaning: "Cautious",
      });
    } else if (communityAverage > 2) {
      this.setState({
        communityLetterScore: "B",
        communitySubText: "Low",
        communityDescription:
          "Precautions given to maintain. Repeat modified testing annually",
        communityMeaning: "Borderline",
      });
    } else {
      this.setState({
        communityLetterScore: "A",
        communitySubText: "Very Low",
        communityDescription: "Keep it Up! \n Repeat modified testing annually",
        communityMeaning: "Dangerous",
      });
    }

    this.setState({ fetching: false });
  };

  toHomeScreen = () => {
    this.props.navigation.navigate("results");
  };

  render() {
    let date = new Date();

    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          centerComponent={{
            text: "MY B100 GRADE",
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
            onPress={this.toHomeScreen}
            style={{ marginLeft: "10%", fontSize: 24 }}
            underlayColor="transparent"
            color="black"
          />
          <View>
            <Text
              style={{
                fontFamily: "Muli-SemiBold",
                fontSize: 16,
                color: "black",
              }}
            >
              B100 GRADE
            </Text>
          </View>
        </Header>

        <View style={styles.card}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, alignItems: "center" }}>
              <View style={{ width: "100%" }}>
                <Text style={styles.gradeText}>Yours</Text>
                <Text style={styles.grade}>{this.state.letterScore}</Text>
                <Text style={styles.gradeText}>{this.state.meaning}</Text>
              </View>

              <View style={styles.horizontalLine}></View>
              {!this.state.fetching ? (
                <View style={{ width: "100%" }}>
                  <Text style={styles.gradeText}>Community</Text>
                  <Text style={styles.grade}>
                    {this.state.communityLetterScore}
                  </Text>
                  <Text style={styles.gradeText}>
                    {this.state.communityMeaning}
                  </Text>
                </View>
              ) : (
                <View>
                  <ActivityIndicator size={"large"} />
                  <Text>processing the community results. Please stand by</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "90%",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    width: SCREEN_WIDTH * 0.9,
    marginTop: "4%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  grade: {
    fontFamily: "Muli-SemiBold",
    fontSize: 150,
  },
  gradeText: {
    fontFamily: "Muli-SemiBold",
    fontSize: 25,
  },
  updatedText: {
    fontFamily: "Muli-SemiBold",
    color: "darkgrey",
    fontSize: 15,
    marginTop: "5%",
  },
  horizontalLine: {
    borderBottomColor: "#efefef",
    borderBottomWidth: 3,
    width: "95%",
    marginBottom: "5%",
    marginTop: "5%",
  },
  descriptionHeading: {
    color: "#ff4c6e",
    textAlign: "left",
    marginBottom: "5%",
  },
  description: {
    textAlign: "left",
    paddingBottom: "10%",
  },
  nextButton: {
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
    marginTop: "10%",
    marginBottom: "5%",
  },
  phoneNumberTextView: {
    textAlign: "center",
    fontSize: 40,
  },
  mainTextText: {
    textAlign: "center",
    fontSize: 20,
  },
  questionText: {
    fontSize: 20,
    color: "#fc2a4d",
  },
  subTextText: {
    fontSize: 15,
  },
});
const mapStateToProps = (state) => {
  return {
    testReultsReady: state.auth.testReultsReady,

    score: state.auth.score,
    phaseID: state.phase.ID,
  };
};
export default connect(mapStateToProps, { updatePhase })(CompareScreen);
