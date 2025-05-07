import { POST } from "./route";
import { getTask } from "../../../utils/database/getTasks";
import { NextResponse } from "next/server";

jest.mock("../../../utils/database/getTasks", () => ({
  getTask: {
    getSession: jest.fn(),
    getMessageByQuestionId: jest.fn(),
  },
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({ data, ...init })),
  },
}));

describe("test suite:POST /get-answer route", ()=>{
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("test case: returns 400 if sessionId or questionId is missing", async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue({ sessionId: "sess123" }),
    };

    const res = await POST(mockReq);
    expect(res.status).toBe(400);
    expect(res.data).toEqual({ error: "No data received" });
  });

  test("test case: returns 200 with status and answer if valid", async () => {
    getTask.getSession.mockResolvedValue({ status: "active" });
    getTask.getMessageByQuestionId.mockResolvedValue([{ id: "msg456" }]);

    const mockReq = {
      json: jest.fn().mockResolvedValue({ sessionId: "sess123", questionId: "qst789" }),
    };

    const res = await POST(mockReq);
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ status: "active", answer: [{ id: "msg456" }] });
  });

  test("returns 500 if an unexpected error occurs", async () => {
    getTask.getSession.mockRejectedValue(new Error("DB crash"));

    const mockReq = {
      json: jest.fn().mockResolvedValue({ sessionId: "sess123", questionId: "qst789" }),
    };

    const res = await POST(mockReq);
    expect(res.status).toBe(500);
    expect(res.data).toEqual({ error: "Internal server error" });
  });




})