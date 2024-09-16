import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page (index)", () => {
  test("Should contain level 1 header with 'Search jokes' text", () => {
    render(<Page />);

    expect(screen.getByRole("heading", { name: "Search Jokes" }));
  });
});
