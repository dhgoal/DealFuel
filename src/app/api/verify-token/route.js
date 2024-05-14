// app/api/verify-token/route.js

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import SignupToken from "@/models/signupToken";
import bcrypt from "bcrypt";

export async function GET(req) {
    await dbConnect();

    const token = req.nextUrl.searchParams.get('token');
    if (!token) {
        return new NextResponse(JSON.stringify({ message: "Token is required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const tokens = await SignupToken.find({}).exec();  // Retrieve all tokens

        // Compare the provided token against all stored tokens asynchronously
        const tokenPromises = tokens.map(tokenRecord => bcrypt.compare(token, tokenRecord.token));
        const tokenResults = await Promise.all(tokenPromises);

        // Find the index of a token that matched
        const matchIndex = tokenResults.findIndex(match => match === true);

        if (matchIndex === -1) {
            return new NextResponse(JSON.stringify({ isValid: false }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get the matched token record
        const tokenRecord = tokens[matchIndex];

        if (tokenRecord.isUsed) {
            return new NextResponse(JSON.stringify({ isValid: false }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new NextResponse(JSON.stringify({ isValid: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return new NextResponse(JSON.stringify({ message: "An error occurred on the server.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
