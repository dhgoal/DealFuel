// lib/email.js
import nodemailer from 'nodemailer';

// Replace 'service: "Gmail"' with Hostinger's SMTP settings
const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com", // Make sure this is correct
    secure: true,
    requireTLS: true,
    port: 465,
    debug: true,
    connectionTimeout: 10000,
    auth: {
        user: process.env.GRIEVANCE_EMAIL,
        pass: process.env.GRIEVANCE_EMAIL_PASSWORD,
    },
    tls: {
        // Ensure you are using secure and up-to-date ciphers
        ciphers: "SSLv3",
    },
});

export async function sendPasswordResetEmail(recipientEmail, resetLink) {
    const mailOptions = {
        from: process.env.GRIEVANCE_EMAIL, // Your Hostinger email address
        to: recipientEmail,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
            `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
            `${resetLink}\n\n` +
            `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
}
