import { POST } from "./route";
import { getTask } from "../../../utils/database/getTasks";
import { addTask } from "../../../utils/database/addTasks";
import { Latitude, LatitudeApiError } from "@latitude-data/sdk";
import { NextResponse } from "next/server";

jest.mock("../../../utils/database/addTasks", () => ({
  addTask: {
    addMessage: jest.fn(),
    createNewSession: jest.fn(),
  },
}));

jest.mock("../../../utils/database/getTasks", () => ({
  getTask: {
    getUserRole: jest.fn(),
  },
}));

const mockRun = jest.fn();

const mockLatitudeInstance = {
  prompts: {
    run: mockRun,
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

describe("test suite: POST /start-chat ", ()=>{

  const defaultBody = {
    id: "message123",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("test case: returns 400 if required fields are missing", async()=>{
    const req = {
      json: jest.fn().mockResolvedValue({}),
    };

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(res.data).toEqual({ error: "No user id received" });

  })

  test("test case: returns 400 if role field is missing", async()=>{
    const req = {
      json: jest.fn().mockResolvedValue(defaultBody),
    };

    getTask.getUserRole.mockResolvedValue({ role: null });

    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(res.data).toEqual({ error: "role not found" });

  })

  test("test case: returns 200 if uuid was generated", async()=>{
    const req = {
      json: jest.fn().mockResolvedValue(defaultBody),
    };

    getTask.getUserRole.mockResolvedValue({ role: "customer_experience" });

    addTask.createNewSession.mockResolvedValue({id:"test123"})
    addTask.addMessage.mockResolvedValue({ id: "msg123" });

    mockRun.mockResolvedValue({
      uuid:"123456tyr",
      response: {
        text: `\`\`\`json
        {
          "message": "Here is the response",
          "is_complete": false,
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
    expect(addTask.addMessage).toHaveBeenCalledTimes(1); 
    expect(addTask.createNewSession).toHaveBeenCalledTimes(1); 
    expect(res.data).toEqual({
      savedMessages: { id: "msg123" },
      sessionId: "test123",
      latitudeId: "123456tyr",
      is_complete: false,

    });

  })

  test("test case: handles LatitudeApiError gracefully", async()=>{
    const req = {
      json: jest.fn().mockResolvedValue(defaultBody),
    };

    getTask.getUserRole.mockResolvedValue({ role: "customer_experience" });

    mockRun.mockRejectedValue(new LatitudeApiError("Latitude blew up"));


    const res = await POST(req);
    expect(res.status).toBe(400);
    expect(res.data).toEqual({ error: "Latitude blew up" });

  })

  test("test case: handles unexpected errors", async()=>{
    const req = {
      json: jest.fn().mockResolvedValue(defaultBody),
    };

    getTask.getUserRole.mockResolvedValue({ role: "customer_experience" });

    mockRun.mockRejectedValue(new Error("Something else failed"));


    const res = await POST(req);
    expect(res.status).toBe(500);
    expect(res.data).toEqual({ error: "Internal server error" });

  })

})