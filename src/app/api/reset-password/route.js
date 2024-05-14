// pages/api/reset-password.js

import dbConnect from "@/lib/dbConnect";
import UserProfile from "@/models/userModel";
import bcrypt from "bcrypt";

export async function POST(request) {
    await dbConnect();

    try {
        const { token, newPassword } = await request.json();

        // Find the user by the resetPasswordToken
        const user = await UserProfile.findOne({
            resetPasswordToken: { $exists: true },
            resetPasswordExpires: { $gt: Date.now() },
        });

        // If no user, handle the case where the token is invalid or has expired
        if (!user) {
            return new Response(JSON.stringify({ message: "Password reset token is invalid or has expired." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Verify the token with the one stored in the database
        const validToken = await bcrypt.compare(token, user.resetPasswordToken);
        if (!validToken) {
            return new Response(JSON.stringify({ message: "Invalid token." }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password and clear the reset token fields
        user.password = hashedNewPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        // Return a success message
        return new Response(JSON.stringify({ message: "Your password has been successfully reset." }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return new Response(JSON.stringify({ message: "An error occurred while resetting the password." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
