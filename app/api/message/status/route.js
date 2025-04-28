import { getMessageByQuestionId, getSession, getTask } from "@/app/utils/database/getTasks";
import { NextResponse } from "next/server";

export async function POST(req){

  const {sessionId, questionId} = await req.json();
  if(!sessionId || !questionId){
    return NextResponse.json({error: "No data recieved"}, {status: 400})
  }

  const {status} = await getTask.getSession(sessionId);
  const  answer = await getTask.getMessageByQuestionId(sessionId, questionId);

  return NextResponse.json({
    status,
    answer
  })

}