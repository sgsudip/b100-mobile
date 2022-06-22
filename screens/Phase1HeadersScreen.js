import React, { PureComponent } from "react";
import {
  Dimensions,
  View,
  Text,
  AppState,
  Platform,
  // Button,
} from "react-native";
import { Button } from "react-native-elements";
import {
  ans,
  prog,
  slideindex,
  loadQuestions,
  setHeaderIndex,
  header,
} from "../actions";
import { connect } from "react-redux";
import { Header, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class Phase1HeadersScreen extends PureComponent {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  state = {
    title: "STATE OF MIND",
    appState: AppState.currentState,
  };

  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (
          // this.state.appState.match(/active|inactive/) &&
          // nextAppState === "background"
          nextAppState.match(/background|inactive/) &&
          this.state.appState === "active"
        ) {
          console.log("App has come to the background!");
          AsyncStorage.setItem("saveAns", "true");
          AsyncStorage.setItem("Index", "0");
          AsyncStorage.setItem("Answers", JSON.stringify(this.props.answ));
          const headerindex = this.props.headerIndex;
          AsyncStorage.setItem("HeaderIndex", headerindex.toString());
          const mainindex = this.props.mainIndex;
          AsyncStorage.setItem("MainIndex", mainindex.toString());
          // console.log('Done');
        }
        this.setState({ appState: nextAppState });
        // console.log(this.state.appState);
      }
    );
  }

  setHeaderSubtitle = () => {
    if (this.props.headers.title === "STATE OF MIND") {
      // let subTitle = this.props.headers.subTitle.split("username");
      // subTitle = subTitle[0] + this.props.firstName + subTitle[1];
      // this.setState({ subTitle });
      let subTitle = this.props.firstName + ", " + this.props.headers.subTitle;
      return subTitle;
    }
  };
  onCancelPress = () => {
    this.props.setHeaderIndex(0);
    this.props.navigation.navigate("Home");
  };
  getPreviousHeadersTotal = () => {
    const Header = this.props.headerIndex;
    var Total = 0;
    for (i = 0; i <= Header - 1; i++) {
      Total += this.props.quest[0].Headers[i].Total;
    }
    return Total;
  };
  onBackPress = async () => {
    if (this.props.headerIndex === 0) {
      this.props.navigation.navigate("Home");
    } else {
      const Header = this.props.headerIndex;
      // const total = this.getPreviousHeadersTotal();
      // debugger;
      await this.props.setHeaderIndex(this.props.headerIndex - 1);
      await this.props.header(this.props.quest[0].Headers[Header - 1]);
      // console.log(this.props.mainIndex - this.props.quest[0].Headers[Header - 1].Total + (this.props.quest[0].Headers[Header - 1].Total - 1));
      // debugger;
      await this.props.slideindex(
        // this.props.mainIndex - this.props.quest[0].Headers[Header - 1].Total
        this.props.mainIndex -
          this.props.quest[0].Headers[Header - 1].Total +
          (this.props.quest[0].Headers[Header - 1].Total - 1)
        // this.props.quest[0].Headers[Header - 1].Total - 1
      );
      this.props.navigation.navigate("Quest");
      // this.props.setHeaderIndex(this.props.headerIndex - 1);
    }
  };
  onNextClick = () => {
    // console.log("Next clicked!!!");
    this.props.navigation.navigate("Quest");
  };
  render() {
    return (
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          top: 0,
          left: 0,
        }}
      >
        <Header
          placement="center"
          // containerStyle={{
          //   backgroundColor: '#ff4c6e',borderBottomWidth:0, padding:0,margin:0}}
          containerStyle={{
            borderBottomWidth: 0,
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
            style={{ position: "absolute", zIndex: 1 }}
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
            {/* {this.props.headers.title} */}
          </Text>
          <Icon
            name="cancel"
            color="#f2f2f2"
            underlayColor="transparent"
            onPress={this.onCancelPress}
          />
        </Header>
        <View
          style={{
            padding: 0,
            margin: 0,
            flex: 1,
            alignItems: "center",
            width: "100%",
            zIndex: 0,
            height: "100%",
          }}
        >
          <View
            style={{
              // position: "absolute",
              // top: "50%",
              // bottom: 0,
              // bottom: 0,
              marginBottom: "auto",
              marginTop: "auto",
              left: 0,
              width: "100%",
              zIndex: 999999,
              height: "auto",
              // borderColor: 'red',
              // borderWidth: 2,

              // transform:'translateY(-50%)'
              // transform: "translateY(-50%)",
            }}
          >
            <Text
              style={{
                // backgroundColor: '#333',
                color: "#db4d69",
                paddingHorizontal: 50,
                paddingTop: 10,
                paddingBottom: 10,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {this.props.headers.title}
              {/* {this.props.headers.subTitle} */}
            </Text>

            <Text
              style={{
                fontFamily: "Muli-SemiBold",
                fontSize: 18,
                paddingHorizontal: 20,
                marginTop: 8,
                // height:'100vh'
                // color: "#f2f2f2",
              }}
            >
              {/* {/* {/ B100 /} * */}
              {this.props.headers &&
              this.state.title === this.props.headers.title
                ? this.setHeaderSubtitle()
                : this.props.headers.subTitle}
            </Text>
            {/* </View>
          <View> */}
            <Button
              // style={{ backgroundColor: '#db4d69', }}
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
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    progg: state.quest.progg,
    mainIndex: state.quest.mainIndex,
    quest: state.quest.Phase_1,
    headers: state.quest.headers,
    headerIndex: state.quest.headerIndex,
    firstName: state.auth.firstName,
    answ: state.quest.ans,
  };
};

export default connect(mapStateToProps, {
  prog,
  slideindex,
  ans,
  loadQuestions,
  setHeaderIndex,
  header,
})(Phase1HeadersScreen);
