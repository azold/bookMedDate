import { combineReducers, compose } from "redux"
import pageReducer from "./pageReducer";
import availableTableReducer from "./availableTableReducer";
import bookedTableReducer from "./bookedTableReducer";

export default combineReducers({
    pageReducer,
    availableTableReducer,
    bookedTableReducer
});
  