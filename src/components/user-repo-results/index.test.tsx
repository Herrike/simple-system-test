import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, test, expect, Mock, afterEach } from "vitest";
import UserRepoResults from ".";
import { useUserRepos } from "../../api/get-github-user-repos";

vi.mock("../../api/get-github-user-repos", () => ({
  useUserRepos: vi.fn(),
}));

describe("UserRepoResults Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render a loading message when fetching repositories", () => {
    (useUserRepos as Mock).mockReturnValue({
      isLoading: true,
      data: undefined,
      error: undefined,
    });

    render(<UserRepoResults userName="testuser" />);

    expect(screen.getByTestId("results-loading")).toBeDefined();
  });

  test("should render an error message when an error occurs", () => {
    (useUserRepos as Mock).mockReturnValue({
      isLoading: false,
      data: undefined,
      error: new Error("Mocked Error"),
    });

    render(<UserRepoResults userName="testuser" />);

    expect(screen.getByTestId("results-error")).toBeDefined();
  });

  test("should render a message when the user has no repositories", () => {
    (useUserRepos as Mock).mockReturnValue({
      isLoading: false,
      data: [],
      error: undefined,
    });

    render(<UserRepoResults userName="testuser" />);

    expect(screen.getByTestId("no-user-repos")).toBeDefined();
  });

  test("should render a message when no repositories are available", () => {
    (useUserRepos as Mock).mockReturnValue({
      isLoading: false,
      data: undefined,
      error: undefined,
    });

    render(<UserRepoResults userName="testuser" />);

    waitFor(() => {
      expect(screen.getByTestId("no-user-repos")).toBeDefined();
    });
  });

  test("should render the list of repositories when data is available", async () => {
    const mockRepos = [
      {
        id: 1,
        name: "repo1",
        description: "Test Repo 1",
        stargazers_count: 10,
      },
      {
        id: 2,
        name: "repo2",
        description: "Test Repo 2",
        stargazers_count: 20,
      },
    ];

    (useUserRepos as Mock).mockReturnValue({
      isLoading: false,
      data: mockRepos,
      error: undefined,
    });

    render(<UserRepoResults userName="testuser" />);

    expect(screen.queryByTestId("results-loading")).toBeDefined();

    await waitFor(() => {
      mockRepos.forEach((repo) => {
        expect(screen.getByText(repo.name)).toBeDefined();
        expect(screen.getByText(repo.description)).toBeDefined();
      });
    });
  });
});
