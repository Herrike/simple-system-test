import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, test, expect, afterEach, Mock } from "vitest";
import UserResults from "./index";
import { useUsers } from "../../api/get-github-users";
import { useQuerySearchAtom } from "../../store/atoms/query-search-atom";

// Mock external dependencies
vi.mock("../../api/get-github-users", () => ({
  useUsers: vi.fn(),
}));

vi.mock("../../store/atoms/query-search-atom", () => ({
  useQuerySearchAtom: vi.fn(),
}));

vi.mock("../ui/result-list", () => ({
  default: vi.fn(() => <div data-testid="result-list">Result List</div>),
}));

describe("UserResults Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders nothing if querySearch is empty", () => {
    (useQuerySearchAtom as Mock).mockReturnValue([""]);
    (useUsers as Mock).mockReturnValue({});

    render(<UserResults />);

    expect(screen.queryByTestId("results-data")).toBeNull();
  });

  test("shows error message if there is an error", () => {
    (useQuerySearchAtom as Mock).mockReturnValue(["pony"]);
    (useUsers as Mock).mockReturnValue({ error: new Error("Mocked Error") });

    render(<UserResults />);

    expect(screen.getByTestId("results-error")).toBeDefined();
    expect(screen.getByText("An error occurred")).toBeDefined();
  });

  test("shows no users found message if no users are returned", () => {
    (useQuerySearchAtom as Mock).mockReturnValue([
      "random-jibberish-nobody-would-call-their-username-with",
    ]);
    (useUsers as Mock).mockReturnValue({ data: [] });

    render(<UserResults />);

    expect(screen.getByTestId("no-user-found")).toBeDefined();
  });

  test("renders ResultList with users if users are returned", () => {
    (useQuerySearchAtom as Mock).mockReturnValue(["pony"]);
    (useUsers as Mock).mockReturnValue({
      data: [
        { id: 1, login: "user1" },
        { id: 2, login: "user2" },
      ],
    });

    render(<UserResults />);

    waitFor(() => {
      expect(screen.getByTestId("result-list")).toBeDefined();
    });
  });
});
