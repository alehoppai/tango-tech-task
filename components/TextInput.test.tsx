import { render, screen } from "@testing-library/react";
import { TextInput } from "./TextInput";
import { describe, test, expect } from "vitest";

describe("TextInput", () => {
  test("renders input element with correct attributes", () => {
    render(<TextInput placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveClass(
      "py-2 px-4 w-full bg-blue-950 text-primary rounded-xl"
    );
  });

  test("renders right slot when provided", () => {
    render(<TextInput rightSlot={<div>Right Slot</div>} />);
    expect(screen.getByText("Right Slot")).toBeInTheDocument();
  });

  test("renders error message when provided", () => {
    render(<TextInput errorMessage="Error occurred" />);
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
    expect(screen.getByText("Error occurred")).toHaveClass("text-error");
  });

  test("passes additional props to input element", () => {
    render(
      <TextInput data-testid="custom-input" value="Test Value" readOnly />
    );
    const input = screen.getByTestId("custom-input");
    expect(input).toHaveValue("Test Value");
    expect(input).toHaveAttribute("readonly");
  });
});
