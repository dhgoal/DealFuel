import React from 'react';
import styles from "@/app/components/Common/Header.module.css";
import Image from "next/image";
import VerticalLine from "@/app/components/Common/VerticalLine";
import Link from "next/link";

const AdminHeader = () => {
    return (
        <header className={styles.adminHeader}>
            <div className={styles.leftSection}>
                <div >
                    <Image
                        src="/deal-fuel-logo.png" // Replace with your logo path
                        alt="Logo"
                        width={21}
                        height={21}
                    />
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;