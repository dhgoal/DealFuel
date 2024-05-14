// pages/api/request-password-reset.js
import dbConnect from "@/lib/dbConnect";
import UserProfile from "@/models/userModel";
import bcrypt from "bcrypt";
import { sendPasswordResetEmail } from "@/lib/email";
import { generateToken } from "@/lib/token";

export async function POST(request) {
    await dbConnect();

    try {
        const { email } = await request.json();
        const user = await UserProfile.findOne({ email });

        if (!user) {
            // Handle user not found case
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const resetToken = generateToken();
        const hashedToken = await bcrypt.hash(resetToken, 10);

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        const resetLink = `${request.headers.get('origin')}/reset-password?token=${resetToken}`;
        await sendPasswordResetEmail(email, resetLink);

        return new Response(JSON.stringify({ message: "Password reset email sent." }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('An unexpected error happened:', error);
        return new Response(JSON.stringify({ message: "An error occurred on the server." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
