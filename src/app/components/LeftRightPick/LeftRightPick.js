import React from 'react';
import styles from './LeftRightPick.module.css';
import {useRouter} from "next/navigation"; // Adjust the path as needed
const LeftRightPick = () => {

    const router = useRouter();

    return (
        <div className={styles.homePage}>
            <div
                className={`${styles.half} ${styles.left}`}
                onClick={() => router.push('/signin/sales-representative')} // Corrected navigation method
            >
                <img src="/salesman.png" alt="Salesman" className={styles.image} />
                <p className={styles['bold-and-large']}>Im a sales rep</p>
            </div>
            <div
                className={`${styles.half} ${styles.right}`}
                // Replace '/signin/company' with the actual Calendly URL
                onClick={() => window.location.href = 'https://calendly.com/in-outbound/deal-fuel-business'}
            >
                <img src="/company.png" alt="Company" className={styles.image} />
                <p className={styles['bold-and-large']}>Im looking to hire</p>
            </div>
        </div>
    );
};

export default LeftRightPick;