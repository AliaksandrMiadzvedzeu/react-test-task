import React, { ReactElement } from "react";
import { screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App";
import axios from "axios";
import { renderWithRedux } from "../lib/renderWithRedux";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const withRouter = (ui: ReactElement, { route = "/" } = {}) => {
  return (
    <MemoryRouter initialEntries={[route]} initialIndex={0}>
      {ui}
    </MemoryRouter>
  );
};

const loginPageState = {
  auth: {
    token: null,
    email: "",
    userName: "",
  },
  note: {
    notes: [],
    updatedNotes: [],
    loading: false,
    errorMessage: "",
    filter: "all",
  },
};

const listPageState = {
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
};

describe("React Router", () => {
  it("landing on a register page", async () => {
    const route = "/register";

    await waitFor(() => {
      return renderWithRedux(withRouter(<App />, { route }), {
        initialState: loginPageState,
      });
    });

    expect(screen.getByText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Name$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Surname$/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Create account/i)).toHaveLength(2);
  });

  it("landing on a bad page, then move to login page", async () => {
    const route = "/something-that-does-not-match";
    await waitFor(() => {
      return renderWithRedux(withRouter(<App />, { route }), {
        initialState: loginPageState,
      });
    });

    expect(screen.getByText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Password$/i)).toBeInTheDocument();
    expect(screen.queryByText(/^Name$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Surname$/i)).not.toBeInTheDocument();
    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
  });

  it("landing on a list page", async () => {
    // Make the mock return the custom axios response
    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    localStorage.setItem("token", listPageState.auth.token);
    localStorage.setItem("email", listPageState.auth.email);
    localStorage.setItem("userName", listPageState.auth.userName);
    const expirationDate = new Date(new Date().getTime() + 1000);
    localStorage.setItem("expirationDate", expirationDate.toString());

    const route = "/list";
    await waitFor(() => {
      return renderWithRedux(withRouter(<App />, { route }), {
        initialState: listPageState,
      });
    });

    expect(screen.getByText(/Hello Alex/i)).toBeInTheDocument();
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
    expect(screen.getByText(/Waiting/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Add note/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Save notes/i })
    ).toBeInTheDocument();

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userName");
    localStorage.removeItem("expirationDate");
  });
  it("landing on a logout page", async () => {
    const route = "/logout";
    await waitFor(() => {
      return renderWithRedux(withRouter(<App />, { route }), {
        initialState: loginPageState,
      });
    });
    expect(screen.getByText(/^Email$/i)).toBeInTheDocument();
    expect(screen.queryByText(/^Surname$/i)).not.toBeInTheDocument();
  });
});
