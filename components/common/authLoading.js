import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { connect } from "react-redux";
import { fillInfo, getScore } from "../../actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // await AsyncStorage.clear();
    const auth = await AsyncStorage.getItem("auth");
    // console.log(auth, "auth")
    if (auth) {
      await this.props.fillInfo();
      // await this.props.getScore();
      let route = this.props.email !== "" ? "Home" : "welcome";
      // let route = this.props.email !=="" ? 'phase2instructionScreen' : 'welcome'
      // this.props.navigation.navigate('PhaseOneCustom');
      this.props.navigation.navigate(route);
    } else {
      this.props.navigation.navigate("welcome");
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator color="#ff4c6e" size={70} animating />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    error: state.auth.error,
  };
};

export default connect(mapStateToProps, { getScore, fillInfo })(
  AuthLoadingScreen
);
