import { getMessageByQuestionId, getSession } from "@/app/utils/database/getTasks";
import { NextResponse } from "next/server";

export async function POST(req){

  const {sessionId, questionId} = await req.json();
  if(!sessionId || !questionId){
    return NextResponse.json({error: "No data recieved"}, {status: 400})
  }

  const {status} = await getSession(sessionId);
  const  answer = await getMessageByQuestionId(sessionId, questionId);
  console.log("received ans", answer)

  return NextResponse.json({
    status,
    answer
  })

}