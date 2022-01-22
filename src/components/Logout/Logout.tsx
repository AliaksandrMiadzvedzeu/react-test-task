import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../../store/auth/actions";
import { Dispatch } from "redux";
import { Navigate } from "react-router-dom";
import { AuthLogoutAction } from "../../store/auth/actionTypes";

interface DispatchProps {
  logout: () => AuthLogoutAction;
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

class Logout extends Component<DispatchProps> {
  componentDidMount() {
    return this.props.logout();
  }

  render() {
    return <Navigate to="/login" replace />;
  }
}

export default connect(null, mapDispatchToProps)(Logout);
