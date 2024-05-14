// pages/api/companylead.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CompanyLead from '@/models/companyLeadModel';

export async function POST(request) {
    await dbConnect();

    try {
        // Parsing the request body to get the form data
        const { name, email, number } = await request.json();

        // Create a new company lead in the database
        const newLead = await CompanyLead.create({ name, email, number });

        // If successful, send back a JSON response with the new lead info
        return new NextResponse(
            JSON.stringify({ success: true, message: 'Lead created successfully', lead: { id: newLead._id, name, email, number } }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        // If there's an error, return a JSON response with the error message
        return new NextResponse(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
