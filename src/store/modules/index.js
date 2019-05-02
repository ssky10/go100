import { combineReducers } from "redux";
import auth from "./auth";
import classboard from "./classboard";
import exam from "./exam";

export default combineReducers({
  auth,
  classboard,
  exam
});
