import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { connect } from "react-redux";
import { Header, ListItem, Card } from "react-native-elements";
import IconEn from "react-native-vector-icons/Entypo";
// import IconAD from "react-native-vector-icons/AntDesign";
import SupplementArray from "../constants/SupplementArray";
import RenderHTML from "react-native-render-html";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class SupplementsList extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  state = {
    recommandation: [],
    allSupplement: [],
  };

  toResultsScreen = () => {
    this.props.navigation.navigate("results");
  };

  static getDerivedStateFromProps(props, state) {
    if (props.score.masterScore) {
      const scoreData = props.score.masterScore;
      let recommandation = scoreData.filter(function (e) {
        return e.supplement !== "";
      });
      let supplement = [];
      for (let i = 0; i < recommandation.length; i++) {
        const element = recommandation[i];
        // const array = element.supplement.split(/[,:]+/);
        let array = element.supplement.split(/(, )/);
        array = array.filter((item) => item !== ", ");
        for (let j = 1; j < array.length; j++) {
          const element = array[j];
          supplement.push(element);
        }
      }

      const fileteredSupplement = supplement.filter(
        (item, index) => supplement.indexOf(item) === index
      );
      // console.log(fileteredSupplement)

      let allSupplement = [];
      for (let i = 0; i < SupplementArray.length; i++) {
        const element = SupplementArray[i];
        // console.log(element.key)
        if (fileteredSupplement.includes(element.key)) {
          allSupplement.push(element.key);
        }
      }

      //   const phase = props.navigation.getParam("phase");
      //   // console.log(phase, "phase number");
      //   recommandation = recommandation.filter((item) => item.phase === phase);
      // console.log("filetered array", recommandation.length);
      //   return { recommandation: recommandation, phase: phase };
      // return { recommandation: recommandation };
      return { allSupplement: allSupplement };
    }
    return null;
  }

  // componentWillMount = () => {
  //   let suppelments = [];
  //   for (let i = 0; i < SupplementArray.length; i++) {
  //     const element = SupplementArray[i];
  //     suppelments.push(element.key);
  //   }
  //   // console.log(suppelments, "supplements array");
  //   this.setState({ allSupplement: suppelments });
  // };

  insertTextAtIndices = (text, value) => {
    return value.replace(/./g, function (character, index) {
      return text[index] ? text[index] + character : character;
    });
  };

  setClickHere = (text) => {
    var obj = {};
    let link = [];
    for (let i = 0; i < SupplementArray.length; i++) {
      if (text.includes(SupplementArray[i].key)) {
        // console.log(SupplementArray[i].value.toString());
        let startIndex = text.indexOf(SupplementArray[i].key);
        let endIndex = SupplementArray[i].key.length + startIndex;
        obj = {
          ...obj,
          [startIndex]: `<a href=${SupplementArray[i].value} style={{ textDecorationLine: "none",
          textDecorationColor: "black" }}>`,
          [endIndex]: "</a>",
        };
      } else {
        link = <Text>{text}</Text>;
      }
    }
    let c = this.insertTextAtIndices(obj, text);
    return c;
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          containerStyle={{
            backgroundColor: "#ff4c6e",
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
          <IconEn
            name="chevron-thin-left"
            onPress={this.toResultsScreen}
            style={{ marginLeft: "10%", fontSize: 20 }}
            underlayColor="transparent"
            color="#f2f2f2"
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
          </Text>
        </Header>
        <View
          style={{
            borderBottomWidth: 2,
            borderColor: "silver",
            width: SCREEN_WIDTH,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "Muli-Bold",
              fontSize: 20,
              marginTop: 5,
              marginBottom: 5,
              paddingVertical: 5,
              textTransform: "uppercase",
              letterSpacing: 0.8,
            }}
          >
            SUPPLEMENT RECOMMENDATIONS
          </Text>
        </View>
        <ScrollView style={{ marginBottom: 40 }}>
          {/* <View>
            {this.state.recommandation && this.state.recommandation.length ? (
              this.state.recommandation.map((item, index) => {
                //   return <Text>{item.question}</Text>;
                return (
                  <View
                    key={index}
                    // style={{ marginTop: 15, marginHorizontal: 15 }}
                  >
                    <Card
                      containerStyle={{ padding: 0, backgroundColor: "white" }}
                    >
                      <View
                        style={{
                          borderBottomColor: "#e1ebee",
                          borderBottomWidth: 2,
                          padding: 15,
                          // backgroundColor: "#343a40",
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "left",
                            fontSize: 18,
                            fontWeight: "bold",
                            // color: "#f2f2f2",
                          }}
                        >
                          {item.question}
                        </Text>
                      </View>
                      <Text
                        style={{
                          textAlign: "justify",
                          fontSize: 15,
                          lineHeight: 20,
                          padding: 15,
                        }}
                      >
                        {item.supplement}
                      </Text> */}
          {/* <ListItem
                        title={item.supplement.split(": ")[1]}
                        leftIcon={
                          <IconAD
                            name="arrowright"
                            style={{ lineHeight: 24 }}
                            size={18}
                          />
                        }
                        titleStyle={{ textAlign: "left" }}
                        containerStyle={{
                          display: "flex",
                          alignItems: "flex-start",
                        }}
                      /> */}
          {/* </Card>
                  </View>
                );
              })
            ) : (
              <Text>No Recommendation</Text>
            )}
          </View> */}
          <View style={{ marginLeft: 15 }}>
            {this.state.allSupplement && this.state.allSupplement.length ? (
              this.state.allSupplement.map((item, index) => {
                return (
                  <ListItem
                    key={index}
                    // title={item}
                    title={
                      <RenderHTML
                        baseStyle={{
                          textAlign: "left",
                          fontSize: 17,
                        }}
                        contentWidth={SCREEN_WIDTH}
                        source={{
                          html: this.setClickHere(item),
                        }}
                        tagsStyles={{
                          // Text: {
                          //   textDecorationLine: "none",
                          //   textDecorationColor: "black",
                          // },
                          a: {
                            textDecorationLine: "none",
                            color: "black",
                          },
                        }}
                      />
                    }
                    leftIcon={
                      // <IconAD
                      //   name="arrowright"
                      //   style={{ lineHeight: 24 }}
                      //   size={18}
                      // />
                      <Text>{index + 1}.</Text>
                    }
                    titleStyle={{ textAlign: "left", padding: 0 }}
                    containerStyle={{
                      display: "flex",
                      alignItems: "flex-start",
                      padding: 3,
                    }}
                  />
                );
              })
            ) : (
              <Text>No Supplement Recommandation</Text>
            )}
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              top: 20,
              marginBottom: 50,
            }}
          >
            <Text style={{ textAlign: "justify" }}>
              To enroll in a monthly vitamin pack and receive a discount on your
              supplements please email:
            </Text>
            <Text style={{ textAlign: "left", marginTop: 15 }}>
              support@b100method.com
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.uid,
    score: state.auth.score,
  };
};

export default connect(mapStateToProps, {})(SupplementsList);
