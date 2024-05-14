"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {useDispatch, useSelector} from 'react-redux';
import styles from "./signin.module.css";
import {selectIsLoggedIn, setLoggedIn} from "@/lib/features/auth/authSlice";

const Signin = () => {
    const router = useRouter();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const dispatch =useDispatch();

    const [contentIndex, setContentIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [resetProgressBar, setResetProgressBar] = useState(false);
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState("");
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false); // New state to handle login success
    const [loginError, setLoginError] = useState("");
    const [name, setName] = useState(""); // Added for the Name input



    const marketingContents = [
        {
            title: "Hire Top Talent",
            text: "Meet and hire candidates who will propel your growth.",
            smallText: "Quality hires await.",
        },
        {
            title: "Build Your Dream Team",
            text: "Find and foster the professionals your company deserves.",
            smallText: "Seamless recruitment journey.",
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
        event.preventDefault(); // Prevent the default form submit action

        // Construct the payload
        const payload = {
            name: name,
            email: email,
            number: number,
        };

        try {
            const response = await fetch('/api/companylead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json(); // Assuming the server responds with JSON
            console.log('Submission successful', data);
            // Optionally, reset form fields or redirect the user
            setName('');
            setEmail('');
            setNumber('');
            // If you have a success message to show to the user, set it here
            // Redirect the user or show a success message...
        } catch (error) {
            console.error('Submission failed', error);
            setLoginError('Submission failed. Please try again.'); // Update state based on error
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
                    <h2 style={{ marginBottom: 4 }}>Contact Us,</h2>
                    <p style={{marginBottom:30, marginLeft:3, textDecoration:"underline"}}>And we will reach out to you!</p>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name*</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            required
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    <div className={styles.formGroup}>
                        <label htmlFor="number">Number</label>
                        <input
                            type="tel"
                            id="number"
                            name="number"
                            placeholder="Enter your number"
                            required
                            className={styles.input}
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Submit
                    </button>

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
                    transition={{ type: "tween", duration: 0.5 }}
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
