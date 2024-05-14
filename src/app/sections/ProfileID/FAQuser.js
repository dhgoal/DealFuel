import React, { useState } from 'react';
import styles from './PremiumUser.module.css'; // Ensure the path is correct based on your project structure

const FAQuser = () => {
    // Simulating fetched data
    const faqs = [
        {
            id: 1,
            question: "What is React?",
            answer: "React is a JavaScrigpt library for building user interfaces."
        },
        {
            id: 2,
            question: "Why use React?",
            answer: "React makes it painless to create interactive UIs. Design simple views for each state in your application."
        },
        {
            id: 3,
            question: "Why use React?",
            answer: "React makes it painless to create interactive UIs. Design simple views for each state in your application."
        },
        {
            id: 4,
            question: "Why use React?",
            answer: "React makes it painless to create interactive UIs. Design simple views for each state in your application."
        },
        {
            id: 5,
            question: "Why use React?",
            answer: "React makes it painless to create interactive UIs. Design simple views for each state in your application."
        }
    ];

    // Using a state object to track open/close state of each FAQ
    const [isOpen, setIsOpen] = useState({});

    const toggleFAQ = (index) => {
        setIsOpen(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div>
            <div className={styles.faqQA}>
                {faqs.map(faq => (
                    <div key={faq.id} className={styles.faqContainer}>
                        <div className={`${styles.faqItem} ${isOpen[faq.id] ? styles.open : ''}`} onClick={() => toggleFAQ(faq.id)}>
                            <div className={styles.faqContent}>
                                <div className={styles.faqQuestion}>{faq.question}</div>
                                <div className={styles.arrow}></div>
                            </div>
                            {isOpen[faq.id] && <div className={styles.faqAnswer}>{faq.answer}</div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQuser;

