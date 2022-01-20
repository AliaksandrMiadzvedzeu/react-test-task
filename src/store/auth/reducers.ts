import { AUTH_LOGOUT, AUTH_SUCCESS, AuthAction } from "./actionTypes";
import { Reducer } from "redux";

export interface State {
  reducer: AuthState;
}

export interface AuthState {
  token: string | null;
  email: string;
  name: string;
  surname: string;
}

const initialState: AuthState = {
  token: null,
  email: "",
  name: "",
  surname: "",
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
        name: action.name,
        surname: action.surname,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;

// export default combineReducers<State>({
//   reducer,
// });
