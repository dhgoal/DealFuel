import CollapsiblePanel from "@/app/sections/PremiumProfile/CollapsiblePanel";
import React from "react";
import CustomCollapsiblePanel from "@/app/components/PremiumUser/CustomCollapsibleContent";
import styles from "./CustomCollapsiblePanel.module.css"
const FAQSection = () => {
    const faqItems = [
        { question: "What is Lorem Ipsum?", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
        { question: "Why do we use it?", answer: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout." },
        { question: "Where does it come from?", answer: "Contrary to popular belief, Lorem Ipsum is not simply random text." },
        { question: "Where can I get some?", answer: "There are many variations of passages of Lorem Ipsum available." }
    ];


    return (
        <div className={styles.container}> {/* Use the container class for grid layout */}
            {faqItems.map((item, index) => (
                <CustomCollapsiblePanel key={index} title={item.question}>
                    <p>{item.answer}</p>
                </CustomCollapsiblePanel>
            ))}
        </div>
    );
};
export default FAQSection;