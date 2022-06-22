import {
  SUB,
  ANS,
  PROG,
  INDEX,
  QUEST,
  CLEAN,
  IS_SMOKER,
  HEADER,
  HEADER_INDEX,
  IS_FILLIN,
} from "../actions/types";

const INITIAL_STATE = {
  SubQuestion: {},
  ans: [],
  prog: 0,
  mainIndex: 0,
  questions: [],
  Phase_0: [],
  Phase_1: [],
  Phase_2: [],
  Phase_3: [],
  Phase_4: [],
  isSmoker: false,
  headers: [],
  headerIndex: 0,
  fillInAns: {
    numYearsSmoked: "",
    numCigsSmokedPerDay: null,
    numMedicationsPerDay: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUB:
      state.SubQuestion = {};
      return { ...state, SubQuestion: action.payload };
    case ANS:
      return { ...state, ans: action.payload };
    case PROG:
      return { ...state, prog: action.payload };
    case HEADER:
      return { ...state, headers: action.payload };
    case HEADER_INDEX:
      return { ...state, headerIndex: action.payload };
    case QUEST:
      questions = action.payload;
      let Phase_0 = [];
      let Phase_1 = questions;
      let Phase_2 = [];
      let Phase_3 = [];
      let Phase_4 = [];
      // for (var i = 0; i < questions.length; i++) {
      //   switch (questions[i].q.phase) {
      //     case "PHASE 0":
      //       Phase_0[Phase_0.length] = questions[i];
      //       break;
      //     case "PHASE 1":
      //       Phase_1[Phase_1.length] = questions[i];
      //       break;
      //     case "PHASE 2":
      //       Phase_2[Phase_2.length] = questions[i];
      //       break;
      //     case "PHASE 3":
      //       Phase_3[Phase_3.length] = questions[i];
      //       break;
      //     case "PHASE 4":
      //       Phase_4[Phase_4.length] = questions[i];
      //       break;
      //   }
      // }
      // console.log("phase 1",Phase_1)
      // console.log("phase 2",Phase_2)
      // console.log("phase 3",Phase_3)
      // console.log("phase 4",Phase_4)
      return { ...state, Phase_0, Phase_1, Phase_2, Phase_3, Phase_4 };
    case INDEX:
      return { ...state, mainIndex: action.payload };
    case CLEAN:
      return INITIAL_STATE;
    case IS_SMOKER:
      return { ...state, isSmoker: action.payload };
    case IS_FILLIN:
      return { ...state, fillInAns: { ...state.fillInAns, ...action.payload } };
    default:
      return state;
  }
};
