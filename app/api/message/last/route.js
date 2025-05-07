import { getTask } from "../../../utils/database/getTasks";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const sessionId = body?.sessionId;

    if (!sessionId) {
      return NextResponse.json({ error: "No sessionId received" }, { status: 400 });
    }

    const data = await getTask.getLastMessage(sessionId);
    return NextResponse.json({ data }, { status: 200 });

  } catch (err) {
    console.error("POST /get-last-message error:", err.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
