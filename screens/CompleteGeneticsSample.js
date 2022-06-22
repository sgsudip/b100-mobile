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
import { phaseTwoResults } from "../actions/index";
import { CheckBox } from "react-native-elements";
const YEAR_IN_MILLI = 31556952000;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class CompleteGeneticsSample extends React.Component {
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
      checked: false,
    };
  }

  onBack = () => {
    this.setState({ checked: false });
    this.props.navigation.navigate("Phase3Instructions");
  };

  onComplete = async () => {
    this.setState({ checked: false });
    this.props.navigation.navigate("Home");
    const data = { bloodTime: Date.now() };
    // this.props.phaseTwoResults(data, this.props.userId);
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

        {/* <ScrollView style={styles.mainTextView}> */}
        <View
          style={
            (styles.mainTextView,
            {
              borderBottomWidth: 1,
              borderColor: "silver",
              width: SCREEN_WIDTH,
            })
          }
        >
          {/* <Text
            style={{
               fontFamily: "Muli-SemiBold",
              fontSize: 22,
              marginTop: "2%",
              marginBottom: "5%",
              //textTransform: "uppercase"
            }}
          >
            Genetics Sample
          </Text> */}
        </View>
        <View
          style={
            (styles.mainTextView,
            {
              justifyContent: "center",
              alignItems: "center",
              marginTop: -50,
              height: SCREEN_HEIGHT * 0.8,
            })
          }
        >
          {/* <CheckBox
            title="I completed my genetic sample."
            checked={this.state.checked}
            checkedColor="#8FA4C4"
            onPress={() => this.setState({ checked: !this.state.checked })}
          /> */}
        </View>
        {/* </ScrollView> */}
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
              alignSelf: "flex-end",
              height: SCREEN_HEIGHT * 0.07,
              //width: SCREEN_WIDTH,
              width: "100%",
              height: 50,
              // fontWeight: "bold"
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
    userId: state.auth.uid,
  };
};

export default connect(mapStateToProps, {
  phaseTwoResults,
})(CompleteGeneticsSample);

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
