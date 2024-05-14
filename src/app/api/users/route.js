// pages/api/users
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserProfile from "@/models/userModel";

export async function GET() {
    await dbConnect();

    try {
        const profiles = await UserProfile.find({});
        return NextResponse.json(profiles);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
