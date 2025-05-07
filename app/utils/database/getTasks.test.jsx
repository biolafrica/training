import { getTask } from "./getTasks";
import { createClient } from "../supabase/server";
import { NextResponse } from "next/server";

jest.mock("../supabase/server", () => ({
  createClient: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: { json: jest.fn() },
}));

describe("test suite: get task supabase utility", ()=>{
  const single = jest.fn();
  const eq = jest.fn(() => ({ single }));
  const select = jest.fn(() => ({ eq }));
  const order = jest.fn(() => ({ limit: jest.fn(() => ({ single })) }));
  const from = jest.fn(() => ({ select, order }));
  const mockClient = { from };

  beforeEach(() => {
    jest.clearAllMocks();
    createClient.mockResolvedValue(mockClient);
    getTask.supabase = null; 
    from.mockImplementation(() => ({ select, order, update: jest.fn(), eq }));
  });

  test("test case: getMessage returns a message by ID", async () => {
    single.mockResolvedValue({ data: { id: "msg123" }, error: null });
    const data = await getTask.getMessage("msg123");
    expect(data).toEqual({ id: "msg123" });
  });

  test("test case: getSession returns a session by ID", async () => {
    single.mockResolvedValue({ data: { id: "session123" }, error: null });
    const data = await getTask.getSession("session123");
    expect(data).toEqual({ id: "session123" });
  });

  test("test case: getReport returns report by session ID", async () => {
    single.mockResolvedValue({ data: { id: "report123" }, error: null });
    const data = await getTask.getReport("report123");
    expect(data).toEqual({ id: "report123" });
  });

  test(" test case: getUserRole returns role if user exists", async () => {
    single.mockResolvedValue({ data: { role: "runner" }, error: null });
    const result = await getTask.getUserRole("user123");
    expect(result).toEqual({ role: "runner" });
  });

  test("test case: getUserRole returns 404 if user not found", async () => {
    single.mockResolvedValue({ data: null, error: null });
    await getTask.getUserRole("user404");
    expect(NextResponse.json).toHaveBeenCalledWith({ error: "User not found" }, { status: 404 });
  });

  test("test case: getMessageByQuestionId returns multiple replies", async () => {
    const mockMessages = [
      { id: "1", replyTo: "q1" },
      { id: "2", replyTo: "q1" },
    ];
    // Chain eq twice manually
    const eq2 = jest.fn(() => ({ data: mockMessages, error: null }));
    select.mockReturnValueOnce({ eq: jest.fn(() => ({ eq: eq2 })) });

    const result = await getTask.getMessageByQuestionId("sess001", "q1");
    expect(result).toEqual(mockMessages);
  });


  test("test case: fetchSingleRow throws on Supabase error", async () => {
    single.mockResolvedValue({ data: null, error: { message: "DB Error" } });

    await expect(getTask.getMessage("bad-id")).rejects.toThrow("DB Error");
  });

})