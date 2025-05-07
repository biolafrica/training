import { checkExistingSession } from "./checkTasks";
import { markSessionComplete } from "./updateTasks";
import { createClient } from "../supabase/server";


jest.mock("../supabase/server", () => ({
  createClient: jest.fn(),
}));

describe("test suite: supabase utility functions ", ()=>{
  const single = jest.fn();
  const eq = jest.fn(() => ({ single }));
  const select = jest.fn(() => ({ eq }));
  const update = jest.fn(() => ({ eq }));
  const from = jest.fn(() => ({ select, update }));
  const mockClient = { from };

  beforeEach(() => {
    createClient.mockResolvedValue(mockClient);
    jest.clearAllMocks();
  });

  describe("test suite :checkExistingSession utility file", ()=>{

    test("checkExistingSession returns session if found", async () => {
      single.mockResolvedValue({ data: { id: 1 }, error: null });
      const result = await checkExistingSession("user123");
      expect(result).toEqual({ id: 1 });
    });

    test("checkExistingSession returns message if not found", async () => {
      single.mockResolvedValue({ data: null, error: null });
      const result = await checkExistingSession("user123");
      expect(result).toEqual({ message: "No existing session for this user" });
    });

  });

  describe("test suite :markSessionComplete utility file", ()=>{
    test("markSessionComplete updates session to completed", async () => {
      eq.mockResolvedValue({ error: null });
      await expect(markSessionComplete("session123")).resolves.toBeUndefined();
      expect(update).toHaveBeenCalled();
    });

  });

})