"use client";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from 'react-redux';
import styles from "./signin.module.css";
import {selectIsLoggedIn, setLoggedIn} from "@/lib/features/auth/authSlice";

const Signin = () => {
    const router = useRouter();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch = useDispatch();

    const [contentIndex, setContentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [resetProgressBar, setResetProgressBar] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false); // New state to handle login success
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);


    const marketingContents = [
        {
            title: "Score Some Awesome Gigs",
            text: "Sign up, kick back, and watch the opportunities roll in.",
            smallText: "200+ companies hiring via DealFuel.",
        },
        {
            title: "Discover Exciting Opportunities",
            text: "Join us today and unlock a world of endless possibilities.",
            smallText: "Explore countless job openings from leading companies.",
        },
    ];

    useEffect(() => {
        setResetProgressBar(false); // Start the animation by setting it to false
        const timer = setTimeout(() => {
            setContentIndex(
                (prevIndex) => (prevIndex + 1) % marketingContents.length
            );
            setResetProgressBar(true); // Reset the progress bar after 5 seconds
        }, 5000);

        return () => clearTimeout(timer);
    }, [contentIndex]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Start loading before the API call
        setLoginError("");

        try {
            const response = await fetch("/api/signin", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (data?.token) {
                console.log("Login success");
                localStorage.setItem("token", data.token); // Store the token in localStorage
                localStorage.setItem("userId", data.userId); // Store the token in localStorage
                dispatch(setLoggedIn(true));
                router.push(`/profile/${data.userId}`);
            } else if (response.status === 401) {
                setLoginError("Incorrect password, try again"); // Set specific error message for 401
            } else {
                setLoginError(data.message || "An unexpected error occurred."); // Set error message from the response or a default one
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            setLoginError("An error occurred while attempting to sign in.");
            dispatch(setLoggedIn(false)); // Set loggedIn to false in the Redux store
        } finally {
            setLoading(false); // Stop loading after the API call, regardless of outcome
        }
    };

    useEffect(() => {
        console.log("Current isLoggedIn state:", isLoggedIn);
    }, [isLoggedIn]);


    const textVariants = {
        initial: {
            opacity: 0,
            x: 1000, // Enter from the right
        },
        in: {
            opacity: 1,
            x: 0,
        },
        out: {
            opacity: 0,
            x: 0, // Exit to the left
        },
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <form className={styles.signupForm} onSubmit={handleSubmit}>
                    <h2 style={{marginBottom: 30}}>Sign in</h2>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email*</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup} style={{height: "fit-content"}}>
                        <label htmlFor="password">Password*</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <p className={styles.forgotPasswordText}>
                        <a href="/forgot-password" className={styles.forgotPasswordLink}>Forgot your password?</a>
                    </p>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ?
                            <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>


                            <div
                                className={styles.spinner}>

                            </div>  </div>: 'Sign in'} {/* Render the spinner or text based on loading state */}
                    </button>
                    {loginError && <p className={styles.errorText}>{loginError}</p>}
                    {/*<p className={styles.loginText}>
                        Dont have an account? <a href="/signup/sales-representative">Sign up</a>
                    </p>*/}
                </form>
            </div>
            <div className={styles.right}>
                <motion.div
                    key={contentIndex}
                    initial="initial"
                    animate="in"
                    exit="out"
                    u
                    variants={textVariants}
                    transition={{type: "tween", duration: 0.5}}
                >
                    <div className={styles.marketingContent}>
                        <h1>{marketingContents[contentIndex].title}</h1>
                        <p>{marketingContents[contentIndex].text}</p>
                        <p className={styles.smallText}>
                            {marketingContents[contentIndex].smallText}
                        </p>
                    </div>
                </motion.div>
                <div className={styles.progressBarContainer}>
                    <div
                        key={resetProgressBar}
                        className={
                            resetProgressBar
                                ? styles.progressBarReset
                                : styles.progressBarStart
                        }
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
