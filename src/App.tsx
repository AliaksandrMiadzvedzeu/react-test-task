import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import {Redirect, withRouter} from 'react-router-dom'
// import Quiz from './containers/Quiz/Quiz'
// import QuizList from './containers/QuizList/QuizList'
// import Auth from './containers/Auth/Auth'
// import QuizCreator from './containers/QuizCreator/QuizCreator'
//import {connect} from 'react-redux'
// import Logout from './components/Logout/Logout'
//import {autoLogin} from './store/actions/auth';
import { connect } from "react-redux";
import { Dispatch, Reducer } from "redux";
import LoginForm from "./containers/Auth/LoginForm";
import RegisterForm from "./containers/Auth/RegisterForm";
import RenameForm from "./containers/Auth/RenameForm";
import { RouteProps } from "react-router";
import { auth, autoLogin } from "./store/actions/auth";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AuthActions, AuthState } from "./store/reducers/auth";

interface AppDispatchProps {
  autoLogin: () => Promise<void>;
}

interface AppStateProps {
  isAuthenticated: boolean;
}

function mapStateToProps(state: AuthState) {
  return {
    isAuthenticated: !!state.token,
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
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="rename" element={<RenameForm />} />
        {/*<Route path="/quiz/:id" element={Quiz} />*/}
        {/*<Route path="/" exact element={QuizList} />*/}
        {/* <Redirect to="/" />*/}
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    );

    // if (this.props.isAuthenticated) {
    //   routes = (
    //       <Routes>
    //         <Route path="/quiz-creator" component={QuizCreator} />
    //         <Route path="/quiz/:id" component={Quiz} />
    //         <Route path="/logout" component={Logout} />
    //         <Route path="/" exact component={QuizList} />
    //         <Redirect to="/" />
    //       </Routes>
    //   )
    // }

    return <Layout>{routes}</Layout>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
