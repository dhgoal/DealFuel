import React from 'react';
import styles from "./AboutMe.module.css";
import Image from "next/image";
const AboutMe = ({ profileData }) => {
    return (
        <div className={styles.aboutWrapper}>

            <div style={{display: "flex", alignItems: "center", marginBottom: '20px'}}>
                <Image
                    src="/aboutme.png" // Specify the path to your icon
                    alt="Icon Description" // Provide a meaningful description for screen readers
                    width={30} // Adjust width as needed
                    height={30} // Adjust height as needed
                />
                <p className={styles.bottomSectionHeading}>ABOUT ME</p>
            </div>
            <div className={styles.aboutContainer}>
                {profileData?.aboutMe}
            </div>

        </div>
    );
};

export default AboutMe;