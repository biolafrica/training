import { NextResponse } from "next/server";
import { addUser } from "@/app/utils/database/addTasks";

export async function POST(request){
  const user = await request.json();
  const data = await addUser(user);
  return NextResponse.json({data});
}