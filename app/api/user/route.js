import { NextResponse } from "next/server";
import {addTask} from "../../utils/database/addTasks";

export async function POST(request){

  try {
    const userData = await request.json();

    if (!userData) {
      return NextResponse.json({ error: "No userdata received" }, { status: 400 });
    }

    const data = await addTask.addUser(userData);
    return NextResponse.json({data});

  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 });
  }
}