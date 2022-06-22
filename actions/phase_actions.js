import {
  PHASE_COMPLETE,
  FILL_PHASES,
  UPDATE_PHASES,
  CLEAR_PHASE1,
  IS_LOADING,
  IS_PHASE1_DELETED,
  INDEX,
} from "./types.js";
import * as API from "../constants/api";

export const fillPhases = (text) => ({
  type: FILL_PHASES,
  payload: text,
});
export const clearPhase1 = (navigation) => async (dispatch) => {
  // console.log("From Dispatch ");
  dispatch({ type: INDEX, payload: 0 });
  dispatch({ type: IS_LOADING, payload: true });
  dispatch({ type: IS_PHASE1_DELETED });
  // navigation.navigate("Quest");

  navigation.navigate("Phase1CustomeQuestion");
  const res = await API.post("api/answers/deletebyUserId", {});
  if (res.data.success) {
    dispatch({ type: IS_LOADING, payload: false });
    // navigation.navigate("Phase1CustomeQuestion");
    return dispatch({
      type: CLEAR_PHASE1,
    });
  }
};
export const updatePhase = (num, phaseID) => async (dispatch) => {
  switch (num) {
    case 0:
      API.put("api/userPhase", { userPhaseId: phaseID, phase0: true });
      break;
    case 1:
      API.put("api/userPhase", { userPhaseId: phaseID, phase1: true });
      break;
    case 2:
      API.put("api/userPhase", { userPhaseId: phaseID, phase2: true });
      break;
    case 3:
      API.put("api/userPhase", { userPhaseId: phaseID, phase3: true });
      break;
    case 4:
      API.put("api/userPhase", { userPhaseId: phaseID, phase4: true });
      break;
  }
  dispatch({
    type: UPDATE_PHASES,
    payload: num,
  });
};
