"use client"
import React from 'react';
import styles from './Page.module.css';
import Header from "@/app/components/Common/Header";
import Image from 'next/image'; // Import the Image component from next/image

const Page = () => {
    const iconSrc = '/companyIcon.png'; // Make sure the source includes the file extension if necessary

    // Define progress data for each course
    const courses = [
        {
            title: "Complete Mastermind Key Words That Are commonly Used for Courses for 2024",
            completion: 34,
            details: [
                "20 hours on-demand video",
                "8 articles",
                "24 downloadable resources",
                "1 exercise",
                "Full lifetime access",
                "Access on mobile",
                "Certificate of completion"
            ]
        },
        {
            title: "Second Mastermind Random Words That Are commonly Used for Courses in 2024",
            completion: 44,
            details: [
                "20 hours on-demand video",
                "8 articles",
                "24 downloadable resources",
                "1 exercise",
                "Full lifetime access",
                "Access on mobile",
                "Certificate of completion"
            ]
        }
    ];

    return (
        <div className={styles.outerContainer}>
            {/*<Header/>*/}
            <div className={styles.container}>
                <h1 className={styles.title}>Pick your Poison</h1>
                <p style={{marginTop:10, marginBottom:40}}>Of course,we have something for everyone</p>
                <div className={styles.divsContainer}>
                    {courses.map((course, index) => (
                        <div key={index} className={styles.divItem}>
                            <div className={styles.videoIcon}>▶</div>
                            <div className={styles.lowerSection}>
                                <h2 className={styles.courseTitle}>{course.title}</h2>
                                <div style={{marginTop:20}}>


                                    <p style={{float: "right", fontSize: 9, fontWeight:"bold"}}>{course.completion}% completed</p>
                                    <progress value={course.completion} max="100"
                                              className={styles.progressBar}></progress>
                                </div>
                                <p style={{marginTop:40, fontWeight:"bold"}}>This course includes:</p>
                                <ul className={styles.courseDetails}>
                                    {course.details.map((detail, index) => (
                                        <li key={index}><Image src={iconSrc} alt="Icon" width={20} height={20}/>{detail}
                                        </li>
                                    ))}
                                </ul>
                                <button className={styles.enterButton}>Enter Course</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
