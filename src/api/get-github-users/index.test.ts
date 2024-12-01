import { renderHook, waitFor } from "@testing-library/react";
import { vi, expect, describe, afterEach, test, Mock } from "vitest";
import { useUsers } from "../get-github-users";
import octokit from "../octokit-config";

vi.mock("../octokit-config", () => ({
  default: {
    request: vi.fn(),
  },
}));

describe("useUsers Hook", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should fetch users successfully and return data", async () => {
    // Define the mock response for this test
    (octokit.request as unknown as Mock).mockResolvedValue({
      status: 200,
      data: {
        items: [
          { id: 1, login: "pony" },
          { id: 2, login: "flux" },
        ],
      },
    });

    const querySearch = "testQuery";
    const { result } = renderHook(() => useUsers(querySearch));

    // Initially, it should be loading
    expect(result.current).toEqual({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    // Wait for the data to be fetched
    await waitFor(() => expect(result.current?.data).toBeDefined());

    // After fetching, expect data to be populated and not loading
    expect(result.current).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({ id: 1, login: "pony" }),
          expect.objectContaining({ id: 2, login: "flux" }),
        ]),
        error: undefined,
        isLoading: false,
      }),
    );

    // Assert the mock was called correctly
    expect(octokit.request).toHaveBeenCalledTimes(1);
    expect(octokit.request).toHaveBeenCalledWith(
      "GET /search/users",
      expect.objectContaining({
        q: querySearch,
        per_page: 5,
        headers: expect.objectContaining({
          "X-GitHub-Api-Version": "2022-11-28",
        }),
      }),
    );
  });

  test("should handle empty query search correctly", () => {
    const { result } = renderHook(() => useUsers(""));

    // Immediately return without data when query is empty
    expect(result.current).toBeUndefined();
  });

  test("should handle error scenario", async () => {
    // Define the mock rejected response for this test
    (octokit.request as unknown as Mock).mockRejectedValue(
      new Error("Mocked API Error"),
    );

    const querySearch = "errorTest";
    const { result } = renderHook(() => useUsers(querySearch));

    // Wait for the error to be caught
    await waitFor(() => expect(result.current?.error).toBeDefined());

    // Expect error to be populated and not loading after error
    expect(result.current).toEqual(
      expect.objectContaining({
        data: undefined,
        error: expect.any(Error),
        isLoading: false,
      }),
    );
  });
});
