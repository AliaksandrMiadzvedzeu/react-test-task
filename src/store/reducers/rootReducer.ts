import { combineReducers } from "redux";
//import quizReducer from './quiz'
//import createReducer from './create'
import authReducer, { AuthState } from "./auth";

export interface IState {
  auth: AuthState;
}

export default combineReducers({
  //quiz: quizReducer,
  //create: createReducer,
  auth: authReducer,
});
