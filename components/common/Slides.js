import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { Button, Header } from "react-native-elements";
import { badgeActive } from "../../actions";
import { connect } from "react-redux";
import { RFValue } from "react-native-responsive-fontsize";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
//////////////////////////////////////////////////////////////////
//generic slides to be used acrossed the app for instructing the user
class Slides extends Component {
  renderLastSlide = (index, slide) => {
    // console.log(index);
    if (index === this.props.data.length - 1 && !this.props.notNeeded) {
      return (
        <View style={styles.slide}>
          <View style={styles.ViewStyle}>
            <Text style={styles.welcomeMain}>{slide.mainText}</Text>
            <Text
              style={{
                marginTop: "12%",
                marginBottom: "12%",
                fontSize: RFValue(25),
              }}
            >
              Home of the
            </Text>
            <Image
              style={{
                width: SCREEN_WIDTH * 0.7,
                height: SCREEN_WIDTH * 0.2,
                backgroundColor: "transparent",
              }}
              source={slide.image}
            />
            <Text
              style={{ color: "grey", marginTop: "12%", marginBottom: "25%" }}
            >
              {slide.subText}
            </Text>
            <Button
              title="Let's Get Started"
              // ViewComponent={require("expo").linearGradient}
              ViewComponent={require("expo-linear-gradient").LinearGradient}
              linearGradientProps={{
                colors: ["#8FA4C4", "#8FA4C4"],
                start: [1, 0],
                end: [0.2, 0],
              }}
              // onPress={this.onAgreeUseTermPress}
              buttonStyle={styles.buttonStyle}
              onPress={this.props.onComplete}
              containerStyle={{ paddingBottom: "5%" }}
              titleStyle={{
                textAlign: "center",
                paddingTop: 0,
                paddingBottom: 0,
              }}
            />
          </View>
        </View>
      );
    }
    if (index === this.props.data.length - 1 && this.props.notNeeded) {
      // const imageSource = slide.image ? slide.image : require('./../../assets/images/geneticTest.png')
      // console.log(imageSource,"this is image source");
      return (
        <View style={styles.slide}>
          {/* <View style={{ height: SCREEN_HEIGHT * 0.2 }} /> */}
          <Image
            source={require("./../../assets/images/geneticTest.png")}
            // source={slide.image ? slide.image : require("./../../assets/images/homeKit.png")}
            resizeMode="contain"
            style={{
              backgroundColor: "transparent",
              flex: 0,
              marginTop: -50,
              marginBottom: 40,
              height: SCREEN_HEIGHT * 0.4,
              width: SCREEN_WIDTH,
            }}
          />

          <View style={{ width: SCREEN_WIDTH * 0.7, alignSelf: "center" }}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Muli-SemiBold",
                fontSize: 20,
                marginTop: "00%",
                marginBottom: "00%",
              }}
            >
              {slide.mainText}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Muli-SemiBold",
                fontSize: 14,
              }}
            >
              {slide.subText}
            </Text>
          </View>
          <Button
            title="Next"
            // ViewComponent={require("expo").linearGradient}
            ViewComponent={require("expo-linear-gradient").LinearGradient}
            linearGradientProps={{
              colors: ["#8FA4C4", "#8FA4C4"],
              start: [1, 0],
              end: [0.2, 0],
            }}
            titleStyle={{
              paddingBottom: 0,
              paddingTop: 0,
              fontSize: 20,
              // fontWeight: "bold",
            }}
            // onPress={this.onAgreeUseTermPress}
            buttonStyle={styles.buttonStyle}
            onPress={this.props.onComplete}
            containerStyle={{ paddingBottom: "5%" }}
          />
        </View>
      );
    }
    return (
      <View style={styles.slide}>
        {/* <View style={{ height: SCREEN_HEIGHT * 0.2 }} /> */}
        <Image
          // source={imageSource}
          // source={slide.image ? slide.image : require('./../../assets/images/homeKit.png')}
          source={require("./../../assets/images/geneticTest.png")}
          resizeMode="contain"
          style={{
            backgroundColor: "transparent",
            //flex: 2,
            marginTop: -70,
            marginBottom: 50,
            height: SCREEN_HEIGHT * 0.4,
            width: SCREEN_WIDTH,
          }}
        />

        <View style={{ width: SCREEN_WIDTH * 0.7, alignSelf: "center" }}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Muli-SemiBold",
              fontSize: 20,
            }}
          >
            {slide.mainText}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "Muli-SemiBold",
              fontSize: 14,
            }}
          >
            {slide.subText}
          </Text>
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
      <View style={{ flex: 1, marginBottom: 10 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
            { useNativeDriver: false }
          )}
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
                    marginTop: "10%",
                    bottom: "10%",
                    height: 10,
                    width: 10,
                    backgroundColor: "#595959",
                    margin: 4,
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
    flex: 3,
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
    width: SCREEN_WIDTH * 0.7,
  },
  HeaderStyle: {
    width: SCREEN_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#484649",
  },
  mainTextStyle: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 30,
  },
  subTextStyle: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 15,
  },
  welcomeMain: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: RFValue(36),
    marginTop: "15%",
  },
  welcomeText: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: 15,
  },
  buttonStyle: {
    marginTop: 15,
    width: SCREEN_WIDTH * 0.85,
    // width:"100%",
    // height: SCREEN_HEIGHT * 0.08,
    alignSelf: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    // fontWeight: "bold",
    height: 50,
  },
};

export default connect(null, { badgeActive })(Slides);
