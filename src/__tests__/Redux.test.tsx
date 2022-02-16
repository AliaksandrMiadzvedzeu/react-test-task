import React from "react";
import { applyMiddleware, compose, createStore, Reducer } from "redux";
import { Provider } from "react-redux";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Layout from "../hoc/Layout/Layout";
import { ApplicationState } from "../store/index";
import { reducers } from "../store/index";
import Notes from "../containers/Notes/Notes";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import axios, { AxiosResponse } from "axios";

function renderWithRedux(
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

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const hits = [
  { id: "id0", text: "Item0", done: true },
  { id: "id1", text: "Item1", done: false },
  { id: "id2", text: "Item2", done: true },
];

describe("Redux testing", () => {
  beforeEach(async () => {
    //Prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: hits,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {},
    };
    // Make the mock return the custom axios response
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);

    await waitFor(() => {
      return renderWithRedux(
        <MemoryRouter>
          <Layout>
            <Notes />
          </Layout>
        </MemoryRouter>,
        {
          initialState: {
            auth: {
              token: "fakeToken",
              email: "email@tut.by",
              userName: "Alex",
            },
            note: {
              notes: [],
              updatedNotes: [],
              loading: false,
              errorMessage: "",
              filter: "all",
            },
          },
        }
      );
    });
  });

  it("checks initial state", async () => {
    expect(screen.getByText(/Hello Alex/i)).toBeInTheDocument();
    expect(screen.getByText(/All \(3\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed \(2\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Waiting \(1\)/i)).toBeInTheDocument();

    expect(screen.getByText(/Item0/i)).toBeInTheDocument();
    expect(screen.getByText(/Item1/i)).toBeInTheDocument();
    expect(screen.getByText(/Item2/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Add note/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Save notes/i })
    ).toBeInTheDocument();

    expect(screen.getAllByText(/Remove/i)).toHaveLength(3);
  });
  it("click radio Completed", async () => {
    const labelRadio: HTMLInputElement = screen.getByRole("radio", {
      name: /Completed/i,
    });
    expect(labelRadio).not.toBeChecked();
    const leftClick = { button: 0 };
    userEvent.click(labelRadio, leftClick);
    expect(labelRadio).toBeChecked();

    expect(screen.getByText(/Item0/i)).toBeInTheDocument();
    expect(screen.queryByText(/Item1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Item2/i)).toBeInTheDocument();
  });
  it("add new note", async () => {
    userEvent.type(screen.getByPlaceholderText(/Text of note/i), "New Item");

    const button: HTMLButtonElement = screen.getByRole("button", {
      name: /Add note/i,
    });
    const leftClick = { button: 0 };
    userEvent.click(button, leftClick);

    expect(screen.getByText(/New Item/i)).toBeInTheDocument();
  });
});
