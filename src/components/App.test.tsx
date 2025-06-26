import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { App } from "./App";

describe("App tests", () => {
  it("should create new todo item when Enter is pressed", () => {
    render(<App />);
    const input = screen.getByLabelText("What's your plan for today?");

    act(() => {
      fireEvent.change(input, { target: { value: "Test todo" } });
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    });

    expect(screen.getByText("Test todo")).toBeInTheDocument();
  });

  it("should filter out Completed todo items when Active filter is selected", () => {
    window.localStorage.setItem(
      "my-todo",
      JSON.stringify([
        { id: 1, description: "Active todo", isCompleted: false },
        { id: 2, description: "Completed todo", isCompleted: true },
      ])
    );
    render(<App />);

    act(() => {
      fireEvent.click(screen.getByText("Active"));
    });

    expect(screen.getByText("Active todo")).toBeInTheDocument();
    expect(screen.queryByText("Completed todo")).not.toBeInTheDocument();
  });

  it("should filter out Active todo items when Completed filter is selected", () => {
    window.localStorage.setItem(
      "my-todo",
      JSON.stringify([
        { id: 1, description: "Active todo", isCompleted: false },
        { id: 2, description: "Completed todo", isCompleted: true },
      ])
    );
    render(<App />);

    act(() => {
      fireEvent.click(screen.getByText("Completed"));
    });

    expect(screen.getByText("Completed todo")).toBeInTheDocument();
    expect(screen.queryByText("Active todo")).not.toBeInTheDocument();
  });

  it("should remove Completed todo items when Clear button is pressed", () => {
    window.localStorage.setItem(
      "my-todo",
      JSON.stringify([
        { id: 1, description: "Active todo", isCompleted: false },
        { id: 2, description: "Completed todo", isCompleted: true },
      ])
    );
    render(<App />);

    act(() => {
      fireEvent.click(screen.getByText("Clear completed"));
    });

    expect(screen.getByText("Active todo")).toBeInTheDocument();
    expect(screen.queryByText("Completed todo")).not.toBeInTheDocument();
  });
});
