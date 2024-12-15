import React from 'react';

const CoursesCards = ({ course }) => {
    return (
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', width: '300px' }}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button style={{ backgroundColor: '#007BFF', color: '#fff', padding: '0.5rem', border: 'none', borderRadius: '4px' }}>
                Enroll
            </button>
        </div>
    );
};

export default CoursesCards;
