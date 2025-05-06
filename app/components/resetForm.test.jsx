import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResetForm from "./resetForm";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

jest.mock("next/navigation", ()=>({
  useRouter : jest.fn()
}))

jest.mock("../utils/supabase/client", ()=>({
  createClient: jest.fn()
}))

const pushMock = jest.fn();

beforeEach(()=>{
  useRouter.mockReturnValue({push: pushMock})
  pushMock.mockClear();
});

describe("Start Button Component test suite", ()=>{

  test("test case: renders input and submit button", ()=>{
    render(<ResetForm/>);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", {name :/submit/i})).toBeInTheDocument();
  })

  test("test case: submit to update input value", ()=>{
    render(<ResetForm/>);
    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, {target: {value: "test@gmail.com"}});
    expect(input.value).toBe("test@gmail.com")
  })

  test("test case: submit form and redirect on success", async()=>{
    const mockReset = jest.fn().mockResolvedValue({error:null})
    createClient.mockReturnValue({auth:{resetPasswordForEmail: mockReset}})

    render(<ResetForm/>);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {value: "success@gmail.com"}
    });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(()=>{
      expect(mockReset).toHaveBeenCalledWith("success@gmail.com")
      expect(pushMock).toHaveBeenCalledWith("/auth/reset")
    });

  });

  test("test case: shows error message when reset fails", async()=>{
    const mockReset = jest.fn().mockResolvedValue({
      error: {message: "Email not found"}
    })

    createClient.mockReturnValue({auth:{resetPasswordForEmail: mockReset}})

    render(<ResetForm/>);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {value: "fail@gmail.com"}
    });

    fireEvent.click(screen.getByRole("button"));

    await waitFor(()=>{
      expect(screen.getByText("Email not found")).toBeInTheDocument();
      expect(pushMock).not.toHaveBeenCalled();
    });

  });

  test("shows error message when reset fails", async()=>{
    let resolveRequest;

    const mockReset = jest.fn().mockImplementation(
      ()=> new Promise((resolve)=> (resolveRequest = resolve))
    )


    createClient.mockReturnValue({auth:{resetPasswordForEmail: mockReset}})

    render(<ResetForm/>);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: {value: "wait@gmail.com"}
    });

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole('button')).toHaveTextContent(/loading/i)

    resolveRequest({ error: null });
    await waitFor(() => expect(pushMock).toHaveBeenCalled());


  })

})