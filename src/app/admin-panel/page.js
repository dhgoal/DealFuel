"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Country } from "country-state-city";
import styles from "./AdminPanel.module.css";
import Header from "@/app/components/Common/Header";
import AdminSidebar from "../components/AdminPanel/AdminSidebar";
import AdminHeader from "@/app/components/AdminPanel/AdminHeader";
import InfoCard from "@/app/components/AdminPanel/InfoCard";
import Cookies from 'js-cookie';  // Import js-cookie


const AdminPanel = () => {
    const router = useRouter();

    const [stats, setStats] = useState({
        totalUsers: 0,
        basicUsers: 0,
        premiumUsers: 0,
        totalRevenue: 0,
        dailyTotalUsers: [],
        dailyBasicUsers: [],
        dailyPremiumUsers: [],
        dailyRevenue: [],
        usersByCountry: []
    });
    const [isLoading, setIsLoading] = useState(false);

    const getStats = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('/api/admin-panel/stats');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStats({
                totalUsers: data.totalUsers,
                basicUsers: data.basicUsers,
                premiumUsers: data.premiumUsers,
                totalRevenue: data.totalRevenue,
                dailyTotalUsers: data.dailyTotalUsers,
                dailyBasicUsers: data.dailyBasicUsers,
                dailyPremiumUsers: data.dailyPremiumUsers,
                dailyRevenue: data.dailyRevenue,
                usersByCountry: data.usersByCountry.map(country => ({
                    ...country,
                    name: Country.getCountryByCode(country._id)?.name || "Unknown"
                }))
            });
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const token = Cookies.get('adminToken');  // Get token from cookies
        if (!token) {
            router.push('/admin-signin');
        } else {
            getStats();
        }
    }, [router]);

    // Determine the maximum user count for scaling
    const maxUsers = Math.max(...stats.usersByCountry.map(c => c.count), 0);

    return (
        <div className={styles.dashboard}>
            <AdminSidebar />
            <div className={styles.mainWrapper}>
                <AdminHeader />
                <div className={styles.mainContent}>
                    <p style={{ fontSize: 32, marginBottom: 40 }}>Welcome Dev</p>
                    <div className={styles.cards}>
                        <InfoCard
                            label="Total Users"
                            value={isLoading ? "Loading..." : stats.totalUsers.toString()}
                            percentage="N/A"  // Placeholder, calculate actual percentage if needed
                            sevenDayValues={isLoading ? Array(7).fill(0) : stats.dailyTotalUsers}
                        />

                        <InfoCard
                            label="Revenue"
                            value={isLoading ? "Loading..." : `$${stats.totalRevenue.toLocaleString()}`}
                            percentage="N/A"  // Placeholder, calculate actual percentage if needed
                            sevenDayValues={isLoading ? Array(7).fill(0) : stats.dailyRevenue.map(x => x.toString())}
                        />

                        <InfoCard
                            label="Basic Plan Users"
                            value={isLoading ? "Loading..." : stats.basicUsers.toString()}
                            percentage="N/A"  // Placeholder, calculate actual percentage if needed
                            sevenDayValues={isLoading ? Array(7).fill(0) : stats.dailyBasicUsers}
                        />

                        <InfoCard
                            label="Premium Users"
                            value={isLoading ? "Loading..." : stats.premiumUsers.toString()}
                            percentage="N/A"  // Placeholder, calculate actual percentage if needed
                            sevenDayValues={isLoading ? Array(7).fill(0) : stats.dailyPremiumUsers}
                        />
                    </div>
                    <div className={styles.countryStats}>
                        <h3 style={{marginBottom:40}}>Top 10 Countries</h3>
                        {stats.usersByCountry.slice(0, 10).map((country, index) => (
                            <div key={index} className={styles.countryRow}>
                                <span className={styles.countryName}>{country.name}</span>
                                <div className={styles.progressBar}>
                                    <div
                                        className={styles.progress}
                                        style={{ width: `${(country.count / maxUsers) * 100}%`, backgroundColor: '#4abebf' }}
                                    ></div>
                                </div>
                                <span className={styles.userCount}>{country.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
