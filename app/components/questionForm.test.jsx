import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import QuestionForm from "./questionForm";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));

describe("test suite: questionform component", ()=>{
  const push = jest.fn();
  beforeEach(() => {
    useRouter.mockReturnValue({ push });
    jest.clearAllMocks();
  });

  test("test case: submits answer and redirects on success", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ savedMessages: { id: "next123" } }),
      })
    );

    render(<QuestionForm sessionId="s1" questionId="q1" />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "My answer" },
    });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(push).toHaveBeenCalledWith("/test/next123");
    });
  });

});
