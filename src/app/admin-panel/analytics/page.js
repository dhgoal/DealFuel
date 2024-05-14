import React from 'react';
import styles from "@/app/admin-panel/AdminPanel.module.css";
import AdminSidebar from "@/app/components/AdminPanel/AdminSidebar";
import AdminHeader from "@/app/components/AdminPanel/AdminHeader";

const Page = () => {
    return (
        <div className={styles.dashboard}>
            <AdminSidebar />
            <div className={styles.mainWrapper}>
                <AdminHeader />
                <div className={styles.mainContent}>

                </div>
            </div>
            
        </div>
    );
};

export default Page;