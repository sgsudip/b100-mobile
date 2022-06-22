import React from "react";
import { View, ActivityIndicator } from "react-native";

const MyActivityIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="small" color="#8FA4C4" />
    </View>
  );
};

export default MyActivityIndicator;
