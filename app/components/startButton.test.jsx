import StartButton from "./startButton"
import { render, fireEvent, waitFor, screen } from "@testing-library/react"
import { useRouter } from "next/navigation"

jest.mock("next/navigation", ()=>({
  useRouter: jest.fn()
}))

const pushMock = jest.fn();

beforeEach(()=>{
  useRouter.mockReturnValue({ push: pushMock })
  jest.clearAllMocks()
  global.fetch = jest.fn()
  process.env.NEXT_PUBLIC_URL= "http://localhost:3000"
})

describe("test suite: Start Button Componenets", ()=>{

  test("Renders 'Resume Test' when status is in_progress", ()=>{
    render(<StartButton id="123" existingSession={{status : "in_progress"}}/>)
    expect(screen.getByText(/resume test/i)).toBeInTheDocument();
  })

  test("Renders 'View Report' when status is completed", ()=>{
    render(<StartButton id="123" existingSession={{status: "completed"}}/>)
    expect(screen.getByText(/view report/i)).toBeInTheDocument();
  })

  test("Renders 'Start Test' for a new user", ()=>{
    render(<StartButton id="123" existingSession={{message: true}}/>)
    expect(screen.getByText(/start test/i)).toBeInTheDocument();
  })

  test("pushes to exact route for 'startTest' buton",async()=>{
    fetch.mockResolvedValueOnce({
      ok:true,
      json: async ()=>( {savedMessages: {id: "abc123"} } )
    })

    render(<StartButton id="123" existingSession={{message: true}}/>)
    fireEvent.click(screen.getByRole("button"))

    await waitFor(()=>{
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/session/start/", expect.any(Object)
      )
      expect(pushMock).toHaveBeenCalledWith("/test/abc123")

    })
  })

  test("pushes to exact route for 'resumeTest' buton", async()=>{
    fetch.mockResolvedValueOnce({
      ok:true,
      json: async ()=>( {id: "last123"})
    })

    render(<StartButton id="123" existingSession={{status: "in_progress", id: "sess1"}}/>)
    fireEvent.click(screen.getByRole("button"))

    await waitFor(()=>{
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/message/last", expect.any(Object)
      )
      expect(pushMock).toHaveBeenCalledWith("/test/last123")

    })
  })

  test("pushes to exact route for 'viewReport' buton", async()=>{
    render(<StartButton id="123" existingSession={{status: "completed", id: "sess99"}}/>)
    fireEvent.click(screen.getByRole("button"))
    expect(pushMock).toHaveBeenCalledWith("/report/sess99")
  })

  test("logs error when fetching fails", async()=>{
    console.error = jest.fn()
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async()=>({error: "Server error"})
    })

    render(<StartButton id="123" existingSession={{message: true}}/>)
    fireEvent.click(screen.getByRole("button"))
    await waitFor(()=> {
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining("Error starting test"), expect.any(Error))
    })

  })

  test("logs error fetching resumTest value fails", async()=>{
    console.error = jest.fn()
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async()=>({error: "Resume test error"})
    })

    render(<StartButton id="123" existingSession={{status: "in_progress", id: "sess1"}}/>)
    fireEvent.click(screen.getByRole("button"))

    await waitFor(()=> {
      expect(console.error).toHaveBeenCalledWith(expect.stringContaining("Resume test error"), expect.any(Error))
    })
    
  })

})