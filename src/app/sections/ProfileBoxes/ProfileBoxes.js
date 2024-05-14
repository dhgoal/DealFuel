"use client";

import React, { useEffect, useState } from "react";
import ProfileCard from "../../components/Common/ProfileCard.js";
import styles from "./ProfileBoxes.module.css";
import { useSelector } from "react-redux";
import Image from "next/image";

const ProfileBoxes = () => {




    const { profiles, filters } = useSelector(state => ({
        profiles: state.dashboard.profiles,
        filters: state.dashboard.filters
    }));
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const profilesPerPage = 8;

    // Filter profiles based on selected filters
    const filteredProfiles = profiles.filter(profile => {
        const profileName = profile.name || "Unnamed Profile";
        const matchesSearch = profileName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch && Object.keys(filters).every(filterName => {
            const filterValues = filters[filterName];
            if (!filterValues.length) return true; // No filter applied for this category

            const profileProperty = profile[filterName];

            if (typeof profileProperty === 'string' || typeof profileProperty === 'number') {
                return filterValues.includes(profileProperty);
            }

            if (Array.isArray(profileProperty) && profileProperty.every(item => typeof item === 'string' || typeof item === 'number')) {
                return filterValues.some(filterValue => profileProperty.includes(filterValue));
            }

            if (Array.isArray(profileProperty) && profileProperty.some(item => typeof item === 'object')) {
                return filterValues.some(filterValue =>
                    profileProperty.some(profileValue =>
                        profileValue.role === filterValue && profileValue.selected
                    )
                );
            }

            console.warn(`Unexpected data type for filter: ${filterName}`);
            return true;
        });
    });





    // Use `filteredProfiles` for pagination and displaying
    const indexOfLastProfile = currentPage * profilesPerPage;
    const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
    const currentProfiles = filteredProfiles.slice(
        indexOfFirstProfile,
        indexOfLastProfile
    );

    const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);


    useEffect(() => {
        //console.log("Profiles data:", profiles);
    }, [profiles]);

    // Calculate the indexes for slicing the profiles array

    // Change page handler with scroll to top
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }



    return (
        <div className={styles.profileBoxes}>
            <p>
                We’ve found {filteredProfiles.length} sales reps that matched your requirements
            </p>

            <div className={styles.searchBox}>
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <Image
                    src="/search.png"
                    alt="Search"
                    className={styles.searchIcon}
                    width={24}
                    height={24}
                />
            </div>

            {currentProfiles.map((profile, index) => (
                <ProfileCard key={index} {...profile} />
            ))}
            <div className={styles.pagination}>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        style={{padding: 10, marginTop:6, marginLeft: 4, cursor: "pointer", fontSize:11}}
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? styles.active : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProfileBoxes;
