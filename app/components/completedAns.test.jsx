import CompletedQuestion from "./completedAns";
import { screen, render } from "@testing-library/react";


describe("test suite: completed question componenet", ()=>{

  test("test case: renders the completed message and image", () => {
    render(<CompletedQuestion reply="Test completed answer" />);
    expect(screen.getByText(/Test completed answer/i)).toBeInTheDocument();
    expect(screen.getByAltText("user icon")).toBeInTheDocument();
  });

})