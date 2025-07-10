import { render, screen } from "@testing-library/react";
import Tittle from "../Tittle";

describe("Tittle", () => {
  it("renders the title text", () => {
    render(<Tittle />);
    const titleElement = screen.getByText(/GoDaddy Public Repositories/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the SVG icon", () => {
    render(<Tittle />);
    const svgElement = screen.getByRole("img", { hidden: true });
    expect(svgElement).toBeInTheDocument();
  });

  it("applies the correct styles to the Typography component", () => {
    render(<Tittle />);
    const typographyElement = screen.getByText(/GoDaddy Public Repositories/i);
    expect(typographyElement).toHaveStyle({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgb(11, 117, 122)",
      padding: "1rem",
      borderRadius: "8px",
    });
  });
});