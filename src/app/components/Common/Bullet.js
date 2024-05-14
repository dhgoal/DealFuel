import React from 'react';
import PropTypes from 'prop-types'; // For prop types validation
import styles from './Bullet.module.css';

const Bullet = ({ type, value }) => {
    // Check if value is an array and join with commas, otherwise display as is
    const displayValue = Array.isArray(value) ? value.join(', ') : value;

    return (
        <div className={styles.container}>
            <p className={styles.type}>{type}:</p>
            <p className={styles.value}>{displayValue}</p>
        </div>
    );
};

// Update PropTypes to handle both string and array of strings
Bullet.propTypes = {
    type: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
};

export default Bullet;
