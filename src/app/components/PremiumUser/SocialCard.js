import React from 'react';
import Image from 'next/image'; // Assuming you are using Next.js since you used the Image component
import styles from './SocialCard.module.css'; // Ensure the path is correct based on your project structure

const SocialCard = ({ logoSrc, logoAlt, platformName, profileLink }) => {
    return (
        <div className={styles.socialCard}>
            <Image
                src={logoSrc}
                alt={logoAlt}
                width={50}
                height={50}
            />
            <div>
                <p>{platformName}</p>
                <p>{profileLink}</p>
            </div>
        </div>
    );
};

export default SocialCard;
