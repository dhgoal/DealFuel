import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import styles from "./CollapsiblePanel.module.css";

const CollapsiblePanel = ({ icon, title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.panel}>
            <button onClick={togglePanel} className={styles.panelHeader}>
                <div className={styles.leftSide}>
                    <Image src={icon} alt="icon" width={24} height={24} />
                    <span style={{ fontWeight: "bold", fontSize: 16 }}>{title}</span>
                </div>
                <span>{isOpen ? '▲' : '▼'}</span>
            </button>
            <div
                ref={contentRef}
                className={`${styles.panelContent} ${isOpen ? styles.open : styles.closed}`}
            >
                {children}
            </div>
        </div>
    );
};

export default CollapsiblePanel;
