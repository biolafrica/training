import { getTask } from "../../../utils/database/getTasks";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { sessionId, questionId } = await req.json();

    if (!sessionId || !questionId) {
      return NextResponse.json({ error: "No data received" }, { status: 400 });
    }

    const { status } = await getTask.getSession(sessionId);
    const answer = await getTask.getMessageByQuestionId(sessionId, questionId);

    return NextResponse.json({ status, answer }, { status: 200 });

  } catch (err) {
    console.error("POST /get-answer error:", err.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
