import { NextResponse } from "next/server";
import {addTask} from "@/app/utils/database/addTasks";

export async function POST(request){

  try {
    const userData = await request.json();
    const data = await addTask.addUser(userData);
    return NextResponse.json({data});

  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}