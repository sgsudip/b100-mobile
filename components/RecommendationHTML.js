import React, { memo } from "react";
import { Dimensions } from "react-native";
import RenderHTML from "react-native-render-html";

const SCREEN_WIDTH = Dimensions.get("window").width;

const RecommandationHTML = ({ moreText, recNo, index, htmlSource }) => {
  return (
    <RenderHTML
      baseStyle={{
        textAlign: "auto",
        fontSize: 14,
        opacity: 0.8,
        whiteSpace: "pre",
        lineHeight: 20,
        fontFamily: "Muli-Regular",
        maxHeight: moreText && recNo === index ? "100%" : 100,
        overflow: "hidden",
      }}
      contentWidth={SCREEN_WIDTH}
      source={{
        html: htmlSource,
      }}
    />
  );
};

// export default memo(RecommandationHTML);
export default RecommandationHTML;
