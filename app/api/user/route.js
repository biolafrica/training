import { NextResponse } from "next/server";
import {addTask} from "@/app/utils/database/addTasks";

export async function POST(request){
  const userData = await request.json();

  const data = await addTask.addUser(userData);

  return NextResponse.json({data});
}