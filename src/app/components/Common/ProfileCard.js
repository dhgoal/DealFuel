"use client"
import React, {useState} from 'react';
import PropTypes from 'prop-types'; // For prop types validation
import styles from './ProfileCard.module.css';
import Bullet from "./Bullet.js"; // Ensure this CSS module file is created
import {useRouter} from "next/navigation";
import Image from "next/image";
import {Country} from "country-state-city";

const ProfileCard = ({
                         _id,
                         name,
                         surname,
                         location,
                         aboutMe,
                         language,
                         experience,
                         niche,
                         amountClosed,
                         imageUrl,
                         city,
                         country,
                         profilePicture,
                         timezone,
                        workHours,
                         professionalRoles, // Added prop
                         desiredProfessionalRoles
                     }) => {
    const router = useRouter();
    const [isBookmarked, setIsBookmarked] = useState(false);

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked); // Toggle bookmark state
    };
    const handleClick = () => {
        router.push(`/profile/${_id}`);
    };

    const bookmarkSrc = isBookmarked ? "/bookmarkGold.png" : "/bookmark.png";
    const scrollInfo = (direction) => {
        const infoElement = document.querySelector('.info');
        const scrollAmount = 200; // Adjust based on your needs
        if (direction === 'left') {
            infoElement.scrollBy({left: -scrollAmount, behavior: 'smooth'});
        } else if (direction === 'right') {
            infoElement.scrollBy({left: scrollAmount, behavior: 'smooth'});
        }
    };
    const placeholderImage = '/profile.webp';

    const imageSrc = profilePicture || placeholderImage;

    const renderRoles = (roles, title) => {
        // Filter roles where selected is true
        const selectedRoles = roles.filter(role => role.selected);
        // Return a render if there are selected roles
        return selectedRoles.length > 0 && (
            <div style={{marginLeft:40}}>
                <h4 style={{fontSize:13, marginLeft:-13}}>{title}</h4>
                <ul style={{fontSize:11}}>
                    {selectedRoles.map(role => <li key={role._id}>{role.role}</li>)}
                </ul>
            </div>
        );
    };

    return (
        <div className={styles.profile}>


            <div className={styles.upperSection}>
                <Image
                    src={imageSrc}
                    alt={`${name} ${surname}`}
                    className={styles.profilePic}
                    width={250} // Specify width
                    height={250} // Specify height
                    unoptimized={imageSrc === placeholderImage} // Use unoptimized prop conditionally
                />
                <div className={styles.upperSectionTexts}>
                    <div className={styles.upperSectionHeader}>
                        <div className={styles.nameAndLocation}>
                            <h3 className={styles.name}>{name} {surname}</h3>
                            <div className={styles.locationWrapper}>
                                <Image
                                    src="/locationIcon.png"
                                    width={16}
                                    height={16}
                                    alt="Location"
                                />
                                <p className={styles.location}>{city},</p>
                                <p className={styles.location}> {country ? Country.getCountryByCode(country).name : ''}</p>

                            </div>
                        </div>
                        <img src={bookmarkSrc} alt="Bookmark" className={styles.bookmarkIcon} onClick={toggleBookmark} />
                    </div>
                    <p className={styles.bio}>{aboutMe}</p>
                    <div className={styles.rolesSection}>
                        {renderRoles(professionalRoles, "Current Professional Roles")}
                        {renderRoles(desiredProfessionalRoles, "Desired Professional Roles")}
                    </div>
                </div>
            </div>

            <div className={styles.info}>
                <Bullet type={"Language"} value={language}/>
                <Bullet type={"Experience"} value={experience}/>
                <Bullet type={"Niche"} value={niche}/>
                <Bullet type={"Timezone"} value={timezone}/>
                <Bullet type={"Amount closed"} value={amountClosed}/>
                <Bullet type={"Amount closed"} value={workHours}/>
            </div>
            {/* Rest of your component */}


            <button className={styles.hireButton} onClick={handleClick}>View Profile</button>
            {/* This is the new button */}
        </div>
    );
};

// PropTypes for type checking
ProfileCard.propTypes = {
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    niche: PropTypes.string.isRequired,
    amountClosed: PropTypes.string.isRequired,
    imageUrl: PropTypes.string // imageUrl is optional, could be required based on your needs
};

export default ProfileCard;
