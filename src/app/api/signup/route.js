import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import dbConnect from "@/lib/dbConnect";
import UserProfile from "@/models/userModel";
import SignupToken from "@/models/signupToken";

export async function POST(request) {
  await dbConnect();

  try {
    const data = await request.json();
    const { token, ...userData } = data;
    const email = userData.email;

    console.log("Received data:", data); // Log received data

    // Fetch all tokens that are not used yet
    const tokens = await SignupToken.find({ isUsed: false }).exec();
    let tokenRecord = null;

    // Check each token until a match is found
    for (let rec of tokens) {
      const match = await bcrypt.compare(token, rec.token);
      if (match) {
        tokenRecord = rec;
        break;
      }
    }

    if (!tokenRecord) {
      return new Response(JSON.stringify({ message: "Invalid or expired signup token." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user profile or update an existing one
    const user = new UserProfile({ ...userData, password: hashedPassword });
    await user.save();

    // Log tokenRecord before updating
    console.log("Token record before update:", tokenRecord);

    // Mark the token as used and save the email
    tokenRecord.isUsed = true;
    tokenRecord.email = email;
    await tokenRecord.save();

    // Log tokenRecord after updating
    console.log("Token record after update:", tokenRecord);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error during signup:", error); // Log error
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
    }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
