import { AUTH_LOGOUT, AUTH_SUCCESS, AuthAction } from "./actionTypes";
import { Reducer } from "redux";

export interface State {
  reducer: AuthState;
}

export interface AuthState {
  token: string | null;
  email: string;
  userName: string;
}

const initialState: AuthState = {
  token: null,
  email: "",
  userName: "",
};

const reducer: Reducer<AuthState, AuthAction> = (
  state = initialState,
  action
): AuthState => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        email: action.email,
        userName: action.userName,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        email: "",
        userName: "",
      };
    default:
      return state;
  }
};

export default reducer;
