"use client";
import React, {useState, useEffect} from 'react';
import Header from "@/app/components/Common/Header";
import styles from "./EditPage.module.css";
import ISO6391 from "iso-639-1";
import Select from "react-select";
import {Country, City} from "country-state-city";
import LoadingScreen from "@/app/components/Common/LoadingScreen";
import {useRouter} from "next/navigation";
import Image from "next/image";
import VerticalLine from "@/app/components/Common/VerticalLine";
import HorizontalLine from "@/app/components/Common/HorizontalLine";
import {selectStyles, selectStylesWorkExperience} from "@/app/profile/edit/[id]/SelectStyles";
import {
    amountClosedOptions, callsOptions,
    experienceOptions,
    nicheOptionsFormatted,
    timezoneOptions, workHoursOptions
} from "@/app/profile/edit/[id]/enum";

const Page = () => {

    const router = useRouter();





    const [originalFormData, setOriginalFormData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const [backgroundColor, setBackgroundColor] = useState("#242424"); // Default background color


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        amountClosed: "",
        city: "",
        gender: "",
        country: "",
        numCompanies: "",
        age: "",
        language: [],
        niche: [],
        experience: "",
        calls: "",
        calendlyUrl: "",
        twitterUrl: "",
        linkedinUrl: "",
        instagramUrl: "",
        timezone: "",
        workHours: "",
        aboutMe: "",
        workExperiences: [],
        // Note: professionalRoles and workExperiences initialization simplified for this example
    });

    const [isEditable, setIsEditable] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [error, setError] = useState('');

    const languageOptionsFormatted = ISO6391.getAllNames().map(name => ({
        value: name,
        label: name,
    }));

    const [professionalRoles, setProfessionalRoles] = useState([
        {role: "DM Setter", selected: false},
        {role: "Closer", selected: false},
        {role: "Inbound Dialer", selected: false},
        {role: "Outbound Dialer", selected: false},
        {role: "Full Cycle SDR", selected: false},
        {role: "Full Cycle Closer", selected: false},
        {role: "Sales Manager", selected: false },
        {role: "Im just getting started", selected: false},
        // Add more roles as needed
    ]);

    const [desiredProfessionalRoles, setDesiredProfessionalRoles] = useState([
        { role: "DM Setter", selected: false },
        { role: "Closer", selected: false },
        { role: "Inbound Dialer", selected: false },
        { role: "Outbound Dialer", selected: false },
        { role: "Full Cycle SDR", selected: false },
        { role: "Full Cycle Closer", selected: false },
        { role: "Sales Manager", selected: false } // Adding new role here
    ]);




    const updateUserData = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        if (!userId || !token) {
            setError('User ID or token not found');
            return;
        }

        try {
            const response = await fetch(`/api/user/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Failed to update: ${response.statusText}`);

            const updatedUser = await response.json();
            // Here you can update your state with the updated user data if needed
            console.log('User updated successfully', updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
            setError(error.message);
        }
    };



    useEffect(() => {
        setCountries(Country.getAllCountries().map(({isoCode, name}) => ({
            label: name,
            value: isoCode,
        })));
        // Fetch user data and other initial useEffect code...
    }, []);

    // When the country changes, update the cities
    useEffect(() => {
        if (formData.country) {
            setCities(City.getCitiesOfCountry(formData.country).map(({name}) => ({
                label: name,
                value: name,
            })));
        } else {
            setCities([]);
        }
    }, [formData.country]);

    const ConfirmationModal = ({onClose, onConfirm}) => (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>Are you sure you want to save your changes?</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    );


    const handleSaveClick = () => {
        if (isEditable) {
            // Show confirmation modal instead of immediately saving
            setShowModal(true);
        } else {
            setIsEditable(true); // Go into edit mode if not already editing
        }
    };


    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleChangeSelect = (selectedOption, action) => {
        // Handling for multi-select fields
        setFormData(prevState => ({
            ...prevState,
            [action.name]: selectedOption.map(option => option.value),
        }));
    };

    const handleSelectChange = (selectedOption, { name }) => {
        // Assuming selectedOption is an object with a 'value' key or an array of such objects
        // and name is the name of the form field
        const value = Array.isArray(selectedOption)
            ? selectedOption.map((option) => option.value)
            : selectedOption.value;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleRoleChange = (roleType, role) => {
        let updatedRoles;
        if (roleType === "professionalRoles") {
            updatedRoles = professionalRoles.map(r => {
                if (r.role === role.role) {
                    return { ...r, selected: !r.selected };
                }
                return r;
            });
            setProfessionalRoles(updatedRoles);
        } else {
            updatedRoles = desiredProfessionalRoles.map(r => {
                if (r.role === role.role) {
                    return { ...r, selected: !r.selected };
                }
                return r;
            });
            setDesiredProfessionalRoles(updatedRoles);
        }

        // Update formData with the new roles, maintaining their structure
        setFormData(prevState => ({
            ...prevState,
            [roleType]: updatedRoles,
        }));
    };


    const handleChangeExperienceAndAmountClosed = (selectedOption, action) => {
        // Handling for single select fields
        setFormData(prevState => ({
            ...prevState,
            [action.name]: selectedOption.value,
        }));
    };

    const handleWorkExperienceChange = (index, fieldName, value) => {
        const updatedWorkExperiences = [...formData.workExperiences];

        // Determine if the field being changed is 'offerPricePoint' or 'totalRevenueContribution'
        if (fieldName === 'offerPricePoint' || fieldName === 'totalRevenueContribution') {
            // Check if the value is either empty or numeric. This regex allows for numbers with optional decimal points.
            if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
                // If the value passes the regex test, update the state
                const updatedExperience = { ...updatedWorkExperiences[index], [fieldName]: value };
                updatedWorkExperiences[index] = updatedExperience;
                setFormData({ ...formData, workExperiences: updatedWorkExperiences });
            }
            // If the value is not empty and not numeric, do nothing (effectively rejecting the input).
        } else {
            // For any other field, update the state normally
            const updatedExperience = { ...updatedWorkExperiences[index], [fieldName]: value };
            updatedWorkExperiences[index] = updatedExperience;
            setFormData({ ...formData, workExperiences: updatedWorkExperiences });
        }
    };



    const handleWorkExperienceNicheChange = (index, value) => {
        const updatedWorkExperiences = formData.workExperiences.map((experience, idx) => {
            if (idx === index) {
                return { ...experience, niche: value };
            }
            return experience;
        });
        setFormData({ ...formData, workExperiences: updatedWorkExperiences });
    };


    const addWorkExperience = () => {
        setFormData({
            ...formData,
            workExperiences: [
                ...formData.workExperiences,
                {
                    company: "",
                    startDate: "",
                    endDate: "",
                    role: "",
                    responsibilities: "",
                    niche: "",
                    companyDescription: "",
                    offerPricePoint: "", // Assuming number type
                    totalRevenueContribution: "", // Assuming number type
                    highlightReel: [], // An array, consider how you'll handle adding/removing strings
                },
            ],
        });
    };

    const removeWorkExperience = (index) => {
        const newWorkExperiences = formData.workExperiences.filter((_, idx) => idx !== index);
        setFormData({...formData, workExperiences: newWorkExperiences});
    };


    const handleDiscardChanges = () => {
        setFormData(originalFormData);
        setIsEditable(false); // Turn off edit mode
        setBackgroundColor("#242424"); // Reset background color
    };


    const handleHighlightReelChange = (workExpIndex, highlightIndex, value) => {
        const updatedWorkExperiences = formData.workExperiences.map((experience, idx) => {
            if (idx === workExpIndex) {
                let newHighlightReel = [...experience.highlightReel];
                newHighlightReel[highlightIndex] = value;
                return { ...experience, highlightReel: newHighlightReel };
            }
            return experience;
        });
        setFormData({ ...formData, workExperiences: updatedWorkExperiences });
    };


    const addHighlightReelItem = (workExpIndex) => {
        const updatedWorkExperiences = formData.workExperiences.map((experience, idx) => {
            if (idx === workExpIndex && experience.highlightReel.length < 3) {
                let newHighlightReel = [...experience.highlightReel, '']; // Add an empty string as a new highlight
                return { ...experience, highlightReel: newHighlightReel };
            }
            return experience;
        });
        setFormData({ ...formData, workExperiences: updatedWorkExperiences });
    };

    const removeHighlightReelItem = (workExpIndex, highlightIndex) => {
        const updatedWorkExperiences = formData.workExperiences.map((experience, idx) => {
            if (idx === workExpIndex) {
                let newHighlightReel = [...experience.highlightReel];
                newHighlightReel.splice(highlightIndex, 1); // Remove the item at the specified index
                return { ...experience, highlightReel: newHighlightReel };
            }
            return experience;
        });
        setFormData({ ...formData, workExperiences: updatedWorkExperiences });
    };






    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            if (!userId || !token) {
                setError('User ID or token not found');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/user/${userId}`, {
                    method: 'GET',
                    headers: {'Authorization': `Bearer ${token}`},
                });

                if (response.status === 401) {
                    router.push('/signin/sales-representative');
                    return; // Stop further execution
                }
                if (!response.ok) throw new Error(`Error: ${response.statusText}`);

                const userData = await response.json();
                setOriginalFormData(userData);
                setFormData({
                    ...formData,
                    ...userData,
                    workExperiences: userData.workExperiences || [],
                });

                // Update professional roles with selection status from backend
                const updatedRoles = mergeRolesWithSelections(professionalRoles, userData.professionalRoles);
                setProfessionalRoles(updatedRoles);

                const updatedDesiredRoles = mergeRolesWithSelections(desiredProfessionalRoles, userData.desiredProfessionalRoles);
                setDesiredProfessionalRoles(updatedDesiredRoles);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

// Helper function to merge roles with selections from backend
    function mergeRolesWithSelections(defaultRoles, backendRoles) {
        const roleMap = new Map(defaultRoles.map(role => [role.role, role]));
        backendRoles.forEach(role => {
            if (roleMap.has(role.role)) {
                roleMap.get(role.role).selected = role.selected;
            } else {
                roleMap.set(role.role, { ...role });
            }
        });
        return Array.from(roleMap.values());
    }

    const saveAndCloseModal = () => {
        updateUserData().then(() => {
            setShowModal(false);
            setIsEditable(false);
            setBackgroundColor("#242424"); // Reset background color after saving
            // Any other logic needed post-save, like showing a success message
        });
    };


    const toggleEdit = () => {
        setIsEditable(!isEditable);
        setBackgroundColor(isEditable ? "#171718" : "#343434"); // Change to a different color when editing
    };


    if (isLoading) return <div><LoadingScreen/></div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div className={styles.containerEdit} style={{backgroundColor: "#171718"}}>
            <h1>Edit Your Profile</h1>
            <Header setShowPopup={setShowPopup}/>
            {showPopup && (
                <div className={styles.modalOverlayPopup}>
                    <div className={styles.modalContentPopup}>
                        <p className={styles.popupMessage}>Coming Soon!</p>
                        <button className={styles.closeButtonPopup} onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}

            {
                showModal && (
                    <ConfirmationModal
                        onClose={() => setShowModal(false)}
                        onConfirm={saveAndCloseModal}
                    />
                )

            }

            <form style={{width:1100}}>

                <div className={styles.doubleSections}>
                    <div className={styles.section}>

                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Name:</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                readOnly={!isEditable}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email:</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                readOnly={!isEditable}
                                onChange={handleChange}
                            />
                        </div>

                        {/*<div className={styles.inputGroup}>*/}
                        {/*    <label htmlFor="name">Password:</label>*/}
                        {/*    <input*/}
                        {/*        id="password"*/}
                        {/*        type="password"*/}
                        {/*        name="password"*/}
                        {/*        value={formData.password}*/}
                        {/*        readOnly={!isEditable}*/}
                        {/*        onChange={handleChange}*/}
                        {/*    />*/}
                        {/*</div>*/}

                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Phone Number:</label>
                            <input
                                id="phoneNumber"
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                readOnly={!isEditable}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="age">Age:</label>
                            <input
                                id="age"
                                type="number"
                                name="age"
                                value={formData.age}
                                readOnly={!isEditable}
                                onChange={handleChange}
                            />
                        </div>


                        <div className={styles.inputGroup}>
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender} // Ensure this is initialized to '' in your component's state
                                onChange={handleChange}
                                className="selected-option"
                                required={true}
                            >
                                {/* Removed the selected attribute from here */}
                                <option value="" disabled>
                                    Select Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.section}>

                        <div className={styles.inputGroup}>
                            <label htmlFor="country">Country</label>
                            <Select
                                id="country"
                                name="country"
                                options={countries}
                                value={countries.find((option) => option.value === formData.country)}
                                onChange={handleSelectChange}
                                classNamePrefix="select"
                                isDisabled={!isEditable}
                                styles={selectStyles}
                            />

                        </div>

                        {/* City select input */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="city">City</label>
                            <Select
                                id="city"
                                name="city"
                                options={cities}
                                value={cities.find(option => option.value === formData.city)}
                                onChange={handleSelectChange}
                                classNamePrefix="select"
                                isDisabled={!isEditable || !formData.country}
                                styles={selectStyles}
                            />

                        </div>

                        <div style={{display: "flex", flexDirection: "column", marginBottom: 40}}>

                            <label>About me:</label>
                            <textarea
                                value={formData.aboutMe}
                                onChange={(e) => setFormData({...formData, aboutMe: e.target.value})}
                                placeholder="About Me"
                                readOnly={!isEditable}
                                style={{resize: "vertical", height: 120}}
                            />

                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="calendlyUrl">Calendly URL (optional):</label>
                            <input
                                id="calendlyUrl"
                                type="text"
                                name="calendlyUrl"
                                value={formData.calendlyUrl}
                                onChange={handleChange}
                                readOnly={!isEditable}
                                className={styles.inputField}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="twitterUrl">Twitter URL (optional):</label>
                            <input
                                id="twitterUrl"
                                type="text"
                                name="twitterUrl"
                                value={formData.twitterUrl}
                                onChange={handleChange}
                                readOnly={!isEditable}
                                className={styles.inputField}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="linkedinUrl">LinkedIn URL (optional):</label>
                            <input
                                id="linkedinUrl"
                                type="text"
                                name="linkedinUrl"
                                value={formData.linkedinUrl}
                                onChange={handleChange}
                                readOnly={!isEditable}
                                className={styles.inputField}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="instagramUrl">Instagram URL (optional):</label>
                            <input
                                id="instagramUrl"
                                type="text"
                                name="instagramUrl"
                                value={formData.instagramUrl}
                                onChange={handleChange}
                                readOnly={!isEditable}
                                className={styles.inputField}
                            />
                        </div>
                    </div>
                </div>

                <div style={{display: "flex", justifyContent: "center", marginTop: 50}}>
                    <HorizontalLine/>
                </div>


                <div className={styles.doubleSections}>

                    <div className={styles.section}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="language">Language</label>
                            <Select
                                id="language"
                                isMulti
                                name="language"
                                options={languageOptionsFormatted}
                                classNamePrefix="select"
                                value={languageOptionsFormatted.filter(option => formData.language.includes(option.value))}
                                onChange={handleChangeSelect}
                                isDisabled={!isEditable}
                                styles={selectStyles}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="niche">Niche</label>
                            <Select
                                id="niche"
                                isMulti
                                name="niche"
                                options={nicheOptionsFormatted}
                                classNamePrefix="select"
                                value={nicheOptionsFormatted.filter(option => formData.niche.includes(option.value))}
                                onChange={handleChangeSelect}
                                isDisabled={!isEditable}
                                styles={selectStyles}
                            />
                        </div>

                        {/* Experience selection */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="experience">Experience</label>
                            <Select
                                id="experience"
                                name="experience"
                                options={experienceOptions}
                                classNamePrefix="select"
                                value={experienceOptions.find(option => option.value === formData.experience)}
                                onChange={handleChangeExperienceAndAmountClosed}
                                isDisabled={!isEditable}
                                styles={selectStyles}

                            />
                        </div>

                        {/* Amount closed selection */}
                        <div className={styles.inputGroup}>
                            <label htmlFor="amountClosed">Total Cash Collected</label>
                            <Select
                                id="amountClosed"
                                name="amountClosed"
                                options={amountClosedOptions}
                                classNamePrefix="select"
                                value={amountClosedOptions.find(option => option.value === formData.amountClosed)}
                                onChange={handleChangeExperienceAndAmountClosed}
                                isDisabled={!isEditable}
                                styles={selectStyles}
                            />
                        </div>

                        <div className={styles.section}>

                            <div className={styles.inputGroup}>
                                <label htmlFor="timezone">Timezone</label>
                                <Select
                                    id="timezone"
                                    options={timezoneOptions}
                                    classNamePrefix="select"
                                    value={timezoneOptions.find(option => option.value === formData.timezone)}
                                    onChange={option => setFormData({...formData, timezone: option.value})}
                                    isDisabled={!isEditable}
                                    styles={selectStyles}
                                />
                            </div>

                            {/* Work hours select */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="workHours">Work Hours</label>
                                <Select
                                    id="workHours"
                                    options={workHoursOptions}
                                    classNamePrefix="select"
                                    value={workHoursOptions.find(option => option.value === formData.workHours)}
                                    onChange={option => setFormData({...formData, workHours: option.value})}
                                    isDisabled={!isEditable}
                                    styles={selectStyles}
                                />
                            </div>

                            {/* Calls per day select */}
                            <div className={styles.inputGroup}>
                                <label htmlFor="calls">Calls Per Day</label>
                                <Select
                                    id="calls"
                                    options={callsOptions}
                                    classNamePrefix="select"
                                    value={callsOptions.find(option => option.value === formData.calls)}
                                    onChange={option => setFormData({...formData, calls: option.value})}
                                    isDisabled={!isEditable}
                                    styles={selectStyles}
                                />
                            </div>

                        </div>
                    </div>

                    <div className={styles.sectionRoles}>


                        <label className={styles.label}>Professional Roles</label>
                        <div className={styles.checkboxGroupFirst}>

                            {professionalRoles.map((role, index) => (
                                <label key={index} className={styles.checkboxContainer}>
                                    <input
                                        id={`professional-role-${index}`}
                                        type="checkbox"
                                        name={role.role}
                                        checked={role.selected}
                                        onChange={() => handleRoleChange('professionalRoles', role)}
                                        disabled={!isEditable}
                                        className={styles.checkbox}
                                    />
                                    {role.role}
                                </label>
                            ))}
                        </div>

                        {/* Desired Professional Roles */}
                        <label className={styles.label}>Desired Roles</label>
                        <div className={styles.checkboxGroup}>
                            <div className={styles.checkboxGroup}>
                                {desiredProfessionalRoles.map((role, index) => (
                                    <label key={index} className={styles.checkboxContainer}>
                                        <input
                                            id={`desired-role-${index}`}
                                            type="checkbox"
                                            name={role.role}
                                            checked={role.selected}
                                            onChange={() => handleRoleChange('desiredProfessionalRoles', role)}
                                            disabled={!isEditable}
                                        />
                                        {role.role}
                                    </label>
                                ))}
                            </div>
                        </div>


                    </div>

                </div>


                <div style={{display: "flex", justifyContent: "center", marginTop: 50, marginBottom: 100}}>
                    <HorizontalLine/>
                </div>

                <label className={styles.label}>Work experience</label>


                <div className={styles.workExperiencesContainer}  id="work-experience">

                    {formData.workExperiences.map((experience, index) => (
                        <div key={index} className={styles.workExperienceBlock}>

                            <label className={styles.inputLabel}>Company Name</label>
                            <div className={styles.inputRow}>
                                <input
                                    type="text"
                                    value={experience.company}
                                    onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                                    placeholder="Company Name"
                                    disabled={!isEditable}
                                />
                            </div>

                            <label className={styles.inputLabel}>Role</label>
                            <div className={styles.inputRow}>
                                <input
                                    type="text"
                                    value={experience.role}
                                    onChange={(e) => handleWorkExperienceChange(index, 'role', e.target.value)}
                                    placeholder="Your Role"
                                    disabled={!isEditable}
                                />
                            </div>

                            <label className={styles.inputLabel}>Start Date:</label>
                            <div className={styles.inputRow}>
                                <input
                                    type="month"
                                    value={experience.startDate}
                                    onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                                    disabled={!isEditable}
                                />
                            </div>

                            <label className={styles.inputLabel}>End Date:</label>
                            <div className={styles.inputRow}>
                                <input
                                    type="month"
                                    value={experience.endDate}
                                    onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                                    placeholder="Present"
                                    disabled={!isEditable}

                                />
                            </div>

                            <label className={styles.inputLabel}>Niche</label>
                            <div className={styles.inputGroup}>

                                <Select
                                    id={`workExperience-niche-${index}`}
                                    name={`workExperience-niche-${index}`}
                                    options={nicheOptionsFormatted}
                                    classNamePrefix="select"
                                    value={nicheOptionsFormatted.find(option => option.value === experience.niche)}
                                    onChange={(selectedOption) => handleWorkExperienceNicheChange(index, selectedOption.value)}
                                    styles={selectStylesWorkExperience}
                                    isDisabled={!isEditable}
                                />
                            </div>

                            <label className={styles.inputLabel}>Responsibilities</label>
                            <textarea
                                value={experience.responsibilities}
                                onChange={(e) => handleWorkExperienceChange(index, 'responsibilities', e.target.value)}
                                placeholder="Main Responsibilities"
                                style={{height: 100, width: 224, resize: "vertical"}}
                                disabled={!isEditable}
                            />

                            <label className={styles.inputLabel}>Company Description</label>
                            <div className={styles.inputRow}>

                                <textarea
                                    value={experience.companyDescription}
                                    onChange={(e) => handleWorkExperienceChange(index, 'companyDescription', e.target.value)}
                                    placeholder="Company Description"
                                    disabled={!isEditable}
                                    style={{height: 100, width: 224, resize: "vertical"}}
                                />
                            </div>

                            <label className={styles.inputLabel}>Offer Price Point:</label>
                            <div className={styles.inputRow}>
                                <input
                                    defaultValue={""}
                                    type="number" // Changed from "number" to "text"
                                    value={experience.offerPricePoint}
                                    onChange={(e) => handleWorkExperienceChange(index, 'offerPricePoint', e.target.value)}
                                    placeholder="Offer Price Point"
                                    disabled={!isEditable}
                                />

                            </div>

                            <label className={styles.inputLabel}>Cash Collected:</label>
                            <div className={styles.inputRow}>

                                <input
                                    type="number"
                                    value={experience.totalRevenueContribution}
                                    onChange={(e) => handleWorkExperienceChange(index, 'totalRevenueContribution', e.target.value)}
                                    placeholder="Cash Collected"
                                    disabled={!isEditable}
                                />
                            </div>

                            <label className={styles.inputLabel}>Highlight Reel:</label>
                            <div>

                                {experience.highlightReel.map((item, itemIndex) => (
                                    <div key={itemIndex} className={styles.inputRow}>
                                        <input
                                            type="text"
                                            value={item}
                                            onChange={(e) => handleHighlightReelChange(index, itemIndex, e.target.value)}
                                            placeholder={`Highlight #${itemIndex + 1}`}
                                            disabled={!isEditable}
                                        />
                                        <button type="button" style={{marginLeft:20}} onClick={() => removeHighlightReelItem(index, itemIndex)} disabled={!isEditable}>x</button>
                                    </div>
                                ))}
                                {experience.highlightReel.length < 3 && (
                                    <button type="button"  onClick={() => addHighlightReelItem(index)} disabled={!isEditable}>Add Highlight</button>
                                )}
                            </div>


                            <button type="button" className={styles.removeButton}
                                    onClick={() => removeWorkExperience(index)}>X
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addWorkExperience} style={{
                        minHeight: "520px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 20
                    }}>+
                    </button>

                </div>


                <div className={styles.stickyButtonContainer}>
                    {isEditable ? (
                        <button type="button" onClick={handleSaveClick} className={styles.saveButton}>
                            <Image src="/save.png" alt="Save" width={20} height={20}/>
                            Save
                        </button>

                    ) : (
                        <button type="button" onClick={toggleEdit} className={styles.editButton}>
                            <Image src="/edit.png" alt="Edit" width={20} height={20}/>
                            Edit
                        </button>
                    )}
                    {isEditable && (
                        <button type="button" onClick={handleDiscardChanges} className={styles.discardButton}>
                            <Image src="/discard.png" alt="Discard" width={20} height={20}/>
                            Discard
                        </button>
                    )}
                </div>

            </form>
        </div>
    );
};

export default Page;
