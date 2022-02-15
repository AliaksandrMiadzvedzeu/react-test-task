import React from "react";
import { render, screen } from "@testing-library/react";
import Menu from "../components/Menu/Menu";
import { MemoryRouter } from "react-router-dom";

describe("Render components", () => {
  it("renders Menu component", () => {
    const { rerender } = render(
      <MemoryRouter>
        <Menu isAuthenticated={false} userName="" />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Notes/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/Create account/i)).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <Menu isAuthenticated={true} userName="Alex" />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Create account/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Notes/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
