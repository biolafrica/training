import Instruction from "./instruction";
import { render, screen, fireEvent } from "@testing-library/react";


describe("Instruction", () => {
  test("renders static instruction headings", () => {
    render(<Instruction />);
    expect(screen.getByText(/AI-Powered Food Delivery/i)).toBeInTheDocument();
    expect(screen.getByText(/Instructions/i)).toBeInTheDocument();
  });

  test("toggles instruction", () => {

    render(<Instruction />);
    const toggle = screen.getByTestId("toggle");
    const content = screen.getByTestId("content")

  
    expect(content).toBeVisible();
    expect(screen.queryByText("close")).not.toBeInTheDocument();
    expect(screen.getByText("more")).toBeInTheDocument();
    fireEvent.click(screen.getByText("more"))
    expect(screen.queryByText("more")).not.toBeVisible();


  });

});