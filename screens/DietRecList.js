import React from "react";
import { View, Text, Dimensions, ScrollView, Platform } from "react-native";
import { connect } from "react-redux";
import { Header, ListItem, Card } from "react-native-elements";
import IconEn from "react-native-vector-icons/Entypo";
// import IconAD from "react-native-vector-icons/AntDesign";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class DietRecList extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };

  state = {
    recommandation: [],
    fti: {},
    fta: {},
  };

  toResultsScreen = () => {
    this.props.navigation.navigate("results");
  };

  static getDerivedStateFromProps(props, state) {
    if (props.score.masterScore) {
      const scoreData = props.score.masterScore;
      let recommandation = scoreData.filter(function (e) {
        const [FTIObj, FTAObj] = e.option.dietRec;
        const [ftiCategories, ftiProducts] = FTIObj.FTI;
        const [ftaCategories, ftaProducts] = FTAObj.FTA;
        return (
          // ftiCategories.fticategories.length &&
          ftiProducts.ftiproducts.length &&
          // ftaCategories.ftaCategories.length &&
          ftaProducts.ftaproducts.length
        );
      });
      // console.log(recommandation.length, "reco");
      const { categories, products } = props;
      let ftiCategoriesList = [];
      let ftiProductsList = [];
      let ftaCategoriesList = [];
      let ftaProductsList = [];
      let ftCombinedList = recommandation.map((item, index) => {
        const [ftiArray, ftaArray] = item.option.dietRec;
        const [fticategories, ftiproducts] = ftiArray.FTI;
        const [ftaCategories, ftaproducts] = ftaArray.FTA;
        // console.log(fticategories.fticategories, "fticategories");
        // ftiCategoriesList.push(...fticategories.fticategories);
        ftiProductsList.push(...ftiproducts.ftiproducts);
        // ftaCategoriesList.push(...ftaCategories.ftaCategories);
        ftaProductsList.push(...ftaproducts.ftaproducts);
        // const values =fticategories.map((item)=>{
        //   // console.log(item)
        //   return item
        // })
        // console.log(values[0])
        return 1;
      });

      // ftiCategoriesList = ftiCategoriesList.filter(
      //   (value, index, self) =>
      //     index ===
      //     self.findIndex(
      //       (t) => t.value === value.value && t.label === value.label
      //     )
      // );
      ftiProductsList = ftiProductsList.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.value === value.value && t.label === value.label
          )
      );
      // ftaCategoriesList = ftaCategoriesList.filter(
      //   (value, index, self) =>
      //     index ===
      //     self.findIndex(
      //       (t) => t.value === value.value && t.label === value.label
      //     )
      // );
      ftaProductsList = ftaProductsList.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.value === value.value && t.label === value.label
          )
      );

      let FTIproducts = [];
      ftiProductsList.map((item) => {
        const array = products.filter((data) => data._id === item.value)[0];
        FTIproducts.push(array);
      });

      const FTAproducts = [];
      ftaProductsList.map((item) => {
        const array = products.filter((data) => data._id === item.value)[0];
        FTAproducts.push(array);
      });

      const foodToInclude = FTIproducts.reduce(
        (category, { categoryId, productName }) => {
          const categoryName = categories.filter(
            (item) => item._id === categoryId
          )[0].category_name;
          if (!category[categoryName]) category[categoryName] = [];
          category[categoryName].push(productName);
          return category;
        },
        {}
      );

      let foodToAvoid = FTAproducts.reduce(
        (category, { categoryId, productName }) => {
          const categoryName = categories.filter(
            (item) => item._id === categoryId
          )[0].category_name;
          if (!category[categoryName]) category[categoryName] = [];
          category[categoryName].push(productName);
          return category;
        },
        {}
      );

      Object.keys(foodToAvoid).forEach((element) => {
        if (foodToInclude.hasOwnProperty(element)) {
          const uncommonFTA = foodToAvoid[element].filter(
            (value) => !foodToInclude[element].includes(value)
          );
          foodToAvoid[element] = uncommonFTA;
        }
      });

      // console.log(fticategories);
      //   const phase = props.navigation.getParam("phase");
      //   // console.log(phase, "phase number");
      //   recommandation = recommandation.filter((item) => item.phase === phase);
      // console.log("filetered array", recommandation.length);
      //   return { recommandation: recommandation, phase: phase };
      return { fti: foodToInclude, fta: foodToAvoid };
    }
    return null;
  }

  render() {
    const { fti, fta } = this.state;
    const ftiKeys = Object.keys(fti);
    const ftaKeys = Object.keys(fta);

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
            borderColor: "#959494",
            width: SCREEN_WIDTH,
          }}
        >
          <Text
            style={{
              // fontFamily: "Muli-Bold",
              fontSize: 20,
              height: 35,
              marginTop: 5,
              marginBottom: 5,
              paddingVertical: 5,
              textTransform: "uppercase",
              letterSpacing: 0.9,
            }}
          >
            DIET RECOMMENDATIONS
          </Text>
        </View>
        {/* <ScrollView style={{ marginBottom: 40 }}>
          <View>
            {this.state.recommandation && this.state.recommandation.length ? (
              this.state.recommandation.map((item, index) => {
                //   return <Text>{item.question}</Text>;
                return (
                  <View
                    key={index}
                    // style={{ marginTop: 15, marginHorizontal: 15 }}
                  >
                    <Card
                      containerStyle={{
                        padding: 0,
                        backgroundColor: "white",
                        marginBottom: 18,
                      }}
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
                        {item.diet}
                      </Text>
                    </Card>
                  </View>
                );
              })
            ) : (
              <Text>No Recommendation</Text>
            )}
          </View>
        </ScrollView> */}
        <ScrollView>
          <View style={{ display: "flex", flexDirection: "row", flex: 1 }}>
            {/* <View
              style={{
                width: "50%",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                paddingTop: 20,
                paddingLeft: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontFamily: "Muli-Bold",
                  color: "#db4d69",
                  fontWeight: "bold",
                  letterSpacing: 0.8,
                  fontSize: 19,
                }}
              >
                Foods to include:
              </Text>
              <View
                style={{
                  paddingTop: 20,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    letterSpacing: 0.9,
                    fontSize: 18,
                    fontFamily: "Muli-Bold",
                  }}
                >
                  Vegetables:
                </Text>
              </View>
              <View style={{ paddingTop: 5 }}>
                <Text
                  style={{
                    textAlign: "left",
                    letterSpacing: 0.9,
                    fontSize: 17,
                  }}
                >
                  Artichoke{"\n"}Avocado{"\n"}Broccoli{"\n"}Brussels Sprouts
                  {"\n"}
                  Cabbage
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 20,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    letterSpacing: 0.9,
                    fontSize: 18,
                    fontFamily: "Muli-Bold",
                  }}
                >
                  Fruits:
                </Text>
              </View>
              <View style={{ paddingTop: 5 }}>
                <Text
                  style={{
                    textAlign: "left",
                    letterSpacing: 0.9,
                    fontSize: 17,
                  }}
                >
                  Strawberries
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 20,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    letterSpacing: 0.9,
                    fontSize: 18,
                    fontFamily: "Muli-Bold",
                  }}
                >
                  Meats:
                </Text>
              </View>
              <View style={{ paddingTop: 5 }}>
                <Text
                  style={{
                    textAlign: "left",
                    letterSpacing: 0.9,
                    fontSize: 17,
                  }}
                >
                  Herring{"\n"}Mackerel{"\n"}Salmon{"\n"}Sardines{"\n"}Tuna
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 20,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    letterSpacing: 0.9,
                    fontSize: 18,
                    fontFamily: "Muli-Bold",
                  }}
                >
                  Other:
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    letterSpacing: 0.9,
                    fontSize: 17,
                  }}
                >
                  Almonds{"\n"}Chia Seeds{"\n"}Olive Oil{"\n"}Pistachios{"\n"}
                  Walnuts
                </Text>
              </View>
            </View> */}
            <View
              style={{
                width: "50%",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                paddingTop: 20,
                paddingLeft: 20,
                paddingBottom: 30,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontFamily: "Muli-Bold",
                  color: "#db4d69",
                  fontWeight: "bold",
                  letterSpacing: 0.8,
                  fontSize: 19,
                }}
              >
                Foods to include:
              </Text>
              {ftiKeys && ftiKeys.length
                ? ftiKeys.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <View
                          style={{
                            paddingTop: 20,
                            borderBottomColor: "black",
                            borderBottomWidth: 1,
                            marginBottom: 8,
                          }}
                          // key={index}
                        >
                          <Text
                            style={{
                              letterSpacing: 0.9,
                              fontSize: 18,
                              fontFamily: "Muli-Bold",
                            }}
                          >
                            {item}
                          </Text>
                        </View>
                        <View>
                          {fti[item].map((data, index) => {
                            return (
                              <Text
                                style={{
                                  textAlign: "left",
                                  letterSpacing: 0.9,
                                  fontSize: 17,
                                }}
                                key={index}
                              >
                                {data}
                              </Text>
                            );
                          })}
                        </View>
                      </React.Fragment>
                    );
                  })
                : <Text>No Recommendation</Text>}
            </View>
            {/* <View
              style={{
                width: "50%",
                alignItems: "flex-start",
                backgroundColor: "#c9c9c9",
                borderTopLeftRadius: 13,
                paddingTop: 20,
                paddingLeft: 20,
                ...Platform.select({
                  ios: {
                    height:
                      SCREEN_HEIGHT < 900
                        ? SCREEN_HEIGHT - 120
                        : SCREEN_HEIGHT - 135,
                  },
                  android: {
                    height: SCREEN_HEIGHT - (SCREEN_HEIGHT * 0.1 + 35),
                  },
                }),
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontFamily: "Muli-Bold",
                  color: "#db4d69",
                  fontWeight: "bold",
                  letterSpacing: 0.8,
                  fontSize: 19,
                }}
              >
                Foods to Avoid:
              </Text>
              <View
                style={{
                  paddingTop: 20,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 18,
                    letterSpacing: 0.9,
                    fontFamily: "Muli-Bold",
                  }}
                >
                  Meats:
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    letterSpacing: 0.9,
                    fontSize: 17,
                  }}
                >
                  Bacon{"\n"}Hot Dogs{"\n"}Pork{"\n"}Red Meat
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 20,
                  borderBottomColor: "black",
                  borderBottomWidth: 1,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: 18,
                    letterSpacing: 0.9,
                    fontFamily: "Muli-Bold",
                  }}
                >
                  Other:
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    letterSpacing: 0.9,
                    fontSize: 17,
                  }}
                >
                  Alcohol{"\n"}Butter{"\n"}Margine
                </Text>
              </View>
            </View> */}
            <View
              style={{
                width: "50%",
                alignItems: "flex-start",
                backgroundColor: "#c9c9c9",
                borderTopLeftRadius: 13,
                paddingTop: 20,
                paddingLeft: 20,
                paddingBottom: 30,
                // ...Platform.select({
                //   ios: {
                //     height:
                //       SCREEN_HEIGHT < 900
                //         ? SCREEN_HEIGHT - 120
                //         : SCREEN_HEIGHT - 135,
                //   },
                //   android: {
                //     height: SCREEN_HEIGHT - (SCREEN_HEIGHT * 0.1 + 35),
                //   },
                // }),
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontFamily: "Muli-Bold",
                  color: "#db4d69",
                  fontWeight: "bold",
                  letterSpacing: 0.8,
                  fontSize: 19,
                }}
              >
                Foods to Avoid:
              </Text>
              {ftaKeys && ftaKeys.length
                ? ftaKeys.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <View
                          style={{
                            paddingTop: 20,
                            borderBottomColor: "black",
                            borderBottomWidth: 1,
                            marginBottom: 8,
                          }}
                          // key={index}
                        >
                          <Text
                            style={{
                              letterSpacing: 0.9,
                              fontSize: 18,
                              fontFamily: "Muli-Bold",
                            }}
                          >
                            {item}
                          </Text>
                        </View>
                        <View>
                          {fta[item].map((data, index) => {
                            return (
                              <Text
                                style={{
                                  textAlign: "left",
                                  letterSpacing: 0.9,
                                  fontSize: 17,
                                }}
                                key={index}
                              >
                                {data}
                              </Text>
                            );
                          })}
                        </View>
                      </React.Fragment>
                    );
                  })
                :  <Text>No Recommendation</Text>}
            </View>
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
    products: state.auth.products,
    categories: state.auth.categories,
  };
};

export default connect(mapStateToProps, {})(DietRecList);
