import React, {useState} from 'react';
import styles from "./PremiumUser.module.css"
import ReactPlayer from "react-player";
import Review from "@/app/components/PremiumUser/Review";
import ReviewsSection from "@/app/sections/ProfileID/ReviewsSection";

const PremiumUser = () => {

    const [playing, setPlaying] = useState(false);
    const handlePlayVideo = () => {
        setPlaying(true);
    }

    return (
        <div className={styles.container}>
            {/*<div className={styles.greySeparator}></div>*/}
            <div className={styles.videoContainer}>

                <ReactPlayer
                    url="/StratFlowVideo.mp4"
                    playing={playing}
                    controls={playing} // Show controls only after playing starts
                    light={"/thumbnail.png"}
                    playIcon={ // This is your custom play button
                        <button onClick={handlePlayVideo} className={styles.customPlayButton}>
                            {/* Custom play button content goes here */}
                        </button>
                    }
                    height={606}
                    width={1080}
                    onClickPreview={handlePlayVideo}
                />

            </div>


        </div>
    );
};

export default PremiumUser;