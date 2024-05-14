// CustomCollapsiblePanel.js
import React, { useState } from 'react';
import Image from "next/image";
import styles from "./CustomCollapsiblePanel.module.css"; // Ensure you create appropriate CSS

const CustomCollapsiblePanel = ({ icon, title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePanel = (e) => {
        e.stopPropagation();  // Prevent the event from bubbling up the DOM tree
        setIsOpen(!isOpen);
    };


    return (
        <div className={styles.panel}>
            <button onClick={togglePanel} className={styles.panelHeader}>
                <div className={styles.leftSide}>
                    <Image src={icon} alt="icon" width={24} height={24} />
                    <span className={styles.title}>{title}</span>
                </div>

                <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
            </button>
            {isOpen && (
                <div className={styles.panelContent}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default CustomCollapsiblePanel;
