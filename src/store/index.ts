import {
  createStore,
  combineReducers,
  applyMiddleware,
  DeepPartial,
} from "redux";
import session, { State as SessionState } from "./session/reducers";
import thunk from "redux-thunk";
import { INoteState } from "./reducers/note";
import { AuthState } from "./reducers/auth";

// export interface RootState {
//   session: SessionState
// }

export interface RootState {
  note: INoteState;
  auth: AuthState;
}

export default createStore(
  combineReducers<RootState>({
    session,
  }),
  applyMiddleware(thunk)
);
