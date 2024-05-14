// models/SignupToken.js
import mongoose from 'mongoose';

const signupTokenSchema = new mongoose.Schema({
    originalToken: { type: String, required: true }, // Store the original token
    token: { type: String, required: true }, // Hashed token
    email: { type: String, required: false }, // Make email optional, only used once user signs up
    isUsed: { type: Boolean, required: true, default: false }
});

const SignupToken = mongoose.models.SignupToken || mongoose.model('SignupToken', signupTokenSchema);

export default SignupToken;
