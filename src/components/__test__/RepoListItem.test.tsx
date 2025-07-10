import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RepoListItem from "../RepoListItem";

describe("RepoListItem", () => {
  const mockRepo = {
    name: "example-repo",
    description: "This is an example repository",
    id: 1,
    node_id: "node_1",
    full_name: "example-repo",
    private: false,
  } as Repo;

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  it("renders the repository name as a link", () => {
    renderWithRouter(<RepoListItem repo={mockRepo} />);
    const linkElement = screen.getByRole("link", { name: /example-repo/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/repo/example-repo");
  });

  it("renders the repository description", () => {
    renderWithRouter(<RepoListItem repo={mockRepo} />);
    const descriptionElement = screen.getByText(/this is an example repository/i);
    expect(descriptionElement).toBeInTheDocument();
  });
});