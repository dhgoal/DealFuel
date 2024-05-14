import React from 'react';
import { Country } from 'country-state-city';
import styles from './ProfileDetails.module.css';  // Ensure you have this CSS file or use an existing one

const ProfileDetails = ({ profileData }) => {
    return (
        <div className={styles.profileDetails}>
            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Residence:</span>
                <span className={styles.detailValue}>
                    {profileData?.country ? Country.getCountryByCode(profileData.country).name : 'Not specified'}
                </span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>City:</span>
                <span className={styles.detailValue}>{profileData?.city}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Timezone:</span>
                <span className={styles.detailValue}>{profileData?.timezone}</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Age:</span>
                <span className={styles.detailValue}>{profileData?.age}</span>
            </div>
        </div>
    );
};

export default ProfileDetails;
