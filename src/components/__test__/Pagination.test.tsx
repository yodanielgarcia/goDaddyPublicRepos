import { render, screen, fireEvent } from "@testing-library/react";
import CustomPagination from "../Pagination";
import { vi } from "vitest";

describe("CustomPagination", () => {
  it("renders the pagination component", () => {
    render(<CustomPagination count={10} page={1} onChange={vi.fn()} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("displays the correct number of pages", () => {
    render(<CustomPagination count={10} page={1} onChange={vi.fn()} />);
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("calls onChange when a page is clicked", () => {
    const handleChange = vi.fn();
    render(<CustomPagination count={10} page={1} onChange={handleChange} />);

    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.anything(), 2);
  });
});