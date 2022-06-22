import React, { Component } from "react";
import FillIn from "./questions/fillInQuestion";
import YesNo from "./questions/yesNoQuestion";
import Multi from "./questions/multiQuestion";
import Single from "./questions/singleChoice";
import { View, Text } from "react-native";
const questionType = ({ item, onNextPress, nav, prog = () => {} }) => {
  ///////////////////////////////////////////////////////////////
  //brake out for each question type. allows for dynamic changes
  // in the types of questions that are asked

  type = (item, onNextPress) => {
    switch (item.questionType) {
      case "MULTI-CHOICE":
        return <Multi item={item} onNextPress={onNextPress} prog={prog} />;
      case "SINGLE-CHOICE":
        return (
          <Single item={item} onNextPress={onNextPress} prog={prog} nav={nav} />
        );
      case "HIDDEN":
        return <FillIn item={item} onNextPress={onNextPress} prog={prog} />;
      case "YES-NO":
        return (
          <YesNo prog={prog} item={item} onNextPress={onNextPress} nav={nav} />
        );
      default:
        return <View></View>;
    }
  };
  return type(item, onNextPress);
};
export default questionType;
