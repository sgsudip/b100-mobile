// using component buttongroup
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { Input, Header, Button, ButtonGroup } from "react-native-elements";
// import DatePicker from "react-native-datepicker";
import {
  setWorkStatus,
  emailChanged,
  firstNameChange,
  imageUpload,
  lastNameChange,
  updatePhase,
  dateChange,
  sexChange,
  saveProfileToServer,
  zipCodeChange,
  jobTitleChange,
  feetChange,
  inchesChange,
  weightChange,
} from "../actions/index";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const YEAR_IN_MILLI = 31556952000;

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class HealthBackgroundScreen extends React.Component {
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
      image: "",
      continuebool: false,
      cameraRollPermistions: false,
      selectedIndex: null,
      canMove: false,
      buttons: ["Male", "Female"],
      // feet: "",
      // inches: "",
      // weight: "",
      isValidate: false,
      show: false,
    };
  }
  componentDidMount = () => {
    // console.warn("Updated props" + JSON.stringify(this.props.phaseID));
    if (
      this.props.dob !== "" &&
      this.props.email !== "" &&
      this.props.lastName !== "" &&
      this.props.firstName !== ""
    ) {
      this.setState({
        selectedIndex:
          this.props.sex === "Male"
            ? 0
            : this.props.sex === "Female"
            ? 1
            : null,
        canMove: true,
      });
    }
  };

  UNSAFE_componentWillReceiveProps = (props) => {
    // console.log("from health background screen ");

    if (
      props.email !== "" &&
      props.lastName !== "" &&
      props.firstName !== "" &&
      props.zipCode !== "" &&
      isNaN(props.zipCode) === false
      // props.weight !== "" &&
      // props.feet !== "" &&
      // props.inches !== ""
    ) {
      this.setState({ continuebool: true });
    } else {
      this.setState({ continuebool: false });
    }
  };
  onBack = () => {
    this.props.navigation.navigate("Login");
  };
  onSkip = () => {
    this.props.navigation.navigate("Home");
  };
  onComplete = async () => {
    // [weight (lb) / height (in) / height (in)] x 703   bmi formula
    // let height = +this.props.feet * 12;
    // let inches = Number(this.props.inches);
    // height += inches;
    // const BMI = this.props.weight/height/height *703
    const data = await this.props.saveProfileToServer(
      this.state.buttons[this.state.selectedIndex],
      this.props.date,
      this.props.lastName,
      this.props.firstName,
      this.props.email,
      this.props.uid,
      this.props.image_url,
      this.props.zipCode
      // height,
      // this.props.weight
    );
    // console.log("Data" + JSON.stringify(data));
    if (!data.success) {
      setTimeout(
        () => alert("Email is already register with another user "),
        700
      );
    } else {
      this.props.updatePhase(0, this.props.phaseID);
      this.props.navigation.navigate("Home");
    }
  };
  updateIndex = (selectedIndex) => {
    this.setState({ selectedIndex });
  };

  validateBDay = async (date) => {
    let FormattedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();
    FormattedDate = FormattedDate.split("T")[0];
    let today = Date.now();
    FormattedDate = FormattedDate.replace(/\-/g, "/");
    let bday = new Date(FormattedDate);
    let dif = today - bday;
    let difInYears = dif / YEAR_IN_MILLI;
    if (difInYears >= 18 && difInYears < 100) {
      // console.log("ELIGABLE");
      this.setState({ canMove: true, show: false });
      this.props.dateChange(moment(FormattedDate).format("MM/DD/YYYY"));
    } else {
      // console.log("NOT ELIGABLE");
      setTimeout(() => alert("B100 is only for those between 18 and 100"), 700);
    }
  };
  component1 = () => {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Image
          style={{ height: SCREEN_HEIGHT * 0.16 }}
          resizeMode="cover"
          source={
            this.state.selectedIndex === 0
              ? require("../assets/images/selection/FullColor/1x/Malefull.png")
              : require("../assets/images/selection/Deselected/1x/Male.png")
          }
        />
        <Text
          style={
            this.state.selectedIndex === 0
              ? { fontSize: 14, color: "black" }
              : { fontSize: 14, color: "silver" }
          }
        >
          Male
        </Text>
      </View>
    );
  };

  component2 = () => {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Image
          style={{ height: SCREEN_HEIGHT * 0.16 }}
          resizeMode="cover"
          source={
            this.state.selectedIndex === 1
              ? require("../assets/images/selection/FullColor/1x/Femalefull.png")
              : require("../assets/images/selection/Deselected/1x/Female.png")
          }
        />
        <Text
          style={
            this.state.selectedIndex === 1
              ? { fontSize: 14, color: "black" }
              : { fontSize: 14, color: "silver" }
          }
        >
          Female
        </Text>
      </View>
    );
  };

  render() {
    const buttons = [
      { element: this.component1 },
      { element: this.component2 },
    ];
    const { selectedIndex } = this.state;

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
            // paddingVertical:30,
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
          {/* <Text
            style={{
               fontFamily: "Muli-SemiBold",
              fontSize: 14,
              color: "#f2f2f2",
              marginRight: "5%",
            }}
            onPress={this.onSkip}
          >
            Skip
          </Text> */}
        </Header>

        <ScrollView style={styles.mainTextView}>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: "silver",
              width: SCREEN_WIDTH,
            }}
          >
            <Text
              style={{
                fontFamily: "Muli-SemiBold",
                fontSize: 22,
                marginBottom: 10,
                marginTop: 15,
                // fontWeight: "bold",
              }}
            >
              Let's Get Started!
            </Text>
            <Text
              style={{
                fontFamily: "Muli-SemiBold",
                fontSize: 18,
                marginTop: "3%",
                marginBottom: "5%",
                paddingHorizontal: 20,
              }}
            >
              First, we'll need a little background information.
            </Text>
          </View>
          {/* <View style={styles.emailViewStyle}>
            {/* <View style={{ marginVertical: 5, marginLeft: 0 }}>
              <Text style={{ textAlign: "left", marginLeft: 0, fontSize: 16 }}>
                How much do you currently weigh? (in pounds)
              </Text>
            </View> *}
            <Input
              label="How much do you currently weigh? (in pounds)"
              value={this.props.weight}
              labelStyle={{
                textAlign: "left",
                color: "black",
                fontSize: 16,
                marginBottom: 7,
              }}
              keyboardType={"numeric"}
              placeholder="Ex 1"
              inputStyle={{
                 fontFamily: "Muli-SemiBold",
                fontSize: 16,
                fontWeight: 300,
                paddingLeft: 10,
                // minHeight: 35,
                // color:"lightgray",
              }}
              inputContainerStyle={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "silver",
              }}
              containerStyle={{ marginBottom: 0 }}
              onChangeText={(text) => {
                let newText = "";
                let numbers = "0123456789";
                for (var i = 0; i < text.length; i++) {
                  if (numbers.indexOf(text[i]) > -1) {
                  } else {
                    // your call back function
                    alert("please enter numbers only");
                    return null;
                  }
                }
                this.props.weightChange(text);
                // this.setState({weight:text})
              }}
            />
          </View> */}
          {/* <View style={styles.emailViewStyle}>
            <View style={{ marginVertical: 5, marginLeft: 5 }}>
              <Text style={{ textAlign: "left", marginLeft: 5 }}>
                And, how tall are you?
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "90%",
              }}
            >
              <Input
                value={this.props.feet}
                maxLength={1}
                keyboardType={"numeric"}
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
                containerStyle={{ width: "50%" }}
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
                  this.props.feetChange(text);
                  this.setState({ feet: text });
                }}
              />
              <Input
                value={this.props.inches}
                keyboardType={"numeric"}
                maxLength={2}
                inputStyle={{
                   fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  paddingLeft: 10,
                }}
                placeholder="Inches"
                containerStyle={{ width: "50%" }}
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
                  this.props.inchesChange(text);

                  this.setState({ inches: text });
                }}
              />
            </View>
          </View> */}
          <View style={styles.emailViewStyle}>
            {/* <Text
              style={{
                textAlign: "left",
                width: "80%",
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              What is your zip code?
            </Text> */}
            <Input
              label="What is your zip code?"
              labelStyle={{
                textAlign: "left",
                color: "black",
                fontSize: 16,
                marginBottom: 7,
                fontWeight: "normal",
                fontFamily: "Muli-SemiBold",
              }}
              inputStyle={{
                fontFamily: "Muli-SemiBold",
                fontSize: 16,
                // fontWeight: 300,
                paddingLeft: 10,
                // minHeight: 35,
                // color:"lightgray",
              }}
              placeholder="Enter Zip Code"
              keyboardType="number-pad"
              maxLength={5}
              value={this.props.zipCode.toString()}
              inputContainerStyle={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "silver",
              }}
              containerStyle={{ marginBottom: 0, width: "100%" }}
              onChangeText={(text) => this.props.zipCodeChange(text)}
            />
          </View>
          {/* <View style={{ margin: 5 }} /> */}
          <View style={styles.emailViewStyle}>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                fontSize: 16,
                marginBottom: 7,
                marginHorizontal: 15,
                fontFamily: "Muli-SemiBold",
                fontWeight: "normal",
              }}
            >
              When were you born?
            </Text>
            <Button
              title={
                this.props.date
                  ? moment(this.props.date).format("MM-DD-YYYY")
                  : moment(new Date()).format("MM-DD-YYYY")
              }
              style={{ paddingHorizontal: 10 }}
              buttonStyle={{
                backgroundColor: "transparent",
                borderColor: "silver",
                borderWidth: 1,
                justifyContent: "flex-start",
              }}
              titleStyle={{
                color: "black",
                textAlign: "left",
                fontSize: 15,
              }}
              containerStyle={{
                padding: 0,
                ...Platform.select({
                  android: {
                    width: "95%",
                    marginLeft: 10,
                  },
                }),
                // width: "100%",
                // display:"flex",

                // justifyContent:"center"
              }}
              onPress={() => this.setState({ show: true })}
            />
            {this.state.show && (
              <DateTimePickerModal
                isVisible={this.state.show}
                mode="date"
                date={this.props.date ? new Date(this.props.date) : new Date()}
                onConfirm={this.validateBDay}
                onCancel={() => this.setState({ show: false })}
              />
            )}
            {/* <DatePicker
              style={{ alignSelf: "center" }}
              showIcon={false}
              date={this.props.date}
              format="MM-DD-YYYY"
              placeholder="Enter Birthdate"
              confirmBtnText="Confirm"
              onCloseModal={async () => { }}
              cancelBtnText="Cancel"
              onDateChange={this.validateBDay}
              androidMode='spinner'
              customStyles={{
                dateTouchBody: {
                  width: SCREEN_WIDTH * 0.85,
                  alignSelf: "center",
                },
                dateInput: {
                  borderRadius: 5,
                  borderColor: "silver",
                },
                placeholderText: {
                   fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  alignSelf: "flex-start",
                  paddingLeft: 10,
                },
                dateText: {
                   fontFamily: "Muli-SemiBold",
                  fontSize: 16,
                  alignSelf: "flex-start",
                  paddingLeft: 10,
                },
              }}
            /> */}
          </View>
          <View style={styles.emailViewStyle}>
            <Text
              style={{
                textAlign: "left",
                width: "100%",
                fontSize: 16,
                fontFamily: "Muli-SemiBold",
                fontWeight: "normal",
                marginBottom: 7,
                marginHorizontal: 15,
              }}
            >
              What is your natural gender?
            </Text>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
              containerStyle={{ height: SCREEN_HEIGHT * 0.2, borderWidth: 0 }}
              innerBorderStyle={{ width: 0, color: "transparent" }}
              selectedButtonStyle={{ backgroundColor: "transparent" }}
              titleStyle={{
                textAlign: "center",
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
            {/* <View
              style={{
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Button
                title="Next"
                rounded
                // ViewComponent={require("expo").linearGradient}
                ViewComponent={require("expo-linear-gradient").LinearGradient}
                linearGradientProps={{
                  colors:
                    this.state.canMove && this.state.continuebool
                      ? ["#058086", "#0aaab1"]
                      : ["grey", "grey"],
                  start: [1, 0],
                  end: [0.2, 0],
                }}
                buttonStyle={{
                  width: "100%",
                  height: SCREEN_HEIGHT * 0.07,
                  alignSelf: "center",
                  backgroundColor: "#8FA4C4",
                  alignContent: "center",
                  fontWeight: "bold",
                  height: 50,
                  bottom: 10,
                  marginTop: 30,
                }}
                containerStyle={{ padding: 15 }}
                onPress={
                  this.state.canMove && this.state.continuebool
                    ? this.onComplete
                    : () => { }
                }
                titleStyle={{ textAlign: "center", paddingTop: 0, paddingBottom: 0 }}
              /> */}
          </View>
          <View
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              // top: 100,
              alignSelf: "center",
              width: "90%",
              marginTop: "5%",
              // marginBottom: 50,
            }}
          >
            <Button
              title="Next"
              rounded
              containerStyle={{
                padding: 15,
              }}
              // ViewComponent={require("expo").linearGradient}
              ViewComponent={require("expo-linear-gradient").LinearGradient}
              linearGradientProps={{
                colors:
                  this.state.canMove && this.state.continuebool
                    ? ["#058086", "#0aaab1"]
                    : ["grey", "grey"],
                start: [1, 0],
                end: [0.2, 0],
              }}
              buttonStyle={{
                width: SCREEN_WIDTH * 0.85,
                alignSelf: "center",
                backgroundColor: "#8FA4C4",
                alignContent: "center",
                height: 50,
                marginTop: "5%",
                // bottom: 20,
                // marginTop: 30,
                // marginTop: 15,
                // width: SCREEN_WIDTH * 0.85,
                // // width:"100%",
                // // height: SCREEN_HEIGHT * 0.08,
                // alignSelf: "center",
                // position: "absolute",
                // top: 0,
                // bottom: 0,
                // // fontWeight: "bold",
                // height: 50,
                // width: "100%",
                // height: SCREEN_HEIGHT * 0.07,
                // fontWeight: "bold",
              }}
              // containerStyle={{ padding: 15 }}
              onPress={
                this.state.canMove && this.state.continuebool
                  ? this.onComplete
                  : () => {}
              }
              titleStyle={{
                textAlign: "center",
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
          </View>
        </ScrollView>
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
    // flex: 1,
    // flexGrow:1,
    // flexShrink:1,
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
});
const mapStateToProps = (state) => {
  return {
    education_level: state.auth.educationLevel,
    zipCode: state.auth.zipCode,
    date: state.auth.dob,
    work_status: state.auth.work_status,
    sex: state.auth.sex,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    email: state.auth.email,
    uid: state.auth.uid,
    image_url: state.auth.image_url,
    phaseID: state.phase.ID,
    jobTitle: state.auth.jobTitle,
    // feet: state.auth.feet,
    // inches: state.auth.inches,
    // weight: state.auth.weight,
  };
};
export default connect(mapStateToProps, {
  imageUpload,
  emailChanged,
  firstNameChange,
  lastNameChange,
  dateChange,
  zipCodeChange,
  jobTitleChange,
  updatePhase,
  sexChange,
  saveProfileToServer,
  setWorkStatus,
  feetChange,
  inchesChange,
  weightChange,
})(HealthBackgroundScreen);

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
