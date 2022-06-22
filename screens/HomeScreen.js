import _ from "lodash";
import React, { Component, PureComponent } from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { CheckBox, Header } from "react-native-elements";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import IconMI from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Loader from "../components/common/loader";
import {
  loadQuestions,
  clearPhase1,
  getScore,
  phaseTwoGet,
  ans,
  labs,
} from "../actions";
import { connect } from "react-redux";
// import generalRecommendations from "../constants/generalHeartRecommendations";
import * as WebBrowser from "expo-web-browser";
import * as Notifications from "expo-notifications";
import { Button } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ScrollView } from "react-navigation";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    // Text.defaultProps.allowFontScaling = false;
    this.state = {
      letterScore: "?",
      // generalRecommendation: generalRecommendations[0],
      generalRecommendation: [],
      // notification: {},
      answers: false,
      labs: false,
    };
  }

  static navigationOptions = () => {
    return {
      header: null,
      tabBarVisible: false,
    };
  };

  interval = null;
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  componentDidMount() {
    Notifications.addNotificationReceivedListener(this._handleNotification);
    Notifications.addNotificationResponseReceivedListener(
      this._handleNotificationResponse
    );
    if (this.props.quest && !this.props.quest.length) {
      this.props.loadQuestions(this.props.userID);
    }
    this.props.phaseTwoGet(this.props.userID);
    if (this.props.questions) {
      this.props.getScore();
    }
    AsyncStorage.getItem("Answers").then((val) => {
      if (val !== null) {
        this.setState({ answers: true });
        // this.props.ans(JSON.parse(val));
        // debugger;
      }
    });
    // setInterval(() => {
    //   let indexSelected = Math.round(
    //     Math.random() * generalRecommendations.length
    //   );
    //   if (indexSelected === generalRecommendations.length) {
    //     indexSelected--;
    //   }
    //   this.setState({
    //     generalRecommendation: generalRecommendations[indexSelected],
    //   });
    // }, 5000);

    // if (this.props.score.numericScore <= 0) {
    //   this.setState({ letterScore: "?" });
    // } else if (this.props.score.numericScore > 8) {
    //   this.setState({ letterScore: "D" });
    // } else if (this.props.score.numericScore > 5) {
    //   this.setState({ letterScore: "C" });
    // } else if (this.props.score.numericScore > 2) {
    //   this.setState({ letterScore: "B" });
    // } else {
    //   this.setState({ letterScore: "A" });
    // }
    // if (
    //   this.props.phase2ans.hip !== "" &&
    //   this.props.phase2ans.waist !== "" &&
    //   this.props.phase2ans.systolic1 !== "" &&
    //   this.props.phase2ans.diastolic1 !== ""
    // ) {
    //   this.props.labs(true);
    // } else {
    //   this.props.labs(false);
    // }
  }
  _handleNotification = (notification) => {
    this.setState({ notification: notification });
    // console.warn(notification.request.content.body);
  };

  _handleNotificationResponse = (response) => {
    // alert("hiii")
    this.props.navigation.navigate("results");
  };
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps) {
  //     if (
  //       nextProps.score &&
  //       nextProps.score.numericScore &&
  //       nextProps.score.masterScore
  //     ) {
  //       const scoreData = nextProps.score.masterScore;
  //       const numericScore = nextProps.score.numericScore;
  //       const recommandation = scoreData.filter(function (e) {
  //         return e.option.score.recommendations !== "";
  //       });
  //       if (numericScore === 0 || numericScore < 1) {
  //         return {
  //           letterScore: "NULL",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (numericScore >= 1 && numericScore < 2) {
  //         return {
  //           letterScore: "A+",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (numericScore >= 2 && numericScore < 3) {
  //         return {
  //           letterScore: "A",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (numericScore >= 3 && numericScore < 4) {
  //         return {
  //           letterScore: "A-",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (numericScore >= 4 && numericScore < 5) {
  //         return {
  //           letterScore: "B+",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (numericScore >= 5 && numericScore < 6) {
  //         return {
  //           letterScore: "B",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (numericScore >= 6 && numericScore < 7) {
  //         return {
  //           letterScore: "B-",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (numericScore >= 7 && numericScore < 8) {
  //         return {
  //           letterScore: "C+",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (numericScore >= 8 && numericScore < 9) {
  //         return {
  //           letterScore: "C",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (numericScore >= 9 && numericScore < 10) {
  //         return {
  //           letterScore: "C-",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (numericScore >= 10) {
  //         return {
  //           letterScore: "D",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       }
  //       /* if (nextProps.score.numericScore <= 0) {
  //         // this.setState({ letterScore: "?" });
  //         return { letterScore: "?", generalRecommendation: recommandation };
  //       } else if (nextProps.score.numericScore > 8) {
  //         // this.setState({ letterScore: "D" });
  //         return {
  //           letterScore: "D",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (nextProps.score.numericScore > 5) {
  //         // this.setState({ letterScore: "C" });
  //         return {
  //           letterScore: "C",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else if (nextProps.score.numericScore > 2) {
  //         // this.setState({ letterScore: "B" });
  //         return {
  //           letterScore: "B",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } else {
  //         // this.setState({ letterScore: "A" });
  //         return {
  //           letterScore: "A",
  //           testReultsReady: true,
  //           generalRecommendation: recommandation,
  //         };
  //       } */
  //     }
  //   }

  //   // if (prevState.someMirroredValue !== nextProps.someValue) {
  //   //   return {
  //   //     derivedData: computeDerivedState(nextProps),
  //   //     someMirroredValue: nextProps.someValue
  //   //   };
  //   // }
  // }
  onOrder = () => {
    WebBrowser.openBrowserAsync("https://b100method.com/products/lifestyle");
  };
  toNoification = () => {
    this.props.navigation.navigate("NRY");
  };
  toMenue = () => {
    this.props.navigation.navigate("menue");
  };
  toProfile = () => {
    //this.props.navigation.navigate("HealthBackground");
    this.props.navigation.navigate("Login");
  };
  toQuestions = () => {
    // console.log(this.props.questions);
    if (this.props.questions) {
      Alert.alert(
        "Warning",
        "This will override your test results, and new results will not be availble until we reevaluate your new answers. Is this okay?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("cancel"),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              this.props.clearPhase1(this.props.navigation);
              // this.props.navigation.navigate("Quest");
              // console.log("OK Pressed");
            },
          },
        ],
        { cancelable: false }
      );
      ("This will override your test results, and new results will not be availble until we reevaluate your new answers. Is this okay?");
    } else if (this.props.profile) {
      // AsyncStorage.getItem('Answers').then((val) => {
      //   if (val !== null) {
      //     // this.setState({ answers: JSON.parse(val) });
      //     this.props.ans(JSON.parse(val));
      //   }
      // });
      if (this.props.answ && this.props.answ.length) {
        this.props.navigation.navigate("Quest");
      } else if (this.state.answers) {
        this.props.navigation.navigate("Quest");
      } else {
        this.props.navigation.navigate("Phase1CustomeQuestion");
      }
      // if(this.props.quest && this.props.quest.length)
      // this.props.navigation.navigate("Phase1CustomeQuestion");
    } else {
      alert("Health Background Profile is required first.");
    }
  };
  toKit = () => {
    if (this.props.questions) {
      this.kitNavigation();
    } else {
      alert("Questionnaire is required.");
    }
  };
  kitNavigation = () => {
    // console.log("PhaseProps" + this.props.phase2ans);
    if (!this.props.kit)
      if (this.props.phase2ans)
        if (
          this.props.phase2ans.deviceID !== "" &&
          this.props.phase2ans.bloodTime
        ) {
          if (
            this.props.phase2ans.hip !== "" &&
            this.props.phase2ans.waist !== ""
          ) {
            if (this.props.phase2ans.labs) {
              if (
                this.props.phase2ans.systolic1 !== "" &&
                this.props.phase2ans.diastolic1 !== "" /* &&
                this.props.phase2ans.systolic2 !== "" &&
                this.props.phase2ans.diastolic2 !== "" &&
                this.props.phase2ans.systolic3 !== "" &&
                this.props.phase2ans.diastolic3 !== "" &&
                this.props.phase2ans.systolic4 !== "" &&
                this.props.phase2ans.diastolic4 !== "" */
              ) {
                if (this.props.phase2ans.nitricOxide !== "") {
                  alert("You have completed your kit!");
                } else {
                  // this.props.navigation.navigate("NitricOxideInstructions");
                  this.props.navigation.navigate("nitricOxide");
                }
              } else {
                // this.props.navigation.navigate("BloodPressureInstructions");
                this.props.navigation.navigate("BloodPressure");
              }
            } else {
              this.props.navigation.navigate("Labs");
            }
          } else {
            this.props.navigation.navigate("waistToHip");
          }
        } else {
          this.props.navigation.navigate("DeviceInfo");
          // this.props.navigation.navigate("HomeKit");
        }
      else if (this.props.testReultsReady) {
        this.props.navigation.navigate("HomeKit");
      } else {
        Alert.alert(
          "Please Wait",
          "We need to finish processing your test results first",
          []
        );
      }
    else {
      if (this.props.kit) {
        if (
          !(
            this.props.phase2ans.systolic2 !== "" &&
            this.props.phase2ans.diastolic2 !== "" &&
            this.props.phase2ans.systolic3 !== "" &&
            this.props.phase2ans.diastolic3 !== "" &&
            this.props.phase2ans.systolic4 !== "" &&
            this.props.phase2ans.diastolic4 !== ""
          )
        ) {
          this.props.navigation.navigate("BloodPressure");
        } else {
          // Alert.alert("Please Wait","We need to finish processing your test results first",[])
          Alert.alert("Thank You", "You have already completed your Kit");
        }
      }
    }
  };
  toTreatment = () => {
    // alert("Choices Test must be completed first");
    this.props.navigation.navigate("Gen");

    // if (this.props.treatment)
    //   Alert.alert("Thank you", "You have already completed your Genetic test");
    // else if (this.props.kit) {
    //   this.props.navigation.navigate("Gen");
    // } else {
    //   Alert.alert("Sorry", "Home Kit must be ordered first.");
    // }
  };
  toMap = () => {
    if (this.props.treatment) {
      this.props.navigation.navigate("B100Map");
    } else {
      alert("Plaque Test must be completed first.");
    }
  };
  // toGenetics = () => {
  //   alert("Genetics Test must be completed first.");
  // };

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
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
          <Icon
            name="menu"
            onPress={this.toMenue}
            style={{ marginLeft: "12%", fontSize: 20 }}
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
          <Icon
            name="bell"
            onPress={this.toNoification}
            style={{ marginRight: "12%", fontSize: 18 }}
            underlayColor="transparent"
            color="#f2f2f2"
          />
        </Header>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: SCREEN_WIDTH,
              }}
            >
              {/* {this.props.is_phase1_deleted ? (
              this.props.loading ? (
                <Loader />
              ) : (
                this.props.navigation.navigate("Quest")
              )
            ) : null} */}

              {/* {this.props.testReultsReady && this.state.letterScore !== "?" ? (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#484649",
                    height: SCREEN_HEIGHT * 0.09,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("results");
                  }}
                >
                  <View
                    style={{
                      flex: 5,
                      // justifyContent: "center",
                      alignContent: "center",
                      alignSelf: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "left",
                        paddingLeft: "5%",
                        fontSize: 14,
                      }}
                    >
                      LubDub
                    </Text>
                    <View
                      style={{
                        alignItems: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlignVertical: "top",
                          lineHeight: 10,
                          fontSize: 8,
                          // alignSelf: "baseline",
                          // alignItems: "flex-end",
                        }}
                      >
                        TM
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "white",
                        textAlign: "left",
                        // paddingLeft: "5%",
                        fontSize: 14,
                        // alignItems: "flex-start",
                      }}
                    >
                      {" "}
                      GRADE
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      justifyContent: "center",
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "right",
                        paddingBottom: "5%",
                        fontSize: 26,
                      }}
                    >
                      {this.state.letterScore}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <IconMI
                      name="chevron-right"
                      size={28}
                      color="white"
                      iconStyle={{ alignSelf: "center" }}
                    />
                  </View>
                </TouchableOpacity>
              ) : (
                this.props.questions && (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#484649",
                      height: SCREEN_HEIGHT * 0.09,
                    }}
                  >
                    <View
                      style={{
                        flex: 5,
                        // justifyContent: "center",
                        alignContent: "center",
                        alignSelf: "center",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "left",
                          paddingLeft: "5%",
                          fontSize: 14,
                        }}
                      >
                        LubDub
                      </Text>
                      <View
                        style={{
                          alignItems: "flex-end",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            textAlignVertical: "top",
                            lineHeight: 10,
                            fontSize: 8,
                            // alignSelf: "baseline",
                            // alignItems: "flex-end",
                          }}
                        >
                          TM
                        </Text>
                      </View>
                      <Text
                        style={{
                          color: "white",
                          textAlign: "left",
                          // paddingLeft: "5%",
                          fontSize: 14,
                          // alignItems: "flex-start",
                        }}
                      >
                        {" "}
                        GRADE
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: "center",
                        alignContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          textAlign: "right",
                          paddingBottom: "5%",
                          fontSize: 15,
                        }}
                      >
                        In Process
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <IconMI
                        name="chevron-right"
                        size={28}
                        color="white"
                        iconStyle={{ alignSelf: "center" }}
                      />
                    </View>
                  </TouchableOpacity>
                )
              )} */}

              <TouchableOpacity
                style={{
                  height: SCREEN_HEIGHT * 0.09,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  borderBottomWidth: 1,
                  borderColor: "#c0c0c0",
                  backgroundColor: "#ffffff",
                }}
                onPress={this.toProfile}
              >
                <View
                  style={{
                    flex: 5,
                    flexDirection: "row",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <CheckBox
                      center={true}
                      checkedColor="#ff4c6e"
                      iconType="material-community"
                      checkedIcon="checkbox-marked-outline"
                      uncheckedIcon="checkbox-blank-outline"
                      checked={this.props.profile}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: SCREEN_HEIGHT * 0.05,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      source={require("../assets/images/home/Active/1x/profile.icon.png")}
                      style={{ height: 20 }}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={{ flex: 6, alignSelf: "center" }}>
                    <Text
                      style={{
                        textAlign: "left",
                        paddingLeft: "5%",
                        fontSize: 16,
                      }}
                    >
                      {/* Background Info */}
                      Profile
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontStyle: "italic",
                      color: "#ff4c6e",
                      fontSize: 14,
                      position: "absolute",
                      right: 28,
                    }}
                  >
                    {/* {!this.props.questions && (
                    <Fontisto name="locked" color="#9c9c9c" size={16} />
                  )} */}
                    {/* {this.props.reccomended && this.props.questions  */}
                    {!this.props.profile ? "Next Step" : null}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <IconMI
                    name="chevron-right"
                    size={28}
                    iconStyle={{ alignSelf: "center" }}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: SCREEN_HEIGHT * 0.09,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  borderBottomWidth: 1,
                  borderColor: "#c0c0c0",
                  backgroundColor: this.props.profile ? "#ffffff" : "#f5f5f5",
                }}
                onPress={
                  this.props.quest[0]
                    ? this.toQuestions
                    : () =>
                        alert(
                          "Please wait while we are loading questions for you"
                        )
                }
              >
                <View
                  style={{
                    flex: 5,
                    flexDirection: "row",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <CheckBox
                      center={true}
                      checkedColor="#ff4c6e"
                      iconType="material-community"
                      checkedIcon="checkbox-marked-outline"
                      uncheckedIcon="checkbox-blank-outline"
                      checked={this.props.questions}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: SCREEN_HEIGHT * 0.05,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    {this.props.profile ? (
                      <Image
                        source={require("../assets/images/home/Active/1x/questionaire.icon.png")}
                        style={{ height: 20 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require("../assets/images/home/inactive/1x/questionaire.icon.png")}
                        style={{ height: 20 }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View style={{ flex: 6, alignSelf: "center" }}>
                    <Text
                      style={{
                        textAlign: "left",
                        paddingLeft: "5%",
                        fontSize: 16,
                        color: this.props.profile ? "#000" : "#a8a8a8",
                      }}
                    >
                      {/* History */}
                      Assessment
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  {/* {this.props.is_phase1_deleted ? (
                  this.props.loading ? (
                    <Loader />
                  ) : (
                    this.props.navigation.navigate("Quest")
                  )
                ) : null} */}
                  <Text
                    style={{
                      textAlign: "right",
                      fontStyle: "italic",
                      color: "#ff4c6e",
                      fontSize: 14,
                      position: "absolute",
                      right: 28,
                    }}
                  >
                    {/* {!this.props.questions && (
                    <Fontisto name="locked" color="#9c9c9c" size={16} />
                  )} */}
                    {/*
                  {!this.props.questions && !this.props.profile && (
                    <Fontisto name="locked" color="#9c9c9c" size={16} />
                  )} */}

                    {this.props.profile && !this.props.questions ? (
                      "Next Step"
                    ) : !this.props.profile ? (
                      <Fontisto
                        name="locked"
                        // name="ios-lock"
                        color="#9c9c9c"
                        size={16}
                      />
                    ) : null}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <IconMI
                    name="chevron-right"
                    size={28}
                    iconStyle={{ alignSelf: "center" }}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: SCREEN_HEIGHT * 0.09,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  borderBottomWidth: 1,
                  borderColor: "#c0c0c0",
                  backgroundColor:
                    this.props.questions && this.props.testReultsReady
                      ? "#ffffff"
                      : "#f5f5f5",
                }}
                // onPress={
                //   this.props.kit && this.props.questions ? this.toKit : null
                // }
              >
                <View
                  style={{
                    flex: 5,
                    flexDirection: "row",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <CheckBox
                      center={true}
                      checkedColor="#ff4c6e"
                      iconType="material-community"
                      checkedIcon="checkbox-marked-outline"
                      uncheckedIcon="checkbox-blank-outline"
                      checked={
                        this.props.questions &&
                        this.props.testReultsReady &&
                        this.props.kit
                      }
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: SCREEN_HEIGHT * 0.05,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    {this.props.questions &&
                    this.props.testReultsReady &&
                    this.props.kit ? (
                      <Image
                        source={require("../assets/images/home/Active/1x/home.kit.png")}
                        // style={{ width: SCREEN_WIDTH / 10, alignSelf: "center" }}
                        style={{ height: 20 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require("../assets/images/home/inactive/1x/home.kit.png")}
                        // style={{ width: SCREEN_WIDTH / 10, alignSelf: "center" }}
                        style={{ height: 20 }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flex: 6,
                      alignSelf: "center",
                      alignItems: "center",
                      alignContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                        paddingLeft: "5%",
                        fontSize: 16,
                        color:
                          this.props.questions && this.props.testReultsReady
                            ? "#000"
                            : "#a8a8a8",
                      }}
                    >
                      {/* Choices */}
                      Home Test
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontStyle: "italic",
                      color: "#ff4c6e",
                      fontSize: 14,
                      position: "absolute",
                      right: 28,
                    }}
                  >
                    {/* {!this.props.questions && (
                    <Fontisto name="locked" color="#9c9c9c" size={16} />
                  )} */}
                    {/* <Fontisto name="locked" color="#9c9c9c" size={16} /> */}
                    {/* {this.props.reccomended && this.props.questions  */}
                    {this.props.questions &&
                    this.props.testReultsReady &&
                    !this.props.kit ? (
                      "Next Step"
                    ) : !this.props.questions && !this.props.testReultsReady ? (
                      <Fontisto
                        name="locked"
                        // name="ios-lock"
                        color="#9c9c9c"
                        size={16}
                      />
                    ) : this.props.questions && !this.props.testReultsReady ? (
                      <Fontisto
                        name="locked"
                        // name="ios-lock"
                        color="#9c9c9c"
                        size={16}
                      />
                    ) : null}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  {/* {this.props.kit && (
                    <IconMI
                      name="chevron-right"
                      size={28}
                      iconStyle={{ alignSelf: "center" }}
                    />
                  )} */}
                </View>
              </TouchableOpacity>
              {this.props.profile &&
                this.props.questions &&
                // !this.props.kit &&
                this.props.testReultsReady && (
                  <View
                    style={{
                      marginTop: 0,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          this.props.phase2ans.deviceID !== ""
                            ? "#ffffff"
                            : "#f5f5f5",
                      }}
                      // onPress={this.toKit}
                      onPress={() =>
                        this.props.navigation.navigate("DeviceInfo")
                      }
                      disabled={this.props.phase2ans.deviceID !== ""}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingHorizontal: 20,
                        }}
                      >
                        <View
                          style={{
                            // width: "60%",
                            display: "flex",
                            flexDirection: "row",
                            // alignItems: "center",
                            // justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              width: "80%",
                              display: "flex",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "left",
                                paddingLeft: 90,
                                fontSize: 16,
                              }}
                            >
                              Register
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CheckBox
                            center={true}
                            checkedColor="#ff4c6e"
                            size={18}
                            iconType="material-community"
                            checkedIcon="checkbox-marked-outline"
                            uncheckedIcon="checkbox-blank-outline"
                            checked={this.props.phase2ans.deviceID !== ""}
                          />
                          <IconMI
                            name="chevron-right"
                            size={28}
                            //   color="white"
                            iconStyle={{ alignSelf: "center" }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          this.props.phase2ans.deviceID !== ""
                            ? "#ffffff"
                            : "#f5f5f5",
                      }}
                      // onPress={this.toKit}
                      onPress={() =>
                        this.props.navigation.navigate("waistToHip")
                      }
                      disabled={
                        this.props.phase2ans.deviceID !== "" &&
                        this.props.phase2ans.hip !== "" &&
                        this.props.phase2ans.waist !== ""
                      }
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingHorizontal: 20,
                        }}
                      >
                        <View
                          style={{
                            // width: "60%",
                            display: "flex",
                            flexDirection: "row",
                            // alignItems: "center",
                            // justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              width: "80%",
                              // display:"flex",
                              // justifyContent:"flex-start",
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "left",
                                paddingLeft: 90,
                                fontSize: 16,
                              }}
                            >
                              Measurements
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CheckBox
                            center={true}
                            checkedColor="#ff4c6e"
                            size={18}
                            iconType="material-community"
                            checkedIcon="checkbox-marked-outline"
                            uncheckedIcon="checkbox-blank-outline"
                            checked={
                              this.props.phase2ans.deviceID !== "" &&
                              this.props.phase2ans.hip !== "" &&
                              this.props.phase2ans.waist !== ""
                            }
                          />
                          <IconMI
                            name="chevron-right"
                            size={28}
                            //   color="white"
                            iconStyle={{ alignSelf: "center" }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: this.props.phase2ans.labs
                          ? "#ffffff"
                          : "#f5f5f5",
                      }}
                      // onPress={this.toKit}
                      onPress={() => this.props.navigation.navigate("Labs")}
                      disabled={this.props.phase2ans.labs}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingHorizontal: 20,
                        }}
                      >
                        <View
                          style={{
                            // width: "60%",
                            display: "flex",
                            flexDirection: "row",
                            // alignItems: "center",
                            // justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              width: "80%",
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "left",
                                paddingLeft: 90,
                                fontSize: 16,
                              }}
                            >
                              Labs
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CheckBox
                            center={true}
                            checkedColor="#ff4c6e"
                            size={18}
                            iconType="material-community"
                            checkedIcon="checkbox-marked-outline"
                            uncheckedIcon="checkbox-blank-outline"
                            checked={this.props.phase2ans.labs}
                          />
                          <IconMI
                            name="chevron-right"
                            size={28}
                            //   color="white"
                            iconStyle={{ alignSelf: "center" }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          this.props.phase2ans.systolic1 !== "" &&
                          this.props.phase2ans.diastolic1 !== "" /* &&
                        this.props.phase2ans.systolic2 !== "" &&
                        this.props.phase2ans.diastolic2 !== "" &&
                        this.props.phase2ans.systolic3 !== "" &&
                        this.props.phase2ans.diastolic3 !== "" &&
                        this.props.phase2ans.systolic4 !== "" &&
                        this.props.phase2ans.diastolic4 !== "" */
                            ? "#ffffff"
                            : "#f5f5f5",
                      }}
                      // onPress={this.toKit}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingHorizontal: 20,
                        }}
                      >
                        <View
                          style={{
                            // width: "60%",
                            display: "flex",
                            flexDirection: "row",
                            // alignItems: "center",
                            // justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              width: "80%",
                            }}
                          >
                            <Text
                              style={{
                                textAlign: "left",
                                paddingLeft: 90,
                                paddingVertical: 10,
                                fontSize: 16,
                              }}
                            >
                              Blood Pressure
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        ></View>
                        {/* <CheckBox
                            center={true}
                            checkedColor="#ff4c6e"
                            size={18}
                            // iconType="material-community"
                            checked={
                              this.props.phase2ans.systolic1 !== "" &&
                              this.props.phase2ans.diastolic1 !== ""
                              // this.props.phase2ans.diastolic1 !== "" &&
                              // this.props.phase2ans.systolic2 !== "" &&
                              // this.props.phase2ans.diastolic2 !== "" &&
                              // this.props.phase2ans.systolic3 !== "" &&
                              // this.props.phase2ans.diastolic3 !== "" &&
                              // this.props.phase2ans.systolic4 !== "" &&
                              // this.props.phase2ans.diastolic4 !== ""
                            }
                          />
                        <IconMI
                          name="chevron-right"
                          size={28}
                          //   color="white"
                          iconStyle={{ alignSelf: "center" }}
                        /> */}
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          this.props.phase2ans.systolic1 !== "" &&
                          this.props.phase2ans.diastolic1 !== ""
                            ? "#ffffff"
                            : "#f5f5f5",
                      }}
                      onPress={() =>
                        this.props.navigation.navigate("BloodPressure")
                      }
                      disabled={
                        this.props.phase2ans.systolic1 !== "" &&
                        this.props.phase2ans.diastolic1 !== ""
                      }
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingHorizontal: 20,
                        }}
                      >
                        <View
                          style={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                            }}
                          >
                            Reading 1
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CheckBox
                            center={true}
                            checkedColor="#ff4c6e"
                            size={16}
                            checked={
                              this.props.phase2ans.systolic1 !== "" &&
                              this.props.phase2ans.diastolic1 !== ""
                            }
                            iconType="material-community"
                            checkedIcon="checkbox-marked-outline"
                            uncheckedIcon="checkbox-blank-outline"
                          />
                          <IconMI
                            name="chevron-right"
                            size={28}
                            //   color="white"
                            iconStyle={{ alignSelf: "center" }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          this.props.phase2ans.systolic1 !== "" &&
                          this.props.phase2ans.diastolic1 !== "" &&
                          this.props.phase2ans.systolic2 !== "" &&
                          this.props.phase2ans.diastolic2 !== ""
                            ? "#ffffff"
                            : "#f5f5f5",
                      }}
                      onPress={() =>
                        this.props.navigation.navigate("BloodPressure")
                      }
                      disabled={
                        this.props.phase2ans.systolic1 !== "" &&
                        this.props.phase2ans.diastolic1 !== "" &&
                        this.props.phase2ans.systolic2 !== "" &&
                        this.props.phase2ans.diastolic2 !== ""
                      }
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingHorizontal: 20,
                        }}
                      >
                        <View
                          style={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                            }}
                          >
                            Reading 2
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CheckBox
                            center={true}
                            checkedColor="#ff4c6e"
                            size={18}
                            iconType="material-community"
                            checkedIcon="checkbox-marked-outline"
                            uncheckedIcon="checkbox-blank-outline"
                            checked={
                              this.props.phase2ans.systolic1 !== "" &&
                              this.props.phase2ans.diastolic1 !== "" &&
                              this.props.phase2ans.systolic2 !== "" &&
                              this.props.phase2ans.diastolic2 !== ""
                            }
                          />
                          <IconMI
                            name="chevron-right"
                            size={28}
                            //   color="white"
                            iconStyle={{ alignSelf: "center" }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          this.props.phase2ans.systolic1 !== "" &&
                          this.props.phase2ans.diastolic1 !== "" &&
                          this.props.phase2ans.systolic2 !== "" &&
                          this.props.phase2ans.diastolic2 !== "" &&
                          this.props.phase2ans.systolic3 !== "" &&
                          this.props.phase2ans.diastolic3 !== ""
                            ? "#ffffff"
                            : "#f5f5f5",
                      }}
                      onPress={() =>
                        this.props.navigation.navigate("BloodPressure")
                      }
                      disabled={
                        this.props.phase2ans.systolic1 !== "" &&
                        this.props.phase2ans.diastolic1 !== "" &&
                        this.props.phase2ans.systolic2 !== "" &&
                        this.props.phase2ans.diastolic2 !== "" &&
                        this.props.phase2ans.systolic3 !== "" &&
                        this.props.phase2ans.diastolic3 !== ""
                      }
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingHorizontal: 20,
                        }}
                      >
                        <View
                          style={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                            }}
                          >
                            Reading 3
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CheckBox
                            center={true}
                            checkedColor="#ff4c6e"
                            size={18}
                            iconType="material-community"
                            checkedIcon="checkbox-marked-outline"
                            uncheckedIcon="checkbox-blank-outline"
                            checked={
                              this.props.phase2ans.systolic1 !== "" &&
                              this.props.phase2ans.diastolic1 !== "" &&
                              this.props.phase2ans.systolic2 !== "" &&
                              this.props.phase2ans.diastolic2 !== "" &&
                              this.props.phase2ans.systolic3 !== "" &&
                              this.props.phase2ans.diastolic3 !== ""
                            }
                          />
                          <IconMI
                            name="chevron-right"
                            size={28}
                            //   color="white"
                            iconStyle={{ alignSelf: "center" }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          this.props.phase2ans.systolic1 !== "" &&
                          this.props.phase2ans.diastolic1 !== "" &&
                          this.props.phase2ans.systolic2 !== "" &&
                          this.props.phase2ans.diastolic2 !== "" &&
                          this.props.phase2ans.systolic3 !== "" &&
                          this.props.phase2ans.diastolic3 !== "" &&
                          this.props.phase2ans.systolic4 !== "" &&
                          this.props.phase2ans.diastolic4 !== ""
                            ? "#ffffff"
                            : "#f5f5f5",
                      }}
                      onPress={() =>
                        this.props.navigation.navigate("BloodPressure")
                      }
                      disabled={
                        this.props.phase2ans.systolic1 !== "" &&
                        this.props.phase2ans.diastolic1 !== "" &&
                        this.props.phase2ans.systolic2 !== "" &&
                        this.props.phase2ans.diastolic2 !== "" &&
                        this.props.phase2ans.systolic3 !== "" &&
                        this.props.phase2ans.diastolic3 !== "" &&
                        this.props.phase2ans.systolic4 !== "" &&
                        this.props.phase2ans.diastolic4 !== ""
                      }
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingHorizontal: 20,
                        }}
                      >
                        <View
                          style={{
                            width: "40%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                            }}
                          >
                            Reading 4
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CheckBox
                            center={true}
                            checkedColor="#ff4c6e"
                            size={18}
                            iconType="material-community"
                            checkedIcon="checkbox-marked-outline"
                            uncheckedIcon="checkbox-blank-outline"
                            checked={
                              this.props.phase2ans.systolic1 !== "" &&
                              this.props.phase2ans.diastolic1 !== "" &&
                              this.props.phase2ans.systolic2 !== "" &&
                              this.props.phase2ans.diastolic2 !== "" &&
                              this.props.phase2ans.systolic3 !== "" &&
                              this.props.phase2ans.diastolic3 !== "" &&
                              this.props.phase2ans.systolic4 !== "" &&
                              this.props.phase2ans.diastolic4 !== ""
                            }
                          />
                          <IconMI
                            name="chevron-right"
                            size={28}
                            //   color="white"
                            iconStyle={{ alignSelf: "center" }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor:
                          this.props.phase2ans.nitricOxide !== ""
                            ? "#ffffff"
                            : "#f5f5f5",
                      }}
                      // onPress={this.toKit}
                      onPress={() =>
                        this.props.navigation.navigate("nitricOxide")
                      }
                      disabled={this.props.phase2ans.nitricOxide !== ""}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          paddingHorizontal: 20,
                        }}
                      >
                        <View
                          style={{
                            width: "80%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "left",
                              paddingLeft: 90,
                              fontSize: 16,
                            }}
                          >
                            Nitric Oxide
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "20%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <CheckBox
                            center={true}
                            checkedColor="#ff4c6e"
                            size={18}
                            iconType="material-community"
                            checkedIcon="checkbox-marked-outline"
                            uncheckedIcon="checkbox-blank-outline"
                            checked={this.props.phase2ans.nitricOxide !== ""}
                          />
                          <IconMI
                            name="chevron-right"
                            size={28}
                            //   color="white"
                            iconStyle={{ alignSelf: "center" }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              {/* <TouchableOpacity
                style={{
                  height: SCREEN_HEIGHT * 0.09,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  borderBottomWidth: 1,
                  borderColor: "#c0c0c0",
                  backgroundColor: this.props.kit ? "#ffffff" : "#f5f5f5",
                  backgroundColor: "#f5f5f5",
                }}
                onPress={this.toTreatment}
              >
                <View
                  style={{
                    flex: 5,
                    flexDirection: "row",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <CheckBox
                      center={true}
                      checkedColor="#ff4c6e"
                      iconType="material-community"
                      checkedIcon="checkbox-marked-circle"
                      uncheckedIcon="circle-slice-8"
                      checked={this.props.treatment}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: SCREEN_HEIGHT * 0.05,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    {this.props.kit ? (
                      <Image
                        source={require("../assets/images/home/Active/1x/treatment.icon.png")}
                        // style={{ width: SCREEN_WIDTH / 10, alignSelf: "center" }}
                        style={{ height: 20 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <Image
                        source={require("../assets/images/home/inactive/1x/treatment.icon.png")}
                        // style={{ width: SCREEN_WIDTH / 9, alignSelf: "center" }}
                        style={{ height: 20 }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <View
                    style={{
                      flex: 6,
                      alignSelf: "center",
                      alignItems: "center",
                      alignContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                        paddingLeft: "5%",
                        // paddingRight: "4%",
                        fontSize: 15,
                        color: this.props.kit ? "#000" : "#a8a8a8",
                        color: "#a8a8a8",
                      }}
                    >
                      Genetics
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontStyle: "italic",
                      color: "#ff4c6e",
                      fontSize: 14,
                      position: "absolute",
                      right: 28,
                    }}
                  >
                    {/* <Fontisto name="locked" color="#9c9c9c" size={16} /> //comment this line while uncomment
                    {!this.props.kit && (
                      <Fontisto
                        // name="locked"
                        name="ios-lock"
                        color="#9c9c9c"
                        size={16}
                      />
                    )}
                    {this.props.kit && !this.props.treatment
                      ? "Next Step"
                      : null}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <IconMI
                    name="chevron-right"
                    size={28}
                    iconStyle={{ alignSelf: "center" }}
                  />
                </View>
              </TouchableOpacity> */}
              {/*</View><TouchableOpacity
                style={{
                  height: SCREEN_HEIGHT * 0.09,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  borderBottomWidth: 1,
                  borderColor: "#c0c0c0",
                  // backgroundColor: this.props.treatment ? "#ffffff" : "#f5f5f5",
                  backgroundColor: "#f5f5f5",
                }}
                onPress={this.toGenetics}
              >
                <View
                  style={{
                    flex: 5,
                    flexDirection: "row",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <CheckBox
                      center={true}
                      checkedColor="#ff4c6e"
                      iconType="material-community"
                      checkedIcon="checkbox-marked-circle"
                      uncheckedIcon="circle-slice-8"
                      // checked={this.props.centers}
                      // paddingLeft="10%"
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: SCREEN_HEIGHT * 0.05,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      source={require("../assets/images/home/inactive/1x/B100.Center.png")}
                      // style={{ width: SCREEN_WIDTH / 10, alignSelf: "center" }}
                      style={{ height: 20 }}
                      resizeMode="contain"
                    /> */}
              {/* {this.props.treatment ? (
                    <Image
                      source={require("../assets/images/home/Active/1x/B100.Center.png")}
                      // style={{ width: SCREEN_WIDTH / 10, alignSelf: "center" }}
                      style={{ height: 20 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={require("../assets/images/home/inactive/1x/B100.Center.png")}
                      // style={{ width: SCREEN_WIDTH / 10, alignSelf: "center" }}
                      style={{ height: 20 }}
                      resizeMode="contain"
                    />
                  )} */}
              {/*  </View>
                  <View
                    style={{
                      flex: 6,
                      alignSelf: "center",
                      alignItems: "center",
                      alignContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                        // alignContent:"center",
                        paddingLeft: "5%",
                        // paddingRight: "10%",
                        fontSize: 15,
                        // color: this.props.treatment ? "#000" : "#a8a8a8",
                        color: "#a8a8a8",
                      }}
                    >
                      Plaque
                    </Text>
                  </View>
                </View> */}
              {/* <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    fontStyle: "italic",
                    color: "#ff4c6e",
                    fontSize: 14,
                  }}
                ></Text>
              </View> */}

              {/* <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontStyle: "italic",
                      color: "#ff4c6e",
                      fontSize: 14,
                      position: "absolute",
                      right: 28,
                    }}
                  >
                    <Fontisto
                      // name="locked"
                      name="ios-lock"
                      color="#9c9c9c"
                      size={16}
                    /> */}
              {/* {!this.props.treatment && (
                    <Fontisto name="locked" color="#9c9c9c" size={16} />
                  )}
                  {this.props.treatment ? "Next Step" : null} */}
              {/* </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <IconMI
                    name="chevron-right"
                    size={28}
                    iconStyle={{ alignSelf: "center" }}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  height: SCREEN_HEIGHT * 0.09,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  borderBottomWidth: 1,
                  borderColor: "#c0c0c0",
                  // backgroundColor: this.props.treatment ? "#ffffff" : "#f5f5f5",
                  backgroundColor: "#f5f5f5",
                }}
                onPress={this.toMap}
              >
                <View
                  style={{
                    flex: 5,
                    flexDirection: "row",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      flex: 2,
                      alignContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <CheckBox
                      center={true}
                      checkedColor="#ff4c6e"
                      iconType="material-community"
                      checkedIcon="checkbox-marked-circle"
                      uncheckedIcon="circle-slice-8"
                      // checked={this.props.centers}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: SCREEN_HEIGHT * 0.05,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      alignSelf: "center",
                    }}
                  >
                    <Image
                      source={require("../assets/images/home/inactive/1x/B100.Center.png")}
                      // style={{ width: SCREEN_WIDTH / 10, alignSelf: "center" }}
                      style={{ height: 20 }}
                      resizeMode="contain"
                    /> */}
              {/* {this.props.treatment ? (
                    <Image
                      source={require("../assets/images/home/Active/1x/B100.Center.png")}
                      // style={{ width: SCREEN_WIDTH / 10, alignSelf: "center" }}
                      style={{ height: 20 }}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      source={require("../assets/images/home/inactive/1x/B100.Center.png")}
                      // style={{ width: SCREEN_WIDTH / 10, alignSelf: "center" }}
                      style={{ height: 20 }}
                      resizeMode="contain"
                    />
                  )} */}
              {/*  </View>
                  <View
                    style={{
                      flex: 6,
                      alignSelf: "center",
                      alignItems: "center",
                      alignContent: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "left",
                        paddingLeft: "5%",
                        paddingRight: "10%",
                        fontSize: 15,
                        // color: this.props.treatment ? "#000" : "#a8a8a8",
                        color: "#a8a8a8",
                      }}
                    >
                      BluePrint
                    </Text>
                  </View>
                </View> */}

              {/* <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    textAlign: "right",
                    fontStyle: "italic",
                    color: "#ff4c6e",
                    fontSize: 14,
                  }}
                ></Text>
              </View> */}

              {/*  <View
                  style={{
                    flex: 2,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      fontStyle: "italic",
                      color: "#ff4c6e",
                      fontSize: 14,
                      position: "absolute",
                      right: 28,
                    }}
                  >
                    <Fontisto
                      // name="locked"
                      name="ios-lock"
                      color="#9c9c9c"
                      size={16}
                    /> */}
              {/* {!this.props.treatment && (
                    <Fontisto name="locked" color="#9c9c9c" size={16} />
                  )}
                  {this.props.treatment ? "Next Step" : null} */}
              {/* </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <IconMI
                    name="chevron-right"
                    size={28}
                    iconStyle={{ alignSelf: "center" }}
                  />
                </View>
              </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
        <View
          style={
            {
              // height: 10,
              // width: 60,
              // justifyContent: "left",
              // alignItems: "center",
              // marginTop: "5%",
              // marginLeft: "5%",
              // backgroundColor: "black",
              // marginTop: 20,
            }
          }
          onStartShouldSetResponder={this.onOrder}
        >
          <Image
            source={require("../assets/images/shoppingbag.png")}
            style={{
              // marginTop: -10,
              height: 60,
              width: 60,
              position: "absolute",
              bottom: 20,
              // alignSelf:"flex-end"
            }}
          />
        </View>
        {/* {this.props.testReultsReady && this.props.score.masterScore ? (
          <View
            style={{
              minHeight: "10%",
              backgroundColor: "#ff4c6e",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlignVertical: "center",
                color: "#f2f2f2",
                fontSize: 20,
              }}
              onPress={() => {
                this.props.navigation.navigate("RecommendationsList");
              }}
            >
              Recommandation ({this.state.generalRecommendation.length})
            </Text>
          </View>
        ) : null} */}
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => {
  return {
    userID: state.auth.uid,
    profile: state.phase.profile,
    questions: state.phase.questions,
    kit: state.phase.kit,
    treatment: state.phase.treatment,
    centers: state.phase.centers,
    score: state.auth.score,
    reccomended: state.phase.reccomended,
    testReultsReady: state.auth.testReultsReady,
    phase2ans: state.phase2ans,
    loading: state.auth.loading,
    is_phase1_deleted: state.auth.is_phase1_deleted,
    quest: state.quest.Phase_1,
    answ: state.quest.ans,
  };
};
export default connect(mapStateToProps, {
  loadQuestions,
  getScore,
  clearPhase1,
  phaseTwoGet,
  ans,
  labs,
})(HomeScreen);
