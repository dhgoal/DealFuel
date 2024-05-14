// ReviewInstance.js
import Image from "next/image";
import styles from "./reviewInstance.module.css";
import StarRating from "./StarRating"; // Import the StarRating component

const ReviewInstance = ({ name, title, text, imageUrl, rating }) => {
    return (
        <div className={styles.reviewContainer}>
            <div className={styles.imageWrapper}>
                <Image src={imageUrl} alt={name} width={75} height={75} style={{borderRadius: "50%", border: "1px solid #424242"}}/>
            </div>
            <div className={styles.contentWrapper}>
                <h3>{name}</h3>
                <h4>{title}</h4>
                <p>{text}</p>
                <StarRating rating={rating} />
            </div>
        </div>
    );
};

export default ReviewInstance;
