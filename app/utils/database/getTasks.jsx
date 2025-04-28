import { NextResponse } from "next/server";
import { createClient } from "../supabase/server";

export async function getUserRole(userId){
  const supabase = await createClient();
  
  const {data:user} = await supabase 
  .from("User")
  .select("role")
  .eq("user_id", userId)
  .single()

  if(!user){
    return NextResponse.json({error: "User not found"}, {status: 404})
  }

  return user;

}

export async function getMessage(messageId){
  const supabase = await createClient();

  const {data: message, error} = await supabase
  .from("Messages")
  .select()
  .eq("id", messageId)
  .single()


  if(error){
    console.error("error fetching message:", error.message);
    throw new Error(error.message);
  }

  return message;


}

export async function getSession(sessionId){
  const supabase = await createClient();

  const {data: session, error} = await supabase
  .from("Sessions")
  .select()
  .eq("id", sessionId)
  .single()

  if(error){
    console.error("error fetching session:", error.message);
    throw new Error(error.message);
  }

  return session;

}

export async function getLastMessage(sessionId){
  const supabase = await createClient();

  const {data: message, error} = await supabase
  .from("Messages")
  .select("id")
  .eq("sessionId", sessionId)
  .order("created_at", {ascending: false})
  .limit(1)
  .single();

  if(error){
    console.error("error fetching last message:", error.message);
    throw new Error(error.message);
  }

  return message;
}

export async function getMessageByQuestionId(sessionId, questionId){
  const supabase = await createClient();

  const {data, error} = await supabase
  .from("Messages")
  .select()
  .eq("sessionId", sessionId)
  .eq("replyTo", questionId)

  if(error){
    console.error("error fetching :", error.message);
    throw new Error(error.message);
  }
  console.log("our data",data)
  
  return data


}

export async function getReport(sessionId){
  const supabase = await createClient();

  const {data: report, error} = await supabase
  .from("TrainingReport")
  .select()
  .eq("sessionId", sessionId)
  .single()

  if(error){
    console.error("error fetching report:", error.message);
    throw new Error(error.message);
  }

  return report;

} 

export const getTask = {
  supabase : null,

  async init(){
    if(!this.supabase){
      this.supabase = await createClient();
    }
  },

  async fetchSingleRow(table, tableId, dataId){
    await this.init();
    const {data, error} = await this.supabase
    .from(table)
    .select()
    .eq(tableId, dataId)
    .single()

    
    if(error){
      console.error(`error fetching ${table}:`, error.message);
      throw new Error(error.message);
    }

    return data;
  },

  async getMessage(messageId){
    return await this.fetchSingleRow("Messages","id", messageId);
  },

  async getSession(sessionId){
    return await this.fetchSingleRow("Sessions","id", sessionId);
  },

  async getReport(sessionId){
    return await this.fetchSingleRow("TrainingReport","sessionId", sessionId);
  },

  async getUserRole(userId){
    await this.init();
    
    const {data:user} = await this.supabase 
    .from("User")
    .select("role")
    .eq("user_id", userId)
    .single()

    if(!user){
      return NextResponse.json({error: "User not found"}, {status: 404})
    }

    return user;

  },

  async getLastMessage(sessionId){
    await this.init();

    const {data: message, error} = await this.supabase
    .from("Messages")
    .select("id")
    .eq("sessionId", sessionId)
    .order("created_at", {ascending: false})
    .limit(1)
    .single();

    if(error){
      console.error("error fetching last message:", error.message);
      throw new Error(error.message);
    }

    return message;
  },

  async getMessageByQuestionId(sessionId, questionId){
    await this.init();

    const {data, error} = await this.supabase
    .from("Messages")
    .select()
    .eq("sessionId", sessionId)
    .eq("replyTo", questionId)

    if(error){
      console.error("error fetching :", error.message);
      throw new Error(error.message);
    }
    console.log("our data",data)
    
    return data


  }

}