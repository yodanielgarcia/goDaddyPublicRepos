import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import HomePage from "../HomePage";
import { useRepoStore } from "../../store/repoStore";

vi.mock("../../store/repoStore", () => {
  const actual = vi.importActual("../../store/repoStore");
  return {
    ...actual,
    useRepoStore: vi.fn(),
  };
});

describe("HomePage", () => {
  const mockFetchRepos = vi.fn();
  const mockRepos = [
    {
      id: 1,
      name: "example-repo",
      description: "This is an example repository",
    },
    {
      id: 2,
      name: "another-repo",
      description: "Another example repository",
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    (useRepoStore as unknown as jest.Mock).mockImplementation(() => ({
      repos: mockRepos,
      fetchRepos: mockFetchRepos,
    }));
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it("renders a loading state", () => {
    (useRepoStore as unknown as jest.Mock).mockImplementation(() => ({
      repos: [],
      fetchRepos: mockFetchRepos,
    }));
    renderWithRouter(<HomePage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders an error message if fetching fails", async () => {
    (useRepoStore as unknown as jest.Mock).mockImplementation(() => ({
      repos: [],
      fetchRepos: vi.fn().mockRejectedValue(new Error("Fetch error")),
    }));
    renderWithRouter(<HomePage />);
    await waitFor(() =>
      expect(
        screen.getByText(/Error fetching repositories/i)
      ).toBeInTheDocument()
    );
  });

  it("renders the repository list", async () => {
    renderWithRouter(<HomePage />);
    await waitFor(() =>
      expect(screen.getByText(/example-repo/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/another-repo/i)).toBeInTheDocument();
  });
});
