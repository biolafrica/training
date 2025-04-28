import { createClient } from "../supabase/server";

export async function addUser(UserData){

  const supabase = await createClient();

  const {data, error} = await supabase
  .from("User")
  .insert([UserData])
  .select()
  .single()

  if(error){
    console.error("Add user error:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function createNewSession(userId, userRole,latitudeId){
  const supabase = await createClient();

  const {data: newSession, error} = await supabase 
  .from("Sessions")
  .insert({user_id: userId, role: userRole,  status: "in_progress",
    startedAt: new Date(), latitude_id: latitudeId})
  .select()
  .single()

  if(error){
    console.error("Add user error:", error.message);
    throw new Error(error.message);
  }

  return newSession;

}

export async function addMessage(sessionId, messages, sender, questionId){
  const supabase = await createClient();
  const {data: message, error} = await supabase 
  .from("Messages")
  .insert({sessionId, messages, sender, replyTo: questionId || ""})
  .select()
  .single()


  if(error){
    console.error("Add message error:", error.message);
    throw new Error(error.message);
  }

  return message;

}

export async function addReport(sessionId, summary, detailedReport){
  const supabase = await createClient();

  const {data: report, error} = await supabase 
  .from("TrainingReport")
  .insert({sessionId, summary, detailedReport})
  .select()
  .single()

  if(error){
    console.error("Add report error:", error.message);
    throw new Error(error.message);
  }

  return report;

}

export const addTask = {
  supabase : null,

  async init(){
    if(!this.supabase){
      this.supabase = await createClient();
    }
  },

  async insertSingleRow(table, payload){
    await this.init();
    const {data, error} = await this.supabase
    .from(table)
    .insert(payload)
    .select()
    .single()

    if(error){
      console.error(`Insert Error in ${table}:`, error.message);
      throw new Error(error.message)
    }

    return data
  },

  async addUser(UserData){
    return await this.insertSingleRow("User", [UserData])
  },

  async createNewSession(userId, userRole,latitudeId){
    const sessionData = {
      user_id: userId,
      role: userRole,
      status: "in_progress",
      startedAt: new Date(),
      latitude_id: latitudeId
    };

    return await this.insertSingleRow("Sessions", sessionData)

  },

  async addMessage(sessionId, messages, sender, questionId){
    const messageData = {
      sessionId,
      messages,
      sender,
      replyTo: questionId || ""
    }

    return await this.insertSingleRow("Messages", messageData)

  },

  async addReport(sessionId, summary, detailedReport){
    const reportData = {
      sessionId,
      summary,
      detailedReport
    }
    return await this.insertSingleRow("TrainingReport", reportData);

  }

} 
