import React from 'react';
import Image from "next/image";

const LoadingScreenLv = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end', // Align to the right side
        background: '#242424',
        overflow: 'hidden', // Prevents overflow of the container
        width: '100vw',
        height: '100vh',
    };

    const rowStyle = {
        display: 'flex',
    };

    const imageStyle = (rotation) => ({
        transform: `rotate(${rotation}deg)`,
        margin: '0 -150px', // Adjust this value as needed
    });

    // Number of images per row and number of rows can be adjusted as needed
    const rows = 22; // Increased the number of rows
    const imagesPerRow = 22; // Increased the number of images per row
    const rotation = 20; // Rotation angle

    // Add extra images on the first few rows
    const extraImagesOnFirstRows = 6; // Adjust this number as needed

    return (
        <div style={containerStyle}>
            {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} style={{ ...rowStyle, marginRight: (rowIndex - extraImagesOnFirstRows) * 50 }}>
                    {Array.from({ length: imagesPerRow + (rowIndex < extraImagesOnFirstRows ? rowIndex : 0) }, (_, imageIndex) => (
                        <Image
                            key={imageIndex}
                            src="/deal-fuel-logo.png"
                            alt="Loading..."
                            width={150}
                            height={150}
                            style={imageStyle(rotation)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default LoadingScreenLv;
