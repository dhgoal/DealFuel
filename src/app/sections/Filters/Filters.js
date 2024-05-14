import React, {useState} from "react";
import styles from "./Filters.module.css";
import HorizontalLine from "../../components/Common/HorizontalLine.js";
import VerticalLine from "../../components/Common/VerticalLine.js";
import {useDispatch} from "react-redux"; // Make sure this path is correct
import {removeFilter, setFilter} from '@/lib/features/dashboard/dashboardSlice';

const Filters = () => {

    const dispatch = useDispatch();

    const handleFilterChange = (event) => {
        const {name: filterName, value, checked} = event.target;
        console.log(`Filter change detected: ${filterName}, Value: ${value}, Checked: ${checked}`); // Debug log
        if (checked) {
            dispatch(setFilter({filterName, value}));
        } else {
            dispatch(removeFilter({filterName, value}));
        }
    };

    const desiredProfessionalRolesOptions = [
        { role: "DM Setter" },
        { role: "Closer" },
        { role: "Inbound Dialer" },
        { role: "Outbound Dialer" },
        { role: "Full Cycle SDR" },
        { role: "Full Cycle Closer" },
        // Add more roles as needed
    ];

    const professionalRolesOptions = [
        { role: "DM Setter" },
        { role: "Closer" },
        { role: "Inbound Dialer" },
        { role: "Outbound Dialer" },
        { role: "Full Cycle SDR" },
        { role: "Full Cycle Closer" },
        { role: "I'm just getting started" },
        // Add more roles as needed
    ];


    const nicheOptions = [
        "B2C info product",
        "B2B info product",
        "B2B Tech",
        "SaaS",
        "Recruitment",
        "Solar",
        "Agencies Services",
        "Door to Door",
        "Print Media",
        "I'm just getting started",
    ];


    const timezoneOptions = [
        {value: "US", label: "US"},
        {value: "UK", label: "UK"},
        {value: "Europe", label: "Europe"},
        {value: "Australian", label: "Australian"},
        {value: "Flexible", label: "Im Flexible"},
    ];

    const workHoursOptions = ["1h-3h", "3h-5h", "5h-8h", "8h+"];

    const amountClosedOptions = [
        "0-100k",
        "100k-250k",
        "250k-500k",
        "500k-1M",
        "1M-3M",
        "3M-5M",
        "5M-7M",
        "7M-9M",
        "9M-11M",
        "11M+",
    ];

    const experienceOptions = [
        "I'm just getting started",
        "0-1 years",
        "1-2 years",
        "2-3 years",
        "4-6 years",
        "6+ years",
    ];

    const languageOptions = ["English", "Spanish", "French", "German", "Arabic"];


    return (
        <div className={styles.filters}>
            <h2 className={styles.heading}>Find your perfect match</h2>

            <div style={{alignSelf: "center", marginBottom: 15}}>
                <HorizontalLine width={"100%"} backgroundColor={"#727272"}/>
            </div>


            {/* Niche */}
            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Niche:</h3>
                <div className={styles.checkboxGroup}>
                    {nicheOptions.map((niche, index) => (
                        <label key={index} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="niche" // This should exactly match the key in your Redux state
                                value={niche} // Make sure `value` is set to the option's value
                                onChange={handleFilterChange}
                                className={styles.checkboxInput}
                            />
                            {niche}
                        </label>
                    ))}
                </div>
            </div>



            {/* Professional Roles */}
            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Professional Roles:</h3>
                <div className={styles.checkboxGroup}>
                    {professionalRolesOptions.map((role, index) => (
                        <label key={index} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="professionalRoles"
                                value={role.role}
                                onChange={handleFilterChange}
                                className={styles.checkboxInput}
                            />
                            {role.role}
                        </label>
                    ))}
                </div>
            </div>

            {/* Desired Professional Roles */}
            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Desired Professional Roles:</h3>
                <div className={styles.checkboxGroup}>
                    {desiredProfessionalRolesOptions.map((role, index) => (
                        <label key={index} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="desiredProfessionalRoles"
                                value={role.role}
                                onChange={handleFilterChange}
                                className={styles.checkboxInput}
                            />
                            {role.role}
                        </label>
                    ))}
                </div>
            </div>


            {/* Timezone */}
            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Timezone:</h3>
                <div className={styles.checkboxGroup}>
                    {timezoneOptions.map((timezone, index) => (
                        <label key={index} className={styles.checkboxLabel}>
                            <input type="checkbox"
                                   className={styles.checkboxInput}
                                   value={timezone.value}
                                   name="timezone"
                                   onChange={handleFilterChange}/>

                            {timezone.label}
                        </label>
                    ))}
                </div>
            </div>

            {/* Work Hours */}
            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Availability:</h3>
                {workHoursOptions.map((hours, index) => (
                    <label key={index} className={styles.checkboxLabel}>
                        <input type="checkbox"
                               className={styles.checkboxInput}
                               name="workHours" // Ensure this matches your Redux state
                               value={hours}
                               onChange={handleFilterChange}/>
                        {hours}
                    </label>
                ))}
            </div>

            {/* Experience */}
            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Experience:</h3>
                <div className={styles.checkboxGroup}>
                    {experienceOptions.map((experience, index) => (
                        <label key={index} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                name="experience" // Make sure this matches a key in your Redux state if necessary
                                value={experience} // Set to the option's value
                                onChange={handleFilterChange}
                                className={styles.checkboxInput}
                            />
                            {experience}
                        </label>
                    ))}
                </div>
            </div>

            {/* Amount Closed */}
            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Amount Closed:</h3>
                <div className={styles.checkboxGroup}>
                    {amountClosedOptions.map((amount, index) => (
                        <label key={index} className={styles.checkboxLabel}>
                            <input type="checkbox"
                                   className={styles.checkboxInput}
                                   name="amountClosed" // Ensure this matches your Redux state
                                   value={amount}
                                   onChange={handleFilterChange}/>
                            {amount}
                        </label>
                    ))}
                </div>
            </div>

            {/* Language */}
            <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>Language:</h3>
                <div className={styles.checkboxGroup}>
                    {languageOptions.map((language, index) => (
                        <label key={index} className={styles.checkboxLabel}>
                            <input type="checkbox" value={language} className={styles.checkboxInput} name="language"
                                   onChange={handleFilterChange}/>
                            {language}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Filters;
