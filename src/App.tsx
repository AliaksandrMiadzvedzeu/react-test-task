import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import LoginForm from "./containers/Auth/LoginForm";
import RegisterForm from "./containers/Auth/RegisterForm";
import RenameForm from "./containers/Auth/RenameForm";
import { autoLogin } from "./store/actions/auth";
import { ThunkDispatch } from "redux-thunk";
import { AuthActions, AuthState } from "./store/reducers/auth";
import NodeList from "./containers/NoteList/NoteList";
import Logout from "./components/Logout/Logout";
import { IState } from "./store/reducers/rootReducer";
import { Navigate } from "react-router-dom";

interface AppDispatchProps {
  autoLogin: () => Promise<void>;
}

interface AppStateProps {
  isAuthenticated: boolean;
}

function mapStateToProps(state: IState) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<AuthState, {}, AuthActions>
) {
  return {
    autoLogin: () => dispatch(autoLogin()),
  };
}

class App extends Component<AppDispatchProps & AppStateProps, {}> {
  componentDidMount() {
    return this.props.autoLogin();
  }

  render() {
    let routes = (
      <Routes>
        <Route path="register" element={<RegisterForm />} />
        <Route path="rename" element={<RenameForm />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Routes>
          <Route path="logout" element={<Logout />} />
          <Route path="list" element={<NodeList />} />
          <Route path="*" element={<Navigate to="/list" />} />
        </Routes>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
