import { POST } from "./route";
import { addTask } from "../../../utils/database/addTasks";
import { getTask } from "../../../utils/database/getTasks";
import { markSessionComplete } from "../../../utils/database/updateTasks";
import { Latitude, LatitudeApiError } from "@latitude-data/sdk";
import { NextResponse } from "next/server";

jest.mock("../../../utils/database/addTasks", () => ({
  addTask: {
    addMessage: jest.fn(),
    addReport: jest.fn(),
  },
}));

jest.mock("../../../utils/database/getTasks", () => ({
  getTask: {
    getSession: jest.fn(),
  },
}));

jest.mock("../../../utils/database/updateTasks", () => ({
  markSessionComplete: jest.fn(),
}));

const mockChat = jest.fn();

const mockLatitudeInstance = {
  prompts: {
    chat: mockChat,
  },
};

jest.mock("@latitude-data/sdk", () => {
  return {
    Latitude: jest.fn(() => mockLatitudeInstance),
    LatitudeApiError: class extends Error {
      constructor(message) {
        super(message);
        this.name = "LatitudeApiError";
        this.status = 400;
      }
    },
  };
});

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({ data, ...init })),
  },
}));

describe("test suite: POST /continue-chat", ()=>{
  const defaultBody = {
    sessionId: "session123",
    messages: "Hello, assistant",
    sender: "user",
    questionId: "q1",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("test case: returns 400 if required fields are missing", async () => {
    const req = {
      json: jest.fn().mockResolvedValue({}),
    };

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(res.data).toEqual({ error: "Missing required field" });
  });

  test("test case: returns 400 if latitude_id not found", async () => {
    const req = {
      json: jest.fn().mockResolvedValue(defaultBody),
    };

    getTask.getSession.mockResolvedValue({ latitude_id: null });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(res.data).toEqual({ error: "Latitude session not found" });
  });

  test("test case: returns 200 and saves messages and report if is_complete is true", async () => {
    const req = {
      json: jest.fn().mockResolvedValue(defaultBody),
    };

    getTask.getSession.mockResolvedValue({ latitude_id: "lat123" });
    addTask.addMessage.mockResolvedValue({ id: "msg123" });

    mockChat.mockResolvedValue({
      response: {
        text: `\`\`\`json
        {
          "message": "Here is the response",
          "is_complete": true,
          "report": {
            "summary": "Summary here",
            "detailedReport": "Details here"
          }
        }
        \`\`\``,
      },
    });


    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(addTask.addMessage).toHaveBeenCalledTimes(2); 
    expect(addTask.addReport).toHaveBeenCalledWith("session123", "Summary here", "Details here");
    expect(markSessionComplete).toHaveBeenCalledWith("session123");

    expect(res.data).toEqual({
      savedMessages: { id: "msg123" },
      sessionId: "session123",
    });
  });

  test("test case: handles LatitudeApiError gracefully", async () => {
    const req = {
      json: jest.fn().mockResolvedValue(defaultBody),
    };

    getTask.getSession.mockResolvedValue({ latitude_id: "lat123" });

    mockChat.mockRejectedValue(new LatitudeApiError("Latitude blew up"));

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(res.data).toEqual({ error: "Latitude blew up" });
  });

  test("test case: handles unexpected errors", async () => {
    const req = {
      json: jest.fn().mockResolvedValue(defaultBody),
    };

    getTask.getSession.mockResolvedValue({ latitude_id: "lat123" });
    mockChat.mockRejectedValue(new Error("Something else failed"));

    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(res.data).toEqual({ error: "Internal server error" });
  });

})

