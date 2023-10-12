import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TopNav } from "./top-nav";

describe("TopNav", () => {
    it("should render", () => {
        // ARRANGE
        render(<TopNav />);

        // ACT
        const content: HTMLElement = screen.getByText("Cellular Artistry");

        // ASSERT
        expect(content).not.toBe(null);
    });
});
