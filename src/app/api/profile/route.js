import { NextResponse } from "next/server";

import dbConnect from "@/lib/dbConnect";
import UserProfile from "@/models/userModel";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  await dbConnect();

  try {
    const profile = await UserProfile.findById(id);

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
