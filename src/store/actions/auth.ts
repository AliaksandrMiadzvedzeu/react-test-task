import axios_auth from "axios";
import axios_user from "../../axios/axios-user";
import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import {
  AuthActions,
  AuthLogoutAction,
  AuthState,
  AuthSuccessAction,
} from "../reducers/auth";

export function auth(
  email: string,
  password: string,
  name?: string,
  surname?: string
): ThunkAction<Promise<void>, AuthState, {}, AuthActions> {
  return async (dispatch) => {
    const isRegistration = name != null && surname != null;

    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDu1Vl1g7dYcb2QqAEDCzTiFegSR8xrS04";

    if (isRegistration) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDu1Vl1g7dYcb2QqAEDCzTiFegSR8xrS04";
    }

    let idToken: string, localId: string, expiresIn: number;

    return await axios_auth
      .post(url, { email, password, returnSecureToken: true })
      .then((response) => {
        idToken = response.data?.idToken;
        localId = response.data?.localId;
        expiresIn = response.data?.expiresIn;

        if (isRegistration) {
          return axios_user.post(`/users.json/`, {
            email,
            name,
            surname,
          });
        } else {
          return axios_user.get(
            `/users.json?orderBy="email"&equalTo="${email}"`
          );
        }
      })
      .then((response) => {
        if (!isRegistration) {
          for (const prop in response.data) {
            name = response.data[prop].name;
            surname = response.data[prop].surname;
          }
        }
        if (!name) name = "";
        if (!surname) surname = "";

        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );

        localStorage.setItem("token", idToken);
        localStorage.setItem("userId", localId);
        localStorage.setItem("expirationDate", expirationDate.toString());
        localStorage.setItem("name", name);
        localStorage.setItem("surname", surname);

        dispatch(authSuccess(idToken, name, surname));
        dispatch(autoLogout(expiresIn));
      })

      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log("Error", error.response.data?.error?.errors);
          console.log(error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.log("Error", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };
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
  localStorage.removeItem("name");
  localStorage.removeItem("surname");
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
    const name = localStorage.getItem("name");
    const surname = localStorage.getItem("surname");

    console.log("autoLogin Name", name);
    console.log("autoLogin surname", surname);

    if (!token || !name || !surname) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(
        localStorage.getItem("expirationDate") as string
      );
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, name, surname));
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
