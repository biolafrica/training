import ReplyForm from "./replyForm";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));

describe("test suite: Replyform componenet", ()=>{
  const mockMessage = { sessionId: "session123", id: "q1" };

  beforeEach(() => {
    jest.clearAllMocks();
    delete global.fetch;
  });

  test("test case: renders QuestionForm when session is in progress and unanswered", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: "in_progress", answer: [] }),
      })
    );

    render(<ReplyForm message={mockMessage} />);

    await waitFor(() => {
      expect(screen.getByRole("form")).toBeInTheDocument();
    });

  });

  test("renders CompletedQuestion when session is in progress and answered", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          status: "in_progress",
          answer: [{ messages: "Completed response" }],
        }),
      })
    );

    render(<ReplyForm message={mockMessage} />);

    await waitFor(() => {
      expect(screen.getByText(/Completed response/)).toBeInTheDocument();
    });
  });

  test("renders final message with Go Home link when session is completed and unanswered", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ status: "completed", answer: [] }),
      })
    );

    render(<ReplyForm message={mockMessage} />);

    await waitFor(() => {
      expect(screen.getByRole("link", { name: /go home/i })).toBeInTheDocument();
    });
  });

  test("handles fetch error gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Fetch failed" }),
      })
    );

    render(<ReplyForm message={mockMessage} />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Resume test error",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

});
