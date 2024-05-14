"use client"
import React, {useState, useEffect, Suspense} from 'react';
import {useSearchParams} from 'next/navigation';
import styles from "@/app/forgot-password/forgotPassword.module.css";
import LoadingScreen from "@/app/components/Common/LoadingScreen"; // Import useSearchParams from next/navigation

const ResetPasswordPage = () => {

    const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false); // State to manage loading status
    const [token, setToken] = useState('');
    const [message, setMessage] = useState(''); // State to store feedback message

    const handleTokenRetrieved = (retrievedToken) => {
        setToken(retrievedToken);
    };
    function UseToken({ onTokenRetrieved }) {
        const [searchParams] = useSearchParams();

        useEffect(() => {
            const queryToken = searchParams[1]; // Assuming 'token' is the correct query parameter key
            if (queryToken) {
                console.log(queryToken);
                onTokenRetrieved(queryToken); // Pass the token back to the parent component
            }
        }, [searchParams, onTokenRetrieved]);

        return null; // Since you're just using this for retrieving the token, you don't need to return any JSX.
    }




    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]{8,}$/;

        if (regex.test(password)) {
            setPasswordValidationMessage("");
            return true; // Return true if password is valid
        } else {
            setPasswordValidationMessage(
                "Password must be at least 8 characters long, include a number, a special character, and a capital letter."
            );
            return false; // Return false if password is invalid
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(newPassword)) { // Call validatePassword and prevent submission if invalid
            return;
        }

        if (!token) {
            setMessage('Token is missing.');
            return;
        }


        setLoading(true); // Start loading

        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({token, newPassword}),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('Password has been successfully reset.');
            } else {
                setMessage('Failed to reset password. ' + data.message);
            }
        } catch (error) {
            setMessage('An error occurred while trying to reset your password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Suspense fallback={<div><LoadingScreen/></div>}>
            <UseToken onTokenRetrieved={handleTokenRetrieved} />
            <div className={styles.container}>
                <div style={{
                    height: "60%",
                    width: "100%",
                    backgroundColor: "#f5f5f1",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <h1 style={{color: "#211e1f"}}>Reset Your Password</h1>
                </div>
                <div style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#c5ae61",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    paddingTop: 60
                }}>
                    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
                        <label htmlFor="email" className={styles.label}>Password*</label>
                        <input
                            type="password"
                            className={styles.input}
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                validatePassword(e.target.value); // Call validatePassword on change
                            }}
                            placeholder="Enter your new password"
                            required
                        />
                        <small
                            className={styles.helpTexts}>{passwordValidationMessage}</small> {/* Display password validation message */}
                        <button type="submit" disabled={loading} className={styles.button}>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                        {/* Display a spinner or loading indicator when loading */}
                        {loading && <div>Loading...</div>}
                        {/* Feedback message */}
                        {message && <div>{message}</div>}
                    </form>
                </div>
            </div>
        </Suspense>
    );
};

export default ResetPasswordPage;
