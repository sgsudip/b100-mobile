import React, { Component, PureComponent } from "react";
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
import { connect } from "react-redux";
import { ans, subQuestion } from "../../actions";
import Option from "./OptionButton";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class MultiQuestion extends PureComponent {
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

  onNoButton = (index) => {
    if (this.props.item.question === "Do you exercise on a weekly basis?") {
      Alert.alert(
        "Alert",
        "The good news is you always have tomorrow. So, dig up those sneakers because even light exercise will help you live a longer and healthier life.",
        [
          {
            text: "OK",
            onPress: async () => {
              let option = { optionIDs: [], questionID: "" };
              for (let i = 0; i < this.props.item.options.length; i++)
                if (this.props.item.options[i].option_choice_name === "No") {
                  option.optionIDs = [
                    {
                      _id: this.props.item.options[i]._id,
                      optionString:
                        this.props.item.options[i].option_choice_name,
                    },
                  ];
                  option.questionID = this.props.item._id;
                }
              await this.props.onNextPress(option);
              this.props.prog();
            },
          },
        ]
      );
    } else {
      if (
        this.props.item.subQuestionbool ||
        this.props.item.options[index].subQuestionbool
      ) {
        this.props.subQuestion(this.props.item.options[index].subQuestions);
        this.props.nav.navigate("subQuest");
      }
      if (this.state.options.includes(true)) {
        let option = { optionIDs: [], questionID: "" };
        for (let i = 0; i < this.props.item.options.length; i++)
          if (this.props.item.options[i].option_choice_name === "No") {
            option.optionIDs = [
              {
                _id: this.props.item.options[i]._id,
                optionString: this.props.item.options[i].option_choice_name,
              },
            ];
            option.questionID = this.props.item._id;
          }
        // this.props.ans(this.props.item._id, this.props.userId, "NO");
        this.props.onNextPress(option);
        this.props.prog();
      } else {
        alert("please select option");
      }
    }
  };
  onYesButton = (index) => {
    // console.warn(this.props.item);
    if (
      this.props.item.subQuestionbool ||
      this.props.item.options[index].subQuestionbool
    ) {
      this.props.subQuestion(this.props.item.options[index].subQuestions);
      this.props.nav.navigate("subQuest");
    }
    // this.props.ans(this.props.item._id, this.props.userId, "YES");
    let option = { optionIDs: [], questionID: "" };
    for (let i = 0; i < this.props.item.options.length; i++)
      if (this.props.item.options[i].option_choice_name === "Yes") {
        option.optionIDs = [
          {
            _id: this.props.item.options[i]._id,
            optionString: this.props.item.options[i].option_choice_name,
          },
        ];
        option.questionID = this.props.item._id;
        this.props.onNextPress(option);
      }
  };

  onOptionPress = (index) => {
    options = this.state.options;
    options[index] = !options[index];
    this.setState({ options });
    if (this.props.item.options[index].option_choice_name === "Yes") {
      this.onYesButton(index);
    } else {
      this.onNoButton(index);
    }
  };

  render() {
    options = this.state.options;
    return (
      <View
        style={{
          // height: SCREEN_HEIGHT * .892,
          //top: "7%",
          width: SCREEN_WIDTH,
          //justifyContent: 'center',
          //alignItems: 'center',
          padding: 20,
        }}
      >
        <View style={{}}>
          <View style={{ paddingTop: 10 }}>
            <Text style={(styles.mainTextStyle, { textAlign: "left" })}>
              {this.props.item.question}
            </Text>
          </View>

          {this.props.item.questionSubText ? (
            <Text
              style={{ ...styles.mainTextStyle, fontSize: 12, color: "grey" }}
            >
              {this.props.item.questionSubText}
            </Text>
          ) : null}
        </View>
        <View style={styles.flatListStyle}>
          {/* <View style={{ paddingTop: 0, marginTop: 0 }}>
            <Text
              style={{
                color: "grey",
                fontSize: 15,
                textAlign: "left",
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              Select the best option
            </Text>
          </View> */}
          <FlatList
            extraData={this.state}
            numColumns={this.props.item.hasImages ? 2 : 1}
            keyExtractor={(item) => {
              return item.option_choice_name;
            }}
            data={this.props.item.options}
            // style={{ paddingHorizontal: 5 }}
            renderItem={({ item, index }) => (
              <Option
                item={item}
                hasImages={this.props.item.hasImages}
                optionPressed={() => {
                  this.onOptionPress(index);
                }}
                options={options[index]}
              />
            )}
          />
        </View>
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
    paddingTop: 10,
    //alignItems:'flex-start'
  },
  buttonStyle: {
    backgroundColor: "#0288D1",
    marginTop: 15,
  },
});
export default connect(null, { subQuestion, ans })(MultiQuestion);
