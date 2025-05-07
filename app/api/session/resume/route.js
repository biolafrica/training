import { addTask } from "../../../utils/database/addTasks";
import {getTask } from "../../../utils/database/getTasks";
import { markSessionComplete } from "../../../utils/database/updateTasks";
import { Latitude, LatitudeApiError } from "@latitude-data/sdk";
import { NextResponse } from "next/server";

export async function POST(req){
  try {

    const {sessionId, messages, sender, questionId} = await req.json();

    if(!sessionId || !messages || !sender || !questionId){
      return NextResponse.json({error: "Missing required field"},{status : 400})
    }

    await addTask.addMessage(sessionId, messages, sender, questionId);

    const {latitude_id : latitudeId} = await getTask.getSession(sessionId);
    if(!latitudeId){
      return NextResponse.json({error : "Latitude session not found"}, {status : 400})
    }

    

    const latitude = new Latitude(process.env.LATITUDE_API_KEY, {
      projectId: process.env.LATITUDE_PROJECT_ID,
      versionUuid: process.env.LATITUDE_VERSION_ID,
    });
    
    const continuedResponse = await latitude.prompts.chat(
      latitudeId,
      [{ role: 'user', content: messages}],
      {stream: false}
    );

    const jsonText = continuedResponse.response.text.replace(/```json|```/g, '').trim();

    const data = JSON.parse(jsonText)

    const {message, is_complete, report} = data;
  
    const agent = "assistant";
    const savedMessages = await addTask.addMessage(sessionId, message, agent);

    if(is_complete  && report){
      const {summary, detailedReport} = report;

      await addTask.addReport(sessionId, summary, detailedReport);
      await markSessionComplete(sessionId);
    }

    return NextResponse.json({
      savedMessages,
      sessionId,
    }, {status: 200})
    
  } catch (error) {
    if (error instanceof LatitudeApiError) {
      console.error("Latitude API Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }

    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    
  }
}
