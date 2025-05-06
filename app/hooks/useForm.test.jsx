import useForm from "./useForm";
import { renderHook, act } from "@testing-library/react";

describe("test suite: useForm hook", ()=>{
  const initial = { name: "", email: "" };

  test("test case: initializes with initial values", () => {
    const { result } = renderHook(() => useForm(initial));
    expect(result.current.formData).toEqual(initial);
  });

  test("test case: updates form field on change", () => {
    const { result } = renderHook(() => useForm(initial));
    const mockEvent = { target: { name: "name", value: "Abdul" } };

    act(() => {
      result.current.handleInputChange(mockEvent);
    });

    expect(result.current.formData.name).toBe("Abdul");
    expect(result.current.formData.email).toBe(""); 
  });

  test("resets form data to initial values", () => {
    const { result } = renderHook(() => useForm(initial));
    act(() => {
      result.current.handleInputChange({ target: { name: "email", value: "test@example.com" } });
    });

    expect(result.current.formData.email).toBe("test@example.com");

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual(initial);
  });

  test("handles dynamic fields not in initialValues", () => {
    const { result } = renderHook(() => useForm(initial));
    act(() => {
      result.current.handleInputChange({ target: { name: "role", value: "admin" } });
    });
    expect(result.current.formData.role).toBe("admin");
  });

  
})