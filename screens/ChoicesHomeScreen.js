import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { phoneNumberChange, generateCode } from "../actions/index";
import { CheckBox } from "react-native-elements";
import IconMI from "react-native-vector-icons/MaterialIcons";

class ChoicesHomeScreen extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 100}}>
        <TouchableOpacity  >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"flex-end",
              alignItems: "center",
              paddingHorizontal: 20,                              
            }}
          >
            <Text>Register</Text>
            <CheckBox
              center={true}
              checkedColor="#ff4c6e"
              iconType="material-community"
              checkedIcon="checkbox-marked-circle"
            />
            <IconMI
              name="chevron-right"
              size={28}
              //   color="white"
              iconStyle={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"flex-end",
              alignItems: "center",
              paddingHorizontal: 20,                              
            }}
          >
            <Text>Measurements</Text>
            <CheckBox
              center={true}
              checkedColor="#ff4c6e"
              iconType="material-community"
              checkedIcon="checkbox-marked-circle"
            />
            <IconMI
              name="chevron-right"
              size={28}
              //   color="white"
              iconStyle={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"flex-end",
              alignItems: "center",
              paddingHorizontal: 20,                              
            }}
          >
            <Text>Labs</Text>
            <CheckBox
              center={true}
              checkedColor="#ff4c6e"
              iconType="material-community"
              checkedIcon="checkbox-marked-circle"
            />
            <IconMI
              name="chevron-right"
              size={28}
              //   color="white"
              iconStyle={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
             style={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"flex-end",
              alignItems: "center",
              paddingHorizontal: 20,                              
            }}
          >
            <Text>Blood Pressure</Text>
            <CheckBox
              center={true}
              checkedColor="#ff4c6e"
              iconType="material-community"
              checkedIcon="checkbox-marked-circle"
            />
            <IconMI
              name="chevron-right"
              size={28}
              //   color="white"
              iconStyle={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent:"flex-end",
              alignItems: "center",
              paddingHorizontal: 20,                              
            }}
          >
            <Text>Nitric Oxide</Text>
            <CheckBox
              //   center={true}
              checkedColor="#ff4c6e"
              iconType="material-community"
              checkedIcon="checkbox-marked-circle"
            />
            <IconMI
              name="chevron-right"
              size={28}
              //   color="white"
              iconStyle={{ alignSelf: "center" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    phoneNum: state.auth.phoneNumber,
    phase2ans: state.phase2ans,
  };
};

export default connect(mapStateToProps, { phoneNumberChange, generateCode })(
  ChoicesHomeScreen
);
