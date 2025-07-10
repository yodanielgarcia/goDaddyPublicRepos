import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
import RepoDetailsPage from "../DetailsPage";
import { useRepoStore } from "../../store/repoStore";

vi.mock("../../store/repoStore", () => ({
  useRepoStore: vi.fn(),
}));

describe("RepoDetailsPage", () => {
  const mockFetchRepos = vi.fn();
  const mockRepos = [
    {
      id: 1,
      name: "example-repo",
      description: "This is an example repository",
      owner: {
        login: "example-owner",
        avatar_url: "https://example.com/avatar.png",
        html_url: "https://github.com/example-owner",
      },
      stargazers_count: 10,
      forks_count: 5,
      open_issues_count: 2,
      watchers_count: 8,
      created_at: "2023-01-01T00:00:00Z",
      updated_at: "2023-01-02T00:00:00Z",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
      archived: false,
      html_url: "https://github.com/example-repo",
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    (useRepoStore as unknown as jest.Mock).mockReturnValue({
      repos: mockRepos,
      fetchRepos: mockFetchRepos,
    });
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it("renders a loading state", () => {
    (useRepoStore as unknown as jest.Mock).mockReturnValue({
      repos: [],
      fetchRepos: mockFetchRepos,
    });
    renderWithRouter(<RepoDetailsPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders an error message if fetching fails", async () => {
    (useRepoStore as unknown as jest.Mock).mockReturnValue({
      repos: [],
      fetchRepos: vi.fn().mockRejectedValue(new Error("Fetch error")),
    });
    renderWithRouter(<RepoDetailsPage />);
    await waitFor(() =>
      expect(
        screen.getByText(/Error fetching repository data/i)
      ).toBeInTheDocument()
    );
  });

  it("renders a 'repository not found' message if the repo does not exist", async () => {
    (useRepoStore as unknown as jest.Mock).mockReturnValue({
      repos: [],
      fetchRepos: mockFetchRepos,
    });
    renderWithRouter(<RepoDetailsPage />);

    await waitFor(() =>
      expect(
        screen.getByText((content) => content.includes("Repository not found"))
      ).toBeInTheDocument()
    );
  });
});