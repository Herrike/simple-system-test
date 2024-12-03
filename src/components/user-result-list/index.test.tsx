import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { test, describe, expect } from "vitest";
import UserResultList from ".";

// Mock data for users
const mockUsers = [
  { id: 1, login: "pony" },
  { id: 2, login: "flux" },
];

describe("UserResultList Component", () => {
  test("renders a list of users and toggles accordion panels", () => {
    // Render the component with mock users
    render(<UserResultList users={mockUsers} />);

    // Check if all usernames are rendered
    mockUsers.forEach((user) => {
      expect(screen.getByText(user.login)).toBeDefined();
    });

    // Select the first accordion panel
    const firstPanel = screen.getByTestId("panel0-header");
    expect(firstPanel).toBeDefined();

    // Expand the first panel
    fireEvent.click(firstPanel);

    waitFor(() => {
      expect(
        screen.getByTestId("panel0-content").getAttribute("aria-expanded"),
      ).toBe("true");
    });

    // Collapse the first panel
    fireEvent.click(firstPanel);

    waitFor(() => {
      expect(
        screen.getByTestId("panel0-content").getAttribute("aria-expanded"),
      ).toBe("true");
      expect(
        screen.getByTestId("panel1-content").getAttribute("aria-expanded"),
      ).toBe("false");
    });

    // Verify that interacting with one panel doesn't affect others
    const secondPanel = screen.getByTestId("panel1-header");
    fireEvent.click(secondPanel);

    waitFor(() => {
      expect(
        screen.getByTestId("panel1-content").getAttribute("aria-expanded"),
      ).toBe("true");
      expect(
        screen.getByTestId("panel0-content").getAttribute("aria-expanded"),
      ).toBe("false");
    });
  });
});
