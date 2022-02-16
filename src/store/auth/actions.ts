import axios from "axios";
import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AuthAction,
  AuthLogoutAction,
  AuthSuccessAction,
} from "./actionTypes";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../index";
import { encodeEmail } from "../../lib/encodeEmail";

export function auth(
  email: string,
  password: string,
  name?: string,
  surname?: string
): ThunkAction<Promise<void>, ApplicationState, unknown, AuthAction> {
  return async (dispatch) => {
    const isRegistration = name != null;
    const api_key = process.env.API_KEY;

    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${api_key}`;

    if (isRegistration) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${api_key}`;
    }

    let idToken: string, localId: string, expiresIn: number;

    return await axios
      .post(url, { email, password, returnSecureToken: true })
      .then((response) => {
        idToken = response.data?.idToken;
        localId = response.data?.localId;
        expiresIn = response.data?.expiresIn;

        if (isRegistration) {
          return axios.put(
            `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}.json`,
            {
              name: name,
              surname: surname,
            }
          );
        } else {
          return axios.get(
            `${process.env.AXIOS_BASE_URL}/users/${encodeEmail(email)}.json`
          );
        }
      })
      .then((response) => {
        if (!isRegistration) {
          name = response.data.name;
          surname = response.data.surname;
        }

        const expirationDate = new Date(
          new Date().getTime() + expiresIn * 1000
        );

        let userName = name ? name : "";
        if (surname != null && surname.length > 0) userName += " " + surname;

        localStorage.setItem("token", idToken);
        localStorage.setItem("userId", localId);
        localStorage.setItem("expirationDate", expirationDate.toString());
        localStorage.setItem("email", email);
        localStorage.setItem("userName", userName);

        dispatch(authSuccess(idToken, email, userName));
        dispatch(autoLogout(expiresIn));
      });
  };
}

export function autoLogout(
  time: number
): ThunkAction<Promise<void>, ApplicationState, unknown, AuthAction> {
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
  localStorage.removeItem("email");
  localStorage.removeItem("userName");

  return {
    type: AUTH_LOGOUT,
  };
}

export function autoLogin(): ThunkAction<
  Promise<void>,
  ApplicationState,
  unknown,
  AuthAction
> {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName") ?? "";
    const email = localStorage.getItem("email");

    if (!token || !email) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(
        localStorage.getItem("expirationDate") as string
      );
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token, email, userName));
        await dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}

export function authSuccess(
  token: string,
  email: string,
  userName: string
): AuthSuccessAction {
  return {
    type: AUTH_SUCCESS,
    email,
    userName,
    token,
  };
}
