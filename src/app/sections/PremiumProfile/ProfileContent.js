import React from 'react';
import styles from "@/app/premium-profile/[id]/premiumProfile.module.css";
import ReactPlayer from "react-player";
import StatBar from "@/app/components/PremiumUser/StatBar";
import AboutMe from "@/app/components/PremiumUser/AboutMe";

const ProfileContent = ({profileData}) => {
    return (
        <div className={styles.profileContent}>
            <ReactPlayer
                url="/StratFlowVideo.mp4"
                controls={true}
                light={"/thumbnail.png"} // Consider using different thumbnails for each video
                width={1080}
                height={608}
            />
            <div>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"1080px"}}>
                    <div className={styles.cta}>
                        <p style={{fontSize: 16, fontWeight: "bold"}}>LETS WORK TOGETHER</p>
                    </div>
                </div>
                <StatBar profileData={profileData}/>


            </div>

            <AboutMe profileData={profileData}/>
        </div>
    );
};

export default ProfileContent;