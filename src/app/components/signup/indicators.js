import styles from "./indicator.module.css";

export default function Indicators({ totalSteps, currentStep }) {
  return (
    <div className={styles.stepIndicators}>
      {[...Array(totalSteps).keys()].map((step) => (
        <div
          key={step}
          className={`${styles.stepIndicator} ${
            step <= currentStep ? styles.activeStep : ""
          }`}
        />
      ))}
    </div>
  );
}
