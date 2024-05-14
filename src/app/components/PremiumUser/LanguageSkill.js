import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from './LanguageSkills.module.css';

const LanguageSkills = ({ skills }) => {
    // Using useState to manage animated values of skills
    const [animatedValues, setAnimatedValues] = useState([]);

    useEffect(() => {
        // Set initial animated values to 0 when component mounts
        setAnimatedValues(skills.map(() => 0));

        // Animate to actual skill percentages after a component has mounted
        const timeoutIds = skills.map((skill, index) =>
            setTimeout(() => {
                setAnimatedValues(prevValues => {
                    const newValues = [...prevValues];
                    newValues[index] = skill.percentage;
                    return newValues;
                });
            }, 400 * index) // Delays subsequent animations slightly for staggered effect
        );

        // Clean up timeouts when component unmounts or skills change
        return () => {
            timeoutIds.forEach(clearTimeout);
        };
    }, [skills]);

    return (
        <div className={styles.skillsContainer}>
            {skills.map((skill, index) => (
                <div key={index} className={styles.skill}>
                    <CircularProgressbar
                        value={animatedValues[index]}
                        text={`${animatedValues[index]}%`}
                        styles={buildStyles({
                            textColor: '#fff',
                            pathColor: animatedValues[index] === 100 ? 'gold' : animatedValues[index] > 50 ? '#ffc107' : '#808080',
                            trailColor: '#333',
                            textSize: '16px',
                            pathTransitionDuration: 0.5
                        })}
                    />
                    <p className={styles.skillLabel}>{skill.language}</p>
                </div>
            ))}
        </div>
    );
};

export default LanguageSkills;
