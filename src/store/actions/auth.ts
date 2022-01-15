import axios from "axios";
import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  AuthActions,
  AuthLogoutAction,
  AuthState,
  AuthSuccessAction,
} from "../reducers/auth";

export function auth(
  email: string,
  password: string
): ThunkAction<Promise<void>, AuthState, {}, AuthActions> {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDu1Vl1g7dYcb2QqAEDCzTiFegSR8xrS04";

    await sendData(url, authData, dispatch);
  };
}

export function register(
  email: string,
  password: string,
  name: string,
  surname: string
): ThunkAction<Promise<void>, AuthState, {}, AuthActions> {
  return async (dispatch) => {
    const authData = {
      email,
      password,
      name,
      surname,
      returnSecureToken: true,
    };

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDu1Vl1g7dYcb2QqAEDCzTiFegSR8xrS04";

    await sendData(url, authData, dispatch);
  };
}

export function rename(
  name: string,
  surname: string
): ThunkAction<Promise<void>, AuthState, {}, AuthActions> {
  return async (dispatch) => {
    // const authData = {
    //   email,
    //   name,
    //   surname
    // };
    //
    // let url =
    //     "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDu1Vl1g7dYcb2QqAEDCzTiFegSR8xrS04";
    //
    // await sendData(url, authData, dispatch);
  };
}

async function sendData(
  url: string,
  authData: any,
  dispatch: ThunkDispatch<AuthState, {}, AuthActions>
) {
  const response = await axios.post(url, authData);
  const data = response.data;

  const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

  localStorage.setItem("token", data.idToken);
  localStorage.setItem("userId", data.localId);
  localStorage.setItem("expirationDate", expirationDate.toString());

  dispatch(authSuccess(data.idToken, "Aliaksandr", "Miad"));
  await dispatch(autoLogout(data.expiresIn));
}

export function autoLogout(
  time: number
): ThunkAction<Promise<void>, AuthState, {}, AuthActions> {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}

export function logout(): AuthLogoutAction {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogin(): ThunkAction<
  Promise<void>,
  AuthState,
  {},
  AuthActions
> {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(
        localStorage.getItem("expirationDate") as string
      );
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, "Aliaksandr", "Miad"));
        await dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}

export function authSuccess(
  token: string,
  name: string,
  surname: string
): AuthSuccessAction {
  return {
    type: AUTH_SUCCESS,
    name,
    surname,
    token,
  };
}
