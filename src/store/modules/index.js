import { combineReducers } from "redux";
import auth from "./auth";
import classboard from "./classboard";

export default combineReducers({
  auth,
  classboard
});
