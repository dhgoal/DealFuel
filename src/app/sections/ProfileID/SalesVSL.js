import React, {useState} from 'react';
import ReactPlayer from "react-player";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./PremiumUser.module.css";
import Image from "next/image";

const SalesVsl = () => {
    const [playingIndex, setPlayingIndex] = useState(-1); // Index of the currently playing video

    const videos = [
        "/StratFlowVideo.mp4",
        "/StratFlowVideo.mp4",
        "/StratFlowVideo.mp4",
    ];

    const SampleNextArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <Image
                className={className}
                onClick={onClick}
                style={{
                    ...style,
                    display: "block",
                    right: "-50px", // Move arrow outside the container on the right
                }}
                src={"/rightArrow.png"}
                width={90}
                height={90}
            />
        );
    }

    const SamplePrevArrow = (props) => {
        const {className, style, onClick} = props;
        return (
            <Image
                className={className}
                onClick={onClick}
                style={{
                    ...style,
                    display: "block",
                    left: "-50px", // Move arrow outside the container on the left
                }}
                src={"/leftArrow.png"}
                width={90}
                height={90}
            />
        );
    }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setPlayingIndex(-1),
        afterChange: (current) => setPlayingIndex(current),
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow/>
    };

    // Define custom arrows outside the component
    // ...

    return (
        <>
            <style>
                {`
                    .slick-slider .slick-dots li button:before {
                        color: white !important;
                    }
                    .slick-slider .slick-dots li.slick-active button:before {
                        color: white !important;
                    }
                `}
            </style>
            <div style={{width: '1080px', margin: '0 auto', backgroundColor: '#000', marginTop: 80}}>
                <Slider {...settings}>
                    {videos.map((video, index) => (

                        <div key={index} className={styles.videoContainerSales}>
                            <ReactPlayer
                                url={video}
                                playing={playingIndex === index}
                                controls={true}
                                light={"/thumbnail.png"} // Consider using different thumbnails for each video
                                playIcon={
                                    <button onClick={() => setPlayingIndex(index)} className={styles.customPlayButton}>
                                        <img src="/PlayButton.png" alt="Play"  width={60} height={"fit-content"} /> {/* Example for a 16:9 aspect ratio button */}
                                    </button>


                                }
                                width={1080}
                                height={608}
                            />
                        </div>

                    ))}
                </Slider>
            </div>
        </>
    );
};

export default SalesVsl;