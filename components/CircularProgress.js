import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const CircularProgress = () => {
  const [Fill, setFill] = useState(0);

  useEffect(() => {
    if (Fill !== 100) {
      setTimeout(() => {
        setFill(Fill + 1);
      }, 50);
    }
  }, [Fill]);
  return (
    <AnimatedCircularProgress
      size={160}
      width={8}
      fill={Fill}
      tintColor="rgb(255, 76, 110)"
      backgroundColor="#fff"
      style={{
        textAlign: "center",
        marginHorizontal: "auto",
      }}
      childrenContainerStyle={{
        marginHorizontal: "auto",
      }}
      rotation={0}
    >
      {(fill) => (
        <Text
          style={{
            fontSize: 30,
            fontWeight: "700",
          }}
        >
          {Fill}%
        </Text>
      )}
    </AnimatedCircularProgress>
  );
};

export default CircularProgress;
