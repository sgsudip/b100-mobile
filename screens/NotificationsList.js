import React from "react";
import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Button, Header, Card, Image } from "react-native-elements";
import { getNotification } from "../actions/index";
import moment from "moment";
// import { ScrollView } from "react-navigation";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class NotificationsList extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  UNSAFE_componentWillMount = async () => {
    await this.props.getNotification();
  };

  onBack = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          centerComponent={{
            text: "B100",
            style: {
              fontFamily: "Muli-SemiBold",
              fontSize:
                Platform.OS === "ios" ? 17 : SCREEN_WIDTH < 575 ? 20 : 22,
              color: "#f2f2f2",
            },
          }}
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
              fontSize:
                Platform.OS === "ios" ? 15 : SCREEN_WIDTH < 575 ? 20 : 22,
              color: "#f2f2f2",
            }}
            onPress={this.onBack}
          >
            Back
          </Text>
        </Header>
        <ScrollView>
          {this.props.AllNotifications.length && this.props.AllNotifications ? (
            <View>
              {this.props.AllNotifications.map((item, index) => {
                return (
                  <Card
                    containerStyle={{
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#dee2e6",

                      width: SCREEN_WIDTH * 0.9,
                      shadowColor: "#ced4da",
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 3.65,
                      elevation: 12,
                    }}
                    key={index}
                  >
                    {/* <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    alignSelf: "flex-start",
                  }}
                > */}
                    {/* <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  From: {item.type}
                </Text> */}
                    {/* <Text
                  style={{
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  Created at: {item.createdAt}
                </Text> */}

                    {/* <Text>Last Updated: {item.updatedAt}</Text> */}
                    {/* </View> */}

                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                      // style={{
                      //   backgroundColor: "#ff4c6e",
                      //   padding: 7,
                      //   borderRadius: 5,
                      // }}
                      >
                        {/* <IconMI
                        // name="bell-outline"
                        name="notifications"
                        size={28}
                        color="#fff"
                      /> */}
                        <Image
                          source={require("../assets/images/b100-logo.png")}
                          style={{
                            height: 50,
                            //width:"100%",
                            width: 50,
                            // backgroundColor: "red",
                          }}
                        />
                      </View>
                      <View
                        style={
                          {
                            // display:"flex",
                            // flexDirection:"row",
                            // justifyContent:"flex-start",
                          }
                        }
                      >
                        <Text
                          style={{
                            fontFamily: "Muli-SemiBold",
                            fontSize: 18,
                            textAlign: "right",
                            color: "#343a40",
                          }}
                          onPress={() =>
                            index === 0
                              ? this.props.navigation.navigate("results")
                              : null
                          }
                        >
                          {item.message}
                        </Text>

                        <Text
                          style={{
                            textAlign: "right",
                            fontFamily: "Muli-SemiBold",
                            fontSize: 12,
                            color: "#adb5bd",
                            textAlign: "right",
                            lineHeight: 10,
                          }}
                        >
                          {"\n"}
                          {moment(item.createdAt).format("MM/DD/YYYY HH:mm")}
                          {/* {moment(item.createdAt).local().format("MM/DD/YYYY HH:mm")} */}
                          {/* {" "}
                  {item.createdAt.split("T")[0].replace(/-/g, "/")}{" "}
                  {item.createdAt.split("T")[1].split(".")[0]} */}
                        </Text>
                      </View>
                    </View>
                  </Card>
                );
              })}
            </View>
          ) : (
            <Text>No Data Available</Text>
          )}
        </ScrollView>
        {/* <Button
          title="Back"
          onPress={this.onBack}
          containerStyle={{
            marginTop: "5%",
            width: "90%",
            alignItems: "center",
          }}
          buttonStyle={{
            backgroundColor: "#db4d69",
          }}
        /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    backgroundColor: "#fff",
  },
  mainTextView: {
    flex: 1,
    top: "5%",
    width: "90%",
    marginBottom: "10%",
  },
  mainTextText: {
    textAlign: "center",
    fontSize: 20,
  },
  IconViewStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
  },

  IconStyle: {
    alignSelf: "center",
  },
  DOBViewStyle: {
    flex: 1,
    alignSelf: "center",
    marginBottom: "10%",
    width: "90%",
  },
  CommentViewStyle: {
    flex: 1,
    alignSelf: "center",

    width: "90%",
  },
  GenderViewStyle: {
    flex: 1,
    alignSelf: "center",
    width: "90%",
  },
  LocationViewStyle: {
    flex: 1,
    alignSelf: "center",

    width: "90%",
  },
  ButtonViewStyle: {
    height: "10%",
    alignSelf: "center",
    marginBottom: "5%",
    width: "90%",
  },
});
const mapStateToProps = (state) => {
  return {
    AllNotifications: state.auth.Notifications,
  };
};
export default connect(mapStateToProps, {
  getNotification,
})(NotificationsList);

// import Constants from "expo-constants";
// import React, { useState, useEffect, useRef } from "react";
// import { Text, View, Button, Platform } from "react-native";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function HealthBackgroundScreen() {
//   const [expoPushToken, setExpoPushToken] = useState("");
//   const [notification, setNotification] = useState(false);
//   // const notificationListener = useRef();
//   // const responseListener = useRef();
//   // useEffect(() => {
//   //   // registerForPushNotificationsAsync().then((token) =>
//   //   //   setExpoPushToken(token)
//   //   // );
//   //   notificationListener.current =
//   //     Notifications.addNotificationReceivedListener((notification) => {
//   //       alert("from Notification"+notification)
//   //       setNotification(notification);
//   //     });
//   //   responseListener.current =
//   //     Notifications.addNotificationResponseReceivedListener((response) => {
//   //       alert("from responce"+response)
//   //       console.log(response);
//   //     });

//   //   return () => {
//   //     Notifications.removeNotificationSubscription(
//   //       notificationListener.current
//   //     );
//   //     Notifications.removeNotificationSubscription(responseListener.current);
//   //   };
//   // }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "space-around",
//       }}
//     >
//       <Text>In Progress</Text>
//       {/* <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: "center", justifyContent: "center" }}>
//         <Text>
//           Title: {notification && notification.request.content.title}{" "}
//         </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>
//           Data:{" "}
//           {notification && JSON.stringify(notification.request.content.data)}
//         </Text>
//       </View>
//       <Button
//         title="Press to schedule a notification"
//         onPress={async () => {
//           await schedulePushNotification();
//         }}
//       /> */}
//     </View>
//   );
// }

// // async function schedulePushNotification() {

// //   await Notifications.scheduleNotificationAsync({
// //     content: {
// //       title: "You've got mail! 📬",
// //       body: "Here is the notification body",
// //       data: { data: "goes here" },
// //     },
// //     trigger: { seconds: 2 },
// //   });
// // }
