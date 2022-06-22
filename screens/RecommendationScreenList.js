import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Button, Header, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";
import {
  updatePhase,
  dateChange,
  sexChange,
  saveProfileToServer,
} from "../actions/index";
import LinkArray from "../constants/LinkArray";
import RecommendationHTML from "../components/RecommendationHTML";
// import ShowRecommendation from "./ShowRecommendation";

const RecommandationHTML = React.memo(RecommendationHTML);

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class RecommendationsScreenList extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  onBack = () => {
    // this.props.navigation.navigate("Home");
    this.props.navigation.navigate("results");
  };

  recBackPress = () => {
    this.setState({
      moreText: false,
    });
  };

  // geneticTestButton = () => {
  //   this.props.navigation.navigate("Results");
  // };

  state = {
    // initialTimeAfterQuestion: "",
    // newTimeOnCheck: "",
    // showGradeScreen: true,
    // token: "",
    // continuebool: true,
    // letterScore: "?",
    // subText: "",
    // description: "",
    recommandation: [],
    moreText: false,
    phase2LabResults: [],
    db_cadAnswers: [],
    // recNo: "",
  };

  componentDidMount = () => {
    if (this.props.score.masterScore) {
      const scoreData = this.props.score.masterScore;
      const recommandation = scoreData.filter(function (e) {
        return e.option.score.recommendations !== "";
      });
      this.setState({ recommandation: recommandation });
    }
  };

  static getDerivedStateFromProps(props, state) {
    if (props.score.masterScore) {
      const scoreData = props.score.masterScore;
      let recommandation = scoreData.filter(function (e) {
        return e.option.score.recommendations !== "";
      });
      const { phase } = props.route.params;
      // console.log(phase, "phase number");
      recommandation = recommandation.filter((item) => item.phase === phase);
      // console.log("filetered array", recommandation.length);
      return {
        recommandation: recommandation,
        phase: phase,
        db_cadAnswers: props.score.db_cadAnswers,
        phase2LabResults: props.score.phase2LabResults,
      };
    }
    return null;
  }

  insertTextAtIndices = (text, value) => {
    return value.replace(/./g, function (character, index) {
      return text[index] ? text[index] + character : character;
    });
  };

  handleTextView = (index) => {
    if (index === this.state.recNo) {
      this.setState({ moreText: false });
    } else {
      // console.log(this.state.moreText,'more text');
      this.setState({ moreText: true, recNo: index });
    }
  };

  setClickHere = (text, choice) => {
    // let text =
    //   "Suffering a stroke is a stressful, life-altering ordeal, to say the least. Yet, one in four people will have another stroke at some point in their lives. It is important to understand that each subsequent stroke will leave you less resilient, therefore, it is crucial that you have a clear understanding of what caused your stroke in the first place as those risk factors are most likely still present. There are two main categories of stroke: hemorrhagic and ischemic. If your stroke was hemorrhagic, or a bleeding stroke, we recommend good blood pressure control. Sustained high blood pressure can cause blood vessels to become weakened and damaged, leading to a stroke. For this reason, you should have a blood pressure monitor at home and take your blood pressure reading weekly following these instructions. Try to aim for a reading of LESS than 140/90. If your stroke was an ischemic, or clotting stroke, determining what caused the clot to form is critical. To determine this, your cardiologist will look at the blood vessels in your head and neck. Fortunately, 80 percent of recurrent strokes can be prevented with diet modification, exercise, blood pressure control, cholesterol reduction with the help of statins, and treatment with antiplatelet medications. We typically recommend aspirin and cholesterol medication to reduce the risk of ischemic stroke. Aspirin keeps the platelets in your blood from sticking together. Cholesterol medications lower LDL (or “bad” cholesterol). Statins, in particular, are known to work in concert with aspirin to reduce ischemic stroke risk. For the other 20% there may be underlying genetic conditions. Understanding your genetic susceptibility for heart disease risk factors is crucial.To learn yours you can order the B100 Genetics home test by clicking here. You will also want to be sure you are brushing and flossing every day! Improved gum health may slow the progression of atherosclerosis or narrowing of the arteries. I recommend the waterpik. You can find one on Amazon. Additionally, please get checked for Atrial fibrillation (Afib). An irregular and sometimes rapid heartbeat greatly increases the risk of stroke. It’s a serious condition that can cause blood clots in the heart, which can travel and trigger ischemic strokes and ask your cardiologist for an annual carotid artery ultrasound. For additional heart health tips by Dr. B click here.";
    if (this.state.phase2LabResults && text.includes("$$")) {
      const Answers = this.state.db_cadAnswers.map((item) =>
        item.answer.toLowerCase().includes("yes") ? null : item.answer
      );
      text = text.replace("$$Answer$$", Answers);
      text = text.replace("$$LDC$$", this.state.phase2LabResults[0].LDL_C);
      text = text.replace("$$TG$$", this.state.phase2LabResults[0].TG);
      text = text.replace("$$HDL$$", this.state.phase2LabResults[0].HDL);
    }
    if (
      (text.includes("BMI") || text.includes("pack years")) &&
      text.includes("_______")
    ) {
      let recommended = text.split("_______");
      return recommended[0] + choice + recommended[1];
    } else if (text.includes("_____")) {
      let recommended = text.split("_____");
      return recommended[0] + choice + recommended[1];
    }
    var obj = {};
    let link = [];
    for (let i = 0; i < LinkArray.length; i++) {
      if (text.includes(LinkArray[i].key) && text.includes(LinkArray[i].id)) {
        // console.log(LinkArray[i].value.toString());
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

  render() {
    /* const uniqueArray = [...new Set(this.state.recommandation)];
    console.log("state:",this.state.recommandation.length,"unique",uniqueArray); */
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          centerComponent={{
            text: "Test Recommandation",
            style: {
              fontFamily: "Muli-SemiBold",
              fontSize: 20,
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
        >
          <Icon
            name="chevron-thin-left"
            onPress={this.onBack}
            style={{ marginLeft: "10%", fontSize: 24 }}
            underlayColor="transparent"
            color="#f2f2f2"
          />
        </Header>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#e9ecef",
            // height: 100,
            // overflow: "hidden",
            // marginTop: "4%",
            // padding: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            {/* {this.props.score.masterScore.map((score, index) => { */}
            {this.state.recommandation && this.state.recommandation.length ? (
              this.state.recommandation.map((score, index) => {
                {
                  /*  {this.props.masterScore.option.score.recommendations && this.state.recommandation.length ? (
              this.state.recommandation.map((score, index) => { */
                }
                let date = new Date(score.option.date);
                return (
                  <View key={index}>
                    <Card
                      containerStyle={{
                        borderRadius: 10,
                        borderColor: "#ced4da",
                        borderWidth: 0.5,
                        // borderColor: "transparent",
                        width: SCREEN_WIDTH * 0.92,
                        // backgroundColor: index % 2 === 0 ? "#fff" : "#ff4c6e",
                        // width:"100%",
                        // shadowColor: "transparent",
                        // shadowOffset: {
                        //   width: 0,
                        //   height: 0,
                        // },
                        // shadowOpacity: 0,
                        // shadowRadius: 0,
                        // elevation: 12,
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
                            fontSize: 14,
                            marginBottom: 8,
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
                      <Text
                        style={{
                          textAlign: "left",
                          fontSize: 18,
                          fontWeight: "bold",
                          marginBottom: 7,
                        }}
                      >
                        {score.question}
                      </Text>
                      {/* <Text></Text> */}
                      <Text
                        style={{
                          textAlign: "left",
                          fontSize: 14,
                          color: "#db4d69",
                          marginBottom: 8,
                        }}
                      >
                        {/* option chosen: {score.option.optionChoiceName} */}
                        {this.state.phase === "PHASE 2"
                          ? "Result:"
                          : score.question.includes("BMI") &&
                            this.state.phase === "PHASE 1"
                          ? "Your BMI was calculated to be:"
                          : "option chosen:"}{" "}
                        {score.option.optionChoiceName}
                      </Text>

                      {/* <Text style={{ textAlign: "left", fontSize: 14 }}>
                        recommended:
                        {score.option.score.recommendations.includes(
                          "click here"
                        )
                          ? this.setClickHere(
                              score.option.score.recommendations
                            )
                          :
                            score.option.score.recommendations}
                      </Text> */}
                      <Text
                        style={{
                          textAlign: "left",
                          fontSize: 16,
                          marginBottom: 8,
                        }}
                      >
                        Recommandation:
                      </Text>
                      <RecommandationHTML
                        moreText={this.state.moreText}
                        recNo={this.state.recNo}
                        htmlSource={this.setClickHere(
                          score.option.score.recommendations,
                          score.option.optionChoiceName
                        )}
                        index={index}
                      />
                      {/* <RenderHTML
                        baseStyle={{
                          textAlign: "auto",
                          fontSize: 14,
                          opacity: 0.8,
                          // fontWeight: "100",
                          whiteSpace: "pre",
                          lineHeight: 20,
                          fontFamily: "Muli-Regular",
                          // wordBreak: "break-word",
                          maxHeight:
                            this.state.moreText && this.state.recNo === index
                              ? "100%"
                              : 100,
                          overflow: "hidden",
                        }}
                        // contentWidth="100%"
                        contentWidth={SCREEN_WIDTH}
                        source={{
                          html: this.setClickHere(
                            score.option.score.recommendations,
                            score.option.optionChoiceName
                          ),
                        }}
                        // source={{html:"<a>aaassdniaaadsfiifgbngfjkgdfhgiudfh iughdiugh digh dih</a>"}}
                      /> */}
                      {this.state.moreText &&
                      score.option.score.recommendations.length > 250 &&
                      this.state.recNo === index ? null : (
                        // <View
                        //   style={{
                        //     display: "flex",
                        //     // justifyContent: "flex-end",
                        //     alignItems: "flex-end",
                        //   }}
                        // >
                        <Button
                          // title={
                          //   this.state.moreText && this.state.recNo === index
                          //     ? "View less"
                          //     : "View More"
                          // }
                          title="View More"
                          titleStyle={{
                            fontSize: 16,
                            color: "#f2f2f2",
                          }}
                          buttonStyle={{
                            backgroundColor: "#db4d69",
                            // backgroundColor: "transparent",
                            // borderColor: "#db4d69",
                            // borderWidth: 1,
                            // borderTopWidth: 1,
                            // borderBottomWidth: 2,
                            // color: "#db4d69",
                            height: 40,
                            marginTop: 20,
                            // width: 100,
                            alignItems: "flex-end",
                          }}
                          // containerStyle={{
                          //   borderColor: "#db4d69",
                          //   borderTopStyle: "dotted",
                          //   borderTopWidth: 1,
                          // }}
                          onPress={() => this.handleTextView(index)}
                        />
                        // </View>
                      )}
                      {/* <RenderHTML
                        baseStyle={{
                          textAlign: "justify",
                          fontSize: 14,
                          opacity: 0.8,
                          // fontWeight: "100",
                          whiteSpace: "pre",
                          lineHeight: 20,
                          fontFamily: "Muli-Regular",
                          // wordBreak: "break-word",
                        }}
                        contentWidth="100%"
                        source={{
                          html: this.setClickHere(
                            score.option.score.recommendations,
                            score.option.optionChoiceName
                          ),
                        }}
                        // source={{html:"<a>aaassdniaaadsfiifgbngfjkgdfhgiudfh iughdiugh digh dih</a>"}}
                      /> */}
                    </Card>
                    {/* <View
                      style={{
                        alignSelf: "flex-start",
                        paddingLeft: "5%",
                        paddingBottom: "5%",
                      }}
                    ></View> */}
                  </View>
                );
                // return (
                //   <View key={score.questionId}>
                //     <TouchableOpacity
                //       style={{
                //         marginTop: 10,
                //         display: "flex",
                //         justifyContent: "space-between",
                //         alignItems: "center",
                //         flexDirection: "row",
                //         backgroundColor: "#fff",
                //         padding: 15,
                //         width: SCREEN_WIDTH * 0.93,
                //         borderRadius: 10,
                //         borderWidth: 1.3,
                //         borderTopColor: "transparent",
                //         borderRightColor: "transparent",
                //         borderLeftColor: "transparent",
                //         borderBottomColor: "#ff4c6eb3",
                //         borderBottomLeftRadius: 0,
                //         borderBottomRightRadius: 0,
                //       }}
                //       onPress={() => {
                //         this.handleTextView(index);
                //         // console.log(score, "this is score");
                //         // return <ShowRecommendation score={score} />;
                //       }}
                //     >
                //       <View
                //         style={{
                //           width: "85%",
                //           paddingLeft: 10,
                //         }}
                //       >
                //         <Text
                //           style={{
                //             textAlign: "left",
                //             fontSize: 18,
                //             // fontWeight: "bold",
                //             // marginBottom: 7,
                //           }}
                //         >
                //           {score.question}
                //         </Text>
                //       </View>
                //       <View
                //         style={{
                //           width: "15%",
                //           alignItems: "flex-end",
                //         }}
                //       >
                //         <IconMI
                //           name="chevron-right"
                //           size={28}
                //           color="black"
                //           iconStyle={{ alignSelf: "center" }}
                //           // onPress={() => this.handleTextView(index)}
                //         />
                //       </View>
                //     </TouchableOpacity>
                //     {this.state.moreText && this.state.recNo === index && (
                //       <Modal>
                //         <ShowRecommendation
                //           score={score}
                //           onBackPress={this.recBackPress}
                //         />
                //       </Modal>
                //     )}
                //     {/* <ShowRecommendation score={score} /> */}
                //   </View>
                // );
              })
            ) : (
              <Text> No Recommandation Are Available </Text>
            )}
          </View>
        </ScrollView>
        {/* <View
          style={{
            padding: 15,
            backgroundColor: "#e9ecef",
          }}
        /> */}
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
})(RecommendationsScreenList);
