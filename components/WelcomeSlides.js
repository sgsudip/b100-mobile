import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { Button } from "react-native-elements";
const SCREEN_WIDTH = Dimensions.get("window").width;
////////////////////////////////////////////////////////////////
//the acutil slides that will grab the info from welcome screen and desplay the content passed from welcom screen
class WelcomeSlides extends Component {
  renderLastSlide = (index, slide) => {
    if (index === this.props.data.length - 1) {
      return (
        <View style={styles.slide}>
          <View style={styles.ViewStyle}>
            <Text style={styles.mainTextStyle}>{slide.mainText}</Text>
          </View>
          <View style={styles.ViewStyle}>
            <Image
              style={styles.ViewStyle}
              resizeMode="contain"
              source={slide.image}
            />
          </View>
          <View style={styles.ViewStyle}>
            <Text style={styles.subTextStyle}>{slide.subText}</Text>
          </View>
          <Button
            title="LETS GET STARTED!"
            // ViewComponent={require("expo").linearGradient}
            ViewComponent={require("expo-linear-gradient").LinearGradient}
            linearGradientProps={{
              colors: ["#8FA4C4", "#8FA4C4"],
              start: [1, 0],
              end: [0.2, 0],
            }}
            // onPress={this.onAgreeUseTermPress}
            buttonStyle={{
              borderRadius: 7,
            }}
            containerStyle={{
              margin: "2%",
            }}
            onPress={this.props.onComplete}
            titleStyle={{
              textAlign: "center",
              paddingTop: 0,
              paddingBottom: 0,
            }}
          />
        </View>
      );
    }

    return (
      <View style={styles.slide}>
        <View style={{ flex: 1 }} />
        <Image
          source={slide.image}
          resizeMode="contain"
          style={{
            flex: 2,
            height: undefined,
            width: undefined,
          }}
        />
        <View />
        <View style={styles.accStyle}></View>
        <View style={styles.ViewStyle}>
          <Text style={styles.mainTextStyle}>{slide.mainText}</Text>
        </View>
        <View style={styles.ViewStyle}>
          <Text style={styles.subTextStyle}>{slide.subText}</Text>
        </View>
      </View>
    );
  };

  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View key={slide.mainText} style={styles.slideStyle}>
          <View></View>
          {this.renderLastSlide(index, slide)}
        </View>
      );
    });
  }
  scrollX = new Animated.Value(0);
  render() {
    let position = Animated.divide(this.scrollX, SCREEN_WIDTH);
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            { useNativeDriver: false }
          )}
          // scrollEventThrottle={16}
          scrollEventThrottle={26}
        >
          {this.renderSlides()}
        </ScrollView>
        <View style={styles.slideStyle}>
          <ScrollView horizontal pagingEnabled>
            {this.props.data.map((_, i) => {
              let opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3],
                extrapolate: "clamp",
              });
              return (
                <Animated.View
                  key={i}
                  style={{
                    opacity,
                    paddingBottom: "5%",
                    bottom: "10%",
                    height: 10,
                    width: 10,
                    backgroundColor: "#595959",
                    margin: 8,
                    borderRadius: 5,
                  }}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = {
  B100Style: {
    alignItems: "center",
    alignSelf: "center",
    flex: 4,
  },
  accStyle: {
    alignItems: "center",
    alignSelf: "center",
    flex: 2,
  },
  slideStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: SCREEN_WIDTH,
  },
  firstScreenTextView: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.9,
    fontFamily: "Muli-SemiBold",
    flex: 1,
    bottom: 0,
  },

  ViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
    width: SCREEN_WIDTH * 0.8,
  },
  HeaderStyle: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#484649",
  },
  mainTextStyle: {
    fontFamily: "Muli-SemiBold",
    fontSize: 30,
  },
  subTextStyle: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 15,
  },
  buttonStyle: {
    marginTop: 15,
  },
};

export default WelcomeSlides;
