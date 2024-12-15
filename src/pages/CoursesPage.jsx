import React, { useState, useEffect } from 'react';
import './CoursesPage.css';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLevel, setSelectedLevel] = useState('All');
    const [enrolledCourses, setEnrolledCourses] = useState([]); // состояние для отслеживания зарегистрированных курсов

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                    
                const updatedData = data.map((course) => {
                    const hasDiscount = Math.random() < 0.2; // 20% шанс на скидку
                    const discount = hasDiscount ? Math.floor(Math.random() * 16) + 5 : 0; // Скидка от 5% до 20%

                    return {
                        ...course,
                        duration: course.duration || `${Math.floor(Math.random() * 10) + 1} months`,
                        price: course.price || Math.floor(Math.random() * 100) + 10, // Случайная цена
                        category: course.category || 'Web Development',
                        level: course.level || 'Beginner',
                        discount, // Добавляем скидку
                    };
                })

                setCourses(updatedData);
                setFilteredCourses(updatedData);
            } catch (err) {
                setError(err.message || 'Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleEnrollClick = (course) => {
        setSelectedCourse(course); // Выбираем курс для регистрации
    };

    const handleCloseModal = () => {
        setSelectedCourse(null); // Закрываем модальное окно
    };

    const handleSubmitRegistration = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        // Добавляем курс в список зарегистрированных
        setEnrolledCourses([...enrolledCourses, { ...selectedCourse, enrolled: true }]);

        // Закрываем модальное окно
        setSelectedCourse(null);
    };

    const toggleFilters = () => {
        setFiltersOpen(!filtersOpen);
    };

    const applyFilters = () => {
        let updatedCourses = courses;

        if (selectedCategory !== 'All') {
            if (selectedCategory === 'Most Popular') {
                // Randomly select 3-9 courses
                const randomCount = Math.floor(Math.random() * 7) + 3;
                updatedCourses = [...courses].sort(() => 0.5 - Math.random()).slice(0, randomCount);
            } else {
                updatedCourses = updatedCourses.filter(
                    (course) => course.category === selectedCategory
                );
            }
        }

        if (selectedLevel !== 'All') {
            updatedCourses = updatedCourses.filter(
                (course) => course.level === selectedLevel
            );
        }

        setFilteredCourses(updatedCourses);
        setFiltersOpen(false);
    };

    const resetFilters = () => {
        setSelectedCategory('All');
        setSelectedLevel('All');
        setFilteredCourses(courses);
        setFiltersOpen(false);
    };

    const generateRandomReviews = () => {
        const reviewsCount = Math.floor(Math.random() * 9) + 2; // 2 to 10 reviews
        const reviews = [];
        for (let i = 0; i < reviewsCount; i++) {
            const rating = Math.floor(Math.random() * 5) + 1;
            reviews.push({
                avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
                name: `User ${i + 1}`,
                rating: rating,
                comment: 
                rating === 5 ? 'Excellent course, highly recommend!' :
                rating === 4 ? 'Great course, really enjoyed it!' :
                rating === 3 ? 'It was okay, could be better.' :
                rating === 2 ? 'Not as expected, some improvement needed.' :
                'Very disappointing, would not recommend.' 
            });
        }
        return reviews;
    };

    if (loading) {
        return <p className="loading-text">Loading courses...</p>;
    }

    if (error) {
        return <p className="error-text">Error fetching courses: {error}</p>;
    }

    return (
        <div className="courses-page">
            <h2 className="courses-title">All Courses</h2>
            <button className="filters-icon-button" onClick={toggleFilters}>
                <i className="fa fa-filter" aria-hidden="true"></i>
            </button>

            {filtersOpen && (
                <div className="filters-panel">
                    <h3>Filter Courses</h3>
                    <div className="filter-group">
                        <label>Category:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Most Popular">Most Popular</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Level:</label>
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                        >
                            <option value="All">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <button className="apply-filters-button" onClick={applyFilters}>
                        Apply Filters
                    </button>
                    <button className="reset-filters-button" onClick={resetFilters}>
                        Reset Filters
                    </button>
                </div>
            )}

            <div className="courses-grid">
                {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                        <div key={course._id} className="course-card">
                            <div className="course-card-left">
                                <img
                                    src={course.image || 'placeholder.jpg'}
                                    alt={course.title}
                                    className="course-image"
                                />
                                <h3 className="course-title">{course.title}</h3>
                                <p className="course-description">{course.description}</p>
                                {course.discount > 0 && (
                                <p className="course-discount">
                                    <strong>Discount:</strong> {course.discount}% Off!
                                </p>
                            )}
                            <p className="course-price">
                                <strong>Price:</strong> ${course.price - (course.price * course.discount) / 100}
                            </p>
                            <button
                                className="enroll-button"
                                onClick={() => handleEnrollClick(course)}
                            >
                                Enroll
                            </button>

                            {/* Сообщение, если курс зарегистрирован */}
                            {enrolledCourses.some((enrolledCourse) => enrolledCourse._id === course._id) && (
                                <p className="enrolled-message">
                                    <span role="img" aria-label="checkmark">✔️</span> You are enrolled in this course!
                                </p>
                            )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-courses-text">No courses available</p>
                )}
            </div>

            {/* Модальное окно с деталями курса и отзывами */}
            {selectedCourse && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleCloseModal}>
                            &times;
                        </button>

                        {/* Информация о курсе */}
                        <div className="modal-course-info">
                            <h3 className="modal-course-title">{selectedCourse.title}</h3>
                            <p className="modal-course-description">{selectedCourse.description.repeat(2)}</p>
                            <p><strong>Category:</strong> {selectedCourse.category}</p>
                            <p><strong>Level:</strong> {selectedCourse.level}</p>
                            <p><strong>Duration:</strong> {selectedCourse.duration || 'Not specified'}</p>
                            <p><strong>Price:</strong> {selectedCourse.price || 'Free'}</p>

                            {selectedCourse.discountedPrice && (
                                <p><strong>Discounted Price:</strong> {selectedCourse.discountedPrice}</p>
                            )}

                            <h4>Register for this course</h4>
                            <form onSubmit={handleSubmitRegistration}>
                                <input type="text" placeholder="Your Name" required />
                                <input type="email" placeholder="Your Email" required />
                                <input type="tel" placeholder="Your Phone Number" required />
                                <button type="submit" className="submit-button">Submit</button>
                            </form>
                        </div>

                        {/* Отзывы */}
                        <div className="reviews-section">
                            <h4>What others are saying:</h4>
                            {generateRandomReviews().map((review, index) => (
                                <div key={index} className="review-card">
                                    <img src={review.avatar} alt="Avatar" className="review-avatar" />
                                    <div className="review-details">
                                        <strong>{review.name}</strong>
                                        <p>{'⭐'.repeat(review.rating)}</p>
                                        <p>{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
         </div>
    );
};

export default CoursesPage;
