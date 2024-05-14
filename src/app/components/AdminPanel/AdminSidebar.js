"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './AdminSidebar.module.css';  // Ensure this CSS file handles sidebar styling
import Cookies from 'js-cookie';  // Import js-cookie

const SidebarItem = ({ iconSrc, label, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={styles.sidebarItem}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image src={iconSrc} alt={label} width={24} height={24} />
            {isHovered && <div className={styles.tooltip}>{label}</div>}
        </div>
    );
};

const AdminSidebar = () => {
    const router = useRouter();

    const navigate = (path) => {
        router.push(path);
    };

    const handleLogout = () => {
        Cookies.remove('adminToken'); // Remove admin token from cookies
        navigate('/admin-signin'); // Redirect to admin sign-in page
    };


    return (
        <div className={styles.sidebar}>
            <SidebarItem
                iconSrc="/Dashboard.png"
                label="Dashboard"
                onClick={() => navigate('/admin-panel')}
            />
            <SidebarItem
                iconSrc="/Analytics.png"
                label="Analytics"
                onClick={() => navigate('/admin-panel/analytics')}
            />
            <SidebarItem
                iconSrc="/GenerateLink.png"
                label="Signup Links"
                onClick={() => navigate('/admin-panel/generate-link')}
            />
            <SidebarItem
                iconSrc="/Logout.png"
                label="Logout"
                onClick={handleLogout}
            />
        </div>
    );
};

export default AdminSidebar;
