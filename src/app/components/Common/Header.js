"use client";

import React, {useState} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import styles from "./Header.module.css";
import VerticalLine from "./VerticalLine.js";
import {useDispatch} from "react-redux";
import {logOut} from "@/lib/features/auth/authSlice"; // You will create this CSS module file

const Header = ({setShowPopup}) => {
  const router = useRouter();

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const userId = localStorage.getItem("userId");


  const dispatch = useDispatch();
  const handleButtonClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setShowPopup(true);
    // Optionally, hide the popup after a few seconds
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleProfileClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSignOut = () => {
    // Handle sign-out logic here
    console.log("Signing out...");

    // Clear the flag in sessionStorage that indicates the modal has been shown
    sessionStorage.removeItem('addWorkExpModalShown');

    // Reset dropdown visibility
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(logOut());
    setIsDropdownVisible(false);

    // Redirect to sign-in page or perform other actions as needed
    router.push('/');
  };

  const handleAcademyClick = () => {
    router.push("/courses");
  };




  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div onClick={handleButtonClick} title="Dashboard">
          <Image
            src="/deal-fuel-logo.png" // Replace with your logo path
            alt="Logo"
            width={21}
            height={21}
          />
        </div>
      </div>
      <div className={styles.centerSection}>
        <a href={"/dashboard"} title="Dashboard" className={styles.button} onClick={handleButtonClick}>
          Dashboard
        </a>
        <a href={"/my-jobs"} title="myjobs" className={styles.button}  onClick={handleButtonClick}>
          My Jobs
        </a>
        <a href={"/messages"} title="messages" className={styles.button}  onClick={handleButtonClick}>
          Messages
        </a>
        <a href={"/bookmarks"} title="bookmarks" className={styles.button}  onClick={handleButtonClick}>
          Bookmarks
        </a>
      </div>

      <div className={styles.rightSection}>

        {/*
        <div style={{ marginLeft: 20 }}>
          <VerticalLine height={"30px"} backgroundColor={"#575757"} />
        </div>
        <div className={styles.icon} onClick={handleAcademyClick}>
          <Image
              src="/DFAcademy.png"
              alt="Profile"
              width={28}
              height={28}
          />
        </div>*/}


        <div style={{ marginLeft: 20 }}>
          <VerticalLine height={"30px"} backgroundColor={"#575757"} />
        </div>
        <Image
            src="/notification.png"
            alt="Notifications"
            className={styles.icon}
            width={24}
            height={24}
        />

        <div style={{ marginLeft: 20 }}>
          <VerticalLine height={"30px"} backgroundColor={"#575757"} />
        </div>
        <Image
          src="/help.png"
          alt="Notifications"
          className={styles.icon}
          width={24}
          height={24}
        />

        <div style={{ marginLeft: 20 }}>
          <VerticalLine height={"30px"} backgroundColor={"#575757"} />
        </div>
        <div className={styles.icon} onClick={handleProfileClick}>
          <Image
              src="/profile.png"
              alt="Profile"
              width={24}
              height={24}
          />
        </div>

        {isDropdownVisible && (
            <div className={styles.dropdownMenu}>

              <Link href={`/profile/${userId}`} passHref>
                <button className={styles.dropdownMenuButton}>Profile</button>
              </Link>

              <Link href={`/profile/edit/${userId}`} passHref>
                <button className={styles.dropdownMenuButton}>Edit Profile</button>
              </Link>

              <button onClick={handleSignOut} className={styles.dropdownMenuButton}>Sign out</button>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;
