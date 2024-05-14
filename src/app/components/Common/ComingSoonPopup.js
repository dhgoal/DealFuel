const ComingSoonPopup = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <p>Coming Soon!</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};
