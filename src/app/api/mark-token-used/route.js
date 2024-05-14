// pages/api/mark-token-used.js
import dbConnect from "@/lib/dbConnect";
import SignupToken from "@/models/signupToken";
import bcrypt from 'bcrypt';

export async function POST(req) {
    const { token } = await req.json();
    await dbConnect();

    try {
        const tokens = await SignupToken.find({ isUsed: false }).exec();
        let tokenRecord = null;

        for (let rec of tokens) {
            if (await bcrypt.compare(token, rec.token)) {
                tokenRecord = rec;
                break;
            }
        }

        if (!tokenRecord) {
            return new Response(JSON.stringify({ success: false, message: "Token not found or already used." }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        tokenRecord.isUsed = true;
        await tokenRecord.save();

        return new Response(JSON.stringify({ success: true, message: "Token marked as used." }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error marking token as used:', error);
        return new Response(JSON.stringify({ success: false, message: "Server error." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
