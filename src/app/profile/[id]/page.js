"use client";
import React, {useEffect, useRef, useState} from "react";
import Header from "@/app/components/Common/Header";
import axios from "axios";
import styles from "../profile.module.css";
import VerticalLine from "@/app/components/Common/VerticalLine"; // Make sure you have this CSS file
import Image from "next/image";
import LoadingScreen from "@/app/components/Common/LoadingScreen";
import {getUserIdFromToken} from "@/lib/auth";
import {useRouter, usePathname} from "next/navigation";
import {Country} from "country-state-city";
import Cropper from "react-easy-crop";
import {setShowAddWorkExpModal} from "@/lib/features/temp/temporarySlice";
import {useDispatch, useSelector} from "react-redux";
import AddWorkExp from "@/app/components/Temporary/AddWorkExp";
import SalesVSL from "@/app/sections/ProfileID/SalesVSL";
import FAQuser from "@/app/sections/ProfileID/FAQuser";
import SocialCard from "@/app/components/PremiumUser/SocialCard";
import SocialMedia from "@/app/sections/ProfileID/SocialMedia";


const Profile = ({params}) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState();
    const fileInputRef = useRef(null); // Add this line to create a ref for the file input
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const imageUploader = useRef(null);
    const [image, setImage] = useState();

    const pathname = usePathname();
    const router = useRouter();
    const [uploadingImage, setUploadingImage] = useState(false);


    const searchParams = new URLSearchParams(router).toString();
    const [fullUrlToShow, setFullUrlToShow] = useState('');

    useEffect(() => {
        setFullUrlToShow(`${window.location.origin}${pathname}`);
    }, [pathname]);

    const [showPremiumPopup, setShowPremiumPopup] = useState(false); // New state for premium feature popup

    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [showCropper, setShowCropper] = useState(false);
    const dispatch = useDispatch();


    // Function to toggle premium feature popup
    const handlePremiumFeatureClick = () => {
        setShowPremiumPopup(!showPremiumPopup); // Toggle the visibility of the premium feature popup
    };


    useEffect(() => {
        // Check if the modal has already been shown in this session
        const modalShown = sessionStorage.getItem('addWorkExpModalShown');
        if (!modalShown) {
            // Show the modal only if it hasn't been shown in the current session
            dispatch(setShowAddWorkExpModal(true));
        }
    }, [dispatch]);


    const handleCloseModal = () => {
        dispatch(setShowAddWorkExpModal(false));
        sessionStorage.setItem('addWorkExpModalShown', 'true'); // Store a flag when the modal is closed
    };


    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    // Utility function to handle image cropping
    // This function should reside outside your component or in a utilities file
    // Ensures the function is defined and used where `window` is available
    async function createImage(url) {
        if (typeof window === "undefined") return; // Early return if not client-side

        return new Promise((resolve, reject) => {
            const img = new window.Image();
            img.addEventListener('load', () => resolve(img));
            img.addEventListener('error', error => reject(error));
            img.setAttribute('crossOrigin', 'anonymous'); // Adjust as per your CORS needs
            img.src = url;
        });
    }


    async function getCroppedImg(imageSrc, pixelCrop) {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob(blob => {
                resolve(blob);
            }, 'image/jpeg');
        });
    }


    const handleUploadClick = () => {


        // Before the user picks an image, set uploadingImage to true
        setUploadingImage(true);

        fileInputRef.current.click();
    };


    // Function to call when the "Crop & Upload" button is clicked
    const onCropSubmit = async () => {
        setUploadingImage(true); // Show loading indicator

        try {
            const croppedImageBlob = await getCroppedImg(image, croppedAreaPixels);
            const fileExt = "jpeg"; // Assuming cropped image is in JPEG format
            const photo = `profile-img-${params?.id}.${fileExt}`;
            const croppedFile = new File([croppedImageBlob], photo, {type: 'image/jpeg'});

            const formData = new FormData();
            formData.append("image", croppedFile);
            formData.append("file-name", photo);
            formData.append("folder", "profile"); // Assuming you're organizing uploaded images into folders

            const response = await fetch("/api/upload-profile-pic", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to upload cropped image.');
            }
            const result = await response.json();

            const newImageUrl = `${result.imageUrl}?timestamp=${new Date().getTime()}`;
            await updateProfilePicture(newImageUrl);
            setImagePreview(newImageUrl); // Update image preview with the new image URL

            setShowCropper(false); // Hide cropper
        } catch (error) {
            console.error('Error uploading cropped image:', error);
            alert(error.message);
        } finally {
            setUploadingImage(false); // Hide loading indicator
        }
    };





    const updateProfilePicture = async (imageUrl) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to update your profile picture.');
            return;
        }

        const userId = localStorage.getItem('userId');
        const url = `/api/user/${userId}`; // Adjust based on your actual API route for updating user profile

        try {
            console.log('Sending request to update profile picture...');
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ profilePicture: imageUrl }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Could not update profile picture.');
            }

            alert('Profile picture updated successfully.');
            // Optionally refresh profile data here
        } catch (error) {
            console.error('Error updating profile picture:', error);
            alert(error.message);
        }
    };




    const onImageChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
                setShowCropper(true); // Show the cropper UI
                setUploadingImage(false); // Hide loading circle when cropping starts
            };
            reader.readAsDataURL(file);
        } else {
            // User cancelled the file picker
            setUploadingImage(false);
        }
    };


    const checkLoggedInStatus = () => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, validate the token with an API call
            // If valid:
            setIsLoggedIn(true);
        } else {
            // If no token or invalid:
            setIsLoggedIn(false);
            router.push('/signin/sales-representative'); // Redirect to sign-in page
        }
    };


    useEffect(() => {

        checkLoggedInStatus();
        const getProfileData = async () => {
            if (params?.id) {
                setIsLoading(true); // Start loading

                const {id} = params;

                try {
                    const res = await fetch(`/api/profile?id=${id}`);
                    const data = await res.json();
                    console.log(data);
                    setProfileData(data);

                    setImagePreview(data.profilePicture || "/profile.webp");
                } catch (error) {
                    console.error("Failed to fetch profile data:", error);
                    // Optionally handle error state
                } finally {
                    setIsLoading(false); // End loading regardless of outcome
                }
            }
        };

        getProfileData();
    }, [params]);


    const copyToClipboard = () => {
        const urlToCopy = `${window.location.origin}${pathname}`; // Constructs the full URL
        navigator.clipboard.writeText(urlToCopy)
            .then(() => alert('Profile URL copied to clipboard!'))
            .catch(err => console.error('Failed to copy URL: ', err));
    };

    useEffect(() => {
        // Ensure code runs only on the client side
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        setIsLoggedIn(!!token);

        // Fetch profile data here or in another useEffect based on `isLoggedIn` state
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatNumber = (number) => {
        // Check if the input is a valid number
        const num = Number(number);
        if (isNaN(num)) {
            // Return a fallback value or keep as is if non-numeric
            return '/';
        }
        // Prepend the $ sign to the formatted number
        return `$${new Intl.NumberFormat('en-US').format(num)}`;
    };
    const showAddWorkExpModal = useSelector(state => state.temporary.showAddWorkExpModal);


    return (


        <>
            {isLoading || !profileData ? (
                // Show LoadingScreen if isLoading is true OR profileData is not yet available
                <div className={styles.loadingContainer}>
                    <LoadingScreen/>
                </div>
            ) : (
                // Render profile content once loading is complete
                <div className={styles.profileContainer}>
                    {isLoggedIn && <Header setShowPopup={setShowPopup}/>}
                    {showAddWorkExpModal && <AddWorkExp onClose={handleCloseModal} />}

                    {showPopup && (
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalContent}>
                                <p className={styles.popupMessage}>Coming Soon!</p>
                                <button className={styles.closeButton} onClick={() => setShowPopup(false)}>X
                                </button>
                            </div>
                        </div>
                    )}

                    {showPremiumPopup && ( // This is the new premium feature popup
                        <div className={styles.modalOverlay}>
                            <div className={styles.modalContent}>
                                <p className={styles.popupMessage}>This feature is reserved for PREMIUM users only</p>
                                <button className={styles.closeButton} onClick={() => setShowPremiumPopup(false)}>X
                                </button>
                            </div>
                        </div>
                    )}

                    {showCropper && (
                        <div className={styles.cropperModal}>
                            <div className={styles.closeButton} onClick={() => setShowCropper(false)}>X</div>
                            <div className={styles.cropperContent}>
                                <Cropper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={onCropComplete}
                                />
                            </div>
                            <div className={styles.cropperControls}>
                                <div className={styles.zoomSliderContainer}>
                                    <input
                                        id="zoom-slider"
                                        type="range"
                                        className={styles.zoomSlider}
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        value={zoom}
                                        onChange={(e) => setZoom(e.target.valueAsNumber)}
                                    />
                                </div>
                                <button className={styles.cropButton} onClick={onCropSubmit} disabled={uploadingImage}>
                                    {uploadingImage ? (
                                        <div style={{
                                            display: "flex",
                                            width: "100%",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <div className={styles.loadingCircle}></div>
                                        </div>
                                    ) : (

                                        "Crop & Upload"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}


                    <div
                        style={{
                            display: "flex",
                            gap: 30,
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: '20px'
                        }}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={onImageChangeHandler}
                                style={{display: 'none'}} // Keep the file input hidden
                            />


                            {/* Image Preview */}
                            {imagePreview ? (
                                <Image src={imagePreview} width={250} height={250} alt="Profile picture"
                                       style={{borderRadius: '8px'}}/>
                            ) : (
                                <Image src="/profile.webp" width={250} height={250} alt="Placeholder"
                                       style={{borderRadius: '8px'}}/>
                            )}
                            {isLoggedIn && (
                                <div className={styles.uploadPrompt} onClick={handleUploadClick}>
                                    <Image src="/upload.png" width={20} height={20} alt="Upload icon"
                                           style={{marginRight: '8px'}}/>
                                    Upload Picture
                                </div>
                            )}
                        </div>
                        <div className={styles.outerIntroSection}>


                            <div className={styles.introSection}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        width: "100%",
                                    }}
                                >
                                    <div className={styles.leftSideProfile}>
                                        <div style={{display: "flex", alignItems: 'center'}}>
                                            <p style={{
                                                fontSize: 24,
                                                textAlign: "left",
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                {profileData?.name}
                                                {/* Wrapper div for the Image component to capture onClick */}

                                            </p>

                                        </div>
                                        <div style={{textAlign: "left", fontSize: 13, marginBottom: 6}}>
                                            {profileData?.professionalRoles
                                                ?.filter(role => role.selected) // Keep only selected roles
                                                .map((role, index) => (
                                                    <span key={index}>
                                                {role.role}{index < profileData.professionalRoles.filter(role => role.selected).length - 1 ? ', ' : ''}
                                            </span>
                                                ))
                                            }
                                        </div>

                                        <div className={styles.imageText}>
                                            <Image
                                                src="/emailIcon.png"
                                                width={16}
                                                height={16}
                                                alt="Picture of the author"
                                            />
                                            <p style={{fontSize: 12}}>{profileData?.email}</p>
                                        </div>

                                        <div className={styles.imageText}>
                                            <Image
                                                src="/locationIcon.png"
                                                width={16}
                                                height={16}
                                                alt="Location"
                                            />
                                            <p style={{fontSize: 12}}>
                                                {profileData?.country ? Country.getCountryByCode(profileData.country).name : 'Not specified'}
                                                <span>, {profileData?.city}</span>
                                            </p>
                                        </div>


                                        <div className={styles.imageText}>
                                            <Image
                                                src="/timezoneIcon.png"
                                                width={16}
                                                height={16}
                                                alt="Picture of the author"
                                            />
                                            <p style={{fontSize: 12}}>{profileData?.timezone}</p>
                                        </div>

                                        {/*These buttons are only for a company view*/}


                                        {/*<div className={styles.buttonsContainer}>*/}
                                        {/*    <button className={styles.profileButton}>Message</button>*/}
                                        {/*    <button className={styles.profileButtonTwo}>*/}
                                        {/*        Book a Meeting*/}
                                        {/*    </button>*/}
                                        {/*</div>*/}


                                    </div>


                                    <div className={styles.rightSideProfile}>
                                        <div style={{height: "100%", width: 1, backgroundColor: "#6b6b6b"}}>

                                        </div>
                                        <div
                                            style={{
                                                textAlign: "left",
                                                fontWeight: "bold",
                                                fontSize: 12,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 14,
                                            }}
                                        >
                                            <p>Calls per day:</p>
                                            <p>Age:</p>
                                            <p>Languages:</p>
                                            <p>Years experience:</p>
                                            <p>Niche:</p>
                                        </div>

                                        <div
                                            style={{
                                                textAlign: "left",
                                                display: "flex",
                                                fontSize: 12,
                                                flexDirection: "column",
                                                gap: 14,
                                            }}
                                        >
                                            <p>{profileData?.calls}</p>
                                            <p>{profileData?.age}</p>
                                            <p>{profileData?.language?.join(', ')}</p>
                                            <p>{profileData?.experience}</p>
                                            <p>{profileData?.niche?.join(', ')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div style={{
                                width: "100%",
                                backgroundColor: "#f5f5f1",
                                fontSize: 11,
                                cursor: "pointer",
                                borderRadius: 20,
                                marginTop: 26,
                                padding: "6px 20px"
                            }} onClick={handlePremiumFeatureClick}>
                                <p style={{color: "#000", textAlign: "left"}}>
                                    <span style={{
                                        fontWeight: "bold",
                                        marginRight: 10
                                    }}>Use your profile as CV:</span> {fullUrlToShow}
                                </p>
                            </div>


                        </div>
                    </div>
                    <div className={styles.statsSection}>
                        <div className={styles.stat}>
                            <h2 className={styles.statHeading}>{profileData?.experience}</h2>
                            <p className={styles.statSubheading}>Years in sales</p>
                        </div>
                        <div className={styles.stat}>
                            <h2 className={styles.statHeading}>{profileData?.amountClosed}</h2>
                            <p className={styles.statSubheading}>Worth of deals closed</p>
                        </div>
                        <div className={styles.stat}>
                            <h2 className={styles.statHeading}>
                                {
                                    // Check if workExperiences is not undefined or null, and has length
                                    profileData?.workExperiences?.length
                                        ? profileData.workExperiences.length === 1 && Object.values(profileData.workExperiences[0]).every(value => !value)
                                            // If there's 1 work experience and all its values are empty, display '0'
                                            ? '0'
                                            // If there's 1 non-empty work experience or more, display the count
                                            : profileData.workExperiences.length
                                        // If workExperiences is undefined, null, or empty array, display '0'
                                        : '0'
                                }
                            </h2>
                            <p className={styles.statSubheading}>Companies Ive closed for</p>
                        </div>

                    </div>


                    <div style={{
                        display: 'flex', // Enables flexbox layout
                        gap: '20px', // Adds space between the two main columns
                        marginTop: '70px',
                    }}>

                        {/* Work Experience Section */}
                        <div className={styles.sectionContainer} style={{}}>
                            <div style={{display: "flex", alignItems: "center", marginBottom: '40px'}}>
                                <Image
                                    src="/workExpGold.png"
                                    alt="Icon Description"
                                    width={30}
                                    height={30}
                                />
                                <p className={styles.bottomSectionHeading}>WORK EXPERIENCE</p>
                            </div>
                            {/* Timeline Container */}
                            <div style={{position: 'relative'}}>
                                {/* Vertical Line */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 0,
                                    left: '6.5px', // Adjust this value to align with the center of your circles
                                    width: '2px',
                                    backgroundColor: '#FFFFFF40', // Semi-transparent white
                                }}></div>
                                {profileData?.workExperiences.map((exp, index) => (
                                    <div key={index} style={{display: 'flex', marginBottom: '50px'}}>
                                        {/* Circle for each entry */}
                                        <div style={{
                                            width: '14px', // Adjust size as needed
                                            height: '14px', // Adjust size as needed
                                            borderRadius: '50%',
                                            backgroundColor: '#FFFFFF', // Circle color
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: '20px',
                                        }}>
                                            {/* Optional: Add content inside the circle or leave it empty */}
                                        </div>
                                        {/* Work Experience Entry */}
                                        <div style={{width: 290}}>
                                            <h3 style={{margin: '0 0 10px 0', fontSize: 18}}>{exp.company}</h3>
                                            <p style={{
                                                margin: '0 0 10px 0',
                                                fontSize: 12
                                            }}>{exp.niche} - {exp.companyDescription}</p>
                                            <p style={{
                                                margin: '0 0 10px 0',
                                                fontSize: 12
                                            }}> {exp.startDate} - {exp.endDate}</p>
                                            <p style={{margin: '0 0 10px 0', fontSize: 12}}><span
                                                style={{fontWeight: "bold", fontSize: 12}}>Role:</span> {exp.role}
                                            </p>
                                            <div style={{height:1, width:"100%", backgroundColor:"#545454"}}>

                                            </div>
                                            <p style={{margin: '14px 0 10px 0', fontSize: 12}}>
                                                <span style={{
                                                    fontWeight: "bold",
                                                    fontSize: 12
                                                }}>Offer Price Point:</span> {formatNumber(exp.offerPricePoint)}
                                            </p>
                                            <p style={{margin: '14px 0 10px 0', fontSize: 12}}>
                                                <span style={{fontWeight: "bold", fontSize: 12}}>Cash Collected:</span> {formatNumber(exp.totalRevenueContribution)}
                                            </p>

                                            <p style={{
                                                margin: '0',
                                                textAlign: "justify",
                                                fontSize: 11
                                            }}><span
                                                style={{fontWeight: "bold", fontSize:12}}>Responsibilities</span>:
                                                <br/>
                                                {exp.responsibilities}
                                            </p>



                                            {exp.highlightReel && exp.highlightReel.length > 0 && (
                                                <>
                                                    <h4 style={{
                                                        margin: '14px 0 10px 0',
                                                        fontWeight: "bold",
                                                        fontSize: 12
                                                    }}>Highlight Reel:</h4>
                                                    <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
                                                        {exp.highlightReel.map((highlight, highlightIndex) => (
                                                            <li key={highlightIndex} style={{
                                                                marginBottom: '10px',
                                                                fontSize: 12,
                                                                position: 'relative'
                                                            }}>
                                <span style={{
                                    height: '3px',
                                    width: '3px',
                                    backgroundColor: '#ffffff', // Set the color of your choice
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    position: 'absolute',
                                    left: '0px', // Adjust as needed based on your layout
                                    top: '7px', // Adjust for vertical alignment
                                }}></span>
                                                                <span style={{marginLeft:8}}>{highlight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </>
                                            )}

                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>


                        {/* Column for Desired Professional Roles and About Me */}
                        <div style={{
                            flex: 1, // Takes up only necessary width, adjust as needed
                        }}>

                            {/* About Me Section */}
                            <div style={{
                                width: '700px', // Adjusted to take the full width of its parent column
                                padding: '20px',
                                backgroundColor: '#212123',
                                borderRadius: '8px',
                                boxSizing: 'border-box',
                            }}>
                                <div style={{display: "flex", alignItems: "center", marginBottom: '20px'}}>
                                    <Image
                                        src="/aboutmeGold.png" // Specify the path to your icon
                                        alt="Icon Description" // Provide a meaningful description for screen readers
                                        width={30} // Adjust width as needed
                                        height={30} // Adjust height as needed
                                    />
                                    <p className={styles.bottomSectionHeading}>ABOUT ME</p>
                                </div>
                                <div style={{fontSize: '12px', color: '#FFFFFF', textAlign: "justify"}}>
                                    {profileData?.aboutMe.split('\n').map((line, index) => (
                                        <React.Fragment key={index}>
                                            {line}
                                            <br/>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            <div style={{display: "flex", gap: 16, justifyContent: "space-between"}}>
                                {/* Desired Professional Roles Section */}
                                <div style={{
                                    padding: '20px',
                                    backgroundColor: '#212123',
                                    marginTop: 30,
                                    width: 200,
                                    borderRadius: '8px',
                                    boxSizing: 'border-box',
                                    marginBottom: '20px', // Adds space between this section and the About Me section
                                }}>
                                    <div style={{display: "flex", alignItems: "center", marginBottom: '20px'}}>
                                        <Image
                                            src="/desiredGold.png" // Specify the path to your icon
                                            alt="Icon Description" // Provide a meaningful description for screen readers
                                            width={30} // Adjust width as needed
                                            height={30} // Adjust height as needed
                                        />
                                        <p className={styles.bottomSectionHeading}>DESIRED ROLE</p>
                                    </div>
                                    <ul style={{listStyleType: "none", fontSize: 14}}>
                                        {profileData?.desiredProfessionalRoles.filter(role => role.selected).map((role, index) => (
                                            <li key={index}
                                                style={{marginBottom: '8px', textDecoration: "none"}}>-{role.role}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{
                                    padding: '20px',
                                    backgroundColor: '#212123',
                                    marginTop: 30,
                                    width: 200,
                                    borderRadius: '8px',
                                    boxSizing: 'border-box',
                                    marginBottom: '20px', // Adds space between this section and the About Me section
                                }}>
                                    <div style={{display: "flex", alignItems: "center", marginBottom: '20px'}}>
                                        <Image
                                            src="/professionalRolesGold.png" // Specify the path to your icon
                                            alt="Icon Description" // Provide a meaningful description for screen readers
                                            width={30} // Adjust width as needed
                                            height={30} // Adjust height as needed
                                        />
                                        <p className={styles.bottomSectionHeading}>PROFESSIONAL
                                            ROLES</p>
                                    </div>
                                    <ul style={{listStyleType: "none", fontSize: 14}}>
                                        {profileData?.professionalRoles.filter(role => role.selected).map((role, index) => (
                                            <li key={index}
                                                style={{marginBottom: '8px', textDecoration: "none"}}>-{role.role}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{
                                    padding: '20px',
                                    backgroundColor: '#212123',
                                    marginTop: 30,
                                    width: 200,
                                    borderRadius: '8px',
                                    boxSizing: 'border-box',
                                    marginBottom: '20px', // This ensures consistency in spacing with other sections
                                }}>
                                    <div style={{display: "flex", alignItems: "center", marginBottom: '20px'}}>
                                        <Image
                                            src="/adinfoGold.png" // You would specify the path to an appropriate icon here
                                            alt="Work Hours and Timezone Icon" // A meaningful description for screen readers
                                            width={30} // Adjust width as needed
                                            height={30} // Adjust height as needed
                                        />
                                        <p className={styles.bottomSectionHeading}>ADDITIONAL INFO</p>
                                    </div>
                                    <div style={{fontSize: 14}}>
                                        <p>Work Hours: {profileData?.workHours}</p>
                                        <p>Timezone: {profileData?.timezone}</p>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            )}

        </>
    );

}

export default Profile;