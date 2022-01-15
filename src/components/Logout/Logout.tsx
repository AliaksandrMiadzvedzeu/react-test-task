import React, { Component } from "react";
import { connect } from "react-redux";
//import { Redirect } from "react-router-dom";
import { logout } from "../../store/actions/auth";
import { ThunkDispatch } from "redux-thunk";
import {AuthActions, AuthLogoutAction, AuthState} from "../../store/reducers/auth";

interface LogoutDispatchProps {
  logout: () => AuthLogoutAction;
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<AuthState, {}, AuthActions>
) {
  return {
    logout: () => dispatch(logout()),
  };
}

class Logout extends Component<LogoutDispatchProps, {}> {
  componentDidMount() {
    return this.props.logout();
  }

  //render() {
    // return <Redirect to={"/"} />;
  //}
}

export default connect(null, mapDispatchToProps)(Logout);
