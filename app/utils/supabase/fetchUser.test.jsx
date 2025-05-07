import fetchUser from "./fetchUser";
import { createClient } from "./server";
import { redirect } from "next/navigation";

jest.mock("./server", () => ({
  createClient: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("test suite: fetUser function", ()=>{
  const getUser = jest.fn();
  const mockClient = { auth: { getUser } };

  beforeEach(() => {
    jest.clearAllMocks();
    createClient.mockResolvedValue(mockClient);
  });

  test("test case: returns user data if user is found", async () => {
    getUser.mockResolvedValue({
      data: { user: { id: "user123", email: "test@example.com" } },
      error: null,
    });

    const result = await fetchUser();

    expect(result).toEqual({ user: { id: "user123", email: "test@example.com" } });
    expect(redirect).not.toHaveBeenCalled();
  });

  test("test case: redirects to login if no user is returned", async () => {
    getUser.mockResolvedValue({ data: { user: null }, error: null });

    await fetchUser();

    expect(redirect).toHaveBeenCalledWith("/login");
  });

  test("test case: redirects to login on error", async () => {
    getUser.mockResolvedValue({ data: null, error: new Error("Auth failed") });

    await fetchUser();

    expect(redirect).toHaveBeenCalledWith("/login");
  });

})