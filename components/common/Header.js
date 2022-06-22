import React from "react";
import { Text, View } from "react-native";
export default (props) => {
  return (
    <View style={{ width: "100%", height: 45, backgroundColor: "#606070" }}>
      <Text
        style={{
          textAlign: "center",
          color: "#fff",
          fontSize: 18,
          padding: 7,
        }}
      >
        This is Header
      </Text>
    </View>
  );
};
