import { POST } from "./route";
import { getTask } from "../../../utils/database/getTasks";
import { NextResponse } from "next/server";


jest.mock("../../../utils/database/getTasks", () => ({
  getTask: {
    getLastMessage: jest.fn(),
  },
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({ data, ...init })),
  },
}));

describe("test suite: POST /get-last-message route", ()=>{
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("test case: returns 400 if sessionId is missing", async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue({}),
    };

    const res = await POST(mockReq);
    expect(res.status).toBe(400);
    expect(res.data).toEqual({ error: "No sessionId received" });
  });

  test("test case: returns 200 and message data if sessionId is valid", async () => {
    const mockData = { id: "msg123" };
    getTask.getLastMessage.mockResolvedValue(mockData);

    const mockReq = {
      json: jest.fn().mockResolvedValue({ sessionId: "sess123" }),
    };

    const res = await POST(mockReq);
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ data: mockData });
    expect(getTask.getLastMessage).toHaveBeenCalledWith("sess123");
  });

  test("test case: returns 500 on unexpected error", async () => {
    getTask.getLastMessage.mockRejectedValue(new Error("DB failed"));

    const mockReq = {
      json: jest.fn().mockResolvedValue({ sessionId: "sess123" }),
    };

    const res = await POST(mockReq);
    expect(res.status).toBe(500);
    expect(res.data).toEqual({ error: "Internal server error" });
  });

})