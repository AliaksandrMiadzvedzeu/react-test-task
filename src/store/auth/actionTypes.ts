import { Action } from "redux";

export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export interface AuthSuccessAction extends Action {
  type: "AUTH_SUCCESS";
  email: string;
  userName: string;
  token: string;
}

export interface AuthLogoutAction extends Action {
  type: "AUTH_LOGOUT";
}

export type AuthAction = AuthSuccessAction | AuthLogoutAction;
