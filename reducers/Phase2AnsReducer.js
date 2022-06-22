import { CLEAN, PHASE_TWO_ANS, LABS } from "../actions/types";

const INITIAL_STATE = {
  nitricOxide: "",
  hip: "",
  waist: "",
  systolic1: "",
  diastolic1: "",
  bloodPressureReadingTime1: null,
  systolic2: "",
  diastolic2: "",
  bloodPressureReadingTime2: null,
  systolic3: "",
  diastolic3: "",
  bloodPressureReadingTime3: null,
  systolic4: "",
  diastolic4: "",
  bloodPressureReadingTime4: null,
  deviceID: "",
  bloodTime: null,
  labs: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAN:
      return INITIAL_STATE;
    case PHASE_TWO_ANS:
      return action.payload;
    default:
      return state;
  }
};
