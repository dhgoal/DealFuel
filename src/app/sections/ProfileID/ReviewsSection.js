// ReviewsSection.jsx
import React from 'react';
import Review from "@/app/components/PremiumUser/Review";
import styles from "./PremiumUser.module.css";

const ReviewsSection = () => {
    return (
        <div className={styles.reviews}>
            <div className={styles.reviewPair}>
                <Review
                    title={"Chief Marketing Officer - Google Inc."}
                    name={"Name Surname"}
                    reviewText={"This guy is the best out there, and I am not saying this lightly... His impact on my company was immense and I think that he's a great guy"}
                />

                <Review
                    title={"Chief Marketing Officer - Google Inc."}
                    name={"Name Surname"}
                    reviewText={"This guy is the best out there, and I am not saying this lightly... His impact on my company was immense and I think that he's a great guy"}
                />
            </div>

            <div className={styles.reviewPair}>
                <Review
                    title={"Chief Marketing Officer - Google Inc."}
                    name={"Name Surname"}
                    reviewText={"This guy is the best out there, and I am not saying this lightly... His impact on my company was immense and I think that he's a great guy"}
                />

                <Review
                    title={"Chief Marketing Officer - Google Inc."}
                    name={"Name Surname"}
                    reviewText={"This guy is the best out there, and I am not saying this lightly... His impact on my company was immense and I think that he's a great guy"}
                />
            </div>
        </div>
    );
};

export default ReviewsSection;
