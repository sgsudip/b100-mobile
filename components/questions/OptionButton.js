import React, { useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Card } from "react-native-elements";
import { Tooltip } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const GetSplitString = (str, i) => {
  let String = str.split("(");

  if (i === 1) {
    return String[i].replace(")", "");
  } else {
  }
  return String[i];
};

export default ({ hasImages, item, optionPressed, options, question }) => {
  const tooltipRef = useRef(null);

  if (hasImages) {
    return (
      <TouchableOpacity onPress={optionPressed}>
        <View
          style={{
            backgroundColor: options ? "#E54360" : "#f2f2f2",
            borderWidth: 1,
            borderColor: "lightgrey",
            minHeight: SCREEN_HEIGHT * 0.2,
            padding: 0,
            marginBottom: 10,
            marginRight: "10%",
            width: SCREEN_WIDTH * 0.4,
            borderRadius: 10,
            alignSelf: "flex-start",
          }}
        >
          <Image
            source={{ uri: item.image }}
            style={{
              resizeMode: "cover",
              width: SCREEN_WIDTH * 0.4,
              height: SCREEN_HEIGHT * 0.15,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}
          />
          <Text
            style={{
              marginBottom: 10,
              marginLeft: 10,
              textAlign: "left",
              textAlignVertical: "center",
              fontFamily: "Muli-SemiBold",
              fontSize: 15,
              color: options ? "white" : "black",
            }}
          >
            {item.option_choice_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <>
      {item.option_choice_name.includes("(") &&
      (question.question.includes("region is your family") ||
        question.question.includes("body shape", "identify") ||
        question.question.includes("describes your personality") ||
        question.question.includes("sleep at night")) ? (
        // <Tooltip
        //   popover={<Text>{GetSplitString(item.option_choice_name, 1)}</Text>}
        // >
        <View style={{ position: "relative" }}>
          <Button
            title={GetSplitString(item.option_choice_name, 0)}
            // contentStyle={{ flexDirection: "row-reverse" }}
            // icon={

            //   // <Icon
            //   //   name="info"
            //   //   size={15}
            //   //   color="blue"
            //   //   style={{ position:"absolute", top:12, right:10 }}
            //   // />
            // }
            buttonStyle={{
              justifyContent: "flex-start",
              borderColor: "lightgrey",
              borderWidth: 1,
              marginVertical: 9,
              backgroundColor: options ? "#E54360" : "#f2f2f2",
              borderRadius: 10,
              // paddingVertical: 12,
            }}
            titleStyle={{
              textAlign: "left",
              textAlignVertical: "center",
              fontFamily: "Muli-SemiBold",
              fontSize: 15,
              color: options ? "white" : "black",
              paddingBottom: 0,
              paddingTop: 0,
            }}
            onPress={optionPressed}
          />
          <View
            style={{
              position: "absolute",
              top: 13,
              right: 10,
              // zIndex: "99",
            }}
          >
            <Tooltip
              ref={tooltipRef}
              width={200}
              height={200}
              withOverlay={false}
              skipAndroidStatusBar={true}
              containerStyle={{ backgroundColor: "#ff4c6e" }}
              pointerColor="#ff4c6e"
              // overlayColor="rgba(250, 150, 250, 0.70)"
              popover={
                <Text style={{ textAlign: "center", color: "white" }}>
                  {GetSplitString(item.option_choice_name, 1)}
                </Text>
              }
            >
              <Text style={{ textAlign: "right" }}>
                <Icon
                  name="information-variant"
                  size={30}
                  color="gray"
                  style={{
                    position: "absolute",
                    // top: -13,
                    // right: 5,
                    // alignContent: "flex-end",
                  }}
                />
              </Text>
            </Tooltip>
          </View>
          {/* </Button> */}
        </View>
      ) : (
        //  {/* <Tooltip
        //     width={200}
        //     height={200}
        //     popover={<Text>{GetSplitString(item.option_choice_name, 1)}</Text>}
        //   >
        //     <Text>A</Text>
        //   </Tooltip> */}
        <Button
          title={item.option_choice_name}
          buttonStyle={{
            justifyContent: "flex-start",
            borderColor: "lightgrey",
            borderWidth: 1,
            marginVertical: 9,
            backgroundColor: options ? "#E54360" : "#f2f2f2",
            borderRadius: 10,
            // paddingVertical: 12,
          }}
          titleStyle={{
            textAlign: "left",
            textAlignVertical: "center",
            fontFamily: "Muli-SemiBold",
            fontSize: 15,
            color: options ? "white" : "black",
            paddingBottom: 0,
            paddingTop: 0,
          }}
          onPress={optionPressed}
        />
      )}

      {/* <Button
        title={item.option_choice_name}
        buttonStyle={{
          justifyContent: "flex-start",
          borderColor: "lightgrey",
          borderWidth: 1,
          marginVertical: 9,
          backgroundColor: options ? "#E54360" : "#f2f2f2",
          borderRadius: 10,
        }}
        titleStyle={{
          textAlign: "left",
          textAlignVertical: "center",
           fontFamily: "Muli-SemiBold",
          fontSize: 15,
          color: options ? "white" : "black",
          paddingBottom: 0,
          paddingTop: 0,
        }}
        onPress={optionPressed}
      /> */}
      {/* {item.option_choice_name.includes("(") && (
        <Tooltip popover={<Text>Info here</Text>}>
          <Text>A</Text>
        </Tooltip>
      )} */}
    </>
  );
};
