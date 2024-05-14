"use client"
import React, {useState} from 'react';
import styles from './forgotPassword.module.css'; // Adjust the import path as necessary

const Page = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); // State to store the response message
    const [loading, setLoading] = useState(false);
    const handleResetPassword = async () => {
        setLoading(true); // Start loading
        setMessage(''); // Clear any previous messages

        try {
            const response = await fetch('/api/request-password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            // Check if the request was successful
            if (response.ok) {
                setMessage('Email sent successfully. Please check your inbox to reset your password.'); // Success message
                setEmail(''); // Optionally clear the input field
            } else {
                setMessage(data.message || 'An error occurred. Please try again.'); // Display error message from response
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.'); // Fallback error message
        } finally {
            setLoading(false); // Stop loading regardless of the outcome
        }
    };

    return (
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
                <h2 className={styles.heading}>Reset your password</h2>


                <p className={styles.text}>Please provide the email address that you used when you signed up for your
                    account. We will send you an email that will allow you to reset your password.</p>
            </div>

            <div style={{width: "100%", height: 1, backgroundColor: "#fdfdfe"}}></div>


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


                <label htmlFor="email" className={styles.label}>Email*</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className={styles.input}
                />
                <button
                    onClick={handleResetPassword}
                    className={styles.button}
                    disabled={loading} // Disable button when loading
                >
                    {loading ?  <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>


                        <div
                            className={styles.spinner}>

                        </div>  </div> : 'Reset password'}
                </button>
                {message && <div className={styles.message}>{message}</div>}
                <p className={styles.smallText}> If you forgot your email, please <a href="slack://yourworkspace"
                                                                                     className={styles.link}>Contact Us
                    on
                    Slack</a>.</p>
            </div>
        </div>
    );
};

export default Page;
