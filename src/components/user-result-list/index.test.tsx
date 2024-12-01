import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import UserResultList from ".";
import { type User } from "../../types/globals.d";

describe("UserResultList Component", () => {
  test("does not render UserRepoResults for collapsed accordions", () => {
    const noMockUsers: User[] = [];
    render(<UserResultList users={noMockUsers} />);

    const userRepoResults = screen.queryByTestId("user-repo-results");
    expect(userRepoResults).toBeNull();
  });
});
