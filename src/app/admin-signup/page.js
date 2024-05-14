"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdminSignup.module.css"; // Adjust the path as necessary

const AdminSignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/admin-signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("Admin created successfully!");
                setError("");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                setError(data.message || "Failed to sign up. Please try again.");
                setSuccess("");
            }
        } catch (err) {
            console.error("Sign up error:", err);
            setError("An error occurred during sign up.");
            setSuccess("");
        }
    };

    return (
        <div className={styles.signUpContainer}>
            <h2 style={{ marginBottom: 30 }}>Admin Sign Up</h2>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <form onSubmit={handleSubmit} className={styles.signUpForm}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default AdminSignUp;
