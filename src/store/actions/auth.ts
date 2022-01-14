import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from './actionTypes';
//import { AnyAction, Dispatch} from "redux";
import {Dispatch} from 'react'

export function auth(email: string, password: string, isLogin: boolean) {
  return async (dispatch: Dispatch) => {
    const authData = {
      email, password,
      returnSecureToken: true
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDu1Vl1g7dYcb2QqAEDCzTiFegSR8xrS04'

    if (isLogin) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDu1Vl1g7dYcb2QqAEDCzTiFegSR8xrS04'
    }

    const response = await axios.post(url, authData)
    const data = response.data

    const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

    localStorage.setItem('token', data.idToken)
    localStorage.setItem('userId', data.localId)
    localStorage.setItem('expirationDate', expirationDate.toString())

    dispatch(authSuccess(data.idToken))
    //dispatch(autoLogout(data.expiresIn))
  }
}

// export function autoLogout(time: number) {
//   return (dispatch: Dispatch) => {
//     setTimeout(() => {
//       dispatch(logout())
//     }, time * 1000)
//   }
// }

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: AUTH_LOGOUT
  }
}


export function autoLogin() {
  return (dispatch: Dispatch) => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate') as string)
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))
        //dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
      }
    }
  }
}

export function authSuccess(token: string) {
  return {
    type: AUTH_SUCCESS,
    token
  }
}