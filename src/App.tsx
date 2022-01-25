import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import LoginForm from "./containers/Auth/LoginForm";
import RegisterForm from "./containers/Auth/RegisterForm";
import { autoLogin } from "./store/auth/actions";
import { ThunkDispatch } from "redux-thunk";
import Notes from "./containers/Notes/Notes";
import Logout from "./components/Logout/Logout";
import { Navigate } from "react-router-dom";
import { ApplicationState } from "./store";
import { AnyAction } from "redux";

interface DispatchProps {
  autoLogin: () => Promise<void>;
}

interface StateProps {
  isAuthenticated: boolean;
  email: string;
}

function mapStateToProps(state: ApplicationState): StateProps {
  return {
    isAuthenticated: !!state.auth.token,
    email: state.auth.email,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<ApplicationState, unknown, AnyAction>
): DispatchProps {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

class App extends Component<DispatchProps & StateProps> {
  componentDidMount() {
    return this.props.autoLogin();
  }

  render() {
    let routes = (
      <Routes>
        <Route path="register" element={<RegisterForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Routes>
          <Route path="list" element={<Notes />} />
          <Route path="logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/list" />} />
        </Routes>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
