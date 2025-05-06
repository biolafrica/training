import { createClient } from "../supabase/server";

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

  },

} 
