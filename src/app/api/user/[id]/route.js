// File: /pages/api/user/[userId].js (Theoretical Example)
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserProfile from "@/models/userModel";
import jwt from "jsonwebtoken";

export async function GET(request) {
    await dbConnect();



    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop(); // Extracting userId from URL
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const user = await UserProfile.findById(userId);

        if (!user) {
            return new NextResponse(JSON.stringify({ error: "Error Not Found" }), { status: 405 });
        }

        // Assuming you serialize your MongoDB user object properly
        const userData = { ...user._doc, _id: user._id.toString() };
        delete userData.password; // Remove sensitive data

        return new NextResponse(JSON.stringify(userData), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

export async function PUT(request) {
    await dbConnect();

    const url = new URL(request.url);
    const userId = url.pathname.split('/').pop(); // Extracting userId from URL
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        const requestData = await request.json(); // Assuming the data is sent in JSON format

        // Find the user by ID and update its data
        const updatedUser = await UserProfile.findByIdAndUpdate(userId, requestData, { new: true });

        if (!updatedUser) {
            return new NextResponse(JSON.stringify({ error: "Error Updating User" }), { status: 405 });
        }

        // Assuming you serialize your MongoDB user object properly
        const userData = { ...updatedUser._doc, _id: updatedUser._id.toString() };
        delete userData.password; // Remove sensitive data

        return new NextResponse(JSON.stringify(userData), { status: 200, headers: { "Content-Type": "application/json" } });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}