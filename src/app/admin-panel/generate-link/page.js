"use client"
import React, { useState, useEffect } from 'react';
import styles from './GenerateLink.module.css';
import AdminSidebar from "@/app/components/AdminPanel/AdminSidebar";
import AdminHeader from "@/app/components/AdminPanel/AdminHeader";

export default function GenerateLink() {
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [tokens, setTokens] = useState([]);

    const handleGenerateLink = async () => {
        setLoading(true);
        const response = await fetch('/api/generate-signup-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        setLink(data.signupLink);
        setLoading(false);
        fetchTokens(); // Fetch tokens after generating a new link
    };

    const fetchTokens = async () => {
        const response = await fetch('/api/get-signup-links', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (data.success) {
            setTokens(data.tokens);
        } else {
            console.error('Failed to fetch tokens:', data.error);
        }
    };

    const copyToClipboard = (text) => {
        if (navigator.clipboard) { // Modern asynchronous clipboard API
            navigator.clipboard.writeText(text).then(() => {
                alert('Link copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy!', err);
            });
        } else { // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Link copied to clipboard!');
        }
    };

    useEffect(() => {
        fetchTokens();
    }, []);

    return (
        <div className={styles.dashboard}>
            <AdminSidebar />
            <div className={styles.mainWrapper}>
                <AdminHeader />
                <div className={styles.mainContent}>
                    <button onClick={handleGenerateLink} disabled={loading} className={styles.button}>
                        {loading ? 'Generating...' : 'Generate Signup Link'}
                    </button>
                    {link && (
                        <div className={styles.linkContainer} onClick={() => copyToClipboard(link)}>
                            <label className={styles.linkLabel}>Signup Link:</label>
                            <button className={styles.link}>
                                {link}
                            </button>
                        </div>
                    )}
                    <div className={styles.tokenTableContainer}>
                        <h2>Signup Tokens</h2>
                        <table className={styles.tokenTable}>
                            <thead>
                            <tr>
                                <th>Token</th>
                                <th>Email</th>
                                <th>Used</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tokens.slice().reverse().map((token) => ( // Reverse the order of tokens
                                <tr key={token._id}>
                                    <td>{token.originalToken ? `https://dealfuel.io/signup/sales-representative?token=${token.originalToken}` : ''}</td>
                                    <td>{token.email || 'N/A'}</td>
                                    <td className={token.isUsed ? styles.usedYes : styles.usedNo}>
                                        {token.isUsed ? 'Yes' : 'No'}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
