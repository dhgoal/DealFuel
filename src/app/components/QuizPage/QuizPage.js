import React from 'react';
import styles from './QuizPage.module.css'
import Image from "next/image";
import {useRouter} from "next/navigation";

const QuizPage = () => {

    const router = useRouter();
    return (
        <div className={styles.wrapper}>
            <div className={styles.homePage}>

                <div className={styles.container}>


                    <div className={styles.mainContent}>


                        <p className={styles.eyebrow}>
                            Discover DealFuel®
                        </p>
                        <p className={styles.headline}>
                            Where Opportunity Meets Talent.
                        </p>
                        <p className={styles.subheadline}>
                            Unlock The Perfect Match using our tech-enabled recruitment platform and industry leading
                            expertise.
                            Start by selecting your needs below:

                        </p>

                        <div className={styles.titleAndButtons}>

                            <p>

                            </p>

                            <div className={styles.buttons}>

                                <div
                                    className={styles.button}
                                    onClick={() => router.push('/signin/sales-representative')} // Corrected navigation method
                                >
                                    <img src="/salesman.png" alt="Salesman" className={styles.image}/>
                                    <p className={styles.buttonHeading}>Im a sales rep</p>
                                    <p className={styles.buttonSubtitle}>Looking for a role</p>
                                </div>
                                <div
                                    className={styles.button}
                                    // Replace '/signin/company' with the actual Calendly URL
                                    onClick={() => window.location.href = 'https://company.dealfuel.io/'}
                                >
                                    <img src="/company.png" alt="Company" className={styles.image}/>
                                    <p className={styles.buttonHeading}>Im a company</p>
                                    <p className={styles.buttonSubtitle} >Looking to hire</p>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className={styles.imageContainer}>
                        <Image
                            src="/RocketYellow.png"
                            alt="Rocket"
                            layout="fill"
                            objectFit="contain" // Adjust as needed: cover, contain, etc.
                        />
                    </div>

                </div>


            </div>

            <div style={{width: "100%", height: 1, backgroundColor: "#6b6969"}}>

            </div>

            <div className={styles.footer}>
                <p>©DealFuel 2024. All rights reserved.</p>

            </div>

        </div>
    );
};

export default QuizPage;