// import {
//   createStackNavigator,
//   createBottomTabNavigator,
// } from "react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import {
  fromLeft,
  fromRight,
  fromBottom,
  fromTop,
} from "react-navigation-transitions";
// import Questions from "../screens/Questions";
import Phase1CustomeQuestion from "../screens/Phase1CustomScreen";
import Phase1Header from "../screens/Phase1HeadersScreen";
import Questions from "../screens/Questions";

import ResultsScreen from "../screens/ResultsScreen";
import RewardScreen from "../screens/RewardScreen";
// import subQuestions from "../screens/subQuestionScreen";
import subQuestions from "../screens/SubQuestions";
import HomeScreen from "../screens/HomeScreen";
import NotificationsList from "../screens/NotificationsList";
import menueScreen from "../screens/MenuScreen";
import HomeKitScreen from "../screens/HomeKit";
import GenScreen from "../screens/GeneticTest";
import signoutScreen from "../screens/SignoutScreen";
import phase0Quest from "../screens/ProfileQuestions";
import phase2Quest from "../screens/HomeKitQuestions";
import phase3Quest from "../screens/Phase3_Questions";
import phase4Quest from "../screens/Phase4_Questions";
import HomeKitInfo from "../screens/DeviceInstructions";
import RecommendationsScreen from "../screens/RecommendationsScreen";
import B100MapScreen from "../screens/B100MapScreen";
import resultsList from "../screens/ResultsList";
import PhaseOneCustom from "../screens/CustomQuestionPhase1";
import phase2instructionScreen from "../screens/Phase2instructionScreen";
import waistToHip from "../screens/WaistToHip";
import BloodPressureInstructions from "../screens/BloodPressureInstructionsScreen";
import Phase3Instructions from "../screens/phase_3_instructionScreen";
import CompleteGeneticsSamples from "../screens/CompleteGeneticsSample";
import RecommendationsList from "../screens/RecommendationScreenList";
import compare from "../screens/CompareScreen";
import BloodPressure from "../screens/BloodPressure";
import NitricOxideInstructions from "../screens/NitricOxideinstructions";
import nitricOxide from "../screens/NitricOxide";
import DeviceInfo from "../screens/DeviceIdScreen";
import PhaseTwoVideoScreen from "../screens/Phase2videoScreen";
// import ChoicesHomeScreen from "../screens/ChoicesHomeScreen";
import Labs from "../screens/Labs";
import SupplementsList from "../screens/SupplementsList";
import DietRecList from "../screens/DietRecList";

// const HomeStack = createStackNavigator(
//   {
//     Home: HomeScreen,
//     menue: menueScreen,
//   },
//   {
//     transitionConfig: (nav) => handleCustomTransition(nav),
//   }
// );

// HomeStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };

// const DeviceInfoStack = createStackNavigator({
//   DeviceInfo,
//   CompleteGeneticsSamples,
// });
// DeviceInfoStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };

// const compareStack = createStackNavigator({
//   compare,
// });
// compareStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };
// const PhaseOneCustomStack = createStackNavigator({
//   PhaseOneCustom: PhaseOneCustom,
// });
// PhaseOneCustomStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };
// const PhaseTwoVideoStack = createStackNavigator({
//   PhaseTwoVideo: PhaseTwoVideoScreen,
// });
// PhaseTwoVideoStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };

// // const ChoicesHomeScreenStack = createStackNavigator({
// //   ChoicesHome: ChoicesHomeScreen,
// // });
// // ChoicesHomeScreenStack.navigationOptions = {
// //   tabBarLabel: "Login",
// //   tabBarVisible: false,
// // };

// const NotificationsStack = createStackNavigator({
//   NRY: NotificationsList,
// });
// NotificationsStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };
// const B100MapStack = createStackNavigator({
//   B100Map: B100MapScreen,
// });
// B100MapStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };

// const HomeKitStack = createStackNavigator({
//   HomeKit: HomeKitScreen,
// });
// HomeKitStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };
// const HomeKitInfoStack = createStackNavigator({
//   HomeKitInfo: HomeKitInfo,
// });
// HomeKitInfoStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };
// const SignOutStack = createStackNavigator({
//   signOut: signoutScreen,
// });
// SignOutStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };
// const GenStack = createStackNavigator({
//   Gen: GenScreen,
// });
// GenStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };
// const QuestionsStack = createStackNavigator(
//   {
//     Quest: Questions,
//     subQuest: subQuestions,
//   },
//   {
//     transitionConfig: (nav) => handleCustomTransition(nav),
//   }
// );

// QuestionsStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };

// const Phase0QuestionsStack = createStackNavigator({
//   P0Quest: phase0Quest,
// });

// Phase0QuestionsStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };

// const Phase3QuestionsStack = createStackNavigator({
//   P3Quest: phase3Quest,
// });

// Phase3QuestionsStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };
// const Phase4QuestionsStack = createStackNavigator({
//   P4Quest: phase4Quest,
// });

// Phase4QuestionsStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };
// // const Phase1QuestionsStack = createStackNavigator({
// //   P1Quest: phase1Quest
// // });

// // Phase1QuestionsStack.navigationOptions = {
// //   tabBarLabel: 'Login',
// //   tabBarVisible: false
// // }
// const Phase2QuestionsStack = createStackNavigator({
//   P2Quest: phase2Quest,
// });

// Phase2QuestionsStack.navigationOptions = {
//   tabBarLabel: "Login",
//   tabBarVisible: false,
// };

// const ResultsStack = createStackNavigator({
//   results: ResultsScreen,
// });

// ResultsStack.navigationOptions = {
//   tabBarLabel: "results",
//   tabBarVisible: false,
// };
// const resultsListStack = createStackNavigator({
//   resultsList: resultsList,
// });

// resultsListStack.navigationOptions = {
//   tabBarLabel: "results",
//   tabBarVisible: false,
// };
// const RewardStack = createStackNavigator({
//   reward: RewardScreen,
// });

// RewardStack.navigationOptions = {
//   tabBarLabel: "reward",
//   tabBarVisible: false,
// };
// const RecommendationsStack = createStackNavigator({
//   // rec below is the actual name to navigate to
//   rec: RecommendationsScreen,
// });

// RecommendationsStack.navigationOptions = {
//   tabBarLabel: "rec",
//   tabBarVisible: false,
// };
// const handleCustomTransition = ({ scenes }) => {
//   const prevScene = scenes[scenes.length - 2];
//   const nextScene = scenes[scenes.length - 1];

//   if (
//     prevScene &&
//     prevScene.route.routeName === "Home" &&
//     nextScene.route.routeName === "menue"
//   ) {
//     return fromLeft();
//   } else if (
//     prevScene &&
//     prevScene.route.routeName === "menue" &&
//     nextScene.route.routeName === "Home"
//   ) {
//     return fromRight();
//   }
//   if (
//     prevScene &&
//     prevScene.route.routeName === "Quest" &&
//     nextScene.route.routeName === "subQuest"
//   ) {
//     return fromBottom();
//   } else if (
//     prevScene &&
//     prevScene.route.routeName === "subQuest" &&
//     nextScene.route.routeName === "Quest"
//   ) {
//     return fromTop();
//   }

//   return null;
// };

// export default createBottomTabNavigator(
//   {
//     HomeStack,
//     RecommendationsStack,
//     ResultsStack,
//     QuestionsStack,
//     RewardStack,
//     NotificationsStack,
//     GenStack,
//     B100MapStack,
//     Phase0QuestionsStack,
//     HomeKitStack,
//     // Phase1QuestionsStack,
//     resultsListStack,
//     Phase1CustomeQuestion,
//     Phase1Header,
//     Phase2QuestionsStack,
//     Phase3QuestionsStack,
//     Phase4QuestionsStack,
//     SignOutStack,
//     HomeKitInfoStack,
//     PhaseOneCustomStack,
//     DeviceInfoStack,
//     phase2instructionScreen,
//     waistToHip,
//     BloodPressureInstructions,
//     Phase3Instructions,
//     RecommendationsList,
//     BloodPressure,
//     NitricOxideInstructions,
//     nitricOxide,
//     compareStack,
//     PhaseTwoVideo: PhaseTwoVideoScreen,
//     SupplementsList,
//     Labs,
//     DietRecList,
//   },
//   {
//     transitionConfig: (nav) => handleCustomTransition(nav),

//     headerLayoutPreset: "center",
//   }
// );
