import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                {isOpen ? '❌' : '☰'}
            </button>
            <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                <ul className="sidebar-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/courses">Courses</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;
