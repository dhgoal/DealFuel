import React from 'react';
import styles from './AddWorkExp.module.css'; // Your CSS module
import Link from 'next/link'; // Import Link from next/link

const AddWorkExp = ({ onClose }) => {
    const userId = localStorage.getItem("userId");

    return (
        <div className={styles.modalBackdrop} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <h2>Enhance Your Work Experience</h2>
                <p style={{marginTop:10}}>We have noticed you might have more to tell about your work experience. Adding more details can help you stand out to potential employers.</p>
                {/* Wrap the button with Link and pass the userId to the href */}
                <Link href={`/profile/edit/${userId}#work-experience`} passHref style={{width:"100%"}} scroll={false}>
                    <button  className={styles.button} onClick={onClose}>Add Experience</button>
                </Link>

            </div>
        </div>
    );
};

export default AddWorkExp;
