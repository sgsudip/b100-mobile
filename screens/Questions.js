import _ from "lodash";
import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  Text,
  Alert,
  AppState,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header, Icon } from "react-native-elements";
import QuestionType from "../components/questionType";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import {
  ans,
  prog,
  slideindex,
  loadQuestions,
  setHeaderIndex,
  header,
  subQuestion,
} from "../actions";
import { Button } from "native-base";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class DemoQuestionsScreen extends Component {
  constructor(props) {
    super(props);
    this.flatListRef = React.createRef();
    this.state = {
      length: 0,
      progress: 0,
      index: 0,
      slideindex: 0,
      choices: [],
      refresh: true,
      hasSaveAns: "false",
      saveIndex: 0,
      question: [],
      backpressed: false,
      appState: AppState.currentState,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  // UNSAFE_componentWillMount = async () => {
  //   // console.warn("main index" + this.props.mainIndex);
  //   // await this.setState({ length: this.props.quest.length - 1 });
  //   // console.warn('from will mount');
  //   await this.setState({
  //     length: this.props.quest[0].TotalCount[0].mainQuestionCount - 1,
  //   });
  //   this.setState({
  //     progress:
  //       this.props.mainIndex /
  //       (this.props.quest[0].TotalCount[0].mainQuestionCount - 1),
  //   });

  //   // if (!this.props.question) {
  //   AsyncStorage.getItem("questions").then((val) => {
  //     if (val !== null) {
  //       const question = JSON.parse(val);
  //       AsyncStorage.getItem("HeaderIndex").then((value) => {
  //         if (value !== null) {
  //           this.props.setHeaderIndex(parseInt(value));
  //           this.props.header(question.Headers[parseInt(value)]);
  //           AsyncStorage.getItem("MainIndex").then((values) => {
  //             if (values !== null) {
  //               this.props.slideindex(parseInt(values));
  //             }
  //           });
  //           this.setState({ question: question.Headers[parseInt(value)] });
  //         }
  //       });
  //     }
  //   });

  //   AsyncStorage.getItem("Answers").then((val) => {
  //     if (val !== null) {
  //       this.setState({ hasSaveAns: "true", choices: JSON.parse(val) });
  //       this.props.ans(JSON.parse(val));
  //     }
  //   });

  //   AsyncStorage.getItem("saveAns")
  //     .then((value) => {
  //       if (value === "true") {
  //         AsyncStorage.getItem("Index").then((value) => {
  //           // console.warn(value, 'saveindex value');
  //           this.setState({
  //             hasSaveAns: "true",
  //             saveIndex: parseInt(value),
  //             index: parseInt(value),
  //           });
  //         });
  //       }
  //     })
  //     .then((res) => {
  //       //do something else
  //     });
  //   // }
  //   // console.warn("from didmount " + this.props.mainIndex);
  //   // debugger;
  //   // await this.flatListRef.scrollToIndex({
  //   //   animated: true,
  //   //   index: 2,
  //   // });
  // };

  componentDidMount() {
    // console.warn("from componentdidmount " + this.props.mainIndex);
    // this.setState({ index: this.props.mainIndex });
    // this.flatListRef.scrollToIndex({
    //   animated: true,
    //   index: this.props.mainIndex,
    // });
    // this.props.slideindex(this.props.mainIndex);
    this.appStateSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          // this.state.appState.match(/active|inactive/) &&
          // nextAppState === "background"
          nextAppState.match(/background|inactive/) &&
          this.state.appState === "active"
        ) {
          console.log("App has come to the background!");
          AsyncStorage.setItem("saveAns", "true");
          const Index = this.state.index;
          // console.warn(Index);
          AsyncStorage.setItem("Index", Index.toString());
          AsyncStorage.setItem("Answers", JSON.stringify(this.props.answers));
          const headerindex = this.props.headerIndex;
          AsyncStorage.setItem("HeaderIndex", headerindex.toString());
          const mainindex = this.props.mainIndex;
          AsyncStorage.setItem("MainIndex", mainindex.toString());
          // console.log('Done');
        }
        this.setState({ appState: nextAppState });
        // console.log(this.state.appState);
      }
    );
  }

  // componentWillUnmount() {
  //   this.appStateSubscription.remove();
  // }

  onCancelPress = () => {
    AsyncStorage.setItem("saveAns", "true");
    const Index = this.state.index;
    console.warn(Index);
    AsyncStorage.setItem("Index", Index.toString());
    AsyncStorage.setItem("Answers", JSON.stringify(this.props.answers));
    const headerindex = this.props.headerIndex;
    AsyncStorage.setItem("HeaderIndex", headerindex.toString());
    const mainindex = this.props.mainIndex;
    AsyncStorage.setItem("MainIndex", mainindex.toString());
    // this.setState({ index: 0 });
    // this.setState({ progress: 0 });
    //   this.props.prog( (this.props.mainIndex - this.props.quest[0].Headers[Header].Total) /
    //  this.state.length,);
    // this.props.slideindex(0);
    // this.props.setHeaderIndex(0);
    this.props.navigation.navigate("Home");
    // console.warn(" Cancel main index" + this.props.mainIndex);
    // console.warn(" Cancel total" + this.state.length);
    // AsyncStorage.setItem("REF", this.flatListRef);
    // this.flatListRef.scrollToIndex({
    //   animated: true,
    //   index: this.props.mainIndex,
    // });
  };

  /* for the alert of drugs questions
    Done for the options which haven't subquestions
  */
  // onViewableItemsChanged = ({ viewableItems, changed }) => {
  //   // manually get the index on given questions and Display alert Conditionaly
  //   // console.log("item changed");

  //   const total = this.getPreviousHeadersTotal();
  //   if (
  //     viewableItems[0].item.question.includes("drugs over the last year") /* &&
  //     this.props.mainIndex === total + viewableItems[0].item.questionOrder */
  //   ) {
  //     console.log(this.props.mainIndex, "mainindex");
  //     console.warn(
  //       total,
  //       viewableItems[0].item.questionOrder,
  //       "questions order"
  //     );
  //     // AsyncStorage.getItem('isSmoker')
  //     //   .then(Value => {
  //     //     debugger;
  //     //     // this.setState({drugsAlert:})
  //     //   });
  //     if (
  //       this.props.mainIndex ===
  //       total + viewableItems[0].item.questionOrder - 1
  //     ) {
  //       Alert.alert(
  //         "Disclaimar!",
  //         "I realize answering this question may make you feel uncomfortable, however, it is important to answer truthfully as most drugs can have adverse cardiovascular effects, ranging from abnormal heart rate to heart attacks. Your response will be kept in complete confidence per HIPAA guidelines. - Dr. B, The Heart Doc",
  //         [
  //           {
  //             text: "OK",
  //             onPress: () => {},
  //           },
  //         ]
  //       );
  //     }
  //   }
  //   // console.warn("question" + JSON.stringify(viewableItems[0].item.question));
  //   // console.log("Visible items are", viewableItems);
  //   // console.log("Changed in this iteration", changed);
  // };
  // _viewabilityConfig = {
  //   itemVisiblePercentThreshold: 50,
  // };

  getPreviousHeadersTotal = () => {
    const Header = this.props.headerIndex;
    var Total = 0;
    for (i = 0; i <= Header - 1; i++) {
      Total += this.props.quest[0].Headers[i].Total;
    }
    return Total;
  };
  onBackPress = async () => {
    // this.setState({
    //   refresh: !this.state.refresh,
    // });
    // console.log(this.props.mainIndex, ' ', this.state.index)
    // debugger;
    if (this.props.mainIndex === 0) {
      // this.props.navigation.navigate("Home");
      this.props.navigation.navigate("Phase1Header");
    } else {
      const Header = this.props.headerIndex;
      const total = this.getPreviousHeadersTotal();
      if (this.props.mainIndex === total) {
        // await this.props.setHeaderIndex(this.props.headerIndex);
        // await this.props.header(this.props.quest[0].Headers[Header - 1]);
        // await this.props.slideindex(
        //   this.props.mainIndex - this.props.quest[0].Headers[Header - 1].Total - 1
        // );
        this.props.navigation.navigate("Phase1Header");
        await this.setState({
          // progress:
          //   (this.props.mainIndex - this.props.quest[0].Headers[Header].Total) /
          //   this.state.length,
          index: this.props.quest[0].Headers[Header - 1].Total - 1,
          backpressed: true,
        });
        // console.log(this.props.quest[0].Headers[Header - 1].Total - 1, this.props.mainIndex);
        // debugger;
        this.flatListRef.scrollToIndex({
          animated: true,
          // index: 0,
          index: this.props.quest[0].Headers[Header - 1].Total - 1,
        });
      } else {
        // debugger;
        if (this.state.index < 0) {
          this.props.navigation.navigate("Phase1Header");
          await this.setState({
            index: this.props.quest[0].Headers[Header - 1].Total - 1,
            backpressed: true,
          });
        } else {
          await this.setState({ index: this.state.index - 1 });
          this.setState({
            progress: (this.props.mainIndex - 1) / this.state.length,
          });
          this.props.slideindex(this.props.mainIndex - 1);
          this.props.prog(this.state.progress);
          // console.log(this.props.quest[0].Headers[Header - 1].Total - 1, this.props.mainIndex);
          // debugger;
          this.flatListRef.scrollToIndex({
            animated: true,
            index: this.state.index,
          });
        }
      }
    }
  };

  onHeaderChange = () => {
    const Header = this.props.headerIndex;
    if (Header === this.props.quest[0].TotalCount[0].headerCount - 1) {
      // if (Header === 0) {
      this.props.header(this.props.quest[0].Headers[0]);
      this.props.setHeaderIndex(0);
      this.flatListRef.scrollToIndex({
        animated: true,
        index: 0,
      });
      AsyncStorage.removeItem("HeaderIndex");
      AsyncStorage.setItem("HeaderIndex", "0");
      this.props.navigation.navigate("reward");
    } else {
      AsyncStorage.setItem("HeaderIndex", `${this.props.headerIndex + 1}`);
      this.props.setHeaderIndex(this.props.headerIndex + 1);
      this.props.header(this.props.quest[0].Headers[Header + 1]);
      this.props.navigation.navigate("Phase1Header");
      this.flatListRef.scrollToIndex({
        animated: true,
        index: 0,
      });
    }
  };

  checkOptionBool = (lastQuestion, choice) => {
    const optionid = choice.optionIDs[0]._id;
    const selectedOptionId = lastQuestion.options.find(
      (data) => data._id === optionid
    );
    if (!selectedOptionId.subQuestionbool) {
      return true;
    } else {
      return false;
    }
  };

  validateIndex = (item, choice) => {
    const total = this.props.quest[0].Headers[this.props.headerIndex].Total;
    const lastQuestion =
      this.props.quest[0].Headers[this.props.headerIndex].questions[total - 1];

    if (lastQuestion._id === item._id) {
      return this.checkOptionBool(lastQuestion, choice);
    } else {
      return false;
    }
  };

  scrollToItem(index, item, chosen) {
    // console.warn("main index" + this.props.mainIndex);
    index++;
    this.setState({
      progress: (this.props.mainIndex + 1) / this.state.length,
      index,
    });
    // this.setState({ index });
    // AsyncStorage.getItem('isSmoker').then(value => this.setState({ smokerAlert: value }));
    // if (this.state.smokerAlert === 'true') {
    //   // debugger;
    //   this.props.slideindex(this.props.mainIndex + 1);
    // } else {
    //   this.props.slideindex(this.props.mainIndex + 1);
    // }
    // if (chosen.optionIDs[0].optionString.includes('smoker')) {
    // setTimeout(() => {
    this.props.slideindex(this.props.mainIndex + 1);
    // console.log(this.props.mainIndex, "from questions");
    // }, 60000);
    // }
    // else {
    // this.props.slideindex(this.props.mainIndex + 1);
    // }
    // this.props.slideindex(this.props.mainIndex + 1);
    this.props.prog(this.state.progress);
    if (item.questionType === "HIDDEN") {
      // Store Hidden Type Questions data

      if (index === this.props.quest[0].Headers[this.props.headerIndex].Total) {
        this.onHeaderChange();
      } else {
        if (item.subQuestionbool) {
          this.props.subQuestion(item.subQuestions);
          // this.props.slideindex(index);
          this.props.navigation.navigate("subQuest");
        }
        this.flatListRef.scrollToIndex({
          animated: true,
          index: index,
        });
      }
    } else if (chosen.optionIDs.length === 0) {
      if (index === this.props.quest[0].Headers[this.props.headerIndex].Total) {
        this.props.setHeaderIndex(this.props.headerIndex + 1);
        this.props.header(this.props.quest[0].Headers[this.props.headerIndex]);
        this.props.navigation.navigate("Phase1Header");
      } else {
        this.flatListRef.scrollToIndex({
          animated: true,
          index: index,
        });
      }
    } else {
      let choices = this.state.choices;
      for (let i = 0; i < choices.length; i++) {
        if (chosen.questionID === choices[i].questionID) {
          choices.splice(i, 1);
        }
      }
      choices[choices.length] = chosen;
      this.props.ans(choices);
      if (
        index ===
        this.props.quest[0].Headers[this.props.headerIndex].Total + 1
      ) {
        this.props.setHeaderIndex(this.props.headerIndex + 1);
        this.props.header(this.props.quest[0].Headers[this.props.headerIndex]);
        this.props.navigation.navigate("Phase1Header");
      } else {
        if (
          index === this.props.quest[0].Headers[this.props.headerIndex].Total
        ) {
          // if (item.questionType !== "HIDDEN") {
          const bool = this.validateIndex(item, chosen);
          if (bool) {
            this.onHeaderChange();
          } else {
            // if (item.questionType !== "HIDDEN") {
            const hasSubquestion = this.checkOptionBool(
              this.props.quest[0].Headers[this.props.headerIndex].questions[
                this.props.quest[0].Headers[this.props.headerIndex].Total - 1
              ],
              chosen
            );
            if (!hasSubquestion) {
              this.flatListRef.scrollToIndex({
                animated: true,
                index: 0,
              });
            }
            // }
          }
          // } else {
          //   this.onHeaderChange();
          // }
        } else {
          this.flatListRef.scrollToIndex({
            animated: true,
            index: index,
          });
        }
      }
    }

    // if (item.questionType !== "HIDDEN") {
    //   let choices = this.state.choices;
    //   for (let i = 0; i < choices.length; i++) {
    //     if (chosen.questionID === choices[i].questionID) {
    //       choices.splice(i, 1);
    //     }
    //   }
    //   choices[choices.length] = chosen;
    // }

    // this.setState({ progress: (this.props.mainIndex + 1) / this.state.length });
    // this.setState({ index });
    // this.props.slideindex(this.props.mainIndex + 1);
    // // console.log("index", index)
    // this.props.prog(this.state.progress);
    // if (index !== this.props.quest[0].TotalCount[0].mainQuestionCount) {
    // console.warn("index", index);
    // console.warn("state " + this.state.index);
    // if (
    //   index ===
    //   this.props.quest[0].Headers[this.props.headerIndex].Total + 1
    // ) {
    //   this.props.setHeaderIndex(this.props.headerIndex + 1);
    //   this.props.header(this.props.quest[0].Headers[this.props.headerIndex]);
    //   this.props.navigation.navigate("Phase1Header");
    // } else {
    //   if (index === this.props.quest[0].Headers[this.props.headerIndex].Total) {
    //     if (item.questionType !== "HIDDEN") {
    //       const bool = this.validateIndex(item, chosen);
    //       if (bool) {
    //         this.onHeaderChange();
    //       } else {
    //         if (item.questionType !== "HIDDEN") {
    //           const hasSubquestion = this.checkOptionBool(
    //             this.props.quest[0].Headers[this.props.headerIndex].questions[
    //               this.props.quest[0].Headers[this.props.headerIndex].Total - 1
    //             ],
    //             chosen
    //           );
    //           if (!hasSubquestion) {
    //             this.flatListRef.scrollToIndex({ animated: true, index: 0 });
    //           } else {
    //           }
    //         } else {
    //         }
    //       }
    //     } else {
    //       this.onHeaderChange();
    //     }
    //   } else {
    //     this.flatListRef.scrollToIndex({ animated: true, index: index });
    //   }
    // }
  }
  render() {
    return (
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
      >
        <Header
          placement="center"
          // containerStyle={{
          //   backgroundColor: '#ff4c6e',borderBottomWidth:0, padding:0,margin:0}}
          containerStyle={{
            borderBottomWidth: 0,
            backgroundColor: "#ff4c6e",
            zIndex: 1,
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
            name="arrow-back"
            color="#f2f2f2"
            underlayColor="transparent"
            onPress={this.onBackPress}
            style={{ position: "absolute", zIndex: 1 }}
          />
          <Text
            style={{
              fontFamily: "Muli-SemiBold",
              fontSize:
                Platform.OS === "ios" ? 17 : SCREEN_WIDTH < 575 ? 20 : 22,
              color: "#f2f2f2",
            }}
          >
            {/* B100 */}
            {this.props.headers.title}
          </Text>

          <Icon
            name="cancel"
            color="#f2f2f2"
            underlayColor="transparent"
            onPress={this.onCancelPress}
          />
        </Header>
        <View
          style={{
            // backgroundColor: "black",
            padding: 0,
            margin: 0,
            flex: 1,
            alignItems: "center",
            width: "100%",
            zIndex: 0,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 10,
              zIndex: 999999,
              width: SCREEN_WIDTH * 0.9,
              // height: 0,
            }}
          >
            <Progress.Bar
              progress={this.state.progress}
              color={"#ff4c6e"}
              animated={false}
              unfilledColor={"rgba(251, 33, 33, .36)"}
              borderWidth={0}
              width={null}
            />
          </View>
          {/* <View
            style={{
              alignSelf: "flex-start",
              zIndex: 0,
              padding: 0,
              marginTop: -30,
              top: 0,
              borderWidth: 0,
            }}
          > */}
          <FlatList
            //contentContainerStyle={{ padding: 0, marginTop:0,height:"100%" }}
            ListHeaderComponentStyle={{
              padding: 0,
              marginTop: 0,
              height: 0,
              top: 0,
              borderWidth: 0,
            }}
            /* For show alert of drug question
            Done for the options which haven't subquestions*/
            // onViewableItemsChanged={this.onViewableItemsChanged}
            // viewabilityConfig={this._viewabilityConfig}

            // extraData={this.state.refresh}
            ListHeaderComponent={<View />}
            data={this.props.headers.questions}
            extraData={this.state.question}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            initialScrollIndex={0}
            // initialScrollIndex={
            //   this.state.hasSaveAns === "true" && !this.props.questions
            //     ? this.state.saveIndex
            //     : this.state.backpressed
            //     ? this.props.headers.Total - 1
            //     : 0
            // }
            // onScroll={console.warn('Scrolled')}
            // initialNumToRender={1}
            // maxToRenderPerBatch={1}
            horizontal
            scrollEnabled={false}
            getItemLayout={(data, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            ref={(ref) => (this.flatListRef = ref)}
            renderItem={({ item, index }) => (
              <QuestionType
                prog={() => {}}
                onNextPress={(chosen) => this.scrollToItem(index, item, chosen)}
                item={item}
                nav={this.props.navigation}
              />
            )}
          />
          {/* </View> */}
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    progg: state.quest.progg,
    mainIndex: state.quest.mainIndex,
    quest: state.quest.Phase_1,
    headers: state.quest.headers,
    headerIndex: state.quest.headerIndex,
    subQuestion: state.quest.SubQuestion,
    answers: state.quest.ans,
    questions: state.phase.questions,
  };
};

export default connect(mapStateToProps, {
  prog,
  slideindex,
  ans,
  loadQuestions,
  setHeaderIndex,
  header,
  subQuestion,
})(DemoQuestionsScreen);
