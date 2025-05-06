import MessageCont from "./messageCont";
import { screen, render } from "@testing-library/react";

describe("MessageCont", () => {
  test("renders message and icon", () => {
    render(<MessageCont data="Hello world" icon="icon.svg" />);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /icon.svg/i })).toBeInTheDocument();
  });
});