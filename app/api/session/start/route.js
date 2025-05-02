import { NextResponse } from "next/server";
import { getUserRole, getTask } from "@/app/utils/database/getTasks";
import { Latitude, LatitudeApiError } from "@latitude-data/sdk";
import { addTask } from "@/app/utils/database/addTasks";


export async function POST(req){

  try {

    const { id: userId } = await req.json();
    if(!userId){
      return NextResponse.json({error : "No user id received"}, {status: 400})
    }

    const { role } = await getTask.getUserRole(userId);
   
    // Initialize Latitude
    const latitude = new Latitude(process.env.LATITUDE_API_KEY, {
      projectId: process.env.LATITUDE_PROJECT_ID,
      versionUuid: process.env.LATITUDE_VERSION_ID,
    });


    // Start the conversation
    const initial = await latitude.prompts.run("food-delivery-training", {
      parameters: { role },
    });

    console.log(initial)
    
   
    const latitudeId = initial.uuid;
    const jsonText = initial.response.text.replace(/```json|```/g, '').trim();

    const {message : messages} =  JSON.parse(jsonText);

    const {id : sessionId} = await addTask.createNewSession(userId, role, latitudeId);
    const sender = "assistant";

    const savedMessages = await addTask.addMessage(sessionId, messages, sender)

    return NextResponse.json({
      sessionId,
      latitudeId,
      savedMessages,
      is_complete: initial.response?.is_complete || false,
    });

     
  } catch (error) {
    if (error instanceof LatitudeApiError) {
      console.error("Latitude API Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }

    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    
  }
  
}