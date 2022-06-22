import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { connect } from "react-redux";
import { ans, uploadCustomPhaseOneANS, setFillIn } from "../../actions";
import { LinearGradient } from "expo-linear-gradient";
import images from "../../assets/images";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class fillInQuestion extends React.PureComponent {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      numMeds: "",
      cigPerDay: null,
      YearsOSmoke: null,
      weight: null,
      heightFeet: null,
      heightInch: null,
      alcoholPerWeek: null,
      oneSitDrink: null,
    };
  }

  onComplete = async (index) => {
    if (index === 1 && this.state.numMeds) {
      if (this.state.numMeds < 5) {
        alert("Entered number should be greater or equal to 5");
      } else {
        this.props.onNextPress();
      }
    } else if (index === 2 && this.state.cigPerDay) {
      this.props.onNextPress();
    } else if (index === 3 && this.state.YearsOSmoke) {
      this.props.onNextPress();
    } else if (index === 4 && this.state.weight) {
      if (this.state.weight >= 80 && this.state.weight <= 500) {
        this.props.onNextPress();
      } else {
        alert("Weight should be 80-500");
      }
    } else if (index === 5 && this.state.heightFeet && this.state.heightInch) {
      if (this.state.heightFeet <= 8 && this.state.heightInch <= 11) {
        let height = this.state.heightFeet * 12;
        height += Number(this.state.heightInch);
        if (height >= 48 && height <= 96) {
          this.props.setFillIn({ height });
          this.props.onNextPress();
        } else {
          alert("Height should be 4ft-8ft");
        }
      } else {
        if (this.state.heightFeet > 8) {
          alert("Invalid value of feet");
        } else if (this.state.heightInch > 11) {
          alert("invalid value of inches. inches can not be more than 11");
        }
      }
    } else if (index === 6) {
      this.props.onNextPress();
    } else if (index === 7 && this.state.alcoholPerWeek) {
      let chosen = {
        questionID: this.props.item._id,
        optionIDs: [],
      };
      for (let i = 0; i < this.props.item.options.length; i++) {
        const option = this.props.item.options[i];
        if (
          this.state.alcoholPerWeek >= option.minValue &&
          this.state.alcoholPerWeek <= option.maxValue
        ) {
          chosen.optionIDs[0] = {
            _id: option._id,
            optionString: this.state.alcoholPerWeek,
          };
        }
      }
      // debugger;
      // console.log(chosen, 'this is chosen');
      if (this.state.alcoholPerWeek > 1 && this.state.alcoholPerWeek < 8) {
        // console.warn(this.state.alcoholPerWeek);
        this.props.onNextPress(chosen);
      } else if (this.state.alcoholPerWeek > 8) {
        alert("Please enter between 1 and 7");
      } else {
        this.props.onNextPress(chosen);
        // alert('Please enter the value');
      }
    } else if (index === 8 && this.state.oneSitDrink) {
      let chosen = {
        questionID: this.props.item._id,
        optionIDs: [],
      };
      for (let i = 0; i < this.props.item.options.length; i++) {
        const option = this.props.item.options[i];
        if (
          this.state.oneSitDrink >= option.minValue &&
          this.state.oneSitDrink <= option.maxValue
        ) {
          chosen.optionIDs[0] = {
            _id: option._id,
            optionString: this.state.oneSitDrink,
          };
        }
      }
      this.props.onNextPress(chosen);
    } else {
      alert("Input Required ");
    }

    // const Data = {
    //   numYearsSmoked: this.state.YearsOSmoke,
    //   numCigsSmokedPerDay: this.state.cigPerDay,
    //   numMedicationsPerDay: this.state.numMeds,
    // };

    // debugger;
    // this.props.setFillIn(Data);
    // const body = {
    //   numMedicationsPerDay: this.state.numMeds,
    //   numCigsSmokedPerDay: this.state.cigPerDay,
    //   numYearsSmoked: this.state.YearsOSmoke,
    //   weight: this.state.weight,
    //   height: this.state.height
    // }
    // debugger;
    // if (this.state.weight && this.state.height) {
    // this.props.uploadCustomPhaseOneANS(
    //   this.state.numMeds,
    //   this.state.cigPerDay,
    //   this.state.YearsOSmoke,
    //   this.state.weight,
    //   this.state.height,
    //   this.props.uid
    // );
    // debugger;
    // const { data } = await API.put(`api/user/id?_id=${this.props.uid}`, body)
    // }
    // this.props.onNextPress();
    // } else {
    //   alert("please fill out all fields");
    // }
  };
  // onPress = () => {
  //   debugger;
  //   //this.props.ans(this.props.item.Question._id,this.props.userId, this.options);
  //   this.props.prog();
  //   this.props.onNextPress();
  // };
  options = "";
  render() {
    // console.log(this.props.item);
    return (
      // <KeyboardAwareScrollView style={styles.mainTextView}>
      <View
        style={{
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={[
            styles.emailViewStyle,
            { height: "100%", position: "relative" },
          ]}
        >
          <Text
            style={{
              textAlign:
                this.props.item.question.includes(
                  "Pretend you won a free trip to the grocery store,"
                ) ||
                this.props.item.question.includes(
                  "The people in our lives have a great impact on our state of mind."
                )
                  ? "justify"
                  : "left",
              //marginStart: 10,
              width:
                this.props.item.question.includes(
                  "Pretend you won a free trip to the grocery store,"
                ) ||
                this.props.item.question.includes(
                  "The people in our lives have a great impact on our state of mind."
                )
                  ? "100%"
                  : "80%",
              fontSize: 18,
              marginBottom: 5,
              paddingTop: 20,
            }}
          >
            {this.props.item.question}
          </Text>
          <Text
            style={{
              textAlign: "left",
              //marginStart: 10,
              width: "80%",
              fontSize: 14,
              marginBottom: 5,
            }}
          >
            {this.props.item.questionSubText}
          </Text>
          {this.props.item.question === "How many medications do you take?" && (
            <>
              <Input
                value={this.state.numMeds}
                keyboardType={"numeric"}
                inputStyle={{
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingLeft: 10,
                }}
                placeholder="Ex 1"
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                }}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                onChangeText={(text) => {
                  let newText = "";
                  let numbers = "0123456789";

                  for (var i = 0; i < text.length; i++) {
                    // if (numbers.indexOf(text[i]) > -1) {
                    newText = newText + text[i];
                    // } else {
                    // your call back function
                    // alert("Value must be more than 5 or gretter");
                    // return null;
                    // }
                  }
                  this.setState({ numMeds: text });
                  this.props.setFillIn({ numMedicationsPerDay: text });
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: "20%",
                  right: 0,
                  left: 0,
                  // width: SCREEN_WIDTH - 40,
                }}
              >
                <Button
                  title="Next   >"
                  onPress={() => {
                    this.onComplete(1);
                  }}
                  titleStyle={{
                    textAlign: "center",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  buttonStyle={{
                    // backgroundColor: "#8FA4C4",
                    // alignContent: "center",
                    // height: SCREEN_HEIGHT * 0.07,
                    // //width: SCREEN_WIDTH
                    // width: "100%",
                    // height: 50,
                    // botom:20,
                    width: SCREEN_WIDTH * 0.85,
                    alignSelf: "center",
                    backgroundColor: "#8FA4C4",
                    alignContent: "center",
                    height: 50,
                    bottom: 20,
                    top: 20,
                  }}
                />
              </View>
            </>
          )}
          {this.props.item.question ===
            "On average how many cigarettes do you smoke a day?" && (
            <>
              <Input
                value={this.state.cigPerDay}
                keyboardType={"numeric"}
                inputStyle={{
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingLeft: 10,
                }}
                placeholder="Ex 1"
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                }}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                onChangeText={(text) => {
                  let newText = "";
                  let numbers = "0123456789";

                  for (var i = 0; i < text.length; i++) {
                    if (numbers.indexOf(text[i]) > -1) {
                      newText = newText + text[i];
                    } else {
                      // your call back function
                      alert("please enter numbers only");
                      return null;
                    }
                  }
                  this.setState({ cigPerDay: text });
                  this.props.setFillIn({ numCigsSmokedPerDay: text });
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: "20%",
                  right: 0,
                  left: 0,
                  // width: SCREEN_WIDTH - 40,
                }}
              >
                <Button
                  title="Next   >"
                  onPress={() => {
                    this.onComplete(2);
                  }}
                  titleStyle={{
                    textAlign: "center",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  buttonStyle={{
                    // backgroundColor: "#8FA4C4",
                    // alignContent: "center",
                    // height: SCREEN_HEIGHT * 0.07,
                    // //width: SCREEN_WIDTH
                    // width: "100%",
                    // height: 50,
                    width: SCREEN_WIDTH * 0.85,
                    alignSelf: "center",
                    backgroundColor: "#8FA4C4",
                    alignContent: "center",
                    height: 50,
                    bottom: 20,
                    top: 20,
                  }}
                />
              </View>
            </>
          )}
          {this.props.item.question ===
            "How many years have you been smoking?" && (
            <>
              <Input
                value={this.state.YearsOSmoke}
                keyboardType={"numeric"}
                inputStyle={{
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingLeft: 10,
                }}
                placeholder="Ex 1"
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                }}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                onChangeText={(text) => {
                  let newText = "";
                  let numbers = "0123456789";

                  for (var i = 0; i < text.length; i++) {
                    if (numbers.indexOf(text[i]) > -1) {
                      newText = newText + text[i];
                    } else {
                      // your call back function
                      alert("please enter numbers only");
                      return null;
                    }
                  }
                  this.setState({ YearsOSmoke: text });
                  this.props.setFillIn({ numYearsSmoked: text });
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: "20%",
                  right: 0,
                  left: 0,
                  // width: SCREEN_WIDTH - 40,
                }}
              >
                <Button
                  title="Next   >"
                  onPress={() => {
                    this.onComplete(3);
                  }}
                  titleStyle={{
                    textAlign: "center",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  buttonStyle={{
                    // width: SCREEN_WIDTH * 0.85,
                    // alignSelf: "center",
                    // backgroundColor: "#8FA4C4",
                    // alignContent: "center",
                    // height: 50,
                    // bottom: 20,
                    // top:20,
                    width: SCREEN_WIDTH * 0.85,
                    alignSelf: "center",
                    backgroundColor: "#8FA4C4",
                    alignContent: "center",
                    height: 50,
                    bottom: 20,
                    top: 20,
                  }}
                />
              </View>
            </>
          )}
          {this.props.item.question ===
            "I am a doctor; I must ask:  How much do you currently weigh?" && (
            <>
              <Input
                value={this.state.weight}
                keyboardType={"numeric"}
                inputStyle={{
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingLeft: 10,
                  margin: 0,
                }}
                placeholder="lbs"
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                }}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                onChangeText={(text) => {
                  let newText = "";
                  let numbers = "0123456789";

                  for (var i = 0; i < text.length; i++) {
                    if (numbers.indexOf(text[i]) > -1) {
                      newText = newText + text[i];
                    } else {
                      // your call back function
                      alert("please enter numbers only");
                      return null;
                    }
                  }
                  this.setState({ weight: text });
                  this.props.setFillIn({ weight: text });
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: "20%",
                  right: 0,
                  left: 0,
                  // width: SCREEN_WIDTH - 40,
                }}
              >
                <Button
                  title="Next   >"
                  onPress={() => {
                    this.onComplete(4);
                  }}
                  titleStyle={{
                    textAlign: "center",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  buttonStyle={{
                    // backgroundColor: "#8FA4C4",
                    // alignContent: "center",
                    // height: SCREEN_HEIGHT * 0.07,
                    // //width: SCREEN_WIDTH
                    // width: "100%",
                    // height: 50,
                    width: SCREEN_WIDTH * 0.85,
                    alignSelf: "center",
                    backgroundColor: "#8FA4C4",
                    alignContent: "center",
                    height: 50,
                    bottom: 20,
                    top: 20,
                  }}
                />
              </View>
            </>
          )}
          {this.props.item.question === "And, how tall are you?" && (
            <>
              <Input
                value={this.state.heightFeet}
                keyboardType={"numeric"}
                // keyboardType={"numbers-and-punctuation"}
                inputStyle={{
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingLeft: 10,
                }}
                placeholder="Feet"
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                }}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                onChangeText={(text) => {
                  let newText = "";
                  // let numbers = "0123456789";
                  let numbers = "12345678";
                  for (var i = 0; i < text.length; i++) {
                    if (numbers.indexOf(text[i]) > -1) {
                      newText = newText + text[i];
                    } else {
                      // your call back function
                      alert("Height can not be more than 8 feet");
                      return null;
                    }
                  }
                  this.setState({ heightFeet: text });
                  // if (text.length >= 3) {
                  //   let values = text.split("'");
                  //   let height = values[0] * 12;
                  //   height += Number(values[1]);
                  //   this.props.setFillIn({ height });
                  // } else {
                  //   let height = Number(text) * 12;
                  //   this.props.setFillIn({ height });
                  // }
                }}
              />
              <Input
                value={this.state.heightInch}
                keyboardType={"numeric"}
                inputStyle={{
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingLeft: 10,
                }}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                placeholder="Inches"
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                  marginTop: 15,
                }}
                onChangeText={(text) => {
                  let newText = "";
                  let numbers = "0123456789";
                  for (var i = 0; i < text.length; i++) {
                    if (numbers.indexOf(text[i]) > -1) {
                      newText = newText + text[i];
                    } else {
                      // your call back function
                      alert("please enter as per example");
                      return null;
                    }
                  }
                  this.setState({ heightInch: text });
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: "20%",
                  right: 0,
                  left: 0,
                  // width: SCREEN_WIDTH - 40,
                }}
              >
                <Button
                  title="Next   >"
                  onPress={() => {
                    this.onComplete(5);
                  }}
                  titleStyle={{
                    textAlign: "center",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  buttonStyle={{
                    // backgroundColor: "#8FA4C4",
                    // alignContent: "center",
                    // height: SCREEN_HEIGHT * 0.07,
                    // //width: SCREEN_WIDTH
                    // width: "100%",
                    // height: 50,
                    width: SCREEN_WIDTH * 0.85,
                    alignSelf: "center",
                    backgroundColor: "#8FA4C4",
                    alignContent: "center",
                    height: 50,
                    bottom: 20,
                    top: 20,
                  }}
                />
              </View>
            </>
          )}
          {this.props.item.question ===
            "Pretend you won a free trip to the grocery store, place the items in your cart that will be consumed BY YOU over the next week? Remember, you are only shopping for yourself." && (
            <>
              <View
                style={{
                  position: "absolute",
                  bottom: "20%",
                  right: 0,
                  left: 0,
                  // width: SCREEN_WIDTH - 40,
                }}
              >
                <Button
                  title="Next   >"
                  onPress={() => {
                    this.onComplete(6);
                  }}
                  titleStyle={{
                    textAlign: "center",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  buttonStyle={{
                    // backgroundColor: "#8FA4C4",
                    // alignContent: "center",
                    // height: SCREEN_HEIGHT * 0.07,
                    // //width: SCREEN_WIDTH
                    // width: "100%",
                    // height: 50,
                    width: SCREEN_WIDTH * 0.85,
                    alignSelf: "center",
                    backgroundColor: "#8FA4C4",
                    alignContent: "center",
                    height: 50,
                    bottom: 20,
                    top: 20,
                  }}
                />
              </View>
            </>
          )}
          {this.props.item.question ===
            "The people in our lives have a great impact on our state of mind. It is no coincidence there is a connection between emotions and the beating heart within your chest. So, let us look at how your relationships are affecting your cardiovascular health." && (
            <>
              <View
                style={{
                  position: "absolute",
                  bottom: "20%",
                  right: 0,
                  left: 0,
                  // width: SCREEN_WIDTH - 40,
                }}
              >
                <Button
                  title="Next   >"
                  onPress={() => {
                    this.onComplete(6);
                  }}
                  titleStyle={{
                    textAlign: "center",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  buttonStyle={{
                    // backgroundColor: "#8FA4C4",
                    // alignContent: "center",
                    // height: SCREEN_HEIGHT * 0.07,
                    // //width: SCREEN_WIDTH
                    // width: "100%",
                    // height: 50,
                    width: SCREEN_WIDTH * 0.85,
                    alignSelf: "center",
                    backgroundColor: "#8FA4C4",
                    alignContent: "center",
                    height: 50,
                    bottom: 20,
                    top: 20,
                  }}
                />
              </View>
            </>
          )}
          {this.props.item.question ===
            "How many days a week do you consume an alcoholic beverage?" && (
            <>
              <Input
                value={this.state.alcoholPerWeek}
                keyboardType={"numeric"}
                // keyboardType={"numbers-and-punctuation"}
                inputStyle={{
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingLeft: 10,
                }}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                placeholder="Enter here"
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                }}
                onChangeText={(text) => {
                  let newText = "";
                  // let numbers = "0123456789";
                  let numbers = "1234567";
                  for (var i = 0; i < text.length; i++) {
                    if (numbers.indexOf(text[i]) > -1) {
                      newText = newText + text[i];
                    } else {
                      // your call back function
                      alert("Please enter value between 1 and 7");
                      return null;
                    }
                  }
                  this.setState({ alcoholPerWeek: text });
                  // if (text.length >= 3) {
                  //   let values = text.split("'");
                  //   let height = values[0] * 12;
                  //   height += Number(values[1]);
                  //   this.props.setFillIn({ height });
                  // } else {
                  //   let height = Number(text) * 12;
                  //   this.props.setFillIn({ height });
                  // }
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: "20%",
                  right: 0,
                  left: 0,
                  // width: SCREEN_WIDTH - 40,
                }}
              >
                <Button
                  title="Next   >"
                  onPress={() => {
                    this.onComplete(7);
                  }}
                  titleStyle={{
                    textAlign: "center",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  buttonStyle={{
                    // backgroundColor: "#8FA4C4",
                    // alignContent: "center",
                    // height: SCREEN_HEIGHT * 0.07,
                    // //width: SCREEN_WIDTH
                    // width: "100%",
                    // height: 50,
                    width: SCREEN_WIDTH * 0.85,
                    alignSelf: "center",
                    backgroundColor: "#8FA4C4",
                    alignContent: "center",
                    height: 50,
                    bottom: 20,
                    top: 20,
                  }}
                />
              </View>
            </>
          )}
          {this.props.item.question ===
            "On average, how many drinks will you have in one sitting?" && (
            <>
              <Input
                value={this.state.oneSitDrink}
                keyboardType={"numeric"}
                // keyboardType={"numbers-and-punctuation"}
                inputStyle={{
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingLeft: 10,
                }}
                containerStyle={{
                  paddingHorizontal: 0,
                }}
                placeholder="Enter here"
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                }}
                onChangeText={(text) => {
                  let newText = "";
                  // let numbers = "0123456789";
                  let numbers = "0123456789";
                  for (var i = 0; i < text.length; i++) {
                    if (numbers.indexOf(text[i]) > -1) {
                      newText = newText + text[i];
                    } else {
                      // your call back function
                      alert("Invalid value");
                      return null;
                    }
                  }
                  this.setState({ oneSitDrink: text });
                  // if (text.length >= 3) {
                  //   let values = text.split("'");
                  //   let height = values[0] * 12;
                  //   height += Number(values[1]);
                  //   this.props.setFillIn({ height });
                  // } else {
                  //   let height = Number(text) * 12;
                  //   this.props.setFillIn({ height });
                  // }
                }}
              />
              <View
                style={{
                  position: "absolute",
                  bottom: "20%",
                  right: 0,
                  left: 0,
                  // width: SCREEN_WIDTH - 40,
                }}
              >
                <Button
                  title="Next   >"
                  onPress={() => {
                    this.onComplete(8);
                  }}
                  titleStyle={{
                    textAlign: "center",
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                  buttonStyle={{
                    // backgroundColor: "#8FA4C4",
                    // alignContent: "center",
                    // height: SCREEN_HEIGHT * 0.07,
                    // //width: SCREEN_WIDTH
                    // width: "100%",
                    // height: 50,
                    width: SCREEN_WIDTH * 0.85,
                    alignSelf: "center",
                    backgroundColor: "#8FA4C4",
                    alignContent: "center",
                    height: 50,
                    bottom: 20,
                    top: 20,
                  }}
                />
              </View>
            </>
          )}
        </View>
      </View>
      // </KeyboardAwareScrollView>

      //   <View
      //   style={{
      //       height:SCREEN_HEIGHT,
      //       width:SCREEN_WIDTH,
      //       justifyContent: 'center',
      //       alignItems: 'center'
      //   }}>
      //    <View
      //     style={{flex:1}}/>
      //     <View style={styles.ViewStyle}>
      //   <Text style={styles.mainTextStyle}>{this.props.item.question}</Text>
      //   </View>
      //   <Input
      //    containerStyle={styles.ViewStyle}
      //   onChangeText= {(txt) => this.options =txt }/>
      //  < View
      //     style={{
      //       alignContent:"center",
      //       justifyContent:"center"}}>

      //       <Button
      //       title= "Continue"
      //       onPress={this.onPress}
      //     ViewComponent={require("expo").linearGradient}
      //     linearGradientProps={{
      //       colors: ["#8FA4C4","#8FA4C4"],
      //       start: [1, 0],
      //       end: [0.2, 0],
      //     }}
      //       buttonStyle={{
      //         borderRadius:7,
      //      }}
      //      titleStyle={{ textAlign: "center", paddingTop:0, paddingBottom:0 }}
      //      />
      //     </View>
      //     <View
      //     style={{flex:1}}/>
      //   </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
  mainTextText: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 20,
  },
  IconViewStyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  mainTextView: {
    flex: 1,
  },
  IconStyle: {},
  emailViewStyle: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
    marginTop: "5%",
  },
  nameViewStyle: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
  },
  buttonViewStyle: {
    alignSelf: "center",
    width: "90%",
    //marginTop: "5%",
    //position: "relative",
    //bottom: 50,
  },
});
mapStateToProps = (state) => ({
  uid: state.auth.uid,
  // userId:state.auth.user._id
});
export default connect(mapStateToProps, {
  ans,
  uploadCustomPhaseOneANS,
  setFillIn,
})(fillInQuestion);
