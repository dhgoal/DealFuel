import React, { useEffect, useRef } from 'react';

const ProgressBar = ({ label, value, delay }) => {
    const progressBarRef = useRef(null);

    useEffect(() => {
        // Animate the progress bar width from 0% to the actual value%
        if (progressBarRef.current) {
            setTimeout(() => {
                progressBarRef.current.style.width = `${value}%`;
            }, delay); // Apply delay
        }
    }, [value, delay]);

    const progressBarStyle = {
        width: '0%', // Start width from 0%
        backgroundColor: '#AD974F',
        height: '8px',
        borderRadius: '5px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'width 2s ease-in-out', // Animation: 2 seconds, smooth transition
    };

    const progressValueStyle = {
        float: "right",
        color: '#fff',
        fontSize: '12px',
    };

    const containerStyle = {
        width: '100%',
        padding: '3px',
        borderRadius: '5px',
        marginBottom: '20px',
        display: "flex",
        justifyContent: "center"
    };

    const labelStyle = {
        fontWeight: "bold",
        marginBottom: '8px',
        color: '#FFFFFF',
        fontSize: '12px',
    };

    return (
        <div style={containerStyle}>
            <div style={{ width: "80%" }}>
                <label style={labelStyle}>{label}</label>
                <span style={progressValueStyle}>{value}%</span>
                <div ref={progressBarRef} style={progressBarStyle}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
