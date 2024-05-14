"use client"
import React, {useState} from 'react';
import styles from './Page.module.css';

const modules = [
    {id: 1, name: "Introduction", duration: "10:00"},
    {id: 2, name: "Chapter 1", duration: "15:00"},
    {id: 3, name: "Chapter 2", duration: "20:00"},
    {id: 4, name: "Conclusion", duration: "5:00"}
];

const Page = () => {
    const [activeTab, setActiveTab] = useState('Overview');
    const [selectedModules, setSelectedModules] = useState(new Set());

    const handleModuleCheckbox = (id) => {
        setSelectedModules(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'Overview':
                return <p>Content for Tab 1: Lorem Ipsum...</p>;
            case 'Q&A':
                return <p>Content for Tab 2: Different content...</p>;
            case 'Notes':
                return <p>Content for Tab 3: Another type of content...</p>;
            default:
                return <p>Content for Tab 1: Lorem Ipsum...</p>;
        }
    };

    const activeTabStyle = {
        borderBottom: '3px solid gold'
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.contentArea}>
                <div className={styles.videoContainer}>
                    <div className={styles.videoPlaceholder}>Video Player Here</div>
                </div>
                <div className={styles.textContainer}>
                    <div className={styles.tabs}>
                        <button onClick={() => setActiveTab('Overview')}
                                style={activeTab === 'Overview' ? activeTabStyle : {}}
                                className={styles.tab}>
                            Overview
                        </button>
                        <button onClick={() => setActiveTab('Q&A')}
                                style={activeTab === 'Q&A' ? activeTabStyle : {}}
                                className={styles.tab}>
                            Q&A
                        </button>
                        <button onClick={() => setActiveTab('Notes')}
                                style={activeTab === 'Notes' ? activeTabStyle : {}}
                                className={styles.tab}>
                            Notes
                        </button>
                    </div>
                    <div className={styles.tabContent}>
                        {renderContent()}
                    </div>
                </div>
            </div>
            <div className={styles.sidebar}>
                <div className={styles.sidebarContent}>
                    <div className={styles.moduleHeading}>
                        <p>Course Contents</p>
                    </div>
                    {modules.map(module => (
                        <div key={module.id} className={styles.moduleItem}>
                            <input type="checkbox"
                                   checked={selectedModules.has(module.id)}
                                   onChange={() => handleModuleCheckbox(module.id)}/>
                            <div className={styles.moduleTexts}>
    <span>
        <span style={{fontWeight: "bold"}}>Section {module.id}</span>: {module.name}
    </span>
                                <span style={{fontSize:12}}>{module.duration}</span>
                            </div>


                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
