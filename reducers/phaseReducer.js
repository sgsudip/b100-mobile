import {
  PROFILE,
  UPDATE_PHASES,
  CLEAN,
  CLEAR_PHASE1,
} from "../actions/types";

const INITIAL_STATE = {
  profile: false,
  questions: false,
  kit: false,
  treatment: false,
  centers: false,
  ID: "",
  reccomended: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROFILE: {
      // console.log("USER PHASES", action.payload.userPhases);
      const { phase0, phase1, phase2, phase3, phase4, _id, reccomended } =
        action.payload.userPhases;

      return {
        reccomended,
        ID: _id,
        profile: phase0,
        questions: phase1,
        kit: phase2,
        treatment: phase3,
        centers: phase4,
      };
    }
    case UPDATE_PHASES:
      switch (action.payload) {
        case 0:
          return { ...state, profile: true };
        case 1:
          return { ...state, questions: true };
        case 2:
          return { ...state, kit: true };
        case 3:
          return { ...state, treatment: true };
        case 4:
          return { ...state, centers: true };
      }
    case CLEAN:
      return INITIAL_STATE;
    case CLEAR_PHASE1:
      return { ...state, questions: false };
    default:
      return state;
  }
};
