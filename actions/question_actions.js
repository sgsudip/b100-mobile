import {
  SUB,
  ANS,
  PROG,
  HEADER,
  INDEX,
  QUEST,
  IS_SMOKER,
  HEADER_INDEX,
  IS_FILLIN,
} from "./types.js";

import { SCORE } from "./types.js";
import { getScore } from "./auth_actions";
import localQuestions from "./localquestions";
import * as API from "../constants/api";

export const subQuestion = (text) => ({
  type: SUB,
  payload: text,
});

export const ans = (ans) => ({
  type: ANS,
  payload: ans,
});

export const prog = (text) => ({
  type: PROG,
  payload: text,
});

export const header = (text) => ({
  type: HEADER,
  payload: text,
});

export const setHeaderIndex = (text) => ({
  type: HEADER_INDEX,
  payload: text,
});

export const setFillIn = (text) => ({
  type: IS_FILLIN,
  payload: text,
});

const prepareAns = (uid, ans) => {
  let answers = [];
  for (let i = 0; i < ans.length; i++) {
    let questAns = ans[i];
    for (let j = 0; j < questAns.optionIDs.length; j++) {
      let body = {
        user: uid,
        question: questAns.questionID,
        choice: questAns.optionIDs[j]._id,
        answer: questAns.optionIDs[j].optionString,
      };
      answers.push(body);
    }
  }
  return answers;
};

export const sendAnsToServer = (uid, ans) => async (dispatch) => {
  let answers = await prepareAns(uid, ans);
  // let answers = [];
  // for (let i = 0; i < ans.length; i++) {
  //   let questAns = ans[i];
  //   for (let j = 0; j < questAns.optionIDs.length; j++) {
  //     let body = {
  //       user: uid,
  //       question: questAns.questionID,
  //       choice: questAns.optionIDs[j]._id,
  //       answer: questAns.optionIDs[j].optionString,
  //     };
  //     // answers.push(body);
  //     // debugger;
  //     await API.post("api/answers", body);
  //   }
  // }
  await API.post("api/answers", { answers: answers });
  const body = {
    phase: 1,
  };
  await API.post("api/notification/create", body);
  dispatch(getScore());
};

export const uploadCustomPhaseOneANS =
  (
    numMedicationsPerDay,
    numCigsSmokedPerDay,
    numYearsSmoked,
    uid,
    weight,
    height
  ) =>
  async (dispatch) => {
    const body = {
      numYearsSmoked,
      numCigsSmokedPerDay,
      numMedicationsPerDay,
      weight,
      height,
    };
    const res = await API.put(`api/user/id?_id=${uid}`, body);
  };
//////////////////////////////////////////////////////////////
// grabs the questions for the specific user from the database
export const loadQuestions = (userID) => async (dispatch) => {
  try {
    const res = await API.get(`api/questions_client/id?_id=${userID}`);
    // console.log("question" + JSON.stringify(res));
    const q = res.data;
    // console.log("Phase-3 questions" + q.questionsList);
    return Questions(dispatch, res.data.questionsList);
  } catch (err) {
    // console.log("error: ", err);
    return Questions(dispatch, localQuestions);
  }
};

export const isSmokerOrNot = (Value) => async (dispatch) => {
  // console.log(Value, "from actions");
  dispatch({ type: IS_SMOKER, payload: Value });
};

export const slideindex = (text) => ({
  type: INDEX,
  payload: text,
});

const Questions = (dispatch, text) => {
  dispatch({
    type: QUEST,
    payload: text,
  });
};
