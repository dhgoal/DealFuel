// models/companyLeadModel.js
import mongoose from 'mongoose';

const companyLeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Assuming you want the email to be unique
    },
    number: {
        type: String,
        required: false, // Assuming the number is not required
    },
}, { timestamps: true });

export default mongoose.models.CompanyLead || mongoose.model('CompanyLead', companyLeadSchema);
