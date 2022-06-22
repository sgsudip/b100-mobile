import _ from "lodash";
import React, { Component } from "react";
import { StyleSheet, Dimensions, FlatList, View, Text } from "react-native";
import { Header, Icon } from "react-native-elements";
import QuestionType from "../components/questionType";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import { prog, slideindex, loadQuestions } from "../actions";

const SCREEN_WIDTH = Dimensions.get("window").width;

class ProfileQuestions extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };
  UNSAFE_componentWillMount = async () => {
    await this.setState({ length: this.props.quest.length - 1 });
    await this.flatListRef.scrollToIndex({
      animated: true,
      index: this.props.mainIndex,
    });
  };
  state = {
    lenght: 0,
    progress: 0,
    index: 0,
    slideindex: 0,
  };
  onCancelPress = () => {
    this.setState({ index: 0 });
    this.setState({ progress: 0 });
    this.props.prog(this.state.progress);
    this.props.slideindex(this.state.index);
    this.props.navigation.navigate("Home");
    this.flatListRef.scrollToIndex({ animated: true, index: 0 });
  };
  onBackPress = async () => {
    if (this.state.index === 0) {
      this.props.navigation.navigate("Home");
    } else {
      await this.setState({ index: this.state.index - 1 });
      this.setState({ progress: this.state.index / this.state.length });
      this.props.prog(this.state.progress);
      this.flatListRef.scrollToIndex({
        animated: true,
        index: this.state.index,
      });
    }
  };
  scrollToItem(index, item) {
    index++;
    this.setState({ progress: index / this.state.length });
    this.setState({ index });
    this.props.slideindex(index);
    this.props.prog(this.state.progress);
    if (index !== this.props.quest.length)
      this.flatListRef.scrollToIndex({ animated: true, index: index });
    else {
      this.props.navigation.navigate("reward");
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
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
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                top: "2%",

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

            <FlatList
              data={this.props.quest}
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
                  onNextPress={this.scrollToItem.bind(this, index, item)}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    progg: state.quest.progg,
    mainIndex: state.quest.mainIndex,
    quest: state.quest.Phase_0,
  };
};

export default connect(mapStateToProps, { prog, slideindex, loadQuestions })(
  ProfileQuestions
);
