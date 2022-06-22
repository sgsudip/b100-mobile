import { combineReducers } from "redux";
import auth from "./AuthReducer";
import quest from "./QuestionReducer"
import phase from "./phaseReducer"
import phase2ans from "./Phase2AnsReducer"
////////////////////////////////////////////////////////////////////////
// Combines reducers and assigns reducer names
export default combineReducers({
  auth,
  quest,
  phase,
  phase2ans
});
