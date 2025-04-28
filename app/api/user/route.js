import { NextResponse } from "next/server";
import {addTask} from "@/app/utils/database/addTasks";

export async function POST(request){
  const userData = await request.json();
  console.log("received user;", userData)
  const data = await addTask.addUser(userData);
  console.log("sent data;", data)
  return NextResponse.json({data});
}