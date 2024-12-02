import "@testing-library/jest-dom/vitest";
import { vi, beforeAll } from "vitest";

beforeAll(() => {
  vi.mock("jotai", async () => {
    const actualJotai = await vi.importActual("jotai");

    return { ...actualJotai };
  });
});
