import React, { useRef } from "react";
// import { createAppContainer, createSwitchNavigator } from "react-navigation";
// import MainTabNavigator from "./MainTabNavigator";
// import authLoading from "../components/common/authLoading";
// import WelcomeStack from "./welcome";
// import AuthNavigator from "./AuthNavigator";
import AuthLoadingScreen from "../components/common/authLoading";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import WarningScreen from "../screens/warningScreen";
import PhoneScreen from "../screens/phoneScreen";
import TermsScreen from "../screens/termsScreen";
import VerifyScreen from "../screens/verifyScreen";
import HomeScreen from "../screens/HomeScreen";
import RecommendationsScreen from "../screens/RecommendationsScreen";
import ResultsScreen from "../screens/ResultsScreen";
import Questions from "../screens/Questions";
import SubQuestions from "../screens/SubQuestions";
import MenuScreen from "../screens/MenuScreen";
import RewardScreen from "../screens/rewardScreen";
import NotificationsList from "../screens/NotificationsList";
import GeneticTest from "../screens/GeneticTest";
import B100MapScreen from "../screens/B100MapScreen";
import ProfileQuestions from "../screens/ProfileQuestions";
import HomeKit from "../screens/homeKit";
import Phase1CustomScreen from "../screens/Phase1CustomScreen";
import Phase1HeadersScreen from "../screens/Phase1HeadersScreen";
import HomeKitQuestions from "../screens/homeKitQuestions";
import Phase3Questions from "../screens/Phase3_Questions";
import Phase4Questions from "../screens/Phase4_Questions";
import SignOutScreen from "../screens/signoutScreen";
import RegisterHomeKit from "../screens/DeviceIdScreen";
import CompleteGeneticsSample from "../screens/CompleteGeneticsSample";
import Phase2Instructions from "../screens/phase2instructionScreen";
import waistToHip from "../screens/waistToHip";
import Phase3Instructions from "../screens/phase_3_instructionScreen";
import RecommendationScreenList from "../screens/RecommendationScreenList";
import BloodPressure from "../screens/BloodPressure";
import NitricOxideScreen from "../screens/nitricOxide";
import SupplementsList from "../screens/SupplementsList";
import Labs from "../screens/Labs";
import DietRecList from "../screens/DietRecList";
import LoginScreen from "../screens/loginScreen";
import HealthBackgroundScreen from "../screens/HealthBackgroundScreen";

// unused screen imports
// import CompareScreen from "../screens/CompareScreen";
// import NOInstructions from "../screens/NitricOxideinstructions";
// import BPInstructions from "../screens/BloodPressureInstructionsScreen";
// import Phase2Video from "../screens/Phase2videoScreen";
// import DeviceInstructions from "../screens/DeviceInstructions";
// import Phase1CustomQuestions from "../screens/CustomQuestionPhase1";
// import ResultsList from "../screens/ResultsList";

// react navigation v3
// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       // You could add another route here for authentication.
//       // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//       AuthLoading: AuthLoadingScreen,
//       welcome: WelcomeStack,
//       main: MainTabNavigator,
//       Auth: AuthNavigator,
//     },
//     {
//       initialRouteName: "AuthLoading",
//     }
//   )
// );

// react navigation latest version
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const flatListRef = useRef(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthLoading">
        <Stack.Screen
          name="AuthLoading"
          component={AuthLoadingScreen}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="welcome"
          component={WelcomeScreen}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Group
          screenOptions={{
            headerBackVisible: false,
            headerShown: false,
          }}
        >
          <Stack.Screen name="warn" component={WarningScreen} />
          <Stack.Screen name="phone" component={PhoneScreen} />
          <Stack.Screen name="terms" component={TermsScreen} />
          <Stack.Screen name="varify" component={VerifyScreen} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerBackVisible: false,
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="HealthBackground"
            component={HealthBackgroundScreen}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="menue" component={MenuScreen} />
          <Stack.Screen name="rec" component={RecommendationsScreen} />
          <Stack.Screen name="results" component={ResultsScreen} />
          {/* <Stack.Screen name="Quest" component={Questions}  /> */}
          <Stack.Screen
            name="Quest"
            options={{
              animation: "slide_from_right",
            }}
          >
            {(props) => <Questions {...props} />}
          </Stack.Screen>
          <Stack.Screen
            name="subQuest"
            component={SubQuestions}
            options={{
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen name="reward" component={RewardScreen} />
          <Stack.Screen name="NRY" component={NotificationsList} />
          <Stack.Screen name="Gen" component={GeneticTest} />
          <Stack.Screen name="B100Map" component={B100MapScreen} />
          <Stack.Screen name="P0Quest" component={ProfileQuestions} />
          <Stack.Screen name="HomeKit" component={HomeKit} />
          <Stack.Screen
            name="Phase1CustomeQuestion"
            component={Phase1CustomScreen}
          />
          <Stack.Screen
            name="Phase1Header"
            component={Phase1HeadersScreen}
            options={{
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen name="P2Quest" component={HomeKitQuestions} />
          <Stack.Screen name="P3Quest" component={Phase3Questions} />
          <Stack.Screen name="P4Quest" component={Phase4Questions} />
          <Stack.Screen name="signOut" component={SignOutScreen} />
          <Stack.Screen name="DeviceInfo" component={RegisterHomeKit} />
          <Stack.Screen
            name="CompleteGeneticsSamples"
            component={CompleteGeneticsSample}
          />
          <Stack.Screen
            name="phase2instructionScreen"
            component={Phase2Instructions}
          />
          <Stack.Screen name="waistToHip" component={waistToHip} />
          <Stack.Screen
            name="Phase3Instructions"
            component={Phase3Instructions}
          />
          <Stack.Screen
            name="RecommendationsList"
            component={RecommendationScreenList}
          />
          <Stack.Screen name="BloodPressure" component={BloodPressure} />
          <Stack.Screen name="nitricOxide" component={NitricOxideScreen} />
          <Stack.Screen name="SupplementsList" component={SupplementsList} />
          <Stack.Screen name="Labs" component={Labs} />
          <Stack.Screen name="DietRecList" component={DietRecList} />

          {/* unused screens */}
          {/* <Stack.Screen name="HomeKitInfo" component={DeviceInstructions} /> */}
          {/* <Stack.Screen
            name="PhaseOneCustom"
            component={Phase1CustomQuestions}
          /> */}
          {/* <Stack.Screen
            name="NitricOxideInstructions"
            component={NOInstructions}
          /> */}
          {/* <Stack.Screen
            name="BloodPressureInstructions"
            component={BPInstructions}
          /> */}
          {/* <Stack.Screen name="compare" component={CompareScreen} /> */}
          {/* <Stack.Screen name="PhaseTwoVideo" component={Phase2Video} /> */}
          {/* <Stack.Screen name="resultsList" component={ResultsList} /> */}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
