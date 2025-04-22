import { NextResponse } from "next/server";
import { addUser } from "@/app/utils/database/addTasks";

export async function POST(request){
  const userData = await request.json();
  console.log("received user;", userData)
  const data = await addUser(userData);
  console.log("sent data;", data)
  return NextResponse.json({data});
}