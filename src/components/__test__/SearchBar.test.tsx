import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar";
import { vi } from "vitest";

describe("SearchBar", () => {
  it("renders the search input with the correct label", () => {
    render(<SearchBar value="" onChange={() => {}} />);
    const inputElement = screen.getByLabelText(/search repositories/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("displays the correct value in the input field", () => {
    render(<SearchBar value="example" onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue("example");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onChange when the input value changes", () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} />);
    const inputElement = screen.getByLabelText(/search repositories/i);

    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });
});