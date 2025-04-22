import { NextResponse } from "next/server";

export async function StartConversation(userRole, newSession){

  try {
    
    const latitudeRes = await fetch(`https://api.latitude.so/vi/agents/${process.env.LATITUDE_AGENT_ID}/messages`,{
      method: "POST",
      headers:{
        Authorization: `Bearer ${process.env.LATITUDE_API_KEY}`,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        session_id: createNewSession.id,
        message: `Start session for a ${userRole}. The user is ready`
      })

    });

    const latitudeMessage = await latitudeRes.json();
    return NextResponse.json({
      session: newSession,
      resumed: false,
      message: latitudeMessage.message,
      is_complete: latitudeMessage.is_complete || false
    })

  } catch (error) {
    console.error("Session start error:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }

}