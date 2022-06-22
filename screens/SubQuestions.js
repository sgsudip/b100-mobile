import _ from "lodash";
import React, { Component, PureComponent } from "react";
import { StyleSheet, Dimensions, FlatList, View, Text } from "react-native";
import QuestionType from "../components/questionType";
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
import { Header, Icon } from "react-native-elements";
import * as Progress from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class DemosubQuestion extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      tabBarVisible: false,
    };
  };
  // UNSAFE_componentWillMount = () => {};
  state = {
    index: 0,
  };
  onCancelPress = () => {
    this.props.navigation.navigate("Home");
    this.props.slideindex(0);
    this.flatListRef.scrollToIndex({ animated: true, index: 0 });
  };
  onBackPress = async () => {
    if (this.state.index > 0) {
      this.setState({ index: this.state.index - 1 });
      this.flatListRef.scrollToIndex({
        animated: true,
        index: this.state.index,
      });
    } else {
      await this.props.slideindex(this.props.mainIndex - 1);
      this.props.navigation.navigate("Quest");
    }
  };

  getHeaderquestioncount = () => {
    var Total = 0;
    for (i = 0; i <= this.props.headerIndex; i++) {
      Total += this.props.quest[0].Headers[i].Total;
    }
    return Total;
  };
  checkIsLastSubQuestion = (lastQuestion, SubQuestion) => {
    if (SubQuestion.hasOptionQuestion) {
    }
  };

  onHeaderChange = () => {
    const Header = this.props.headerIndex;
    if (Header === this.props.quest[0].TotalCount[0].headerCount - 1) {
      // if (Header === 5) {
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
    if (selectedOptionId.subQuestionbool) {
      return true;
    } else {
      return false;
    }
  };
  scrollToItem = (index, item, chosen) => {
    index++;
    this.setState({ index });

    if (item.questionType === "HIDDEN") {
      if (chosen) {
        let choices = this.props.answ;
        for (let i = 0; i < choices.length; i++) {
          if (chosen.questionID === choices[i].questionID) {
            choices.splice(i, 1);
          }
        }
        choices[choices.length] = chosen;
        this.props.ans(choices);
      }
      // if (
      //   item.question.includes(
      //     "How many days a week do you consume an alcoholic beverage?"
      //   )
      // ) {
      //   // debugger;
      //   let optionChosen = parseInt(chosen.optionIDs[0].optionString);
      //   if (optionChosen <= 1) {
      //     this.onHeaderChange();
      //   } else {
      //     if (index < this.props.subQuestion.length) {
      //       this.flatListRef.scrollToIndex({ animated: true, index: index });
      //     }
      //   }
      // } else {
      const Total = this.getHeaderquestioncount();
      // debugger;
      if (this.props.mainIndex === Total) {
        if (index < this.props.subQuestion.length) {
          this.flatListRef.scrollToIndex({ animated: true, index: index });
        } else {
          this.onHeaderChange();
        }
      } else {
        const hasSubquestion = this.props.subQuestion.length;
        // console.log(hasSubquestion);
        if (index < this.props.subQuestion.length) {
          this.flatListRef.scrollToIndex({ animated: true, index: index });
        } else {
          this.props.navigation.navigate("Quest");
        }
      }
      // }
    } else if (chosen.optionIDs.length === 0) {
      if (index >= this.props.subQuestion.length) {
        this.props.navigation.navigate("Quest");
      } else {
        this.flatListRef.scrollToIndex({ animated: true, index: index });
      }
    } else {
      const hasSubquestion = this.checkOptionBool(item, chosen);
      if (index < this.props.subQuestion.length && !hasSubquestion) {
        let choices = this.props.answ;
        for (let i = 0; i < choices.length; i++) {
          if (chosen.questionID === choices[i].questionID) {
            choices.splice(i, 1);
          }
        }
        choices[choices.length] = chosen;
        this.props.ans(choices);
        this.flatListRef.scrollToIndex({ animated: true, index });
      } else {
        const Total = this.getHeaderquestioncount();
        // console.log(
        //   Total,
        //   this.props.mainIndex,
        //   hasSubquestion,
        //   "header question total"
        // );
        if (this.props.mainIndex === Total && !hasSubquestion) {
          // const Header = this.props.headerIndex;
          // this.props.setHeaderIndex(this.props.headerIndex + 1);
          // this.props.header(this.props.quest[0].Headers[Header + 1]);
          // this.flatListRef.scrollToIndex({ animated: true, index: 0 });
          // this.props.navigation.navigate("Phase1Header");
          this.onHeaderChange();
          let choices = this.props.answ;
          for (let i = 0; i < choices.length; i++) {
            if (chosen.questionID === choices[i].questionID) {
              choices.splice(i, 1);
            }
          }
          choices[choices.length] = chosen;
          this.props.ans(choices);
          // this.props.slideindex(0);
        } else {
          // debugger;
          if (chosen) {
            const optionid = chosen.optionIDs[0]._id;
            const selectedOptionId = item.options.find(
              (data) => data._id === optionid
            );
            let choices = this.props.answ;
            for (let i = 0; i < choices.length; i++) {
              if (chosen.questionID === choices[i].questionID) {
                choices.splice(i, 1);
              }
            }
            choices[choices.length] = chosen;
            this.props.ans(choices);
            if (selectedOptionId.subQuestionbool) {
              if (index === this.props.subQuestion.length) {
                this.flatListRef.scrollToIndex({ animated: true, index: 0 });
              }
              return true;
            } else {
              const Total = this.getHeaderquestioncount();
              // if (
              //   this.props.mainIndex === Total &&
              //   !selectedOptionId.subQuestionbool
              // ) {
              //   this.onHeaderChange();
              // } else {
              this.props.navigation.navigate("Quest");
              // }
            }
          } else {
            this.props.navigation.navigate("Quest");
          }
        }
        // this.flatListRef.scrollToIndex({ animated: true, index: 0 });
      }
    }
  };
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
          />
          <Text
            style={{
              fontFamily: "Muli-SemiBold",
              fontSize:
                Platform.OS === "ios" ? 17 : SCREEN_WIDTH < 575 ? 20 : 22,
              color: "#f2f2f2",
            }}
          >
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
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 10,
              zIndex: 999999,
              width: SCREEN_WIDTH * 0.9,
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
          <View
            style={{
              alignSelf: "flex-start",
              zIndex: 0,
              padding: 0,
              marginTop: 0,
              top: 0,
              borderWidth: 0,
            }}
          >
            <FlatList
              contentContainerStyle={{ padding: 0, marginTop: 0 }}
              ListHeaderComponentStyle={{
                padding: 0,
                marginTop: 0,
                height: 0,
                top: 0,
                borderWidth: 0,
              }}
              keyboardShouldPersistTaps="handled"
              ListHeaderComponent={<View />}
              data={this.props.subQuestion}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              initialScrollIndex={0}
              initialNumToRender={1}
              maxToRenderPerBatch={1}
              horizontal
              scrollEnabled={false}
              getItemLayout={(data, index) => ({
                length: SCREEN_WIDTH,
                offset: SCREEN_WIDTH * index,
                index,
              })}
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              renderItem={({ item, index }) => (
                <QuestionType
                  prog={() => {}}
                  onNextPress={(chosen) =>
                    this.scrollToItem(index, item, chosen)
                  }
                  item={item}
                  nav={this.props.navigation}
                />
              )}
            />
          </View>
        </View>
      </View>
    );
  }

  //   render() {
  //     return (
  //       <View style={{flex:1}}>
  //       <Header
  //   placement="center"
  //   containerStyle={{
  //     backgroundColor: '#ff4c6e',}} >
  //     <Icon
  // name= 'arrow-back'
  // color="#f2f2f2"
  // underlayColor="transparent"
  // onPress={this.onBackPress}
  // />
  // <Text style= {{  fontFamily:'Muli-SemiBold',
  //   fontSize:20,
  //   color:"#f2f2f2", }}>B100</Text>
  // <Icon
  // name= 'cancel'
  // color="#f2f2f2"
  // underlayColor="transparent"
  // onPress={this.onCancelPress}
  // />
  // </Header>
  //       <View
  //         style={{justifyContent:"center",
  //         alignItems:"center"}}>
  //        <View
  //         style={{
  //           position:"absolute",
  //           top: 10,
  //           zIndex:999999,
  //           width:SCREEN_WIDTH*.8}}
  //         >
  //         <Progress.Bar
  //         progress={this.props.prog}
  //         color={"#ff4c6e"}
  //         animated={false}
  //         unfilledColor={"rgba(251, 33, 33, .36)"}
  //         borderWidth={0}
  //         width={null}/>
  //         </View>
  //         <View style={{ zIndex:0}}>
  //         <FlatList
  //         data={this.props.subQuestion}

  //         contentContainerStyle={{ padding: 0, marginTop: 0 }}
  //         ListHeaderComponentStyle={{ padding: 0, marginTop: 0, height: 0, top: 0, borderWidth: 0 }}
  //         ListHeaderComponent={<View />}
  //         showsHorizontalScrollIndicator={false}

  //         keyExtractor={item => item.q._id}
  //         initialScrollIndex={0}
  //         initialNumToRender={1}
  //         maxToRenderPerBatch={1}
  //         horizontal
  //         scrollEnabled={false}

  //         scrollEnabled={false}
  //         getItemLayout={(data, index) => (
  //             {length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index, index}
  //         )}
  //         ref={(ref) => { this.flatListRef = ref; }}
  //         renderItem={({ item, index}) => (
  //         <QuestionType
  //         onNextPress={this.scrollToItem.bind(this, index)}
  //         item={item}

  //         />
  //     )}/>
  //     </View>
  //     </View>

  //     </View>
  //     );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 220,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
  slideStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.9,
  },
  ProgressContainer: {
    paddingTop: "5%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
const mapStateToProps = (state) => {
  return {
    subQuestion: state.quest.SubQuestion,
    prog: state.quest.prog,
    mainIndex: state.quest.mainIndex,
    headers: state.quest.headers,
    quest: state.quest.Phase_1,
    headerIndex: state.quest.headerIndex,
    answ: state.quest.ans,
  };
};

export default connect(mapStateToProps, {
  slideindex,
  setHeaderIndex,
  header,
  ans,
})(DemosubQuestion);
