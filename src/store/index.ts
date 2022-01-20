import {createStore, combineReducers, applyMiddleware, compose, Reducer} from "redux";
import authReducer, {AuthState } from "./auth/reducers";
import noteReducer, {NoteState } from "./notes/reducers";
import thunk from "redux-thunk";

export interface ApplicationState {
  note: NoteState;
  auth: AuthState;
}

export const reducers: Reducer<ApplicationState> =   combineReducers<ApplicationState>({
    note: noteReducer,
    auth: authReducer,
})
