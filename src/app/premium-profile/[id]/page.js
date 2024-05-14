"use client";
import React, { useState, useEffect } from 'react';
import styles from "./premiumProfile.module.css";
import Header from "@/app/components/Common/Header";
import ReactPlayer from "react-player";
import Image from "next/image";
import { Country } from "country-state-city";
import Divider from "@/app/components/PremiumUser/Divider";
import LanguageSkills from "@/app/components/PremiumUser/LanguageSkill";
import ProgressBar from "@/app/components/PremiumUser/ProgressBar";
import SocialMedias from "@/app/components/PremiumUser/SocialMedias";
import StatBar from "@/app/components/PremiumUser/StatBar";
import ProfileDetails from "@/app/components/PremiumUser/ProfileDetails";
import AboutMe from "@/app/components/PremiumUser/AboutMe";
import ProfileSidebar from "@/app/sections/PremiumProfile/ProfileSidebar";
import ProfileContent from "@/app/sections/PremiumProfile/ProfileContent";
import CollapsiblePanel from "@/app/sections/PremiumProfile/CollapsiblePanel";
import FAQSection from "@/app/components/PremiumUser/FAQSection";
import ReviewInstance from "@/app/components/PremiumUser/ReviewInstance";
import WorkExperiences from "@/app/components/PremiumUser/WorkExperiences";
import LoadingSpinner from "@/app/components/Common/LoadingScreen"; // Import the LoadingSpinner component

const Page = ({ params }) => {
    // States for managing data and loading state
    const [profileData, setProfileData] = useState(null);
    const [imagePreview, setImagePreview] = useState();
    const [isLoading, setIsLoading] = useState(true); // Start with loading true
    const [error, setError] = useState(null);

    // Effect hook to fetch data on component mount
    useEffect(() => {
        const getProfileData = async () => {
            if (params?.id) {
                const { id } = params;

                try {
                    const res = await fetch(`/api/profile?id=${id}`);
                    const data = await res.json();
                    console.log(data);
                    setProfileData(data);

                    setImagePreview(data.profilePicture || "/profile.webp");
                } catch (error) {
                    console.error("Failed to fetch profile data:", error);
                    setError("Failed to fetch profile data");
                } finally {
                    setIsLoading(false); // End loading regardless of outcome
                }
            }
        };

        getProfileData();
    }, [params]);

    const languageSkills = [
        { language: "English", percentage: 90 },
        { language: "Bosnian", percentage: 80 },
        { language: "Arabic", percentage: 25 }
    ];

    const reviews = [
        {
            id: 1,
            name: "John Doe",
            title: "Mecha Lab Solutions - CEO",
            text: "Working with this guy was a huge pleasure, not only because of the quality of his work, but also because of the way he carries himself on calls, especially when selling stuff to clients. I have no more ideas what to say so I am writing more of this text, but in general yeah this guy is great and it was lovely working with him on this stuff",
            imageUrl: "/profilePic.jpg",
            rating: 5
        },
        {
            id: 2,
            name: "Jane Smith",
            title: "Mecha Lab Solutions - CEO",
            text: "Working with this guy was a huge pleasure, not only because of the quality of his work, but also because of the way he carries himself on calls, especially when selling stuff to clients. I have no more ideas what to say so I am writing more of this text, but in general yeah this guy is great and it was lovely working with him on this stuff",
            imageUrl: "/profilePic.jpg",
            rating: 4
        },
        {
            id: 3,
            name: "Emma Wilson",
            title: "Mecha Lab Solutions - CEO",
            text: "Working with this guy was a huge pleasure, not only because of the quality of his work, but also because of the way he carries himself on calls, especially when selling stuff to clients. I have no more ideas what to say so I am writing more of this text, but in general yeah this guy is great and it was lovely working with him on this stuff",
            imageUrl: "/profilePic.jpg",
            rating: 3
        }
    ];

    return (
        <div className={isLoading ? styles.loadingWrapper : styles.globalWrapper}>
            <Header />
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div>
                    <div className={styles.profileContainer}>
                        <ProfileSidebar profileData={profileData} imagePreview={imagePreview} languageSkills={languageSkills} />
                        <ProfileContent profileData={profileData} />
                    </div>
                    <CollapsiblePanel icon="/workExp.png" title="Work Experiences">
                        <WorkExperiences workExperiences={profileData?.workExperiences} />
                    </CollapsiblePanel>
                    <CollapsiblePanel icon="/salesCallIcon.png" title="My Sales Calls">
                        <div className={styles.salesCalls}>
                            {reviews.map(review => (
                                <ReviewInstance
                                    key={review.id}
                                    name={review.name}
                                    title={review.title}
                                    text={review.text}
                                    imageUrl={review.imageUrl}
                                    rating={review.rating}
                                />
                            ))}
                        </div>
                    </CollapsiblePanel>
                    <CollapsiblePanel icon="/calendlyLogo.png" title="Let's work together">
                        {/* Content for "Let's work together" */}
                    </CollapsiblePanel>
                    <CollapsiblePanel icon="/faqIcon.png" title="FAQ">
                        <FAQSection />
                    </CollapsiblePanel>
                </div>
            )}
        </div>
    );
};

export default Page;
