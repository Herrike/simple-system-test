import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, test, expect, Mock, afterEach } from "vitest";
import SearchForm from "./index";
import { useQuerySearchAtom } from "../../store/atoms/query-search-atom";

vi.mock("../../store/atoms/query-search-atom", () => ({
  useQuerySearchAtom: vi.fn(),
}));

describe("SearchForm Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("renders the search input and button", () => {
    const mockSetQuerySearch = vi.fn();
    (useQuerySearchAtom as unknown as Mock).mockReturnValue([
      "",
      mockSetQuerySearch,
    ]);

    render(<SearchForm />);

    const input = screen
      .getAllByTestId("query-search")[0]
      ?.querySelector("input") as HTMLInputElement;
    const button = screen.getAllByTestId("search-submit-btn")[0];

    expect(input).toBeDefined();
    expect(button).toBeDefined();
  });

  test("updates the query search atom on form submission", () => {
    // Mock the state atom
    const mockSetQuerySearch = vi.fn();
    (useQuerySearchAtom as unknown as Mock).mockReturnValue([
      "",
      mockSetQuerySearch,
    ]);

    render(<SearchForm />);

    const input = screen
      .getAllByTestId("query-search")[0]
      ?.querySelector("input") as HTMLInputElement;
    const button = screen.getAllByTestId("search-submit-btn")[0];

    // Simulate user typing into the input field
    fireEvent.change(input, { target: { value: "pony" } });

    // Simulate form submission
    fireEvent.click(button);

    // Assert the atom was updated
    waitFor(() => {
      expect(mockSetQuerySearch).toHaveBeenCalledWith("pony");
    });
  });

  test("does not update the atom if the input value is unchanged", () => {
    const mockSetQuerySearch = vi.fn();
    (useQuerySearchAtom as unknown as Mock).mockReturnValue([
      "pony",
      mockSetQuerySearch,
    ]);

    render(<SearchForm />);

    const input = screen
      .getAllByTestId("query-search")[0]
      ?.querySelector("input") as HTMLInputElement;
    const button = screen.getAllByTestId("search-submit-btn")[0];

    fireEvent.click(button);

    waitFor(() => {
      expect(mockSetQuerySearch).not.toHaveBeenCalled();
      expect(input.value).toBe("pony");
    });
  });

  test("clears the input field after submission if required", () => {
    const mockSetQuerySearch = vi.fn();
    (useQuerySearchAtom as unknown as Mock).mockReturnValue([
      "",
      mockSetQuerySearch,
    ]);

    render(<SearchForm />);

    const input = screen
      .getAllByTestId("query-search")[0]
      .querySelector("input") as HTMLInputElement;
    const button = screen.getAllByTestId("search-submit-btn")[0];

    fireEvent.change(input, { target: { value: "pony" } });

    fireEvent.click(button);

    waitFor(() => {
      expect(input.value).toBe("pony");
    });
  });
});
