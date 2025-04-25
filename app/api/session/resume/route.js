import { addMessage, addReport } from "@/app/utils/database/addTasks";
import { getSession } from "@/app/utils/database/getTasks";
import { markSessionComplete } from "@/app/utils/database/updateTasks";
import { Latitude, LatitudeApiError } from "@latitude-data/sdk";
import { NextResponse } from "next/server";

export async function POST(req){
  try {

    const {sessionId, messages, sender} = await req.json();
    if(!sessionId || !messages || !sender){
      return NextResponse.json({error: "Missing required field"},{status : 400})
    }

    const {id : questionId} = await addMessage(sessionId, messages, sender);

    const {latitude_id : latitudeId} = await getSession(sessionId);
    if(!latitudeId){
      return NextResponse.json({error : "Latitude session not found"}, {status : 400})
    }

    console.log("latitude-ID", latitudeId)

    const latitude = new Latitude(process.env.LATITUDE_API_KEY, {
      projectId: process.env.LATITUDE_PROJECT_ID,
      versionUuid: process.env.LATITUDE_VERSION_ID,
    });
    
    const continuedResponse = await latitude.prompts.chat(
      latitudeId,
      [{ role: 'user', content: messages}],
      {stream: false}
    );

    console.log(continuedResponse)

    const data = JSON.parse(continuedResponse.response?.text || "{}");
    const {message, is_complete, report} = data;

    const agent = "assistant";
    const savedMessages = await addMessage(sessionId, message, agent, questionId);

    if(is_complete  && report){
      const {summary, detailedReport} = report;

      await addReport(sessionId, summary, detailedReport);
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
