import { NextResponse } from "next/server";
import { createClient } from "../supabase/server";

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