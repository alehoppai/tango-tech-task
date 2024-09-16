import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { Popup } from "./Popup";
import { describe, test, expect, vi, beforeEach } from "vitest";

describe("Popup", () => {
  beforeEach(() => {
    cleanup();
  });

  test("renders children when open", () => {
    render(
      <Popup open={true} onClose={() => {}}>
        <div>Popup content</div>
      </Popup>
    );

    expect(screen.getByText("Popup content")).toBeInTheDocument();
  });

  test("does not render children when closed", () => {
    render(
      <Popup open={false} onClose={() => {}}>
        <div>Popup content</div>
      </Popup>
    );

    expect(screen.queryByText("Popup content")).not.toBeInTheDocument();
  });

  test("calls onClose when clicking outside", () => {
    const onCloseMock = vi.fn();
    render(
      <Popup open={true} onClose={onCloseMock}>
        <div>Popup content</div>
      </Popup>
    );

    fireEvent.mouseDown(document);

    expect(onCloseMock).toHaveBeenCalled();
  });

  test("does not call onClose when clicking inside", () => {
    const onCloseMock = vi.fn();
    render(
      <Popup open={true} onClose={onCloseMock}>
        <div>Popup content</div>
      </Popup>
    );

    fireEvent.mouseDown(screen.getByText("Popup content"));

    expect(onCloseMock).not.toHaveBeenCalled();
  });

  test("applies open animation class when open", () => {
    render(
      <Popup open={true} onClose={() => {}}>
        <div>Popup content</div>
      </Popup>
    );

    expect(screen.getByText("Popup content").parentElement).toHaveClass(
      "animate-open"
    );
  });

  test("applies close animation class when closed", () => {
    const { rerender } = render(
      <Popup open={true} onClose={() => {}}>
        <div>Popup content</div>
      </Popup>
    );

    // Rerender with open set to false
    rerender(
      <Popup open={false} onClose={() => {}}>
        <div>Popup content</div>
      </Popup>
    );

    expect(screen.getByText("Popup content").parentElement).toHaveClass(
      "animate-close"
    );
  });

  test("sets visible to false after close animation", () => {
    const { rerender } = render(
      <Popup open={true} onClose={() => {}}>
        <div>Popup content</div>
      </Popup>
    );

    rerender(
      <Popup open={false} onClose={() => {}}>
        <div>Popup content</div>
      </Popup>
    );

    const popupElement = screen.getByText("Popup content").parentElement;
    fireEvent.animationEnd(popupElement!, { animationName: "closeAnimation" });

    waitFor(
      () => {
        expect(popupElement).toHaveClass("hidden");
      },
      { timeout: 1000 }
    );
  });
});
