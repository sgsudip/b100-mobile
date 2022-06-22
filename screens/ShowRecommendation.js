import React from "react";
import { Text, View, Dimensions, ScrollView } from "react-native";
import { Card, Header } from "react-native-elements";
import RenderHTML from "react-native-render-html";
import LinkArray from "../constants/LinkArray";
import Icon from "react-native-vector-icons/Entypo";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const date = new Date();

class ShowRecommendation extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  insertTextAtIndices = (text, value) => {
    return value.replace(/./g, function (character, index) {
      return text[index] ? text[index] + character : character;
    });
  };

  setClickHere = (text, choice) => {
    // let text =
    //   "Suffering a stroke is a stressful, life-altering ordeal, to say the least. Yet, one in four people will have another stroke at some point in their lives. It is important to understand that each subsequent stroke will leave you less resilient, therefore, it is crucial that you have a clear understanding of what caused your stroke in the first place as those risk factors are most likely still present. There are two main categories of stroke: hemorrhagic and ischemic. If your stroke was hemorrhagic, or a bleeding stroke, we recommend good blood pressure control. Sustained high blood pressure can cause blood vessels to become weakened and damaged, leading to a stroke. For this reason, you should have a blood pressure monitor at home and take your blood pressure reading weekly following these instructions. Try to aim for a reading of LESS than 140/90. If your stroke was an ischemic, or clotting stroke, determining what caused the clot to form is critical. To determine this, your cardiologist will look at the blood vessels in your head and neck. Fortunately, 80 percent of recurrent strokes can be prevented with diet modification, exercise, blood pressure control, cholesterol reduction with the help of statins, and treatment with antiplatelet medications. We typically recommend aspirin and cholesterol medication to reduce the risk of ischemic stroke. Aspirin keeps the platelets in your blood from sticking together. Cholesterol medications lower LDL (or “bad” cholesterol). Statins, in particular, are known to work in concert with aspirin to reduce ischemic stroke risk. For the other 20% there may be underlying genetic conditions. Understanding your genetic susceptibility for heart disease risk factors is crucial.To learn yours you can order the B100 Genetics home test by clicking here. You will also want to be sure you are brushing and flossing every day! Improved gum health may slow the progression of atherosclerosis or narrowing of the arteries. I recommend the waterpik. You can find one on Amazon. Additionally, please get checked for Atrial fibrillation (Afib). An irregular and sometimes rapid heartbeat greatly increases the risk of stroke. It’s a serious condition that can cause blood clots in the heart, which can travel and trigger ischemic strokes and ask your cardiologist for an annual carotid artery ultrasound. For additional heart health tips by Dr. B click here.";
    if (
      (text.includes("BMI") || text.includes("pack years")) &&
      text.includes("_______")
    ) {
      let recommended = text.split("_______");
      return recommended[0] + choice + recommended[1];
    } else if (text.includes("_____")) {
      let recommended = text.split("_____");
      return recommended[0] + choice + recommended[1];
    }
    var obj = {};
    let link = [];
    for (let i = 0; i < LinkArray.length; i++) {
      if (text.includes(LinkArray[i].key) && text.includes(LinkArray[i].id)) {
        // console.log(LinkArray[i].value.toString());
        let startIndex = text.indexOf(LinkArray[i].key);
        let endIndex = LinkArray[i].key.length + startIndex;
        obj = {
          ...obj,
          [startIndex]: `<a href=${LinkArray[i].value}>`,
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
    const { question } = this.props.score;

    const { optionChoiceName, score } = this.props.score.option;

    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          //   centerComponent={{
          //     text: "Test Recommandation",
          //     style: {
          //       fontFamily: "Muli-SemiBold",
          //       fontSize: 20,
          //       color: "black",
          //     },
          //   }}
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
          <Icon
            name="chevron-thin-left"
            onPress={this.props.onBackPress}
            style={{ marginLeft: "10%", fontSize: 24 }}
            underlayColor="transparent"
            color="#f2f2f2"
          />
        </Header>
        <ScrollView style={{ flex: 1, backgroundColor: "#e9ecef" }}>
          <View
            style={{
              // width: SCREEN_WIDTH * 0.93,
              backgroundColor: "#e9ecef",
              height: "100%",
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              paddingBottom: 20,
            }}
          >
            <Card
              containerStyle={{
                borderRadius: 5,
                borderColor: "#fff",
                // backgroundColor: "transparent",
                width: SCREEN_WIDTH * 0.9,
                borderRadius: 10,
                borderBottomColor: "#ff4c6eb3",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    color: "#a9a9a9",
                    fontSize: 14,
                    marginBottom: 8,
                  }}
                >
                  Date:{" "}
                  {date.getMonth() +
                    1 +
                    "-" +
                    date.getDate() +
                    "-" +
                    date.getFullYear()}
                </Text>
              </View>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 7,
                }}
              >
                {question}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 14,
                  color: "#db4d69",
                  marginBottom: 8,
                }}
              >
                {question.includes("BMI")
                  ? "Your BMI was calculated to be:"
                  : "option chosen:"}{" "}
                {optionChoiceName}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 16,
                  marginBottom: 8,
                }}
              >
                Recommandation:
              </Text>
              <RenderHTML
                baseStyle={{
                  textAlign: "justify",
                  fontSize: 14,
                  opacity: 0.8,
                  // fontWeight: "100",
                  whiteSpace: "pre",
                  lineHeight: 20,
                  fontFamily: "Muli-Regular",
                  // wordBreak: "break-word",
                  // maxHeight:
                  //   this.state.moreText && this.state.recNo === index ? "100%" : 100,
                  // overflow: "hidden",
                }}
                contentWidth="100%"
                source={{
                  html: this.setClickHere(
                    score.recommendations,
                    optionChoiceName
                  ),
                }}
                // source={{html:"<a>aaassdniaaadsfiifgbngfjkgdfhgiudfh iughdiugh digh dih</a>"}}
              />
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ShowRecommendation;
