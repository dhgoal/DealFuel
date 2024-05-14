import React from 'react';
import Typewriter from 'typewriter-effect';
import styles from "./StatBar.module.css";

const StatBar = ({ profileData }) => {
    return (
        <div className={styles.statsSection}>
            <div className={styles.stat}>
                <h2 className={styles.statHeading}>
                    <Typewriter
                        options={{
                            strings: [profileData?.experience.toString() ],
                            autoStart: true,
                            delay: 75,
                            pauseFor: 9000,
                            loop: true
                        }}
                    />
                </h2>
                <p className={styles.statSubheading}>Years in sales</p>
            </div>
            <div className={styles.stat}>
                <h2 className={styles.statHeading}>
                    <Typewriter
                        options={{
                            strings: [profileData?.amountClosed.toString() ],
                            autoStart: true,
                            delay: 75,
                            pauseFor: 9000,
                            loop: true
                        }}
                    />
                </h2>
                <p className={styles.statSubheading}>Worth of deals closed</p>
            </div>
            <div className={styles.stat}>
                <h2 className={styles.statHeading}>
                    <Typewriter
                        options={{
                            strings: [`${profileData?.workExperiences?.length > 0 ? profileData.workExperiences.length.toString() : '0'} `],
                            autoStart: true,
                            delay: 75,
                            pauseFor: 9000,
                            loop: true
                        }}
                    />
                </h2>
                <p className={styles.statSubheading}>Companies Ive closed for</p>
            </div>
        </div>
    );
};

export default StatBar;
