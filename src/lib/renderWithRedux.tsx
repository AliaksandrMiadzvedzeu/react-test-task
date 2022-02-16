import { ApplicationState, reducers } from "../store";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";

//For React Test Library

export function renderWithRedux(
  jsx: JSX.Element,
  options: { initialState?: ApplicationState } = {}
) {
  const store = createStore(
    reducers,
    options.initialState,
    compose(applyMiddleware(thunk))
  );
  return {
    ...render(<Provider store={store}>{jsx}</Provider>),
    store,
  };
}
