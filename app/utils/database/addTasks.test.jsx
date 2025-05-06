import { addTask } from "./addTasks";
import { createClient } from "../supabase/server";

jest.mock("../supabase/server", () => ({
  createClient: jest.fn(),
}));

describe("test suite: add Tasks Utility", ()=>{
  const single = jest.fn();
  const select = jest.fn(() => ({ single }));
  const insert = jest.fn(() => ({ select }));
  const from = jest.fn(() => ({ insert }));

  const mockClient = { from };

  beforeEach(() => {
    createClient.mockResolvedValue(mockClient);
    single.mockReset();
    insert.mockClear();
    select.mockClear();
    from.mockClear();
  });

  test("inserts a single user row", async () => {
    single.mockResolvedValue({ data: { id: 1 }, error: null });
    const user = { name: "Abdul", email: "test@mail.com" };

    const result = await addTask.addUser(user);

    expect(result).toEqual({ id: 1 });
    expect(mockClient.from).toHaveBeenCalledWith("User");
    expect(insert).toHaveBeenCalledWith([user]);
  });

  test("creates a new session", async () => {
    single.mockResolvedValue({ data: { id: 2 }, error: null });
    const result = await addTask.createNewSession("user-id", "runner", "latitude-id");
    expect(mockClient.from).toHaveBeenCalledWith("Sessions");
    expect(result).toEqual({ id: 2 });
  });

  test("adds a message", async () => {
    single.mockResolvedValue({ data: { id: 3 }, error: null });
    const result = await addTask.addMessage("session123", "Hello", "admin", "q1");
    expect(mockClient.from).toHaveBeenCalledWith("Messages");
    expect(result).toEqual({ id: 3 });
  });

  test("adds a report", async () => {
    single.mockResolvedValue({ data: { id: 4 }, error: null });
    const result = await addTask.addReport("session123", "Summary", "Full report...");
    expect(mockClient.from).toHaveBeenCalledWith("TrainingReport");
    expect(result).toEqual({ id: 4 });
  });

  test("throws on insert error", async () => {
    single.mockResolvedValue({ error: { message: "Insert failed" } });
    console.error = jest.fn();

    await expect(
      addTask.insertSingleRow("User", [{ name: "Abdul" }])
    ).rejects.toThrow("Insert failed");

    expect(console.error).toHaveBeenCalledWith("Insert Error in User:", "Insert failed");
  });

})