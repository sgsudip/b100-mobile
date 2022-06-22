import React from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { connect } from "react-redux";
import { Button, Header, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/Entypo";
import {
  updatePhase,
  dateChange,
  sexChange,
  saveProfileToServer,
} from "../actions/index";
import images from "../assets/images";

const SCREEN_HEIGHT = Dimensions.get("window").height;

class RecommendationsScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  onBack = () => {
    this.props.navigation.navigate("Home");
  };
  getMyKitButton = () => {
    this.props.navigation.navigate("HomeKit");
  };
  geneticTestButton = () => {
    this.props.navigation.navigate("Home");
  };
  b100Button = () => {
    this.props.navigation.navigate("Home");
  };
  kitButtonTitle = () => {
    return !this.props.kit ? /* "Get My Kit"  */ "Order Now" : "DONE";
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          centerComponent={{
            text: "WHAT'S NEXT",
            style: {
              fontFamily: "Muli-SemiBold",
              fontSize: 16,
              color: "black",
            },
          }}
          containerStyle={{ backgroundColor: "#fff",
          ...Platform.select({
            ios: {
             height: SCREEN_HEIGHT < 900 ? 85 : 100,
            },
            android: {
              height: SCREEN_HEIGHT * 0.1,
              paddingHorizontal: 0,
              paddingTop: 0,
            },
          }),
        
        }}
        >
          <Icon
            name="chevron-thin-left"
            onPress={this.onBack}
            style={{ marginLeft: "10%", fontSize: 24 }}
            underlayColor="transparent"
            color="black"
          />
        </Header>

        <ScrollView
          style={{
            flex: 1,
            backgroundColor: "#fff",
            marginTop: "4%",
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Card
              containerStyle={{
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                margin: 10,
                padding: 10,
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 12,
              }}
              image={require("../assets/images/homeKit.png")}
              imageProps={{ resizeMode: "contain" }}
            >
              {!this.props.kit && (
                <Text
                  style={{ textAlign: "left", color: "#ff4c6e", fontSize: 20 }}
                >
                  *Recommended
                </Text>
              )}
              <Text style={{ textAlign: "left", fontSize: 24 }}>
                At Home Test
              </Text>
              <Text></Text>
              <Text style={{ textAlign: "left", fontSize: 16 }}>
                What role do your lifestyle and diet choices play in the current
                state of your cardiac wellness? Order your kit to fine out.
              </Text>
              <Button
                title={this.kitButtonTitle()}
                disabled={this.props.kit}
                onPress={this.getMyKitButton}
                buttonStyle={{
                  borderRadius: 10,
                  width: "100%",
                  backgroundColor: "#8FA4C4",
                  height: SCREEN_HEIGHT * 0.07,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                containerStyle={{
                  marginTop: "3%",
                  marginBottom: "3%",
                }}
                titleStyle={{ paddingTop: 0, paddingBottom: 0 }}
              />
            </Card>

            {/* <View style={{ alignSelf: "center", paddingHorizontal: "5%" }}>
              <Text
                style={{
                  paddingTop: "5%",
                  paddingBottom: 0,
                  textAlign: "left",
                }}
              >
                Knowledge is power,{" "}
                <Text style={{ fontWeight: "bold" }}>
                  improve the accuracy of your B100 grade with a few simple
                  tests.
                </Text>
              </Text>
            </View> */}

            {/* <Card
              image={require("../assets/images/geneticTest.png")}
              imageProps={{ resizeMode: "contain" }}
              containerStyle={{
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                margin: 10,
                padding: 10,
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 12,
              }}
            >
              {!this.props.kit && (
                <Text
                  style={{ textAlign: "right", color: "#a9a9a9", fontSize: 16 }}
                >
                  Not Needed
                </Text>
              )}
              {this.props.kit && !this.props.treatment && (
                <Text
                  style={{ textAlign: "left", color: "#ff4c6e", fontSize: 20 }}
                >
                  *Recommended
                </Text>
              )}

              <Text style={{ textAlign: "left", fontSize: 24 }}>
                Genetic Test
              </Text>
              <Text></Text>
              <Text style={{ textAlign: "left", fontSize: 16 }}>
                What if your lifestyle and dietary choices do not line up with
                the genetic profile you were born with? Are you making the right
                choices for your genes to achieve optimal heart health? In this
                easy-to-use genetic home test for heart disease, we will answer
                those questions.
              </Text>
              <Button
                title={
                  !this.props.treatment
                    ? // ?  "Learn My Risk Of A Heart Attack"
                      "Order Now"
                    : "DONE"
                }
                onPress={this.geneticTestButton}
                disabled={this.props.treatment}
                buttonStyle={{
                  borderRadius: 10,
                  width: "100%",
                  backgroundColor: "#8FA4C4",
                  height: SCREEN_HEIGHT * 0.07,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                titleStyle={{ paddingTop: 0, paddingBottom: 0 }}
                containerStyle={{
                  marginTop: "3%",
                  marginBottom: "3%",
                }}
              />
            </Card> */}

            {/* <View style={{ alignSelf: "flex-start", paddingHorizontal: "5%" }}>
              <Text
                style={{
                  paddingTop: "5%",
                  paddingBottom: 0,
                  textAlign: "left",
                }}
              >
                Prevention is the{" "}
                <Text style={{ fontWeight: "bold" }}>best treatment.</Text>
              </Text>
            </View> */}

            {/* <Card
              containerStyle={{
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                margin: 10,
                padding: 10,
                shadowOpacity: 0.3,
                shadowRadius: 4.65,
                elevation: 12,
              }}
            >
              {this.props.kit && this.props.treatment ? (
                <Text
                  style={{ textAlign: "left", color: "#ff4c6e", fontSize: 20 }}
                >
                  *Recommended
                </Text>
              ) : (
                <Text
                  style={{ textAlign: "right", color: "#a9a9a9", fontSize: 16 }}
                >
                  Not Needed
                </Text>
              )}
              <Text style={{ textAlign: "left", fontSize: 24 }}>
                B100 Center
              </Text>
              <Text></Text>
              <Text style={{ textAlign: "left", fontSize: 16 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                eros velit, euismod vitae porttitor sed, consectetur posuere
                massa. Quisque finibus interdum euismod. Quisque eu ipsum
                tempus, egestas lectus nec, consequat sapien. Duis rutrum erat
                mi, sit amet commodo lacus vulputate.
              </Text>
              <Button
                title="I Want To Prevent A Heart Attack"
                onPress={this.b100Button}
                titleStyle={{ fontSize: 17, paddingBottom: 0, paddingTop: 0 }}
                buttonStyle={{
                  borderRadius: 10,
                  width: "100%",
                  backgroundColor: "#8FA4C4",
                  height: SCREEN_HEIGHT * 0.07,
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                containerStyle={{
                  marginTop: "3%",
                  marginBottom: "3%",
                }}
              />
            </Card> */}

            {/* <View style={{paddingBottom:"50%"}}>
            <Text></Text> 
          </View> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
const mapStateToProps = (state) => {
  return {
    date: state.auth.dob,
    sex: state.auth.sex,
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
    email: state.auth.email,
    uid: state.auth.uid,
    image_url: state.auth.image_url,
    phaseID: state.phase.ID,
    kit: state.phase.kit,
    treatment: state.phase.treatment,
    centers: state.phase.centers,
    reccomended: state.phase.reccomended,
  };
};
export default connect(mapStateToProps, {
  updatePhase,
  dateChange,
  sexChange,
  saveProfileToServer,
})(RecommendationsScreen);
