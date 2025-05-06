import { render,screen,fireEvent,waitFor } from "@testing-library/react";
import AuthForm from "./authForm";
import { useRouter } from "next/navigation";
import useForm from "../hooks/useForm";
import { createClient } from "../utils/supabase/client";

jest.mock("next/navigation", ()=>({
  useRouter : jest.fn()
}))

jest.mock("../utils/supabase/client",()=> ({
  createClient : jest.fn()
}))

jest.mock("../hooks/useForm", ()=> jest.fn())

describe("test suite: auth form componenet", ()=>{
  const mockPush = jest.fn();
  const mockResetForm = jest.fn();
  const mockHandleInputChange = jest.fn();
  const defaultFormData = {
    first_name: "John",
    last_name: "Doe",
    email: "test@gmail.com",
    password: "password123",
    role: "customer_experience"
  };

  beforeEach(()=>{
    useRouter.mockReturnValue({push: mockPush})
    useForm.mockReturnValue({
      formData: defaultFormData,
      handleInputChange :mockHandleInputChange,
      resetForm: mockResetForm
    });
    global.fetch = jest.fn();
    process.env.NEXT_PUBLIC_URL = "http://localhost:3000"

  });

  afterEach(()=>{
    jest.clearAllMocks();
  })

  test("test case: renders all field in register mode", ()=>{
    render(<AuthForm status="register"/>);

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", {name: /submit/i})).toBeInTheDocument();
  })

  test("test case: renders email and password only in register mode", ()=>{
    render(<AuthForm status="login"/>);

    expect(screen.queryByLabelText(/First Name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Last Name/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Role/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Forget Password/i)).toBeInTheDocument();
  })

  test("test case: submit  register form and redirect to verify", async ()=>{
    const mockSignUp = jest.fn().mockResolvedValue({data:{user:{id: "123"}}, error: null});
    const mockSignIn = jest.fn();
    createClient.mockReturnValue({auth: { signUp: mockSignUp, signInWithPassword: mockSignIn }})

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: true })
    });

    render(<AuthForm status= "register"/>)
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/auth/verify");
    });

  })

  test("test case: shows error if signInWithPassword fails", async()=>{
    
    const errorMessage = "Invalid credentials";
    const mockSignIn = jest.fn().mockResolvedValue({ error: { message: errorMessage } });
    const mockSignUp = jest.fn();
    createClient.mockReturnValue({ auth: { signInWithPassword: mockSignIn, signUp: mockSignUp } });

    render(<AuthForm status="login" />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    
  })

  test("test case: shows error if signInUp fails", async()=>{

    const errorMessage = "Invalid credentials";
    const mockSignIn = jest.fn();
    const mockSignUp = jest.fn().mockResolvedValue({ error: { message: errorMessage } });

    createClient.mockReturnValue({ auth: { signInWithPassword: mockSignIn, signUp: mockSignUp } });

    render(<AuthForm status="register" />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    
  })

})