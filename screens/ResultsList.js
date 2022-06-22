import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
} from "react-native";
import { connect } from "react-redux";
import { Button, Header, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";
import {
  updatePhase,
  dateChange,
  sexChange,
  saveProfileToServer,
} from "../actions/index";
import images from "../assets/images";
import RenderHTML from "react-native-render-html";
import LinkArray from "../constants/LinkArray";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class ResultsList extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  onBack = () => {
    this.props.navigation.navigate("results");
  };

  geneticTestButton = () => {
    this.props.navigation.navigate("Results");
  };

  insertTextAtIndices = (text, value) => {
    return value.replace(/./g, function (character, index) {
      return text[index] ? text[index] + character : character;
    });
  };

  setClickHere = (text, choice) => {
    // let text =
    //   "Suffering a stroke is a stressful, life-altering ordeal, to say the least. Yet, one in four people will have another stroke at some point in their lives. It is important to understand that each subsequent stroke will leave you less resilient, therefore, it is crucial that you have a clear understanding of what caused your stroke in the first place as those risk factors are most likely still present. There are two main categories of stroke: hemorrhagic and ischemic. If your stroke was hemorrhagic, or a bleeding stroke, we recommend good blood pressure control. Sustained high blood pressure can cause blood vessels to become weakened and damaged, leading to a stroke. For this reason, you should have a blood pressure monitor at home and take your blood pressure reading weekly following these instructions. Try to aim for a reading of LESS than 140/90. If your stroke was an ischemic, or clotting stroke, determining what caused the clot to form is critical. To determine this, your cardiologist will look at the blood vessels in your head and neck. Fortunately, 80 percent of recurrent strokes can be prevented with diet modification, exercise, blood pressure control, cholesterol reduction with the help of statins, and treatment with antiplatelet medications. We typically recommend aspirin and cholesterol medication to reduce the risk of ischemic stroke. Aspirin keeps the platelets in your blood from sticking together. Cholesterol medications lower LDL (or “bad” cholesterol). Statins, in particular, are known to work in concert with aspirin to reduce ischemic stroke risk. For the other 20% there may be underlying genetic conditions. Understanding your genetic susceptibility for heart disease risk factors is crucial.To learn yours you can order the B100 Genetics home test by clicking here. You will also want to be sure you are brushing and flossing every day! Improved gum health may slow the progression of atherosclerosis or narrowing of the arteries. I recommend the waterpik. You can find one on Amazon. Additionally, please get checked for Atrial fibrillation (Afib). An irregular and sometimes rapid heartbeat greatly increases the risk of stroke. It’s a serious condition that can cause blood clots in the heart, which can travel and trigger ischemic strokes and ask your cardiologist for an annual carotid artery ultrasound. For additional heart health tips by Dr. B click here.";
    if (
      (text.includes("BMI") || text.includes("pack years")) &&
      text.includes("_______")
    ) {
      let recommended = text.split("_______");
      return recommended[0] + choice + recommended[1];
    }
    var obj = {};
    let link = [];
    for (let i = 0; i < LinkArray.length; i++) {
      if (text.includes(LinkArray[i].key) && text.includes(LinkArray[i].id)) {
        let startIndex = text.indexOf(LinkArray[i].key);
        let endIndex = LinkArray[i].key.length + startIndex;
        obj = {
          ...obj,
          [startIndex]: `<a href=${LinkArray[i].value}>`,
          [endIndex]: "</a>",
        };
      } else {
        link = <Text>{text}</Text>;
      }
    }
    let c = this.insertTextAtIndices(obj, text);
    return c;
  };

  state = {
    initialTimeAfterQuestion: "",
    newTimeOnCheck: "",
    showGradeScreen: true,
    token: "",
    continuebool: true,
    letterScore: "?",
    subText: "",
    description: "",
  };

  componentDidMount = () => {};

  setBMIrecomm = (choice, recommendation) => {
    let recommended = recommendation.split("_______");

    return recommended[0] + choice + recommended[1];
  };

  render() {
    // console.log("MASTER SCORE", this.props.score.masterScore);
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          centerComponent={{
            text: "Test Results",
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
          <Icon
            name="chevron-thin-left"
            onPress={this.onBack}
            style={{ marginLeft: "10%", fontSize: 24 }}
            underlayColor="transparent"
            color="black"
          />
        </Header>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#fff",
            marginTop: "4%",
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            {this.props.score.masterScore.map((score, index) => {
              let date = new Date(score.option.date);
              return (
                <View key={index}>
                  <Card
                    containerStyle={{
                      borderRadius: 10,
                      width: SCREEN_WIDTH * 0.9,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 6,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 4.65,
                      elevation: 12,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "left",
                          color: "#a9a9a9",
                          fontSize: 16,
                        }}
                      >
                        Date:{" "}
                        {date.getMonth() +
                          1 +
                          "-" +
                          date.getDate() +
                          "-" +
                          date.getFullYear()}
                      </Text>
                      {/* <Text
                        style={{
                          textAlign: "right",
                          color: "#a9a9a9",
                          fontSize: 16,
                        }}
                      >
                        score: {score.option.score.score}
                      </Text> */}
                    </View>

                    <Text style={{ textAlign: "left", fontSize: 20 }}>
                      {score.question}
                    </Text>
                    <Text></Text>
                    <Text style={{ textAlign: "left", fontSize: 16 }}>
                      {score.question.includes("BMI")
                        ? "Your BMI was calculated to be:"
                        : "option chosen:"}{" "}
                      {score.option.optionChoiceName}
                    </Text>
                    <Text></Text>
                    {/* <Text style={{ textAlign: "left", fontSize: 14 }}>recommended: {
                      score.option.score.recommendations.includes('BMI', '_______') || score.option.score.recommendations.includes('pack years', '_______')
                        ? this.setBMIrecomm(score.option.optionChoiceName, score.option.score.recommendations)
                        : score.option.score.recommendations
                    }
                    </Text> */}
                    <Text style={{ textAlign: "left", fontSize: 16 }}>
                      Recommandation:
                      <RenderHTML
                        baseStyle={{ textAlign: "left" }}
                        // contentWidth='100%'
                        source={{
                          html: this.setClickHere(
                            score.option.score.recommendations,
                            score.option.optionChoiceName
                          ),
                        }}
                        // source={{html:"<a>aaassdniaaadsfiifgbngfjkgdfhgiudfh iughdiugh digh dih</a>"}}
                      />
                    </Text>
                  </Card>
                  <View
                    style={{
                      alignSelf: "flex-start",
                      paddingLeft: "5%",
                      paddingBottom: "5%",
                    }}
                  ></View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
const mapStateToProps = (state) => {
  return {
    score: state.auth.score,
    phaseID: state.phase.ID,
  };
};
export default connect(mapStateToProps, {
  updatePhase,
  dateChange,
  sexChange,
  saveProfileToServer,
})(ResultsList);
