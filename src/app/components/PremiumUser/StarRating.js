// StarRating.js
import Image from "next/image";
import styles from "./starRating.module.css"; // Ensure to create and style appropriately

const StarRating = ({ rating }) => {
    return (
        <div className={styles.starsContainer}>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <Image
                        key={index}
                        src={ratingValue <= rating ? "/star.png" : "/emptyStar.png"}
                        alt={`Rating ${ratingValue} stars`}
                        width={15}
                        height={15}
                    />
                );
            })}
        </div>
    );
};

export default StarRating;
