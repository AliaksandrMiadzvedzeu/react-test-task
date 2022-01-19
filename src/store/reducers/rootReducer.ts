import { combineReducers } from "redux";
import authReducer, { AuthState } from "./auth";
import noteReducer, { INoteState } from "./note";

export interface IState {
  note: INoteState;
  auth: AuthState;
}

export default combineReducers({
  note: noteReducer,
  //create: createReducer,
  auth: authReducer,
});
