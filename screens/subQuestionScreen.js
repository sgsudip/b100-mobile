import _ from "lodash";
import React, { Component } from "react";
import { StyleSheet, Dimensions, FlatList, View, Text } from "react-native";
import QuestionType from "../components/questionType";
import { connect } from "react-redux";
import { slideindex } from "../actions";
import { Header, Icon } from "react-native-elements";
import * as Progress from "react-native-progress";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class subQuestion extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      tabBarVisible: false,
    };
  };
  // componentWillMount = () => {};
  state = {
    index: 0,
  };
  onCancelPress = () => {
    this.props.navigation.navigate("Home");
    this.props.slideindex(0);
    this.flatListRef.scrollToIndex({ animated: true, index: 0 });
  };
  onBackPress = async () => {
    if (this.state.index > 0) {
      await this.setState({ index: this.state.index - 1 });
      this.flatListRef.scrollToIndex({
        animated: true,
        index: this.state.index,
      });
    } else {
      await this.props.slideindex(this.props.mainIndex - 1);
      this.props.navigation.navigate("Quest");
    }
  };
  scrollToItem = (index) => {
    index++;
    this.setState({ index });
    if (index < this.props.subQuestion.length)
      this.flatListRef.scrollToIndex({ animated: true, index });
    else {
      this.props.navigation.navigate("Quest");
      this.flatListRef.scrollToIndex({ animated: true, index: 0 });
    }
  };
  render() {
    return (
      <View
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
        }}
      >
        <Header
          placement="center"
          // containerStyle={{
          //   backgroundColor: '#ff4c6e',borderBottomWidth:0, padding:0,margin:0}}
          containerStyle={{
            borderBottomWidth: 0,
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
          <Icon
            name="arrow-back"
            color="#f2f2f2"
            underlayColor="transparent"
            onPress={this.onBackPress}
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
          <Icon
            name="cancel"
            color="#f2f2f2"
            underlayColor="transparent"
            onPress={this.onCancelPress}
          />
        </Header>
        <View
          style={{
            // backgroundColor: "black",
            padding: 0,
            margin: 0,
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 10,
              zIndex: 999999,
              width: SCREEN_WIDTH * 0.8,
            }}
          >
            <Progress.Bar
              progress={this.state.progress}
              color={"#ff4c6e"}
              animated={false}
              unfilledColor={"rgba(251, 33, 33, .36)"}
              borderWidth={0}
              width={null}
            />
          </View>
          <View
            style={{
              alignSelf: "flex-start",
              zIndex: 0,
              padding: 0,
              marginTop: 0,
              top: 0,
              borderWidth: 0,
            }}
          >
            <FlatList
              contentContainerStyle={{ padding: 0, marginTop: 0 }}
              ListHeaderComponentStyle={{
                padding: 0,
                marginTop: 0,
                height: 0,
                top: 0,
                borderWidth: 0,
              }}
              ListHeaderComponent={<View />}
              data={this.props.subQuestion}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.q._id}
              initialScrollIndex={0}
              initialNumToRender={1}
              maxToRenderPerBatch={1}
              horizontal
              scrollEnabled={false}
              getItemLayout={(data, index) => ({
                length: SCREEN_WIDTH,
                offset: SCREEN_WIDTH * index,
                index,
              })}
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              renderItem={({ item, index }) => (
                <QuestionType
                  prog={() => {}}
                  onNextPress={(chosen) =>
                    this.scrollToItem(index, item, chosen)
                  }
                  item={item}
                  nav={this.props.navigation}
                />
              )}
            />
          </View>
        </View>
      </View>
    );
  }

  //   render() {
  //     return (
  //       <View style={{flex:1}}>
  //       <Header
  //   placement="center"
  //   containerStyle={{
  //     backgroundColor: '#ff4c6e',}} >
  //     <Icon
  // name= 'arrow-back'
  // color="#f2f2f2"
  // underlayColor="transparent"
  // onPress={this.onBackPress}
  // />
  // <Text style= {{  fontFamily:'Muli-SemiBold',
  //   fontSize:20,
  //   color:"#f2f2f2", }}>B100</Text>
  // <Icon
  // name= 'cancel'
  // color="#f2f2f2"
  // underlayColor="transparent"
  // onPress={this.onCancelPress}
  // />
  // </Header>
  //       <View
  //         style={{justifyContent:"center",
  //         alignItems:"center"}}>
  //        <View
  //         style={{
  //           position:"absolute",
  //           top: 10,
  //           zIndex:999999,
  //           width:SCREEN_WIDTH*.8}}
  //         >
  //         <Progress.Bar
  //         progress={this.props.prog}
  //         color={"#ff4c6e"}
  //         animated={false}
  //         unfilledColor={"rgba(251, 33, 33, .36)"}
  //         borderWidth={0}
  //         width={null}/>
  //         </View>
  //         <View style={{ zIndex:0}}>
  //         <FlatList
  //         data={this.props.subQuestion}

  //         contentContainerStyle={{ padding: 0, marginTop: 0 }}
  //         ListHeaderComponentStyle={{ padding: 0, marginTop: 0, height: 0, top: 0, borderWidth: 0 }}
  //         ListHeaderComponent={<View />}
  //         showsHorizontalScrollIndicator={false}

  //         keyExtractor={item => item.q._id}
  //         initialScrollIndex={0}
  //         initialNumToRender={1}
  //         maxToRenderPerBatch={1}
  //         horizontal
  //         scrollEnabled={false}

  //         scrollEnabled={false}
  //         getItemLayout={(data, index) => (
  //             {length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index, index}
  //         )}
  //         ref={(ref) => { this.flatListRef = ref; }}
  //         renderItem={({ item, index}) => (
  //         <QuestionType
  //         onNextPress={this.scrollToItem.bind(this, index)}
  //         item={item}

  //         />
  //     )}/>
  //     </View>
  //     </View>

  //     </View>
  //     );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 220,
    paddingTop: 15,
    backgroundColor: "#fff",
  },
  slideStyle: {
    justifyContent: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.9,
  },
  ProgressContainer: {
    paddingTop: "5%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
const mapStateToProps = (state) => {
  return {
    subQuestion: state.quest.SubQuestion,
    prog: state.quest.prog,
    mainIndex: state.quest.mainIndex,
  };
};

export default connect(mapStateToProps, { slideindex })(subQuestion);
