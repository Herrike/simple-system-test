import { renderHook, waitFor } from "@testing-library/react";
import { vi, describe, test, expect, Mock, afterEach } from "vitest";
import { useUserRepos } from "./index"; // Adjust path based on your setup
import octokit from "../octokit-config";

vi.mock("../octokit-config", () => ({
  default: {
    request: vi.fn(),
  },
}));

describe("useUserRepos Hook", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should return undefined if username is not provided", () => {
    const { result } = renderHook(() => useUserRepos(""));

    expect(result.current).toBeUndefined();
  });

  test("should fetch repos successfully and return data", async () => {
    const mockRepos = [
      { id: 1, name: "pony-xl", descrition: "pony-xl model" },
      { id: 2, name: "flux-pro", descrition: "flux-pro model" },
    ];

    (octokit.request as unknown as Mock).mockResolvedValue({
      status: 200,
      data: mockRepos,
    });

    const { result } = renderHook(() => useUserRepos("gonzotestuser"));

    await waitFor(() => expect(result.current?.data).toBeDefined());

    expect(result.current?.data).toEqual(mockRepos);
    expect(result.current?.error).toBeUndefined();
    expect(result.current?.isLoading).toBeFalsy();

    expect(octokit.request).toHaveBeenCalledWith(
      "GET /users/gonzotestuser/repos",
      {
        username: "gonzotestuser",
        per_page: 5,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
  });

  test("should handle API errors correctly", async () => {
    (octokit.request as unknown as Mock).mockRejectedValue(
      new Error("Mocked API Error"),
    );

    const { result } = renderHook(() => useUserRepos("errortestuser"));

    await waitFor(() => expect(result.current?.error).toBeDefined());

    expect(result.current?.data).toBeUndefined();
    expect(result.current?.error?.message).toBe("Error: Mocked API Error");
    expect(result.current?.isLoading).toBeFalsy();
  });

  test("should handle non-200 responses gracefully", async () => {
    (octokit.request as unknown as Mock).mockResolvedValue({
      status: 500,
      data: [],
    });

    const { result } = renderHook(() => useUserRepos("testuser"));

    await waitFor(() => expect(result.current?.error).toBeDefined());

    expect(result.current?.data).toBeUndefined();
    expect(result.current?.error?.message).toBe(
      "Error: An error occurred while fetching the data.",
    );
    expect(result.current?.isLoading).toBeFalsy();
  });

  test("should use the default limit if not specified", async () => {
    const mockRepos = [
      { id: 1, name: "sdxl", description: "sdxl model" },
      { id: 2, name: "sd-cascade", description: "sd Cascade model" },
    ];

    (octokit.request as unknown as Mock).mockResolvedValue({
      status: 200,
      data: mockRepos,
    });

    const { result } = renderHook(() => useUserRepos("ponyfakeuser"));

    await waitFor(() => expect(result.current?.data).toBeDefined());

    expect(result.current?.data).toEqual(mockRepos);
    expect(result.current?.error).toBeUndefined();
    expect(result.current?.isLoading).toBeFalsy();

    expect(octokit.request).toHaveBeenCalledWith(
      "GET /users/ponyfakeuser/repos",
      {
        username: "ponyfakeuser",
        per_page: 5, // our default and yet very arbitrary limit
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
  });
});
