import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/admin";

export async function POST(request) {
    /*
    await dbConnect();

    try {
        const { name, email, password } = await request.json();

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return new Response(JSON.stringify({ message: "Admin already exists." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const admin = new Admin({ name, email, password });
        await admin.save();

        return new Response(JSON.stringify({ success: true, message: "Admin created successfully." }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('An error occurred while creating the admin:', error);
        return new Response(JSON.stringify({ message: "An error occurred on the server." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

     */
}
