import { getLastMessage, getTask } from "@/app/utils/database/getTasks";
import { NextResponse } from "next/server";

export async function POST(req){
  
  const {sessionId} = await req.json();
  
  if(!sessionId){
    return NextResponse.json({error: "No sessionId received"}, {status: 400})
  }

  const data = await getTask.getLastMessage(sessionId);
  
  return NextResponse.json(data, {status: 200})

}