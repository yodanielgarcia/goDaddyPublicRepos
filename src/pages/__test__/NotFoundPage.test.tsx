import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";

describe("NotFoundPage", () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it("renders the 404 error message", () => {
    renderWithRouter(<NotFoundPage />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders the 'Page Not Found' message", () => {
    renderWithRouter(<NotFoundPage />);
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("renders the description message", () => {
    renderWithRouter(<NotFoundPage />);
    expect(
      screen.getByText("Sorry, the page you are looking for does not exist.")
    ).toBeInTheDocument();
  });
});