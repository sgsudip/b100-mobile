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
  TouchableNativeFeedbackBase,
  //AsyncStorage,
} from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { connect } from "react-redux";
import { Input, Header, Button, ButtonGroup } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import {
  setWorkStatus,
  emailChanged,
  uploadCustomPhaseOneANS,
  firstNameChange,
  imageUpload,
  lastNameChange,
  updatePhase,
  dateChange,
  sexChange,
  saveProfileToServer,
  zipCodeChange,
  jobTitleChange,
  isSmokerOrNot,
} from "../actions/index";
import RNPickerSelect from "react-native-picker-select";
import { TouchableOpacity } from "react-native-gesture-handler";

const YEAR_IN_MILLI = 31556952000;

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class Phase1CustomQuestions extends React.Component {
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
      numMeds: "",
      cigPerDay: null,
      YearsOSmoke: null,
      isSmoker: false,
    };
  }
  componentDidMount = async () => {
    // const isSmoker = await AsyncStorage.getItem('isSmoker');
    const smokeOrNot = this.props.isSmoker;
    this.setState({ isSmoker: smokeOrNot });
  };

  onBack = () => {
    this.props.navigation.navigate("Home");
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps.isSmoker,"this is next props");
    if (nextProps) {
      return { isSmoker: nextProps.isSmoker };
    }
  }

  onComplete = async () => {
    if (this.state.isSmoker) {
      if (
        this.state.YearsOSmoke !== null &&
        this.state.cigPerDay !== null &&
        this.state.numMeds !== ""
      ) {
        this.props.uploadCustomPhaseOneANS(
          this.state.numMeds,
          this.state.cigPerDay,
          this.state.YearsOSmoke,
          this.props.uid
        );
        this.props.navigation.navigate("reward");
      } else {
        alert("please fill out all fields");
      }
    } else if (this.state.numMeds !== "") {
      this.props.uploadCustomPhaseOneANS(
        this.state.numMeds,
        this.state.cigPerDay,
        this.state.YearsOSmoke,
        this.props.uid
      );
      this.props.navigation.navigate("reward");
    } else {
      alert("please fill out all fields");
    }
  };

  render() {
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
        <KeyboardAwareScrollView style={styles.mainTextView}>
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
                marginTop: "2%",
              }}
            >
              FINAL STEP
            </Text>
            <Text
              style={{
                fontFamily: "Muli-SemiBold",
                fontSize: 18,
                marginTop: "3%",
                marginBottom: "5%",
              }}
            >
              Lets dig a little deeper
            </Text>
          </View>

          <View style={styles.emailViewStyle}>
            <Text
              style={{
                textAlign: "left",
                marginStart: 10,
                width: "80%",
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              How many prescriptions medications do you take a day?
            </Text>

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
                this.setState({ numMeds: text });
              }}
            />
            {this.state.isSmoker && (
              <View>
                <View>
                  <View style={{ marginTop: 15, marginLeft: 5 }}>
                    <Text style={{ textAlign: "left", marginLeft: 5 }}>
                      We saw that you enjoy to smoke. Can you tell us a little
                      more?
                    </Text>
                  </View>

                  <View style={{ marginVertical: 5, marginLeft: 5 }}>
                    <Text style={{ textAlign: "left", marginLeft: 5 }}>
                      On average how many cigarettes do you smoke a day?
                    </Text>
                  </View>

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
                    }}
                  />

                  <View style={{ marginVertical: 10, marginLeft: 5 }}>
                    <Text style={{ textAlign: "left", marginLeft: 5 }}>
                      How many years have you been smoking?
                    </Text>
                  </View>

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
                    onChangeText={(text) => {
                      let numbers = "0123456789";

                      for (var i = 0; i < text.length; i++) {
                        if (numbers.indexOf(text[i]) > -1) {
                        } else {
                          // your call back function
                          alert("please enter numbers only");
                          return null;
                        }
                      }
                      this.setState({ YearsOSmoke: text });
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        <View
          style={[
            styles.buttonViewStyle,
            SCREEN_HEIGHT < 700 ? { bottom: 30 } : { bottom: 50 },
          ]}
        >
          <Button
            title="Next   >"
            onPress={this.onComplete}
            titleStyle={{
              textAlign: "center",
              paddingTop: 0,
              paddingBottom: 0,
            }}
            buttonStyle={{
              backgroundColor: "#8FA4C4",
              bottom: 0,
              alignContent: "center",
              height: SCREEN_HEIGHT * 0.07,
              //width: SCREEN_WIDTH
              width: "100%",
              height: 50,
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
    marginTop: "5%",
    position: "relative",
    //bottom: 50,
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
    isSmoker: state.quest.isSmoker,
  };
};
export default connect(mapStateToProps, {
  uploadCustomPhaseOneANS,
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
  isSmokerOrNot,
})(Phase1CustomQuestions);

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
