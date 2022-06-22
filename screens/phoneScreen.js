import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Keyboard,
  Platform,
  Dimensions,
} from "react-native";
import { Form, Item, Input } from "native-base";
// import * as Permissions from "expo-permissions";
import { connect } from "react-redux";
import { phoneNumberChange, generateCode, fillProfile } from "../actions/index";
import { Header, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import country from "../assets/country.json";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

import { RFValue } from "react-native-responsive-fontsize";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class PhoneScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false,
  };
  // componentWillMount = async () => {};

  UNSAFE_componentWillReceiveProps() {
    if (this.props.phoneNum !== "") {
      this.setState({ continuebool: false });
    }
  }

  state = {
    continuebool: true,
    countryCode: "1",
    modalVisible: false,
    filterdCountryList: country,
    countryList: country,
  };
  onSearch(keyword) {
    this.state.filterdCountryList = [];
    const result = this.state.countryList.filter((item) => {
      if (item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        return true;
      }
    });
    this.setState({ filterdCountryList: result });
  }
  onComplete = () => {
    if (this.state.phoneNumber !== undefined) {
      if (this.state.phoneNumber.length === 12) {
        this.props.generateCode(this.state.phoneNumber);
        this.props.phoneNumberChange(this.state.phoneNumber);
        this.props.navigation.navigate("varify");
      } else {
        alert("Phone number must be of 10 characters");
      }
    } else {
      alert("Please enter phone number");
    }
  };
  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false, filterdCountryList: country });
  }
  selectCountry = (countryCode) => {
    //alert(countryCode)
    this.setState({ countryCode: "" + countryCode });
    this.closeModal();
  };
  renderRowCountry = (item, index) => {
    let textData = item.country_code + " " + item.name;
    return (
      <View style={styles.ListItem}>
        <TouchableOpacity
          style={styles.ListText}
          onPress={() => this.selectCountry(item.country_code)}
        >
          <Text>{textData}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          placement="center"
          centerComponent={{
            text: "B100",
            style: {
              fontFamily: "Muli-SemiBold",
              fontSize:
                Platform.OS === "ios" ? 17 : SCREEN_WIDTH < 575 ? 20 : 22,
              color: "#f2f2f2",
            },
          }}
          containerStyle={{
            backgroundColor: "#ff4c6e",
            ...Platform.select({
              ios: {
                height: SCREEN_HEIGHT < 900 ? 85 : 100,
              },
              android: {
                height: SCREEN_HEIGHT * 0.1,
                paddingHorizontal: 7,
                paddingTop: 0,
              },
            }),
          }}
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled
          enableOnAndroid
          enableAutomaticScroll
        >
          <View style={styles.mainTextView}>
            <Text style={styles.mainTextText}>
              We need to make sure you are a real person.
            </Text>
          </View>
          <Form style={styles.countryForm}>
            <Item
              fixedLabel
              style={[styles.Item, { paddingLeft: 0, paddingRight: 0 }]}
            >
              <TouchableOpacity
                style={styles.countryCodeTouch}
                onPress={() => this.openModal()}
              >
                <Text style={styles.countryCode}>
                  +{this.state.countryCode}
                </Text>
              </TouchableOpacity>
              <Input
                style={styles.CodeInput}
                placeholder="000 000 0000"
                maxLength={14}
                keyboardType="numeric"
                textContentType="telephoneNumber"
                value={this.state.phoneNumber}
                onChangeText={(text) => {
                  var number = text.replace(/[^\d]/g, "");
                  if (
                    number.length == 3 &&
                    number.length >= this.state.phoneNumber.length
                  ) {
                    number = number + " ";
                  } else if (number.length >= 4 && number.length <= 6) {
                    number =
                      number.substring(0, 3) +
                      " " +
                      number.substring(3, number.length);
                  } else if (number.length >= 7) {
                    number =
                      number.substring(0, 3) +
                      " " +
                      number.substring(3, 6) +
                      " " +
                      number.substring(6, number.length);
                    if (number.length == 12) {
                      Keyboard.dismiss();
                    } else if (number.length === 13) {
                      Keyboard.dismiss();
                      number =
                        number.substring(0, 1) +
                        " " +
                        number.substring(1, 4) +
                        " " +
                        number.substring(4, 7) +
                        number.substring(7, number.length);
                    }
                  }
                  this.setState({ phoneNumber: number });
                }}
              />
            </Item>
          </Form>
          <View>
            <Text style={(styles.mainTextText, { fontSize: 16 })}>
              Please enter your phone number to get started
            </Text>
          </View>
        </KeyboardAwareScrollView>
        <View
          style={{
            // flex: 1,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Button
            rounded
            title="Continue"
            onPress={this.onComplete}
            // ViewComponent={require("expo").linearGradient}
            titleStyle={{
              textAlign: "center",
              paddingTop: 0,
              paddingBottom: 0,
            }}
            ViewComponent={require("expo-linear-gradient").LinearGradient}
            linearGradientProps={{
              colors: ["#8FA4C4", "#8FA4C4"],
              start: [1, 0],
              end: [0.2, 0],
            }}
            buttonStyle={{
              width: SCREEN_WIDTH * 0.85,
              alignSelf: "center",
              backgroundColor: "#8FA4C4",
              alignContent: "center",
              height: 50,
              bottom: 20,
            }}
          />
        </View>
        <Modal
          visible={this.state.modalVisible}
          animationType={"slide"}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <Header
              placement="center"
              centerComponent={{
                text: "B100",
                style: {
                  fontFamily: "Muli-SemiBold",
                  fontSize: 20,
                  color: "#f2f2f2",
                },
              }}
              containerStyle={{
                backgroundColor: "#ff4c6e",
                height: Platform.OS === "ios" ? 100 : 80,
              }}
            />
            <View style={styles.innerContainer}>
              <View style={styles.searchBox}>
                <Item
                  fixedLabel
                  style={[
                    styles.Item,
                    styles.searchItem,
                    styles.marginBottomNull,
                  ]}
                >
                  <View style={styles.searchIcon}>
                    <Icon name="search" size={20} />
                  </View>
                  <Input
                    style={styles.Input}
                    placeholder="Search country"
                    onChangeText={(text) => this.onSearch(text)}
                  />
                </Item>
              </View>

              <FlatList
                data={this.state.filterdCountryList}
                renderItem={({ item, index }) =>
                  this.renderRowCountry(item, index)
                }
                keyExtractor={(item, index) => index}
                extraData={this.state}
                keyboardShouldPersistTaps="always"
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ListItem: {
    paddingTop: 2,
    paddingBottom: 2,
    marginRight: 10,
    marginLeft: 2,
    borderColor: "rgb(237,238,239)",
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    width: "100%",
    paddingHorizontal: "10%",
  },
  countryCodeTouch: {
    paddingRight: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 2 : -4,
  },
  countryCode: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: RFValue(20),
  },
  mainTextView: {
    // flex: 1,
    // top: "10%",
  },
  CodeInput: {
    textAlign: "center",
    fontFamily: "Muli-SemiBold",
    fontSize: RFValue(20),
    height: 60,
  },
  phoneNumberTextView: {
    textAlign: "center",
    fontSize: RFValue(20),
  },
  mainTextText: {
    textAlign: "center",
    fontSize: RFValue(20),
  },
});

mapStateToProps = (state) => {
  return {
    phoneNum: state.auth.phoneNumber,
  };
};

export default connect(mapStateToProps, {
  phoneNumberChange,
  generateCode,
})(PhoneScreen);
