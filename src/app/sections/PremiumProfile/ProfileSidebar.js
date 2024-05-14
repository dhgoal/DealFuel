import React from 'react';
import styles from "@/app/premium-profile/[id]/premiumProfile.module.css";
import Image from "next/image";
import ProfileDetails from "@/app/components/PremiumUser/ProfileDetails";
import Divider from "@/app/components/PremiumUser/Divider";
import LanguageSkills from "@/app/components/PremiumUser/LanguageSkill";
import ProgressBar from "@/app/components/PremiumUser/ProgressBar";
import SocialMedias from "@/app/components/PremiumUser/SocialMedias";

const ProfileSidebar = ({ profileData, imagePreview, languageSkills }) => {
    const copyProfileUrlToClipboard = () => {
        const urlToCopy = window.location.href;  // Gets the current URL
        navigator.clipboard.writeText(urlToCopy)
            .then(() => alert('Profile URL copied to clipboard!'))
            .catch(err => console.error('Failed to copy URL: ', err));
    };


    return (
        <div className={styles.profileSidebar}>
            <div className={styles.upperSidebar}>
                <div className={styles.profileImageContainer}>
                    <Image
                        src={imagePreview}
                        alt="Profile"
                        width={100}
                        height={100}
                        className={styles.profileImage}
                    />
                </div>

                <div style={{display:"flex", width:"100%", justifyContent:"center", gap:6}}>
                    <p className={styles.profileName}>{profileData?.name}</p>
                    <Image src="/verifiedIcon.png" alt="Niche Icon" width={20} height={20}/>
                </div>


                <div className={styles.selectedRoles}>
                    <p>
                        {profileData?.professionalRoles
                            .filter(role => role.selected)
                            .map(role => role.role)
                            .join(', ')}
                    </p>
                </div>

                <div className={styles.copyLink} onClick={copyProfileUrlToClipboard}>
                    <p>Copy link and use as CV</p>
                </div>

            </div>

            <ProfileDetails profileData={profileData}/>
            <Divider/>
            <LanguageSkills skills={languageSkills}/>
            <Divider/>
            <ProgressBar label="DM Setter" value={80}/>
            <ProgressBar label="Project Manager" value={50}/>
            <ProgressBar label="Closer" value={80}/>

            <Divider/>

            <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                <div className={styles.nichesContainer}>
                    {profileData?.niche.map((niche, index) => (
                        <div key={index}
                             style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px'}}>
                            <Image src="/checkmarkIcon.png" alt="Niche Icon" width={20} height={20}/>
                            <p>{niche}</p>
                        </div>
                    ))}
                </div>
            </div>


            <Divider/>

            <div style={{display: "flex", gap: 6, alignItems: "center", cursor: "pointer", padding: "0 10%"}}>
                <p style={{color: "#8D8D8D", fontSize: 12, fontWeight: "bold"}}>DOWNLOAD CV</p>
                <Image src="/downloadIcon.png" alt="Niche Icon" width={20} height={20}/>
            </div>

            <SocialMedias/>


            <div>


            </div>

        </div>
    );
};

export default ProfileSidebar;