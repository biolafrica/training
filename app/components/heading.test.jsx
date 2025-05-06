import Heading from "./heading";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("../utils/supabase/client", () => ({ createClient: jest.fn() }));

describe("test suite: heading componenets", ()=>{
  const signOut = jest.fn();
  const push = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push });
    createClient.mockReturnValue({ auth: { signOut } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders with correct icons", () => {
    render(<Heading type="admin" />);
    expect(screen.getByAltText("admin icon")).toBeInTheDocument();
    expect(screen.getByAltText("logout icon")).toBeInTheDocument();
  });

  test("calls logout and redirects on click", async () => {
    signOut.mockResolvedValue({});
    render(<Heading type="admin" />);
    fireEvent.click(screen.getByAltText("logout icon"));

    await waitFor(() => {
      expect(signOut).toHaveBeenCalled();
      expect(push).toHaveBeenCalledWith("/login");
    });
  });

  test("logs error if logout fails", async () => {
    const error = { message: "Logout failed" };
    signOut.mockResolvedValue({ error });
    console.error = jest.fn();
    render(<Heading type="admin" />);
    fireEvent.click(screen.getByAltText("logout icon"));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Logout error:", "Logout failed");
    });
  });

})