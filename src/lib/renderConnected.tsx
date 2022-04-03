import React, { ReactChild, ReactChildren, ReactElement } from "react";
import { render } from "@testing-library/react";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducers } from "../store";

//For React Test Library

const renderConnected = (ui: ReactElement) => {
  const configureStore = () => {
    return createStore(reducers, applyMiddleware(thunk));
  };
  const store = configureStore();

  const Wrapper = ({ children }: { children: ReactChild | ReactChildren }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper: Wrapper });
};

export default renderConnected;
