"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setLoggedIn, setAdmin } from "@/lib/features/auth/authSlice";
import styles from "./AdminSignIn.module.css"; // Adjust the path as necessary
import Cookies from 'js-cookie'; // Import js-cookie

const AdminSignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("/api/admin-signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.token) {
                Cookies.set("adminToken", data.token, { expires: 1 }); // Expires in 1 day
                dispatch(setLoggedIn(true));
                dispatch(setAdmin(data.admin));
                router.push("/admin-panel"); // Navigate to the Admin Panel
            } else {
                setError("Failed to sign in. Please check your credentials.");
            }
        } catch (err) {
            console.error("Sign in error:", err);
            setError("An error occurred during sign in.");
        }
    };

    return (
        <div className={styles.signInContainer}>
            <h2 style={{ marginBottom: 30 }}>Admin Sign In</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.signInForm}>
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
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};

export default AdminSignIn;
