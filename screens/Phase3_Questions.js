import _ from "lodash";
import React, { Component } from "react";
import RadioButtonRN from "radio-buttons-react-native";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Header, Icon, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import QuestionType from "../components/questionType";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import { prog, slideindex, loadQuestions } from "../actions";
const SCREEN_WIDTH = Dimensions.get("window").width;
const data = [
  {
    label: "Yes",
    ans: true,
  },
  {
    label: "No",
    ans: false,
  },
];
class Phase3Questions extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };
  state = {
    question: 1,
    date: "",
  };
  // componentWillMount = async () => {
  //   await this.setState({ length: this.props.quest.length - 1 });
  //   await this.flatListRef.scrollToIndex({
  //     animated: true,
  //     index: this.props.mainIndex,
  //   });
  // };

  validateBDay = async (date) => {
    let today = new Date();
    var selectedDate = date; //yyyy-mm-dd
    var currentDate =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");
    if (selectedDate > currentDate) {
      this.setState({ date: selectedDate });
    } else {
      setTimeout(() => {
        this.setState({ date: "" });
        alert("Select future date only ");
      }, 700);
    }
  };
  onAnswerSelect = (ans, question) => {
    if (question === 1) {
      if (ans.ans) {
        Alert.alert(
          "Warning",
          "Please do not eat, drink, chew gum, brush your teeth or smoke for 30 minutes prior to giving your sample. ",
          [
            {
              text: "OK",
              onPress: () => {
                this.setState({ question: 1 });
                this.props.navigation.navigate("Home");
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        setTimeout(() => {
          this.setState({ question: 2 });
        }, 700);
      }
    } else if (question === 2) {
      if (ans.ans) {
        // this.setState({ date: new Date() });
        this.props.navigation.navigate("Phase3Instructions");
      } else {
        Alert.alert(
          "Warning",
          "You will need to drop off your sample today. Please select a day that you will be able to provide a fasting sample and drop it off at the US Post Office same day.",
          [
            {
              text: "OK",
              onPress: () => {
                setTimeout(() => {
                  this.setState({ question: 3 });
                }, 500);
              },
            },
          ],
          { cancelable: false }
        );
      }
    }
  };
  onDateClick = () => {
    if (this.state.date !== "") {
      this.props.navigation.navigate("Phase3Instructions");
      // this.setState({ question: 4 });
    } else {
      alert("Date field require");
    }
  };
  onCancelPress = () => {
    this.setState({ question: 1, date: "" });
    this.props.navigation.navigate("Home");
  };
  onBackPress = async () => {
    const currentStep = this.state.question;
    if (currentStep === 1) {
      this.props.navigation.navigate("Home");
    } else {
      this.setState({ question: currentStep - 1 });
    }
  };
  scrollToItem(index, item) {
    index++;
    this.setState({ progress: index / this.state.length });
    this.setState({ index });
    this.props.slideindex(index);
    this.props.prog(this.state.progress);
    if (index !== this.props.quest.length)
      this.flatListRef.scrollToIndex({ animated: true, index: index });
    else {
      this.props.navigation.navigate("reward");
    }
  }
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
            B100
          </Text>
          {/* <Icon
            name="cancel"
            color="#f2f2f2"
            underlayColor="transparent"
            onPress={this.onCancelPress}
          /> */}
        </Header>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              top: "2%",
              width: SCREEN_WIDTH * 0.8,
            }}
          >
            {this.state.question === 1 && (
              <>
                <Text>
                  Have you had anything to eat, drink, chewed gum, brushed your
                  teeth, or smoked in the last 30 minutes?
                </Text>
                <RadioButtonRN
                  data={data}
                  selectedBtn={(e) => this.onAnswerSelect(e, 1)}
                  style={{ marginTop: 10 }}
                />
              </>
            )}
            {this.state.question === 2 && (
              <>
                <Text>
                  Will you make it a priority to drop off your genetic sample at
                  the US Post Office today?
                </Text>
                <RadioButtonRN
                  data={data}
                  selectedBtn={(e) => this.onAnswerSelect(e, 2)}
                  style={{ marginTop: 10 }}
                />
              </>
            )}
            {this.state.question === 3 && (
              <>
                <Text>
                  Please select a day that you will be able to provide a fasting
                  sample and drop it off at the US Post Office same day.
                </Text>
                <DatePicker
                  style={{ alignSelf: "center", marginTop: 15 }}
                  showIcon={false}
                  date={this.state.date}
                  format="YYYY-MM-DD"
                  placeholder="Select Date "
                  confirmBtnText="Confirm"
                  onCloseModal={async () => {}}
                  cancelBtnText="Cancel"
                  onDateChange={this.validateBDay}
                  customStyles={{
                    dateTouchBody: {
                      width: SCREEN_WIDTH * 0.85,
                      alignSelf: "center",
                    },
                    dateInput: {
                      borderRadius: 5,
                      borderColor: "silver",
                      height: 50,
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
                />
              </>
            )}
            <View
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              {this.state.question === 3 && (
                <Button
                  title="Ok"
                  titleStyle={{
                    fontSize: 18,
                    paddingBottom: 0,
                    paddingTop: 0,
                    fontWeight: "bold",
                  }}
                  onPress={this.onDateClick}
                  // ViewComponent={require("expo").linearGradient}
                  ViewComponent={require("expo-linear-gradient").LinearGradient}
                  linearGradientProps={{
                    colors: ["#E54360", "#E54360"],
                    start: [1, 0],
                    end: [0.2, 0],
                  }}
                  buttonStyle={{
                    borderRadius: 7,
                    alignSelf: "center",
                    width: 100,
                  }}
                  containerStyle={{
                    marginBottom: 0,
                    marginTop: 10,
                  }}
                />
              )}
              {this.state.question <= 3 && (
                <Button
                  title="Cancel"
                  titleStyle={{
                    fontSize: 18,
                    paddingBottom: 0,
                    paddingTop: 0,
                    fontWeight: "bold",
                  }}
                  onPress={this.onCancelPress}
                  // ViewComponent={require("expo").linearGradient}
                  ViewComponent={require("expo-linear-gradient").LinearGradient}
                  linearGradientProps={{
                    colors: ["#E54360", "#E54360"],
                    start: [1, 0],
                    end: [0.2, 0],
                  }}
                  buttonStyle={{
                    borderRadius: 7,
                    alignSelf: "center",
                    width: 100,
                  }}
                  containerStyle={{
                    marginBottom: 0,
                    marginTop: 10,
                  }}
                />
              )}
            </View>

            {/* <Progress.Bar
              progress={this.state.progress}
              color={"#ff4c6e"}
              animated={false}
              unfilledColor={"rgba(251, 33, 33, .36)"}
              borderWidth={0}
              width={null}
            /> */}
          </View>
          {/*
          <FlatList
            data={this.props.quest}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.q._id}
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
                onNextPress={this.scrollToItem.bind(this, index, item)}
                item={item}
                nav={this.props.navigation}
              />
            )}
          /> */}
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
  img: {
    height: 20,
    width: 20,
  },
  btn: {
    flexDirection: "row",
  },
});
const mapStateToProps = (state) => {
  return {
    progg: state.quest.progg,
    mainIndex: state.quest.mainIndex,
    quest: state.quest.Phase_3,
  };
};

export default connect(mapStateToProps, { prog, slideindex, loadQuestions })(
  Phase3Questions
);
