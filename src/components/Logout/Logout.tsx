import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/auth";
import { Dispatch } from "redux";
import { Navigate } from "react-router-dom";
import { AuthLogoutAction } from "../../store/reducers/auth";

interface LogoutDispatchProps {
  logout: () => AuthLogoutAction;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

class Logout extends Component<LogoutDispatchProps> {
  componentDidMount() {
    return this.props.logout();
  }

  render() {
    return <Navigate to="/list" replace />;
  }
}

export default connect(null, mapDispatchToProps)(Logout);
