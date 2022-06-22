import _ from "lodash";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  FlatList,
  View,
  Text,
  // Button,
} from "react-native";
import { Button } from "react-native-elements";
import { ans, prog, slideindex, loadQuestions, header } from "../actions";
import Loader from "../components/common/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class Phase1CustomeQuestion extends PureComponent {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  onNextClick = () => {
    // return <Phase1HeadersScreen />;
    // console.warn(this.props.quest[0].Headers[1]);
    this.props.header(this.props.quest[0].Headers[this.props.headerIndex]);
    AsyncStorage.setItem("questions", JSON.stringify(this.props.quest[0]));
    this.props.navigation.navigate("Phase1Header");
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
        {this.props.quest[0] ? (
          <View
            style={{
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
                // position: "absolute",
                // top: "40%",
                marginBottom: "auto",
                marginTop: "auto",
                left: 0,
                width: "100%",
                zIndex: 999999,
                height: "auto",
                display: "flex",
                alignItems: "center",
                // transform: "translateY(-50%)",
              }}
            >
              <Text
                style={{
                  // color: '#db4d69',
                  paddingHorizontal: 50,
                  // paddingTop: 10,
                  paddingBottom: 10,
                  fontWeight: "bold",
                  fontFamily: "Muli-SemiBold",
                  fontSize: 20,
                }}
              >
                This is your first step to accurately knowing the status of your
                heart health.
              </Text>
              <Text
                style={{
                  // paddingHorizontal: 50,
                  paddingVertical: 10,
                  fontSize: 16,
                  fontStyle: "italic",
                  fontFamily: "Muli-Italic",
                  // backgroundColor: "#8FA4C4",
                  // color: "white",
                  // color: "dodgerblue",
                  color: "#8FA4C4",
                  marginHorizontal: 25,
                }}
              >
                {/* <Text
                  style={{
                    fontSize: 12,
                    fontStyle: "italic",
                    fontFamily: "Muli-Italic",
                    backgroundColor: "dodgerblue",
                    color: "white",
                    textAlign: "center",
                  }}
                > */}
                This assessment will take approximately 15 minutes to complete.
                If you are unable to finish your responses will be automatically
                saved.
                {/* </Text> */}
              </Text>
              <Button
                title="Next"
                titleStyle={{ fontSize: 18, padding: 0, margin: 0 }}
                buttonStyle={{
                  // backgroundColor: "#ff4c6e",
                  backgroundColor: "#db4d69",
                  //height: SCREEN_HEIGHT * 0.06,
                  marginTop: 30,
                  width: "auto",
                  borderRadius: 50,
                  // position: 'absolute',
                  bottom: 0,
                  height: 50,
                  left: "auto",
                  right: "auto",
                }}
                containerStyle={{
                  alignSelf: "center",
                  width: SCREEN_WIDTH * 0.85,
                  // backgroundColor: "#db4d69",
                }}
                onPress={this.onNextClick}
              />
            </View>
          </View>
        ) : (
          <Loader />
        )}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    progg: state.quest.progg,
    mainIndex: state.quest.mainIndex,
    quest: state.quest.Phase_1,
    headerIndex: state.quest.headerIndex,
  };
};

export default connect(mapStateToProps, {
  prog,
  slideindex,
  ans,
  loadQuestions,
  header,
})(Phase1CustomeQuestion);
