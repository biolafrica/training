import { POST } from "./route";
import { addTask } from "../../utils/database/addTasks";
import { NextResponse } from "next/server";

jest.mock("../../utils/database/addTasks", () => ({
  addTask: {
    addUser: jest.fn(),
  },
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({ data, ...init })),
  },
}));

describe("test suite: POST /user-create", ()=>{
  afterEach(() => {
    jest.clearAllMocks();
  });


  test("test case: returns 400 if no userData is provided", async () => {
    const mockReq = {
      json: jest.fn().mockResolvedValue(null),
    };

    const res = await POST(mockReq);
    expect(res.status).toBe(400);
    expect(res.data).toEqual({ error: "No userdata received" });
  });

  test("returns 200 if userData is valid", async () => {
    const mockUser = { id: "u1", name: "Alice" };
    addTask.addUser.mockResolvedValue(mockUser);

    const mockReq = {
      json: jest.fn().mockResolvedValue({ name: "Alice" }),
    };

    const res = await POST(mockReq);
    expect(res.status).toBe(undefined); // No explicit status, default 200
    expect(res.data).toEqual({ data: mockUser });
    expect(addTask.addUser).toHaveBeenCalledWith({ name: "Alice" });
  });

  test("returns 500 if addUser throws", async () => {
    addTask.addUser.mockRejectedValue(new Error("DB error"));

    const mockReq = {
      json: jest.fn().mockResolvedValue({ name: "Alice" }),
    };

    const res = await POST(mockReq);
    expect(res.status).toBe(500);
    expect(res.data).toEqual({ error: "Failed to save user" });
  });


})