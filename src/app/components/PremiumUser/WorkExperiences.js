import React from 'react';
import Image from "next/image";
import styles from './WorkExperiences.module.css';

const WorkExperiences = ({ workExperiences = [] }) => {

    const formatNumber = (number) => {
        // Check if the input is a valid number
        const num = Number(number);
        if (isNaN(num)) {
            // Return a fallback value or keep as is if non-numeric
            return '/';
        }
        // Prepend the $ sign to the formatted number
        return `$${new Intl.NumberFormat('en-US').format(num)}`;
    };

    return (
        <div className={styles.sectionContainer}>
            {/* Timeline Container */}
            <div className={styles.timelineContainer}>
                {/* Horizontal Line */}
                <div className={styles.horizontalLine}></div>
                {workExperiences.map((exp, index) => (
                    <div key={index} className={styles.experienceContainer}>
                        {/* Circle for each entry */}
                        <div className={styles.circleContainer}>
                            <div className={styles.circle}>
                                <span className={styles.tooltip}>
                                    {exp.startDate} - {exp.endDate}
                                </span>
                            </div>
                        </div>
                        {/* Work Experience Entry */}
                        <div className={styles.experienceContent}>
                            <h3 className={styles.company}>{exp.company}</h3>
                            <p className={styles.niche}>{exp.niche} - {exp.companyDescription}</p>
                            <p className={styles.dates}>{exp.startDate} - {exp.endDate}</p>
                            <p className={styles.role}><span className={styles.bold}>Role:</span> {exp.role}</p>
                            <div className={styles.separator}></div>
                            <p className={styles.offerPricePoint}>
                                <span className={styles.bold}>Offer Price Point:</span> {formatNumber(exp.offerPricePoint)}
                            </p>
                            <p className={styles.totalRevenueContribution}>
                                <span className={styles.bold}>Cash Collected:</span> {formatNumber(exp.totalRevenueContribution)}
                            </p>
                            <p className={styles.responsibilities}><span className={styles.bold}>Responsibilities</span>:<br/>
                                {exp.responsibilities}
                            </p>

                            {exp.highlightReel && exp.highlightReel.length > 0 && (
                                <>
                                    <h4 className={styles.highlightReelTitle}>Highlight Reel:</h4>
                                    <ul className={styles.highlightReelList}>
                                        {exp.highlightReel.map((highlight, highlightIndex) => (
                                            <li key={highlightIndex} className={styles.highlightItem}>
                                                <span className={styles.highlightDot}></span>
                                                <span className={styles.highlightText}>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WorkExperiences;
