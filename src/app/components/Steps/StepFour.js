// StepFour.js
import React from "react";
import styles from "@/app/page.module.css";

const StepFour = ({
  handleChange,
  calendlyUrl,
  twitterUrl,
  linkedinUrl,
  instagramUrl,
}) => {
  return (
    <div>
      <div className={styles.inputGroup}>
        <label htmlFor="calendlyUrl">Calendly URL (optional) : </label>
        <input
          id="calendlyUrl"
          name="calendlyUrl"
          type="text"
          placeholder="Enter your Calendly URL"
          value={calendlyUrl}
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="twitterUrl">Twitter URL (optional) :</label>
        <input
          id="twitterUrl"
          name="twitterUrl"
          type="text"
          placeholder="Enter your Twitter URL"
          value={twitterUrl}
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="linkedinUrl">LinkedIn URL (optional) :</label>
        <input
          id="linkedinUrl"
          name="linkedinUrl"
          type="text"
          placeholder="Enter your LinkedIn URL"
          value={linkedinUrl}
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="instagramUrl">Instagram URL (optional) :</label>
        <input
          id="instagramUrl"
          name="instagramUrl"
          type="text"
          placeholder="Enter your Instagram URL"
          value={instagramUrl} // Ensure you have defined instagramUrl in your state
          onChange={handleChange} // Ensure handleChange updates the state correctly
          className={styles.inputField}
        />
      </div>
    </div>
  );
};

export default StepFour;
