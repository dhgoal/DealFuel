import React from 'react';
import PropTypes from 'prop-types'; // Optional, for prop type validation

const VerticalLine = ({ backgroundColor, height }) => {
    return (
        <div
            style={{
                width: 1,
                height: height || "80%", // Use provided height or default to 80%
                background: backgroundColor || "#fff", // Use provided color or default to white
            }}
        >
        </div>
    );
};

// Optional: Add prop type validation
VerticalLine.propTypes = {
    backgroundColor: PropTypes.string,
    height: PropTypes.string,
};

export default VerticalLine;
