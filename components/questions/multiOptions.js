import React from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Option from "./OptionButton";
import images from "../../assets/images";
import { Button } from "react-native-elements";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
class MultiOptions extends React.PureComponent {
  onpress = () => {
    this.setState({ selected: !this.state.selected });
    this.props.onOpPress();
  };
  UNSAFE_componentWillReceiveProps = () => {
    // console.log("from multioption screen");
  };
  state = {
    selected: false,
  };
  render() {
    return (
      <Option
        item={this.props.item}
        hasImages={false}
        option={this.state.selected}
        optionPressed={this.onpress}
      />
    );
  }
}
const styles = StyleSheet.create({
  mainTextStyle: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 15,
    color: "black",
  },
});
export default MultiOptions;
