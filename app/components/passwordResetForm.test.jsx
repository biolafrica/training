import PasswordResetForm from "./passwordResetForm"
import { render,screen, waitFor, fireEvent } from "@testing-library/react"
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";


jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));
jest.mock("../utils/supabase/client", () => ({ createClient: jest.fn() }));


describe("test suite: passwordResestForm Componenets", ()=>{
  const push = jest.fn();
  const updateUser = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push });
    createClient.mockReturnValue({ auth: { updateUser } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("test case:renders input and submit button", ()=>{
    render(<PasswordResetForm token="dummy-token" />);
    expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset password/i })).toBeInTheDocument();

  });

  test("test case: submits password and redirects on success", async () => {
    updateUser.mockResolvedValue({});
    render(<PasswordResetForm token="dummy-token" />);
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: "newStrongPassword!" } });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith({ password: "newStrongPassword!" }, { access_token: "dummy-token" });
      expect(push).toHaveBeenCalledWith("/login");
    });
  });

  test("test case; displays error message on failure", async () => {
    updateUser.mockResolvedValue({ error: { message: "Invalid token" } });
    render(<PasswordResetForm token="bad-token" />);
    fireEvent.change(screen.getByLabelText(/new password/i), { target: { value: "pass" } });
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText(/invalid token/i)).toBeInTheDocument();
    });
  });

  
});

