import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
//import {Redirect, withRouter} from 'react-router-dom'
// import Quiz from './containers/Quiz/Quiz'
// import QuizList from './containers/QuizList/QuizList'
// import Auth from './containers/Auth/Auth'
// import QuizCreator from './containers/QuizCreator/QuizCreator'
//import {connect} from 'react-redux'
// import Logout from './components/Logout/Logout'
//import {autoLogin} from './store/actions/auth';
import {connect} from 'react-redux';
import { Dispatch } from "redux";

interface IProps {
    //autoLogin: () => void;
    //isAuthenticated: boolean;
}

interface IState {
    //playOrPause?: string;
}

class App extends Component<IProps, IState>  {

  componentDidMount() {
    //this.props.autoLogin()
  }

  render() {
    let routes = (
        <Routes>
          <Route path="/auth" element={Auth} />
          {/*<Route path="/quiz/:id" element={Quiz} />*/}
          {/*<Route path="/" exact element={QuizList} />*/}
          {/*<Redirect to="/" />*/}
            <Route
                path="*"
                element={
                    <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                    </main>
                }
            />

        </Routes>
    )

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

    return (
        // <Layout>
            <BrowserRouter>
                { routes }
            </BrowserRouter>
        // </Layout>
    )
  }
}

function mapStateToProps(state: IState ) {
  return {
    //isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    //autoLogin: () => dispatch(autoLogin())
  }
}

//export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
export default connect(mapStateToProps, mapDispatchToProps)(App)

