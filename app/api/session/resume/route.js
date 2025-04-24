import { addMessage } from "@/app/utils/database/addTasks";
import { getSession } from "@/app/utils/database/getTasks";
import { Latitude, LatitudeApiError } from "@latitude-data/sdk";
import { NextResponse } from "next/server";

export async function POST(req){
  try {
    const formData = await req.json();
    const {sessionId, messages, sender} = formData;
    await addMessage(sessionId, messages, sender);
    const {latitude_id : latitudeId} = await getSession(sessionId);
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
    const data = JSON.parse(continuedResponse.response?.text );
    const {message, is_complete} = data;
    const agent = "assistant"

    if(is_complete === false){
      const savedMessages = await addMessage(sessionId, message, agent);

      return NextResponse.json({
        savedMessages,
        sessionId,
      })

    }else if(is_complete == true){
      console.log("Create report session")
    }

    
  } catch (error) {
    if (error instanceof LatitudeApiError) {
      console.error("Latitude API Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }

    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    
  }
}
