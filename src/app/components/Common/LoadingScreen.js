"use client"
import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
    const [loadingProgress, setLoadingProgress] = useState(0);

    const containerStyle = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        marginBottom:200,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#242424',
    };

    const imageStyle = {
        width:"70px",
        height:"70px"
    };

    const loadingBarContainerStyle = {
        width: '180px', // Adjusted width to 180px
        height: '5px', // Adjusted height to 15px
        backgroundColor: '#111111',
        borderRadius: '0px',
        marginTop:20,
    };

    const loadingBarStyle = {
        height: '100%',
        backgroundColor: '#ddd',
        borderRadius: '0px',
        width: `${loadingProgress}%`,
    };

    useEffect(() => {
        if (loadingProgress < 100) {
            const timer = setTimeout(() => {
                // Mimic initial fast loading that slows down near the end
                let increment = 0;
                if (loadingProgress < 50) {
                    increment = 25; // Fast increment
                } else if (loadingProgress < 80) {
                    increment = 5; // Slower increment
                } else if (loadingProgress < 95) {
                    increment = 2; // Even slower increment
                } else {
                    increment = 0.5; // Very slow increment near the end
                }

                setLoadingProgress(prevProgress => Math.min(prevProgress + increment, 100)); // Ensure it does not exceed 100%
            }, 20); // Adjust the timeout as needed for smoothness

            return () => clearTimeout(timer);
        }
    }, [loadingProgress]);


    return (
        <div style={containerStyle}>
            <img
                src="/deal-fuel-logo.png"
                alt="Loading..."
                style={imageStyle}
            />
            <div style={loadingBarContainerStyle}>
                <div style={loadingBarStyle}></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
