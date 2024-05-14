import React from 'react';
import PropTypes from 'prop-types'; // Optional, for prop type validation

const VerticalLine = ({ backgroundColor, width }) => {
    return (
        <div
            style={{
                height: 1,
                width: width || "80%", // Use provided height or default to 80%
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
