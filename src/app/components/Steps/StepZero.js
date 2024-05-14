import React, { useState } from "react";
import styles from "@/app/page.module.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
const StepZero = ({
  handleChange,
  phoneNumber,
  setPhoneNumber,
  onPasswordMatch,
}) => {
  const [password, setPassword] = useState("");
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [
    confirmPasswordValidationMessage,
    setConfirmPasswordValidationMessage,
  ] = useState("");

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(password)) {
      setPasswordValidationMessage("");
    } else {
      setPasswordValidationMessage(
        "Password must be at least 8 characters long, include a number, a special character, and a capital letter."
      );
    }
  };

  const handlePhoneChange = (value) => {
    setPhoneNumber(value); // Update phoneNumber in the parent state
  };
  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    validatePassword(value);
    handleChange(event); // Update the parent component's state.
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
    const match = password === value;
    onPasswordMatch(match); // Notify the parent about the password match status
    setConfirmPasswordValidationMessage(match ? "" : "Passwords do not match.");
  };

  return (
    <div>
      <div className={styles.inputGroup}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          onChange={handleChange}
          autoComplete="off"
          placeholder="Your Name"
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          onChange={handleChange}
          placeholder="Your Email"
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="password">Create Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          onChange={handlePasswordChange}
          placeholder="Your Password"
          aria-describedby="passwordHelp"
        />
        <small id="passwordHelp" className={styles.helpText}>
          {passwordValidationMessage}
        </small>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Your Password"
        />
        <small className={styles.helpText}>
          {confirmPasswordValidationMessage}
        </small>
      </div>
      <div className={styles.inputGroup}>
        <div className={styles.inputGroup}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <PhoneInput
            international
            defaultCountry="US"
            value={phoneNumber}
            onChange={setPhoneNumber} // Directly use setPhoneNumber here
          />
        </div>
      </div>
    </div>
  );
};

export default StepZero;
