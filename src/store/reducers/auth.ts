import {AUTH_LOGOUT, AUTH_SUCCESS} from '../actions/actionTypes';
import { AnyAction } from "redux";

const initialState = {
  token: null,
  name: "",
  surname: ""
  //picture: ""
}

export default function authReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state, token: action.token
      }
    case AUTH_LOGOUT:
      return {
        ...state, token: null
      }
    default:
      return state
  }
}