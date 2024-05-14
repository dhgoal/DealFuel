"use client"
// Dashboard.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfilesStart, fetchProfilesSuccess, fetchProfilesFailure } from '@/lib/features/dashboard/dashboardSlice';
import Header from '@/app/components/Common/Header';
import Filters from '@/app/sections/Filters/Filters';
import ProfileBoxes from '@/app/sections/ProfileBoxes/ProfileBoxes';
import LoadingScreen from '@/app/components/Common/LoadingScreen'; // Make sure you have this component
import styles from './Dashboard.module.css';
import axios from "axios";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { profiles, isLoading } = useSelector((state) => state.dashboard);


    const fetchProfiles = () => async (dispatch) => {
        dispatch(fetchProfilesStart());
        try {
            const response = await axios.get('/api/users');
            dispatch(fetchProfilesSuccess(response.data));
        } catch (error) {
            dispatch(fetchProfilesFailure(error.message));
        }
    };


    useEffect(() => {
        dispatch(fetchProfiles());
    }, [dispatch]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div >
            <Header />
            <div className={styles.mainContent}>
                <Filters />
                {/* Pass the profiles data as props */}
                <ProfileBoxes profiles={profiles} />
            </div>
        </div>
    );
};

export default Dashboard;
