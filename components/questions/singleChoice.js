import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { ans, subQuestion } from "../../actions";
import Option from "./OptionButton";
import images from "../../assets/images";
// import { cos } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class MultiQuestion extends Component {
  UNSAFE_componentWillMount = () => {
    let options = [];
    length = this.props.item.options.length;
    for (i = 0; i < length; i++) {
      options[i] = false;
    }
    this.setState({ options });
  };
  state = {
    options: [],
    pressed: 0,
  };
  onOptionPress = async (index, optionName, question) => {
    options = this.state.options;
    // console.log(optionName);
    // console.log(question);
    // debugger;
    if (optionName === "Single. We have never entered a relationship.") {
      Alert.alert(
        "Alert",
        "I am so happy to hear that! -Dr. B, The Heart Doc",
        [
          {
            text: "OK",
            onPress: () => {
              options[index] = true;
              this.setState({ options });
              if (this.props.item.options[index].subQuestionbool) {
                this.props.subQuestion(
                  this.props.item.options[index].subQuestions
                );
                this.props.nav.navigate("subQuest");
              }
              let chosen = {
                questionID: this.props.item._id,
                optionIDs: [],
              };
              for (let i = 0; i < this.state.options.length; i++) {
                if (this.state.options[i]) {
                  chosen.optionIDs[chosen.optionIDs.length] = {
                    _id: this.props.item.options[i]._id,
                    optionString: this.props.item.options[i].option_choice_name,
                  };
                }
              }
              this.props.onNextPress(chosen);
              this.props.prog();
            },
          },
        ]
      );
    } else if (question === "Is Heart Disease PREVENTABLE?") {
      if (optionName === " False") {
        Alert.alert(
          "Alert",
          "You would think the answer is false since 1 in 3 deaths are from heart disease, BUT the truth is heart disease is the most preventable disease.",
          [
            {
              text: "OK",
              onPress: () => {
                for (let i = 0; i < options.length; i++) {
                  options[i] = false;
                }
                options[index] = true;
                this.setState({ options });
                // if (this.props.item.options[index].subQuestionbool) {
                //   this.props.subQuestion(
                //     this.props.item.options[index].subQuestions
                //   );
                //   this.props.nav.navigate("subQuest");
                // }
                let chosen = {
                  questionID: this.props.item._id,
                  optionIDs: [],
                };
                // for (let i = 0; i < this.state.options.length; i++) {
                //   if (this.state.options[i]) {
                //     chosen.optionIDs[chosen.optionIDs.length] = {
                //       _id: this.props.item.options[i]._id,
                //       optionString:
                //         this.props.item.options[i].option_choice_name,
                //     };
                //   }
                // }
                this.props.onNextPress(chosen);
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Alert",
          "CORRECT!  With 1 in 3 deaths being heart disease related, isn’t it a shame to know that most of these lives could have been saved?",
          [
            {
              text: "Ok",
              onPress: () => {
                for (let i = 0; i < options.length; i++) {
                  options[i] = false;
                }
                options[index] = true;
                this.setState({ options });
                // if (this.props.item.options[index].subQuestionbool) {
                //   this.props.subQuestion(
                //     this.props.item.options[index].subQuestions
                //   );
                //   this.props.nav.navigate("subQuest");
                // }
                let chosen = {
                  questionID: this.props.item._id,
                  optionIDs: [],
                };
                // for (let i = 0; i < this.state.options.length; i++) {
                //   if (this.state.options[i]) {
                //     chosen.optionIDs[chosen.optionIDs.length] = {
                //       _id: this.props.item.options[i]._id,
                //       optionString:
                //         this.props.item.options[i].option_choice_name,
                //     };
                //   }
                // }
                this.props.onNextPress(chosen);
              },
            },
          ]
        );
      }
    } else {
      if (options[index]) {
        options[index] = false;
        // if (optionName === "In a relationship.  I am a smoker.") {
        //   console.log("PassedCheck");
        //   // await this.props.isSmokerOrNot(false);
        // }
      } else {
        for (let i = 0; i < options.length; i++) {
          options[i] = false;
        }
        options[index] = true;
        // if (
        //   question === "Which best describes your relationship with cigarettes?"
        // ) {
        //   if (optionName === "In a relationship.  I am a smoker.") {
        //     // await this.props.isSmokerOrNot(true);
        //   } else {
        //     // await this.props.isSmokerOrNot(false);
        //   }
        // }
      }

      await this.setState({ options });
      if (this.props.item.options[index].subQuestionbool) {
        // if (question === 'Which best describes your relationship with cigarettes?' && optionName.includes('smoker')) {
        //   await AsyncStorage.setItem('isSmoker', 'true');
        // }
        this.props.subQuestion(this.props.item.options[index].subQuestions);
        this.props.nav.navigate("subQuest");
      }

      if (this.state.options.includes(true)) {
        let chosen = {
          questionID: this.props.item._id,
          optionIDs: [],
        };
        for (let i = 0; i < this.state.options.length; i++) {
          if (this.state.options[i]) {
            chosen.optionIDs[chosen.optionIDs.length] = {
              _id: this.props.item.options[i]._id,
              optionString: this.props.item.options[i].option_choice_name,
            };
          }
        }
        this.props.onNextPress(chosen);
        this.props.prog();
      } else {
        alert("please select option");
      }
    }
    // await this.setState({ options });
    //   if (this.props.item.options[index].subQuestionbool) {
    //     this.props.subQuestion(this.props.item.options[index].subQuestions);
    //     this.props.nav.navigate("subQuest");
    //   }

    //   if (this.state.options.includes(true)) {
    //     let chosen = {
    //       questionID: this.props.item._id,
    //       optionIDs: [],
    //     };
    //     for (let i = 0; i < this.state.options.length; i++) {
    //       if (this.state.options[i]) {
    //         chosen.optionIDs[chosen.optionIDs.length] = {
    //           _id: this.props.item.options[i]._id,
    //           optionString: this.props.item.options[i].option_choice_name,
    //         };
    //       }
    //     }
    //     this.props.onNextPress(chosen);
    //     this.props.prog();
    //   } else {
    //     alert("please select option");
    //   }
  };
  onPress = () => {
    let chosen = {
      questionID: this.props.item._id,
      optionIDs: [],
    };
    for (let i = 0; i < this.state.options.length; i++) {
      if (this.state.options[i]) {
        chosen.optionIDs[chosen.optionIDs.length] = {
          _id: this.props.item.options[i]._id,
          optionString: this.props.item.options[i].option_choice_name,
        };
      }
    }
    // console.log(chosen)
    this.props.onNextPress(chosen);
    this.props.prog();
  };

  /* showMessage = () => {
    if (this.props.item &&
      this.props.item.question === 'So where do you score on the love field?') {
      alert('thi is message');
    }
  } */

  render() {
    options = this.state.options;
    const questionName = this.props.item.question;
    return (
      <View
        style={{
          //flex: 1,
          width: SCREEN_WIDTH,
          //justifyContent: 'center',
          //alignItems: 'center',
          //top:"7%"
          padding: 20,
        }}
      >
        <View
          style={
            {
              //width: SCREEN_WIDTH * .9,
              //justifyContent: "flex-start",
            }
          }
        >
          <View style={{ paddingTop: 10 }}>
            <Text style={styles.mainTextStyle}>{this.props.item.question}</Text>
          </View>

          {/*  {
            this.props.item.question === 'So where do you score on the love field?' ? this.showMessage() : null
          } */}

          {this.props.item.questionSubText ? (
            <Text
              style={{
                ...styles.mainTextStyle,
                fontSize: 12,
                color: "grey",
                marginTop: 8,
              }}
            >
              {this.props.item.questionSubText}
            </Text>
          ) : null}
        </View>
        <View style={styles.flatListStyle}>
          {this.props.item.options.length > 0 &&
            !this.props.item.questionSubText &&
            !this.props.item.question.includes("love field") && (
              <View
                style={
                  {
                    /* marginTop:-50 */
                  }
                }
              >
                <Text
                  style={{
                    color: "grey",
                    fontSize: 15,
                    textAlign: "left",
                    paddingBottom: 15,
                    marginTop: 15,
                  }}
                >
                  Select the best option
                </Text>
              </View>
            )}
          <FlatList
            extraData={this.state}
            numColumns={this.props.item.hasImages ? 2 : 1}
            keyExtractor={(item) => {
              return item.option_choice_name;
            }}
            data={this.props.item.options}
            renderItem={({ item, index }) => (
              <Option
                item={item}
                hasImages={this.props.item.hasImages}
                optionPressed={() => {
                  this.onOptionPress(
                    index,
                    item.option_choice_name,
                    questionName
                  );
                }}
                options={options[index]}
                question={this.props.item}
              />
            )}
          />
        </View>
        {this.props.item.options.length === 0 && (
          <View style={styles.buttonViewStyle}>
            <Button
              title="Next   >"
              onPress={this.onPress}
              titleStyle={{
                textAlign: "center",
                paddingTop: 0,
                paddingBottom: 0,
              }}
              buttonStyle={{
                backgroundColor: "#8FA4C4",
                alignSelf: "flex-end",
                alignContent: "center",
                height: SCREEN_HEIGHT * 0.07,
                //width: SCREEN_WIDTH,
                width: "100%",
                // fontWeight: "bold",
                height: 50,
                bottom: 10,
                marginTop: 30,
              }}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flatListStyle: {
    flex: 5,
    width: "100%",
    paddingBottom: 0,
    marginBottom: 0,
  },
  ViewStyle: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    top: "2%",
    width: "90%",
  },
  ButtonTextStyle: {
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 15,
    color: "black",
  },
  mainTextStyle: {
    textAlign: "left",
    fontFamily: "Muli-SemiBold",
    fontSize: 20,
  },
  buttonViewStyle: {
    alignSelf: "center",
    width: "90%",
    //marginTop: 0,
    //position: "relative",
    //bottom: ,
  },
  buttonStyle: {
    backgroundColor: "#0288D1",
    marginTop: 15,
  },
});
export default connect(null, { ans, subQuestion })(MultiQuestion);
