import {
  EMAIL,
  FIRST_NAME,
  LAST_NAME,
  PHONE_NUMBER,
  ZIP_CODE,
  JOB_TITLE,
  VAL_CODE,
  UID,
  DATEOFBIRTH,
  SEX,
  FAIL,
  IMAGE,
  PROFILE,
  SCORE,
  CLEAN,
  ERROR,
  EDUCATION_LEVEL,
  WORK_STATUS,
  FEET,
  INCHES,
  WEIGHT,
  PHASE_TWO_ANS,
  LABS,
  NOTIFICATIONS,
  CATEGORIES,
  PRODUCTS,
} from "./types.js";
import { url } from "../constants/urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as API from "../constants/api";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
/////////////////////// LOGIN METHODS///////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
export const emailChanged = (text) => ({
  type: EMAIL,
  payload: text,
});
export const setEducationLevel = (text) => ({
  type: EDUCATION_LEVEL,
  payload: text,
});
export const setWorkStatus = (text) => ({
  type: WORK_STATUS,
  payload: text,
});

export const firstNameChange = (text) => ({
  type: FIRST_NAME,
  payload: text,
});

export const lastNameChange = (text) => ({
  type: LAST_NAME,
  payload: text,
});
export const phoneNumberChange = (text) => ({
  type: PHONE_NUMBER,
  payload: text,
});
export const zipCodeChange = (text) => ({
  type: ZIP_CODE,
  payload: text,
});
export const jobTitleChange = (text) => ({
  type: JOB_TITLE,
  payload: text,
});
export const phaseTwoResults = (data, userId) => async (dispatch) => {
  const res = await API.post(`api/Phase2Responses?userId=${userId}`, data);
  if (res.status === 200) {
    dispatch({
      type: PHASE_TWO_ANS,
      payload: res.data,
    });
  } else {
    const res = await API.get(`api/Phase2Responses?userId=${userId}`);
    dispatch({
      type: PHASE_TWO_ANS,
      payload: res.data,
    });
  }
};

export const phaseTwoGet = (userId) => async (dispatch) => {
  const { data } = await API.get(`api/Phase2Responses?userId=${userId}`);
  if (data && data.success) {
    console.log("Phase 2 results", data);
    if (data.systolic1 !== "" && data.diastolic1 !== "") {
      res.data = { ...res.data, labs: true };
    }
    dispatch({
      type: PHASE_TWO_ANS,
      payload: res.data,
    });
    dispatch(fillInfo());
  }
};
export const generateCode = (text) => async (dispatch) => {
  try {
    const { data } = await API.post("api/auth/resendtwilio", {
      countryCode: "+1",
      phone: text,
    });
  } catch (err) {
    console.log("error: ", err);
  }
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}

export const checkCode = (code, phone, navigation) => async (dispatch) => {
  const body = {
    countryCode: "+1",
    phone: phone,
    passcode: code,
  };
  try {
    const res = await API.post("api/auth/verifytwilio", body);
    const uid = res.data.user._id;

    await AsyncStorage.setItem("auth", res.headers.authorization);
    await AsyncStorage.setItem("saveAns", "false");

    registerForPushNotificationsAsync().then((deviceId) => {
      const body1 = { deviceId, allowNotifications: true };
      const res1 = API.post("api/device/", body1);
    });
    if (res.data.user.email) {
      await Profile(dispatch, res.data.user);
      return Uid(dispatch, uid);
    } else return Uid(dispatch, uid);
  } catch (err) {
    return AuthFail(dispatch, "Please reenter the code!");
  }
};
export const valCodeChange = (text) => ({
  type: VAL_CODE,
  payload: text,
});
const image = (dispatch, text) =>
  dispatch({
    type: IMAGE,
    payload: text,
  });

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////////PROFILE METHODS//////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
export const imageUpload = (uri) => async (dispatch) => {
  image(dispatch, uri);
  const res = await API.image("api/upload/images/avatar", uri);
};
export const feetChange = (text) => ({
  type: FEET,
  payload: text,
});
export const inchesChange = (text) => ({
  type: INCHES,
  payload: text,
});
export const weightChange = (text) => ({
  type: WEIGHT,
  payload: text,
});

export const dateChange = (text) => ({
  type: DATEOFBIRTH,
  payload: text,
});
export const sexChange = (text) => ({
  type: SEX,
  payload: text,
});
export const saveProfileToServer =
  (
    sex,
    dob,
    lastName,
    firstName,
    email,
    uid,
    image_url,
    zipCode
    // height,
    // weight
  ) =>
  async (dispatch) => {
    const body = {
      sex,
      dob: dob,
      lastName: lastName,
      firstName: firstName,
      email: email,
      image_url: image_url,
      zip: zipCode,
      // height,
      // weight,
    };
    const { data } = await API.put(`api/user/id?_id=${uid}`, body);
    return data;
  };

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////RELOAD/HELPER METHODS////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
export const fillInfo = (uid) => async (dispatch) => {
  const { data } = await API.get(`api/user/id`);
  if (data.success === true) {
    dispatch({
      type: PROFILE,
      payload: data.user,
    });
    dispatch({
      type: UID,
      payload: data.user._id,
    });
  } else {
    dispatch({
      type: ERROR,
      payload: data,
    });
  }
};

export const getScore = () => async (dispatch) => {
  const { data } = await API.get("api/user/score");
  dispatch({
    type: SCORE,
    payload: data,
  });
  const { result } = await API.post("api/notification/send");
  dispatch(fillInfo());
  dispatch(grabCategories());
  dispatch(grabProducts());
};
export const fillUID = (user) => ({
  type: UID,
  payload: user.user._id,
});
export const clean = () => async (dispatch) => {
  try {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    // console.log("Status", existingStatus)
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // Stop here if the user did not grant permissions
    if (finalStatus === "granted") {
      let deviceId = await Notifications.getExpoPushTokenAsync();

      const body1 = {
        deviceId,
      };
      const res1 = await API.post("api/auth/signout", body1);
    }
  } catch (e) {
    console.log("clean error", e);
  } finally {
    dispatch({
      type: CLEAN,
      payload: true,
    });
  }
};
export const fillProfile = (user) => {
  return {
    type: PROFILE,
    payload: user,
  };
};
const Uid = (dispatch, text) => {
  dispatch({
    type: UID,
    payload: text,
  });
};
const AuthFail = (dispatch, text) => {
  dispatch({
    type: FAIL,
    payload: text,
  });
};
export const Profile = (dispatch, user) => {
  dispatch({
    type: PROFILE,
    payload: user,
  });
};

export const getNotification = () => async (dispatch) => {
  const data = await API.get("api/notification");
  dispatch({ type: NOTIFICATIONS, payload: data.data.notifications });
};

export const grabCategories = () => async (dispatch) => {
  const { data } = await API.get("api/dietcategory");
  if (data.success) {
    dispatch({
      type: CATEGORIES,
      payload: data.dietcategory,
    });
  }
};

export const grabProducts = () => async (dispatch) => {
  const { data } = await API.get("api/categoryProduct");
  if (data.success) {
    dispatch({
      type: PRODUCTS,
      payload: data.dietcategory,
    });
  }
};
