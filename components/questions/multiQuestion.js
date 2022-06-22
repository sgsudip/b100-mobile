import React, { Component, PureComponent } from "react";
import { Alert } from "react-native";
import { View, Text, Dimensions, FlatList, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { ans } from "../../actions";
import Option from "./OptionButton";
import moment from "moment";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class MultiQuestion extends Component {
  // componentDidUpdate(prevProps, prevState) {
  //   // console.warn(prevProps.item.question);
  //   console.warn(prevProps.item.question !== this.props.item.question);
  //   // if (prevProps.item.question !== this.props.item.question) {
  //   //   alert("matched");
  //   // }
  // }

  state = {
    options: [],
    pressed: 0,
    count: true,
    drugcount: 0,
  };

  UNSAFE_componentWillMount = () => {
    let options = [];
    length = this.props.item.options.length;
    for (i = 0; i < length; i++) {
      options[i] = false;
    }
    this.setState({ options });
  };

  showAlert = () => {
    // this.setState({ countdrug: false });
    if (
      this.props.item &&
      this.props.item.question ===
        "Have you used any of the following drugs over the last year?" &&
      this.state.drugcount === 0
      // &&this.props.item.questionOrder === this.props.index
    ) {
      Alert.alert(
        "Disclammar!",
        "I realize answering this question may make you feel uncomfortable, however, it is important to answer truthfully as most drugs can have adverse cardiovascular effects, ranging from abnormal heart rate to heart attacks. Your response will be kept in complete confidence per HIPAA guidelines. - Dr. B, The Heart Doc",
        [
          {
            text: "OK",
            onPress: () => {
              this.setState({ drugcount: 1 });
            },
          },
        ]
      );
    }
  };

  onOptionPress = (index, item) => {
    if (
      this.props.item &&
      this.props.item.question ===
        "Have you used any of the following drugs over the last year?"
    ) {
      this.showAlert();
    }

    if (item.option_choice_name === "Atkins") {
      Alert.alert(
        "Alert",
        " I was hoping you did not pick Atkins. More to come on your report recommendation...-Dr. B, The Heart Doc",
        [
          {
            text: "OK",
            onPress: () => {
              options = this.state.options;

              options[index] = !options[index];

              this.setState({ options });
            },
          },
        ]
      );
    } else {
      options = this.state.options;

      options[index] = !options[index];

      this.setState({ options });
    }

    // options = this.state.options
    //   options[index] = !options[index]
    //   this.setState({ options })
  };
  onPress = () => {
    if (!this.state.options.includes(true)) {
      alert("please select the applicable choices");
    } else if (
      this.props.item.question.includes("pick five words" /* , 'personality' */)
    ) {
      let count = 0;
      for (let i = 0; i < this.state.options.length; i++) {
        if (this.state.options[i] === true) {
          count += 1;
        }
      }
      if (count < 5) {
        alert("Please pick 5 words");
      } else if (count === 5) {
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
        // console.log(chosen);
        this.props.onNextPress(chosen);
        this.props.prog();
      } else {
        alert("Please select  5 options only");
      }
    }
    //  else if (
    //   this.props.item.question.includes(
    //     "which 3 statements" /* , 'personality' */
    //   )
    // ) {
    //   let count = 0;
    //   for (let i = 0; i < this.state.options.length; i++) {
    //     if (this.state.options[i] === true) {
    //       count += 1;
    //     }
    //   }
    //   if (count < 3) {
    //     alert("Please select  3 options");
    //   } else if (count === 3) {
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
    //     // console.log(chosen);
    //     this.props.onNextPress(chosen);
    //     this.props.prog();
    //   } else {
    //     alert("Please pick 3 options only");
    //   }
    // }
    else {
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
      // console.log(chosen);
      this.props.onNextPress(chosen);
      this.props.prog();
    }
  };

  onSkipPress = () => {
    let chosen = {
      questionID: this.props.item._id,
      optionIDs: [],
    };
    /* for (let i = 0; i < this.state.options.length; i++) {
      if (this.state.options[i]) {
        chosen.optionIDs[chosen.optionIDs.length] = {
          _id: this.props.item.options[i]._id,
          optionString: this.props.item.options[i].option_choice_name,
        };
      }
    } */

    this.props.onNextPress(chosen);
    this.props.prog();
  };

  setOptions = () => {
    if (this.props.gender === "Female") {
      if (
        this.props.item.question ===
        "Regarding your menopause, do any of the following apply?"
      ) {
        let age = moment().diff(this.props.bdate, "years");
        let options = [];
        if (age <= 50) {
          if (age <= 47) {
            options = this.props.item.options.filter(
              (item) =>
                item.option_choice_name !==
                "I started taking oral estrogen before the age of 47"
            );
            options = options.filter(
              (item) =>
                item.option_choice_name !==
                "My menopause started when I was 50 or younger"
            );
            this.setState({ femaleOptions: options });
          } else {
            options = this.props.item.options.filter(
              (item) =>
                item.option_choice_name !==
                "My menopause started when I was 50 or younger"
            );
            this.setState({ femaleOptions: options });
          }
        }
      }
    }
    this.setState({ count: false });
  };
  render() {
    options = this.state.options;
    return (
      <View
        style={{
          //flex: 1,
          //top: "7%",
          width: SCREEN_WIDTH,
          //justifyContent: 'center',
          //alignItems: 'center',
          //textAlign:'left',
          padding: 20,
        }}
      >
        <View style={{}}>
          <View style={{ paddingTop: 10 }}>
            <Text style={styles.mainTextStyle}>{this.props.item.question}</Text>
            {/* {this.props.item.question === "Have you used any of the following drugs over the last year?" && (this.state.countdrug || this.state.drugcount === 1)
              ? this.showAlert() : null
            } */}
            {this.props.item.question ===
              "Regarding your menopause, do any of the following apply?" &&
            this.state.count
              ? this.setOptions()
              : null}
          </View>

          {this.props.item.questionSubText ? (
            // <Text
            //   style={{ ...styles.mainTextStyle, fontSize: 12, color: "grey" }}
            // >
            //   {this.props.item.questionSubText}
            // </Text>
            <View style={{ paddingTop: 0, marginTop: 0 }}>
              <Text
                style={{
                  color: "grey",
                  fontSize: 15,
                  textAlign: "left",
                  paddingTop: 5,
                  marginTop: 8,
                  paddingBottom: 5,
                }}
              >
                {this.props.item.questionSubText}
              </Text>
            </View>
          ) : null}
        </View>

        <View style={styles.flatListStyle}>
          {!this.props.item.questionSubText && (
            <View style={{ paddingTop: 0, marginTop: 0 }}>
              <Text
                style={{
                  color: "grey",
                  fontSize: 15,
                  textAlign: "left",
                  marginTop: 8,
                  // paddingBottom: 5,
                }}
              >
                Select all that apply
              </Text>
            </View>
          )}
          <FlatList
            // extraData={this.state}
            numColumns={this.props.item.hasImages ? 2 : 1}
            keyExtractor={(item) => {
              return item._id;
            }}
            // data={this.props.item.options}
            data={
              this.state.femaleOptions
                ? this.state.femaleOptions
                : this.props.item.options
            }
            renderItem={({ item, index }) => (
              <Option
                item={item}
                hasImages={this.props.item.hasImages}
                optionPressed={() => {
                  this.onOptionPress(index, item);
                }}
                options={options[index]}
                question={this.props.item}
              />
            )}
          />
        </View>
        <View
          style={[
            styles.buttonViewStyle,
            SCREEN_HEIGHT < 700
              ? { bottom: 0, marginTop: 0 }
              : { bottom: 0, marginTop: "2%" },
          ]}
        >
          <Button
            title="Next   >"
            onPress={this.onPress}
            titleStyle={{
              textAlign: "center",
              paddingTop: 0,
              paddingBottom: 0,
            }}
            buttonStyle={[
              {
                backgroundColor: "#8FA4C4",
                alignSelf: "center",
                alignContent: "center",
                //height: SCREEN_HEIGHT * 0.07,
                //width: SCREEN_WIDTH,
                width: SCREEN_WIDTH * 0.85,
                // fontWeight: "bold",
                height: 50,
                bottom: 20,
              },
              SCREEN_HEIGHT < 700
                ? { marginTop: 20, bottom: 0 }
                : { marginTop: 30, bottom: 10 },
            ]}
          />

          {this.props.item.question.includes("Aisle") ||
          this.props.item.question.includes("Department") ? (
            <Button
              title="Nothing from this Aisle"
              onPress={this.onSkipPress}
              titleStyle={{
                textAlign: "center",
                paddingTop: 0,
                paddingBottom: 0,
                // color: "black",
                color: "silver",
              }}
              buttonStyle={[
                {
                  // backgroundColor: "#8FA4C4",
                  backgroundColor: "transparent",
                  alignSelf: "center",
                  alignContent: "center",
                  //height: SCREEN_HEIGHT * 0.07,
                  //width: SCREEN_WIDTH,
                  width: SCREEN_WIDTH * 0.85,
                  // fontWeight: "bold",
                  height: 50,
                  bottom: 20,
                },
                SCREEN_HEIGHT < 700
                  ? { marginTop: 5, bottom: 0 }
                  : { marginTop: 10, bottom: 10 },
              ]}
            />
          ) : null}
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
  },
  buttonViewStyle: {
    alignSelf: "center",
    width: "90%",
    //marginTop: "8%",
    //position: "relative",
    //bottom: -25,
  },
  buttonStyle: {
    backgroundColor: "#0288D1",
    marginTop: 15,
  },
});

const mapStateToProps = (state) => {
  return {
    bdate: state.auth.dob,
    gender: state.auth.sex,
  };
};

export default connect(mapStateToProps, { ans })(MultiQuestion);
