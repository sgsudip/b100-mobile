import React from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { updatePhase, dateChange } from "../actions";
import { Button, Header } from "react-native-elements";
import IconEn from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const phasesWording = ["Assesment", "Home Test" /*  "Choices", "Plauqe" */];
const date = new Date();

class ResultsScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  state = {
    initialTimeAfterQuestion: "",
    newTimeOnCheck: "",
    showGradeScreen: true,
    token: "",
    continuebool: true,
    letterScore: "",
    subText: "",
    description: "",
    meaning: "",
    phaseScore: [],
    phaseCompletionDate: [],
    supplementOpened: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps) {
      if (
        nextProps.score &&
        nextProps.score.numericScore &&
        nextProps.score.masterScore
      ) {
        // console.log(nextProps.score.numericScore);
        /* const scoreData = nextProps.score.masterScore;
        const recommandation = scoreData.filter(function (e) {
          return e.option.score.recommendations !== "";
        }); */
        const numericScore = nextProps.score.numericScore;
        const phaseScore = nextProps.score.userphasescore;

        if (numericScore === 0 || numericScore < 1) {
          return {
            letterScore: "NULL",
            // subText: "Established",
            // description: "Treatment and monitoring required.",
            // meaning: "Dangerous",
            phaseScore: [phaseScore.phase1Score, phaseScore.phase2Score],
            phaseCompletionDate: [
              phaseScore.phase1ScoreDate,
              phaseScore.phase2ScoreDate,
            ],
          };
        } else if (numericScore >= 1 && numericScore < 2) {
          return {
            letterScore: "A+",
            // subText: "Minimal",
            // description: "Keep it up!  Repeat Annually",
            // meaning: "Awesome",
            phaseScore: [phaseScore.phase1Score, phaseScore.phase2Score],
            phaseCompletionDate: [
              phaseScore.phase1ScoreDate,
              phaseScore.phase2ScoreDate,
            ],
          };
        } else if (numericScore >= 2 && numericScore < 3) {
          return {
            letterScore: "A",
            // subText: "Minimal",
            // description: "Keep it up!  Repeat Annually",
            // meaning: "Awesome",
            phaseScore: [phaseScore.phase1Score, phaseScore.phase2Score],
            phaseCompletionDate: [
              phaseScore.phase1ScoreDate,
              phaseScore.phase2ScoreDate,
            ],
          };
        } else if (numericScore >= 3 && numericScore < 4) {
          return {
            letterScore: "A-",
            // subText: "Minimal",
            // description: "Keep it up!  Repeat Annually",
            // meaning: "Awesome",
            phaseScore: [phaseScore.phase1Score, phaseScore.phase2Score],
            phaseCompletionDate: [
              phaseScore.phase1ScoreDate,
              phaseScore.phase2ScoreDate,
            ],
          };
        } else if (numericScore >= 4 && numericScore < 5) {
          return {
            letterScore: "B+",
            // subText: "Low",
            // description:
            //   "Precautions Needed, Repeat modified testing annually.",
            // meaning: "Borderline",
            phaseScore: [phaseScore.phase1Score, phaseScore.phase2Score],
            phaseCompletionDate: [
              phaseScore.phase1ScoreDate,
              phaseScore.phase2ScoreDate,
            ],
          };
        } else if (numericScore >= 5 && numericScore < 6) {
          return {
            letterScore: "B",
            // subText: "Low",
            // description:
            //   "Precautions Needed, Repeat modified testing annually.",
            // meaning: "Borderline",
            phaseScore: [phaseScore.phase1Score, phaseScore.phase2Score],
            phaseCompletionDate: [
              phaseScore.phase1ScoreDate,
              phaseScore.phase2ScoreDate,
            ],
          };
        } else if (numericScore >= 6 && numericScore < 7) {
          return {
            letterScore: "B-",
            // subText: "Low",
            // description:
            //   "Precautions Needed, Repeat modified testing annually.",
            // meaning: "Borderline",
            phaseScore: [phaseScore.phase1Score, phaseScore.phase2Score],
          };
        } else if (numericScore >= 7 && numericScore < 8) {
          return {
            letterScore: "C+",
            // subText: "Concerning",
            // description: "Changes Necessary",
            // meaning: "Moderate",
            phaseScore: [phaseScore.phase1Score, phaseScore.phase2Score],
            phaseCompletionDate: [
              phaseScore.phase1ScoreDate,
              phaseScore.phase2ScoreDate,
            ],
          };
        } else if (numericScore >= 8 && numericScore < 9) {
          return {
            letterScore: "C",
            // subText: "Concerning",
            // description: "Changes Necessary",
            // meaning: "Moderate",
            phaseScore: [phaseScore.phase1Score, phaseScore.phase2Score],
            phaseCompletionDate: [
              phaseScore.phase1ScoreDate,
              phaseScore.phase2ScoreDate,
            ],
          };
        } else if (numericScore >= 9 && numericScore < 10) {
          return {
            letterScore: "C-",
            // subText: "Concerning",
            // description: "Changes Necessary",
            // meaning: "Moderate",
            phaseScore: [phaseScore.phase1Score, phaseScore.phase2Score],
            phaseCompletionDate: [
              phaseScore.phase1ScoreDate,
              phaseScore.phase2ScoreDate,
            ],
          };
        } else if (numericScore >= 10) {
          return {
            letterScore: "D",
            // subText: "Dangerous",
            // description: "Treatment and monitoring required.",
            // meaning: "High",
            phaseScore: [phaseScore.phase1Score, phaseScore.phase2Score],
            phaseCompletionDate: [
              phaseScore.phase1ScoreDate,
              phaseScore.phase2ScoreDate,
            ],
          };
        }
        /* if (nextProps.score.numericScore <= 0) {
          // this.setState({ letterScore: "?" });
          return { letterScore: "?", showGradeScreen: false };
        } else if (nextProps.score.numericScore > 8) {
          // this.setState({ letterScore: "D" });
          return {
            letterScore: "D",
            subText: "Established",
            description: "Treatment and monitoring required.",
            meaning: "Dangerous",
          };
        } else if (nextProps.score.numericScore > 5) {
          // this.setState({ letterScore: "C" });
          return {
            letterScore: "C",
            subText: "Moderate",
            description: "Preventative actions to be implemented immediately.",
            meaning: "Cautious",
          };
        } else if (nextProps.score.numericScore > 2) {
          // this.setState({ letterScore: "B" });
          return {
            letterScore: "B",
            subText: "Low",
            description:
              "Precautions given to maintain. Repeat modified testing annually",
            meaning: "Borderline",
          };
        } else {
          // this.setState({ letterScore: "A" });
          return {
            letterScore: "A",
            subText: "Very Low",
            description: "Keep it Up! \n Repeat modified testing annually",
            meaning: "Awesome",
          };
        } */
      }
    }
    // if (prevState.someMirroredValue !== nextProps.someValue) {
    //   return {
    //     derivedData: computeDerivedState(nextProps),
    //     someMirroredValue: nextProps.someValue
    //   };
    // }
    return null;
  }

  componentDidMount = () => {
    AsyncStorage.getItem("supplementsOpened").then((val) =>
      this.setState({ supplementOpened: val === "yes" ? true : false })
    );
  };

  toRecScreen = () => {
    this.props.navigation.navigate("rec");
  };
  toHomeScreen = () => {
    this.props.navigation.navigate("Home");
  };
  toRecommendations = () => {
    // this.props.navigation.navigate("resultsList");
    this.props.navigation.navigate("RecommendationsList");
  };
  toSupplementList = () => {
    AsyncStorage.setItem("supplementsOpened", "yes");
    this.props.navigation.navigate("SupplementsList");
  };

  toDietRecList = () => {
    this.props.navigation.navigate("DietRecList");
  };

  render() {
    let date = new Date();
    if (this.props.testReultsReady) {
      return (
        <View style={{ flex: 1 }}>
          <Header
            containerStyle={{
              backgroundColor: "#ff4c6e",
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
              style={{ marginLeft: "10%", fontSize: 20 }}
              underlayColor="transparent"
              color="#f2f2f2"
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
          <View
            style={{
              borderBottomColor: "#6c757d",
              borderBottomWidth: 2,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                paddingTop: 10,
                paddingBottom: 10,
                // borderBottomColor: "#6c757d",
                // borderBottomWidth: 2,
                // borderColor:"#000",
                // borderWidth:2,
                // borderStyle:"solid",
              }}
            >
              MY B100 REPORT CARD
            </Text>
          </View>

          <ScrollView style={{ flex: 1 }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                // backgroundColor: "#ff4c6e",
              }}
            >
              <Text
                style={{
                  // color: "#f2f2f2",
                  textAlign: "left",
                  fontSize: 14,
                }}
              >
                For an accurate LubDub grade please be sure to complete each
                step. Grade reflected is based on the steps you have completed.
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                paddingVertical: 20,
                paddingHorizontal: 20,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "33.33%",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                    paddingLeft: 15,
                    textTransform: "uppercase",
                    letterSpacing: 0.9,
                  }}
                >
                  STEP
                </Text>
                {phasesWording.map((item, index) => {
                  return (
                    <Text
                      style={{
                        textAlign: "left",
                        fontSize: 16,
                        marginBottom: 10,
                        letterSpacing: 0.9,
                      }}
                      key={index}
                    >
                      {item}
                    </Text>
                  );
                })}
              </View>
              <View
                style={{
                  width: "36.33%",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                    // textAlign:"left",
                    // paddingLeft:25,
                    textTransform: "uppercase",
                    letterSpacing: 0.9,
                  }}
                >
                  Date
                </Text>
                {this.state.phaseCompletionDate.map((item, index) => {
                  item = new Date(item);
                  return (
                    <Text
                      style={{
                        fontSize: 16,
                        marginBottom: 10,
                        letterSpacing: 0.9,
                      }}
                      key={index}
                    >
                      {item.getMonth() +
                        1 +
                        "/" +
                        item.getDate() +
                        "/" +
                        item.getFullYear()}
                    </Text>
                  );
                })}
                {/* <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 10,
                    letterSpacing: 0.9,
                  }}
                >
                  {date.getMonth() +
                    1 +
                    "/" +
                    date.getDate() +
                    "/" +
                    date.getFullYear()}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 10,
                    letterSpacing: 0.9,
                  }}
                >
                  {date.getMonth() +
                    1 +
                    "/" +
                    date.getDate() +
                    "/" +
                    date.getFullYear()}
                </Text> */}
              </View>
              <View
                style={{
                  width: "30%",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                    textTransform: "uppercase",
                    letterSpacing: 0.9,
                    // textAlign:"left",
                    // paddingLeft:25,
                  }}
                >
                  Grade
                </Text>
                {this.state.phaseScore.map((item, index) => {
                  return (
                    <Text
                      style={{
                        fontSize: 16,
                        marginBottom: 10,
                        letterSpacing: 0.9,
                        color: item !== 0 ? "#cc9a06" : "black",
                        fontWeight: "700",
                      }}
                      key={index}
                      onPress={() => {
                        if (item !== null && index === 0) {
                          this.props.navigation.navigate(
                            "RecommendationsList",
                            {
                              phase: "PHASE 1",
                            }
                          );
                        } else if (item !== null && index === 1) {
                          this.props.navigation.navigate(
                            "RecommendationsList",
                            {
                              phase: "PHASE 2",
                            }
                          );
                        }
                      }}
                    >
                      {item === 0 || item === null
                        ? "Pending"
                        : item >= 1 && item < 2
                        ? "A+"
                        : item >= 2 && item < 3
                        ? "A"
                        : item >= 3 && item < 4
                        ? "A-"
                        : item >= 4 && item < 5
                        ? "B+"
                        : item >= 5 && item < 6
                        ? "B"
                        : item >= 6 && item < 7
                        ? "B-"
                        : item >= 7 && item < 8
                        ? "C+"
                        : item >= 8 && item < 9
                        ? "C"
                        : item >= 9 && item < 10
                        ? "C-"
                        : "D"}
                    </Text>
                  );
                })}
                {/* <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 10,
                    letterSpacing: 0.9,
                    color: "#cc9a06",
                    fontWeight: "700",
                  }}
                >
                  C-
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 10,
                    letterSpacing: 0.9,
                  }}
                >
                  Pending
                </Text> */}
              </View>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                paddingHorizontal: 20,
                paddingBottom: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  width: "69.66%",
                  fontSize: 18,
                  textAlign: "left",
                }}
              >
                My LubDub
                <View
                  style={{
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      textAlignVertical: "top",
                      lineHeight: 20,
                      fontSize: 9,
                      paddingHorizontal: 2,
                    }}
                  >
                    TM
                  </Text>
                </View>
                Grade:
              </Text>
              <Text
                style={{
                  width: "30%",
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#cc9a06",
                }}
              >
                {this.state.letterScore}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 20,
                paddingVertical: 20,
                backgroundColor: "#ff4c6e",
                marginBottom: 1.5,
                // flex: 5,
              }}
            >
              <Text
                style={{
                  color: "#f2f2f2",
                  width: "69.66%",
                  textAlign: "left",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                My LubDub
                <View
                  style={{
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlignVertical: "top",
                      lineHeight: 20,
                      fontSize: 9,
                      paddingHorizontal: 2,
                      // alignSelf: "baseline",
                      // alignItems: "flex-end",
                    }}
                  >
                    TM
                  </Text>
                </View>{" "}
                Grade Goal By{" "}
                {date.getMonth() +
                  1 +
                  "/" +
                  date.getDate() +
                  "/" +
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() + 1)
                  ).getFullYear()}
              </Text>
              <Text
                style={{
                  color: "#f2f2f2",
                  width: "30%",
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {this.state.letterScore === "A"
                  ? "A+"
                  : this.state.letterScore === "A-"
                  ? "A"
                  : this.state.letterScore === "B+"
                  ? "A-"
                  : this.state.letterScore === "B"
                  ? "B+"
                  : this.state.letterScore === "B-"
                  ? "B"
                  : this.state.letterScore === "C+"
                  ? "B-"
                  : this.state.letterScore === "C"
                  ? "C+"
                  : this.state.letterScore === "C-"
                  ? "C"
                  : this.state.letterScore === "D"
                  ? "C-"
                  : this.state.letterScore}
              </Text>
            </View>

            <View
              style={{
                padding: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  paddingBottom: 20,
                  // paddingTop: 10,
                  textDecorationStyle: "solid",
                  textDecorationColor: "#adb5bd",
                  textDecorationLine: "underline",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                STEPS TO ACHIEVING GOAL:{" "}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 17,
                  letterSpacing: 0.9,
                }}
              >
                1. Adhere to recommendations
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 17,
                  letterSpacing: 0.9,
                }}
              >
                2. Retake assessment on:{" "}
                {new Date(this.state.phaseCompletionDate[0]).getMonth() +
                  1 +
                  "/" +
                  new Date(this.state.phaseCompletionDate[0]).getDate() +
                  "/" +
                  new Date(
                    new Date().setFullYear(
                      new Date(
                        this.state.phaseCompletionDate[0]
                      ).getFullYear() + 1
                    )
                  ).getFullYear()}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 17,
                  letterSpacing: 0.9,
                }}
              >
                3. Retake home test on:{" "}
                {new Date(this.state.phaseCompletionDate[1]).getMonth() +
                  1 +
                  "/" +
                  new Date(this.state.phaseCompletionDate[1]).getDate() +
                  "/" +
                  new Date(
                    new Date().setFullYear(
                      new Date(
                        this.state.phaseCompletionDate[1]
                      ).getFullYear() + 1
                    )
                  ).getFullYear()}
              </Text>
            </View>
            {!this.state.supplementOpened && (
              <TouchableOpacity
                style={{
                  backgroundColor: "#C9C9C9",
                  marginBottom: 5,
                }}
                // onPress={this.toRecommendations}
                onPress={this.toSupplementList}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      paddingVertical: 30,
                      fontWeight: "600",
                      textTransform: "uppercase",
                    }}
                  >
                    SUPPLEMENT RECOMMENDATIONS
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "#C9C9C9",
              }}
              // onPress={this.toRecommendations}
              onPress={this.toDietRecList}
            >
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    paddingVertical: 30,
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  {/* SUPPLEMENT RECOMMENDATIONS */}
                  Diet Recommendations
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      );
      // if (false) {
      // return (
      //   <View style={{ flex: 1 }}>
      //     <Header
      //       // placement="center"
      //       // centerComponent={{
      //       //   text: "MY B100 GRADE",
      //       //   style: {
      //       //      fontFamily: "Muli-SemiBold",
      //       //     fontSize: 22,
      //       //     color: "black",
      //       //   },
      //       // }}
      //       // rightComponent={{
      //       //   text: "Compare",
      //       //   style: {
      //       //      fontFamily: "Muli-SemiBold",
      //       //     fontSize: 10,
      //       //     color: "black",
      //       //   },
      //       // }}
      //       containerStyle={{
      //         backgroundColor: "#ff4c6e",
      //         ...Platform.select({
      //           ios: {
      //            height: SCREEN_HEIGHT < 900 ? 85 : 100,
      //           },
      //           android: {
      //             height: SCREEN_HEIGHT * 0.1,
      //             paddingHorizontal: 0,
      //             paddingTop: 0,
      //           },
      //         }),
      //       }}
      //     >
      //       <IconEn
      //         name="chevron-thin-left"
      //         onPress={this.toHomeScreen}
      //         style={{ marginLeft: "10%", fontSize: 20 }}
      //         underlayColor="transparent"
      //         color="#f2f2f2"
      //       />
      //       <View>
      //         <Text
      //           style={{
      //             fontFamily: "Muli-SemiBold",
      //             fontSize: 20,
      //             color: "#f2f2f2",
      //             paddingBottom: 5,
      //             paddingTop: 5,
      //             // fontWeight: "bold",
      //           }}
      //         >
      //           {/* MY B100 GRADE */}
      //           LubDub GRADE
      //         </Text>
      //       </View>
      //       {/* <View>
      //         <Text
      //           onPress={() => {
      //             this.props.navigation.navigate("compare");
      //           }}
      //           style={{
      //             fontFamily: "Muli-SemiBold",
      //             fontSize: 14,
      //             color: "black",
      //           }}
      //         >
      //           Compare
      //         </Text>
      //       </View> */}
      //     </Header>
      //     <View
      //       style={[
      //         styles.card,
      //         // SCREEN_HEIGHT < 700 ? { padding: 5 } : { paddingVertical: 0 },
      //       ]}
      //     >
      //       <ScrollView
      //         showsVerticalScrollIndicator={false}
      //         style={{
      //           flexGrow: 0,
      //           flexShrink: 0,
      //         }}
      //       >
      //         <View
      //           style={{
      //             // flex: 3,
      //             alignItems: "center",
      //             display: "flex",
      //             alignItems: "center",
      //             justifyContent: "center",
      //             flexDirection: "column",
      //           }}
      //         >
      //           <View style={{ width: "100%", alignItems: "center" }}>
      //             <Text
      //               style={[
      //                 styles.grade,
      //                 SCREEN_HEIGHT < 700
      //                   ? { fontSize: 90, lineHeight: 90 }
      //                   : { fontSize: 130, lineHeight: 130 },
      //               ]}
      //             >
      //               {this.state.letterScore}
      //             </Text>
      //             <Text style={styles.gradeText}>{this.state.meaning}</Text>
      //             <Text style={styles.updatedText}>Last Updated Today</Text>
      //           </View>
      //           <View style={styles.horizontalLine}></View>
      //           <View style={{ width: "100%", alignItems: "center" }}>
      //             <Text style={styles.descriptionHeading}>
      //               What does this mean?
      //             </Text>
      //             <Text style={styles.description}>
      //               {this.state.description}
      //             </Text>
      //             <Text style={styles.description}>
      //               Risk: {this.state.subText}
      //             </Text>
      //             <Button
      //               title="View Test Results"
      //               type="outline"
      //               onPress={this.viewTestResultPdf}
      //               titleStyle={{
      //                 color: "black",
      //                 paddingBottom: 0,
      //                 paddingTop: 0,
      //               }}
      //               containerStyle={{ borderColor: "black" }}
      //               buttonStyle={{ paddingHorizontal: 15 }}
      //             />
      //           </View>
      //         </View>
      //       </ScrollView>
      //     </View>
      //     <View
      //       style={{
      //         marginTop: "15%",
      //       }}
      //     >
      //       <Button
      //         style={styles.nextButton}
      //         title="What's Next?"
      //         onPress={this.toRecScreen}
      //         // ViewComponent={require("expo").linearGradient}
      //         ViewComponent={require("expo-linear-gradient").LinearGradient}
      //         linearGradientProps={{
      //           colors: ["#8FA4C4", "#8FA4C4"],
      //           start: [1, 0],
      //           end: [0.2, 0],
      //         }}
      //         buttonStyle={{
      //           backgroundColor: "#8FA4C4",
      //           alignSelf: "center",
      //           // alignContent: "center",
      //           width: SCREEN_WIDTH * 0.85,
      //           // width: "90%",
      //           // fontWeight: "bold",
      //           height: 50,
      //           bottom: 20,
      //           marginTop: 0,
      //           position: "absolute",
      //         }}
      //         containerStyle={
      //           {
      //             // marginBottom: "4%",
      //           }
      //         }
      //         titleStyle={{ paddingTop: 0, paddingBottom: 0 }}
      //       />
      //     </View>
      //   </View>
      // );
    }
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          centerComponent={{
            // text: "MY B100 GRADE",
            text: "MY LubDub GRADE",
            style: {
              fontFamily: "Muli-SemiBold",
              fontSize: 20,
              color: "black",
              // height: Platform.OS === "ios" ? 80 : 80,
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
                paddingHorizontal: 7,
                paddingTop: 0,
              },
            }),
          }}
        />

        <View
          style={[
            styles.card,
            SCREEN_HEIGHT < 700 ? { padding: 20 } : { padding: 50 },
          ]}
        >
          {/* <ScrollView> */}
          <View
            style={{
              //flex: 1,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              width: SCREEN_WIDTH * 0.85,
            }}
          >
            <Text
              style={[
                {
                  fontFamily: "Muli-SemiBold",
                  textTransform: "capitalize",
                },
                SCREEN_HEIGHT < 700
                  ? { marginTop: 0, fontSize: 18 }
                  : { marginTop: 0, fontSize: 20 },
              ]}
            >
              B100 is procesing your results
            </Text>
            <Image
              style={{
                alignSelf: "center",
                height: SCREEN_HEIGHT * 0.35,
                marginTop: 15,
              }}
              resizeMode="contain"
              source={require("../assets/images/misc/2x/resultsgraphic-2x.png")}
            />
            <Text style={styles.updatedText}>
              Questionnaire completed {date.getMonth() + 1}/{date.getDate()}/
              {date.getFullYear()}
            </Text>
            <Text style={styles.updatedText}>
              We are currently going over your questionnaire answers. Once we
              have analyzed your heart's grade B100 will notify you.
            </Text>
          </View>
          {/* </ScrollView> */}
        </View>
        <Button
          style={styles.nextButton}
          title="Got it!"
          onPress={this.toHomeScreen}
          // ViewComponent={require("expo").linearGradient}
          ViewComponent={require("expo-linear-gradient").LinearGradient}
          linearGradientProps={{
            colors: ["#058086", "#0aaab1"],
            start: [1, 0],
            end: [0.2, 0],
          }}
          buttonStyle={{
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            width: SCREEN_WIDTH * 0.85,
            height: 50,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            //marginTop:-25,
            marginBottom: "5%",
          }}
          containerStyle={{
            marginBottom: "5%",
          }}
        />
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
    width: SCREEN_WIDTH * 0.85,
    // marginTop: "10%",
    //marginVertical: 25,
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
    marginBottom: "10%",
  },
  grade: {
    fontFamily: "Muli-SemiBold",
  },
  gradeText: {
    fontFamily: "Muli-SemiBold",
    fontSize: 25,
  },
  updatedText: {
    fontFamily: "Muli-SemiBold",
    color: "darkgrey",
    fontSize: 16,
    marginTop: "5%",
    paddingHorizontal: 15,
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
    textAlign: "center",
    paddingBottom: 10,
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
    //marginTop:-20,
  },
  mainTextView: {
    marginTop: 10,
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
export default connect(mapStateToProps, { updatePhase })(ResultsScreen);
