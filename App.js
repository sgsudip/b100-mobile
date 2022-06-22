import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { setCustomImage, setCustomText } from "react-native-global-props";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppNavigator from "./navigation/AppNavigator";
import store from "./store";
import I from "./assets/images";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { registerRootComponent } from "expo";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <SafeAreaProvider>
            <View style={styles.container}>
              {Platform.OS === "ios" && <StatusBar barStyle="default" />}
              <AppNavigator />
            </View>
          </SafeAreaProvider>
        </Provider>
      );
    }
  }
  _loadResourcesAsync = async () => {
    return await Promise.all([
      Asset.loadAsync([
        require("./assets/images/icon/icon.png"),
        ,
        require("./assets/images/camera/Group2.png"),
        require("./components/common/Onboarding01/AccuracyMatters.png"),
        require("./components/common/Onboarding01/B100.method.png"),
        require("./components/common/Onboarding01/Group.png"),
        require("./components/common/Onboarding02/Group.png"),
        require("./components/common/Onboarding03/B100.Center.png"),
        I.background,
      ]),
      await Font.loadAsync({
        "Muli-SemiBold": require("./assets/fonts/Muli-SemiBold.ttf"),
        "Muli-Italic": require("./assets/fonts/Muli-Italic.ttf"),
        "Muli-Bold": require("./assets/fonts/Muli-Bold.ttf"),
        "Muli-Regular": require("./assets/fonts/Muli-Regular.ttf"),
      }),
    ]);
  };

  _handleLoadingError = (error) => {};

  _handleFinishLoading = () => {
    const customTextProps = {
      style: {
        fontSize: 17,
        fontFamily: "Muli-SemiBold",
        textAlign: "center",
      },
    };

    // Makes every image resize mode cover by default.
    const customImageProps = {
      resizeMode: "contain",
    };
    setCustomText(customTextProps);
    setCustomImage(customImageProps);
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontFamily: "Muli-SemiBold",
  },
});

registerRootComponent(App);
