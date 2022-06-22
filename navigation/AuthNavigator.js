import React from "react";
// import { Platform } from "react-native";
// import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import PhoneScreen from "../screens/phoneScreen";
import VerifyScreen from "../screens/verifyScreen";
import HealthBackgroundScreen from "../screens/HealthBackgroundScreen";
import LoginScreen from "../screens/loginScreen";
import TermsScreen from "../screens/termsScreen";
import WarningScreen from "../screens/warningScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const HealthBackgroundStack = createStackNavigator({
//   HealthBackground: HealthBackgroundScreen,
// });
// const LogInStack = createStackNavigator({
//   Login: loginScreen,
// });
// HealthBackgroundStack.navigationOptions = {
//   tabBarVisible: false,
// };
// LogInStack.navigationOptions = {
//   tabBarVisible: false,
// };
// const phoneStack = createStackNavigator({
//   phone: phoneScreen,
// });

// phoneStack.navigationOptions = {
//   tabBarVisible: false,
// };

// const varifyStack = createStackNavigator({
//   varify: varifyScreen,
// });

// varifyStack.navigationOptions = {
//   tabBarVisible: false,
// };
// const warningStack = createStackNavigator({
//   warn: warningScreen,
// });

// warningStack.navigationOptions = {
//   tabBarVisible: false,
// };
// const termsStack = createStackNavigator({
//   terms: termsScreen,
// });

// termsStack.navigationOptions = {
//   tabBarVisible: false,
// };

// export default createBottomTabNavigator({
//   warningStack,
//   phoneStack,
//   LogInStack,
//   HealthBackgroundStack,
//   termsStack,
//   varifyStack,
// });

const stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <>
      <stack.Screen name="warn" component={WarningScreen} />
      <stack.Screen name="phone" component={PhoneScreen} />
      <stack.Screen name="Login" component={LoginScreen} />
      <stack.Screen
        name="HealthBackground"
        component={HealthBackgroundScreen}
      />
      <stack.Screen name="terms" component={TermsScreen} />
      <stack.Screen name="varify" component={VerifyScreen} />
    </>
  );
};

export default AuthNavigator;
