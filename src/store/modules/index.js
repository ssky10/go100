import { combineReducers } from "redux";
import auth from "./auth";
import classboard from "./classboard";
import exam from "./exam";
import post from "./post";

export default combineReducers({
  auth,
  classboard,
  exam,
  post
});
