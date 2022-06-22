// using component buttongroup
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Linking,
} from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { connect } from "react-redux";
import { Input, Header, Button } from "react-native-elements";
import { phaseTwoResults } from "../actions/index";

const YEAR_IN_MILLI = 31556952000;

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class BloodPressure extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  ////////////////////////////////////////////////////////////////////////////
  //desplayed after the user creates there profile and is needed for the user
  //to proceed to the questionair section, can be skipped but will not let the user
  //into the next section tell this section is done.
  constructor(props) {
    super(props);
    this.state = {
      readingOne: {
        systolic: "",
        Diastolic: "",
      },
      readingTwo: {
        systolic: "",
        Diastolic: "",
      },
      readingThree: {
        systolic: "",
        Diastolic: "",
      },
      readingFour: {
        systolic: "",
        Diastolic: "",
      },
    };
  }

  componentDidMount() {
    const {
      systolic1,
      systolic2,
      systolic3,
      systolic4,
      diastolic1,
      diastolic2,
      diastolic3,
      diastolic4,
      bloodPressureReadingTime4,
      bloodPressureReadingTime1,
      bloodPressureReadingTime2,
      bloodPressureReadingTime3,
    } = this.props.phase2ans;
    if (systolic1 && diastolic1 && bloodPressureReadingTime1) {
      this.setState({
        readingOne: { systolic: systolic1, Diastolic: diastolic1 },
      });
      if (systolic2 && diastolic2 && bloodPressureReadingTime2) {
        this.setState({
          readingTwo: { systolic: systolic2, Diastolic: diastolic2 },
        });
      }
      if (systolic3 && diastolic3 && bloodPressureReadingTime3) {
        this.setState({
          readingThree: { systolic: systolic3, Diastolic: diastolic3 },
        });
      }
      if (systolic4 && diastolic4 && bloodPressureReadingTime4) {
        this.setState({
          readingFour: { systolic: systolic4, Diastolic: diastolic4 },
        });
      }
    }
  }

  onBack = () => {
    // this.props.navigation.navigate("BloodPressureInstructions");
    this.props.navigation.navigate("Home");
  };

  onComplete = async () => {
    // this.props.navigation.navigate("NitricOxideInstructions");
    // this.props.navigation.navigate("nitricOxide");
    // this.SubmitButton.bind(this, "1");
    this.props.navigation.navigate("Home");
  };
  SubmitButton = async (reading) => {
    let data = null;
    switch (reading) {
      case "1":
        if (this.state.readingOne.systolic && this.state.readingOne.Diastolic) {
          data = {
            bloodPressureReadingTime1: Date.now(),
            systolic1: this.state.readingOne.systolic,
            diastolic1: this.state.readingOne.Diastolic,
          };
        } /* else {
          alert("Please enter blood pressure reading #1.");
        } */
        break;
      case "2":
        if (this.state.readingTwo.systolic && this.state.readingTwo.Diastolic) {
          data = {
            bloodPressureReadingTime2: Date.now(),
            systolic2: this.state.readingTwo.systolic,
            diastolic2: this.state.readingTwo.Diastolic,
          };
        } /* else {
          alert("Please enter blood pressure reading #2.");
        } */
        break;
      case "3":
        if (
          this.state.readingThree.systolic &&
          this.state.readingThree.Diastolic
        ) {
          data = {
            bloodPressureReadingTime3: Date.now(),
            systolic3: this.state.readingThree.systolic,
            diastolic3: this.state.readingThree.Diastolic,
          };
        } /* else {
          alert("Please enter blood pressure reading #3.");
        } */
        break;
      case "4":
        if (
          this.state.readingFour.systolic &&
          this.state.readingFour.Diastolic
        ) {
          data = {
            bloodPressureReadingTime4: Date.now(),
            systolic4: this.state.readingFour.systolic,
            diastolic4: this.state.readingFour.Diastolic,
          };
        } /* else {
          alert("Please enter blood pressure reading #4.");
        } */
        break;
    }
    if (data) {
      this.props.phaseTwoResults(data, this.props.userId);
    }
  };
  render() {
    // console.log("phase2", this.props.phase2ans);
    const {
      systolic1,
      systolic2,
      systolic3,
      systolic4,
      diastolic1,
      diastolic2,
      diastolic3,
      diastolic4,
      bloodPressureReadingTime4,
      bloodPressureReadingTime1,
      bloodPressureReadingTime2,
      bloodPressureReadingTime3,
    } = this.props.phase2ans;
    // console.log(bloodPressureReadingTime4, "time 4");
    return (
      <View style={{ flex: 1 }}>
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
          <Text
            style={{
              fontFamily: "Muli-SemiBold",
              fontSize: 14,
              color: "#f2f2f2",
              marginLeft: "5%",
            }}
            onPress={this.onBack}
          >
            Back
          </Text>
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

        <ScrollView
          style={styles.mainTextView}
          //  keyboardShouldPersistTaps="always"
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "silver",
              width: SCREEN_WIDTH,
            }}
          >
            <Text
              style={{
                fontFamily: "Muli-Bold",
                fontSize: 22,
                marginTop: 5,
                marginBottom: 5,
                // fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              BLOOD PRESSURE
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop: "5%",
            }}
          >
            <Text
              style={{
                textAlign: "justify",
                // width: "100%",
              }}
            >
              Step-by-step detailed instructions,{" "}
              <Text
                style={{ textDecorationLine: "underline", paddingBottom: 5 }}
                onPress={() =>
                  Linking.openURL(
                    "https://b100method.com/pages/heart-health-home-test-instruction-blood-pressure"
                  )
                }
              >
                click here
              </Text>
              .
            </Text>
          </View>
          {/* <Text
            style={{
              textAlign: "justify",
              marginTop: 10,
              marginBottom: 20,
              paddingHorizontal: 20,
            }}
          > */}
          {/* Select a time you are most relaxed to start. Prior to starting, make
            sure your bladder is completely empty and avoid caffeine, alcohol,
            tobacco, and exercise for at least 30 minutes. */}
          {/* Select a time you are most relaxed to start. Prior to starting, make
            sure your bladder is completely empty and avoid caffeine, alcohol,
            tobacco, and exercise for at least 30 minutes.
          </Text> */}
          {/* <Text
            style={{
              textAlign: "left",
              // marginStart: 10,
              width: "100%",
              fontSize: 15,
              marginBottom: 7,
              // fontWeight: "bold",
              color: "#8fa4c4",
              // textTransform: "capitalize",
              paddingHorizontal: 20,
            }}
          > */}
          {/* 1. Sit in a chair at a table with your back straight.{"\n"}2. Have
            both feet flat on the floor.{"\n"}3. Sit COMPLETELY still for 5
            minutes.{"\n"}4. Position blood pressure monitor on your left wrist
            with LCD screen facing you.{"\n"}5. Secure the cuff with the Velcro
            strap.{"\n"}6. Keep 1cm (or finger) between the edge of the cuff and
            your hand.{"\n"}7. Relax your forearm flat on the table with the LCD
            screen facing up.{"\n"}8. Press the ON/OFF button to start reading. */}
          {/* 1. Sit in a chair at a table with your back straight.{"\n"}2. Have
            both feet flat on the floor.{"\n"}3. Sit COMPLETELY still for 5
            minutes.{"\n"}4. Position blood pressure monitor on your left wrist
            with the LCD screen facing you.{"\n"}5. Secure the cuff with the
            Velcro strap.{"\n"}6. Keep 1cm (or finger) between the edge of the
            cuff and your hand.{"\n"}7. Relax your forearm flat on the table
            with the LCD screen facing up.{"\n"}8. Press the ON/OFF button to
            start reading.
          </Text> */}
          <View style={styles.emailViewStyle}>
            <Text
              style={{
                textAlign: "left",
                //marginStart: 10,
                // width: "80%",
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Reading #1
              {bloodPressureReadingTime1 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "#545452",
                  }}
                >
                  {" "}
                  {bloodPressureReadingTime1
                    .split("T")[0]
                    .replace(/-/g, "/")}{" "}
                  {bloodPressureReadingTime1.split("T")[1].substring(0, 5)}
                </Text>
              )}
            </Text>
            <View style={styles.emailViewStyleInput}>
              <Input
                value={this.state.readingOne.systolic}
                keyboardType={"numeric"}
                maxLength={3}
                inputStyle={{
                  textAlign: "center",
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingHorizontal: 5,
                }}
                // placeholder={systolic1 === "" ? "Systolic" : systolic1}
                disabled={bloodPressureReadingTime1}
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                }}
                containerStyle={{
                  width: "35%",
                  paddingHorizontal: 0,
                  // paddingRight:10
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
                  let readingOne = this.state.readingOne;
                  readingOne.systolic = text;
                  this.setState({ readingOne });
                }}
                onBlur={this.SubmitButton.bind(this, "1")}
              />
              <Text style={{ fontSize: 35, marginHorizontal: 10 }}>/</Text>
              <Input
                value={this.state.readingOne.Diastolic}
                keyboardType={"numeric"}
                maxLength={3}
                inputStyle={{
                  textAlign: "center",
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingHorizontal: 5,
                }}
                // placeholder={diastolic1 === "" ? "Diastolic" : diastolic1}
                disabled={bloodPressureReadingTime1}
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                  // marginTop: 5,
                }}
                containerStyle={{
                  width: "35%",
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
                  let readingOne = this.state.readingOne;
                  readingOne.Diastolic = text;
                  this.setState({ readingOne });
                }}
                onBlur={this.SubmitButton.bind(this, "1")}
              />
            </View>
            {/* <Button
              onPress={this.SubmitButton.bind(this, "1")}
              disabled={bloodPressureReadingTime1}
              buttonStyle={styles.SubmitButton}
              style={{ marginBottom: 10, marginTop: 10 }}
              title={"Submit"}
              titleStyle={{
                paddingBottom: 0,
                paddingTop: 0,
                fontWeight: "bold",
              }}
            />  */}
          </View>
          {bloodPressureReadingTime1 && (
            <Text
              style={{
                fontSize: 12,
                textAlign: "justify",
                paddingHorizontal: 20,
                marginTop: 7,
              }}
            >
              If you are able, consider sending B100 multiple blood pressure
              readings, as blood pressure can vary. The B100 app has space for
              up to 4 readings, which ideally should be taken 48 hours apart.
              You may upload readings as you get them, and following your
              initial test submission and blood return.
            </Text>
          )}
          <View style={styles.emailViewStyle}>
            <Text
              style={{
                textAlign: "left",
                //marginStart: 10,
                // width: "80%",
                fontSize: 16,
                marginBottom: 10,
                // fontWeight: "bold",
              }}
            >
              Reading #2
              {bloodPressureReadingTime2 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "#545452",
                  }}
                >
                  {" "}
                  {bloodPressureReadingTime2
                    .split("T")[0]
                    .replace(/-/g, "/")}{" "}
                  {bloodPressureReadingTime2.split("T")[1].substring(0, 5)}
                </Text>
              )}
            </Text>
            <View style={styles.emailViewStyleInput}>
              <Input
                value={this.state.readingTwo.systolic}
                keyboardType={"numeric"}
                maxLength={3}
                disabled={
                  !bloodPressureReadingTime1 || bloodPressureReadingTime2
                }
                inputStyle={{
                  textAlign: "center",
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingHorizontal: 5,
                }}
                // placeholder={systolic2 === "" ? "Systolic" : systolic2}
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                }}
                containerStyle={{
                  width: "35%",
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
                  let readingTwo = this.state.readingTwo;
                  readingTwo.systolic = text;
                  this.setState({ readingTwo });
                }}
                onBlur={() => this.SubmitButton("2")}
              />
              <Text style={{ fontSize: 35, marginHorizontal: 10 }}>/</Text>
              <Input
                disabled={
                  !bloodPressureReadingTime1 || bloodPressureReadingTime2
                }
                maxLength={3}
                // value="124"
                value={this.state.readingTwo.Diastolic}
                keyboardType={"numeric"}
                inputStyle={{
                  textAlign: "center",
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingHorizontal: 5,
                }}
                // placeholder={diastolic2 === "" ? "Diastolic" : diastolic2}
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                  // marginTop: 5,
                }}
                containerStyle={{
                  width: "35%",
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
                  let readingTwo = this.state.readingTwo;
                  readingTwo.Diastolic = text;
                  this.setState({ readingTwo });
                }}
                onBlur={() => this.SubmitButton("2")}
              />
            </View>
            {/* <Button
              disabled={!bloodPressureReadingTime1 || bloodPressureReadingTime2}
              onPress={() => this.SubmitButton("2")}
              buttonStyle={styles.SubmitButton}
              title="Submit"
              style={{ marginBottom: 10, marginTop: 10 }}
              titleStyle={{
                paddingBottom: 0,
                paddingTop: 0,
                fontWeight: "bold",
              }}
            /> */}
          </View>
          <View style={styles.emailViewStyle}>
            <Text
              style={{
                textAlign: "left",
                //marginStart: 10,
                // width: "80%",
                fontSize: 16,
                marginBottom: 10,
                // fontWeight: "bold",
              }}
            >
              Reading #3
              {bloodPressureReadingTime3 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "#545452",
                  }}
                >
                  {" "}
                  {bloodPressureReadingTime3
                    .split("T")[0]
                    .replace(/-/g, "/")}{" "}
                  {bloodPressureReadingTime3.split("T")[1].substring(0, 5)}
                </Text>
              )}
            </Text>
            <View style={styles.emailViewStyleInput}>
              <Input
                value={this.state.readingThree.systolic}
                disabled={
                  !bloodPressureReadingTime1 ||
                  !bloodPressureReadingTime2 ||
                  bloodPressureReadingTime3
                }
                maxLength={3}
                keyboardType={"numeric"}
                inputStyle={{
                  textAlign: "center",
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingHorizontal: 5,
                }}
                containerStyle={{
                  width: "35%",
                  paddingHorizontal: 0,
                }}
                // placeholder={systolic3 === "" ? "Systolic" : systolic3}
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
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
                  let readingThree = this.state.readingThree;
                  readingThree.systolic = text;
                  this.setState({ readingThree });
                }}
                onBlur={this.SubmitButton.bind(this, "3")}
              />
              <Text style={{ fontSize: 35, marginHorizontal: 10 }}>/</Text>
              <Input
                value={this.state.readingThree.Diastolic}
                disabled={
                  !bloodPressureReadingTime1 ||
                  !bloodPressureReadingTime2 ||
                  bloodPressureReadingTime3
                }
                containerStyle={{
                  width: "35%",
                  paddingHorizontal: 0,
                }}
                maxLength={3}
                keyboardType={"numeric"}
                inputStyle={{
                  textAlign: "center",
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingHorizontal: 5,
                }}
                // placeholder={diastolic3 === "" ? "Diastolic" : diastolic3}
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                  // marginTop: 5,
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
                  let readingThree = this.state.readingThree;
                  readingThree.Diastolic = text;
                  this.setState({ readingThree });
                }}
                onBlur={this.SubmitButton.bind(this, "3")}
              />
            </View>
            {/* <Button
              disabled={
                !bloodPressureReadingTime1 ||
                !bloodPressureReadingTime2 ||
                bloodPressureReadingTime3
              }
              onPress={this.SubmitButton.bind(this, "3")}
              buttonStyle={styles.SubmitButton}
              title={"Submit"}
              titleStyle={{
                paddingBottom: 0,
                paddingTop: 0,
                fontWeight: "bold",
              }}
              style={{ marginBottom: 10, marginTop: 10 }}
            /> */}
          </View>
          <View style={styles.emailViewStyle}>
            <Text
              style={{
                textAlign: "left",
                //marginStart: 10,
                // width: "80%",
                fontSize: 16,
                marginBottom: 10,
                // fontWeight: "bold",
              }}
            >
              Reading #4
              {bloodPressureReadingTime4 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "#545452",
                  }}
                >
                  {" "}
                  {bloodPressureReadingTime4
                    .split("T")[0]
                    .replace(/-/g, "/")}{" "}
                  {bloodPressureReadingTime4.split("T")[1].substring(0, 5)}
                </Text>
              )}
            </Text>
            <View style={styles.emailViewStyleInput}>
              <Input
                disabled={
                  !bloodPressureReadingTime1 ||
                  !bloodPressureReadingTime2 ||
                  !bloodPressureReadingTime3 ||
                  bloodPressureReadingTime4
                }
                value={this.state.readingFour.systolic}
                keyboardType={"numeric"}
                inputStyle={{
                  textAlign: "center",
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingHorizontal: 5,
                }}
                // placeholder={systolic4 === "" ? "Systolic" : systolic4}
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                }}
                containerStyle={{
                  width: "35%",
                  // paddingLeft: 0,
                  paddingHorizontal: 0,
                }}
                maxLength={3}
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
                  let readingFour = this.state.readingFour;
                  readingFour.systolic = text;
                  this.setState({ readingFour });
                }}
                onBlur={() => this.SubmitButton("4")}
              />
              <Text style={{ fontSize: 35, marginHorizontal: 10 }}>/</Text>
              <Input
                disabled={
                  !bloodPressureReadingTime1 ||
                  !bloodPressureReadingTime2 ||
                  !bloodPressureReadingTime3 ||
                  bloodPressureReadingTime4
                }
                value={this.state.readingFour.Diastolic}
                keyboardType={"numeric"}
                inputStyle={{
                  textAlign: "center",
                  fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingHorizontal: 5,
                }}
                containerStyle={{
                  width: "35%",
                  paddingHorizontal: 0,
                }}
                // placeholder={diastolic4 === "" ? "Diastolic" : diastolic4}
                inputContainerStyle={{
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "silver",
                  // marginTop: 5,
                }}
                maxLength={3}
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
                  let readingFour = this.state.readingFour;
                  readingFour.Diastolic = text;
                  this.setState({ readingFour });
                }}
                onBlur={this.SubmitButton.bind(this, "4")}
              />
            </View>
            {/* <Button
              disabled={
                !bloodPressureReadingTime1 ||
                !bloodPressureReadingTime2 ||
                !bloodPressureReadingTime3 ||
                bloodPressureReadingTime4
              }
              buttonStyle={{ ...styles.SubmitButton, marginBottom: 10 }}
              title={"Submit"}
              onPress={this.SubmitButton.bind(this, "4")}
              titleStyle={{
                paddingBottom: 0,
                paddingTop: 0,
                fontWeight: "bold",
              }}
              style={{ marginBottom: 10, marginTop: 10 }}
            /> */}
          </View>
        </ScrollView>
        <View style={styles.buttonViewStyle}>
          <Button
            // title="Next >"
            title="Submit"
            onPress={this.onComplete}
            disabled={
              this.props.phase2ans.systolic11 === "" &&
              this.props.phase2ans.diastolic1 === "" /* ||
                /* !bloodPressureReadingTime1 */
              /*!bloodPressureReadingTime2 ||
                !bloodPressureReadingTime3 ||
                !bloodPressureReadingTime4 */
            }
            titleStyle={{
              textAlign: "center",
              paddingTop: 0,
              paddingBottom: 0,
            }}
            buttonStyle={{
              backgroundColor: "#8FA4C4",
              // fontWeight: "bold",
              width: "100%",
              height: 50,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
  emailViewStyleInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  buttonViewStyle: {
    // flex: 1,
    alignSelf: "center",
    width: "90%",
    marginTop: "5%",
    //position: "absolute",
    marginBottom: 50,
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
    // flex: 1,
    // alignSelf: "center",
    // width: "90%",
    marginTop: "3%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  nameViewStyle: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
  },
  SubmitButton: {
    backgroundColor: "#8FA4C4",
    marginTop: 5,
    width: "80%",
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "silver",
  },
});

const mapStateToProps = (state) => {
  return {
    phase2ans: state.phase2ans,
    userId: state.auth.uid,
  };
};

export default connect(mapStateToProps, {
  phaseTwoResults,
})(BloodPressure);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    width: "95%",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    alignSelf: "center", // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    width: "95%",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "silver",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    alignSelf: "center", // to ensure the text is never behind the icon
  },
});
