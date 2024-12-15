import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

// Логотипы языков программирования
import jsLogo from '../assets/js-logo.png';
import pythonLogo from '../assets/python-logo.png';
import javaLogo from '../assets/java-logo.png';
import csharpLogo from '../assets/csharp-logo.png';
import introImage from '../assets/intro-image.jpg'; 
import aboutImage from '../assets/about-image.jpg';  

const Main = () => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false); // Видимость модального окна
    const [selectedEvent, setSelectedEvent] = useState(null); // Данные выбранного мероприятия
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [registeredEvents, setRegisteredEvents] = useState([]); // Состояние для отслеживания зарегистрированных событий

    const events = [
        { id: 1, title: "Web Development Webinar", date: "December 20, 2024", description: "Join our free webinar to learn the basics of web development." },
        { id: 2, title: "Data Science Bootcamp", date: "January 15, 2025", description: "An intensive bootcamp to master data science in 5 days." },
        { id: 3, title: "Graphic Design Workshop", date: "February 10, 2025", description: "Learn the principles of design and create stunning visuals." },
    ];

    // Открыть модальное окно и установить выбранное мероприятие
    const handleOpenModal = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    // Закрыть модальное окно
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phone: '' }); // Сброс формы
    };

    // Обновление данных формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    // Отправка формы
    const handleSubmit = (e) => {
        e.preventDefault();
        // Добавляем событие в список зарегистрированных
        setRegisteredEvents([...registeredEvents, selectedEvent]);
        console.log('Registration data:', formData);
        console.log('Registered for event:', selectedEvent);
        handleCloseModal(); // Закрыть окно после отправки
    };

    const handleLanguageClick = (language) => {
        navigate(`/courses?language=${language}`);
    };

    return (
        <main className="main">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Learn Programming with Us</h1>
                    <p>
                        Join our platform to master the skills needed for your dream job. With expert instructors, structured courses, 
                        and practical projects, you’ll achieve your goals faster than ever. Start your learning journey now!
                    </p>
                    <button className="hero-btn" onClick={() => navigate('/courses')}>
                        Join Us
                    </button>
                </div>
                <div className="hero-image">
                    <img src={introImage} alt="Learning Programming" />
                </div>
            </section>

            {/* Programming Languages Section */}
            <section className="programming-languages">
                <h2>Which Programming Languages Do You Want to Learn?</h2>
                <div className="language-options">
                    <div
                        className="language-card"
                        onClick={() => handleLanguageClick('JavaScript')}
                    >
                        <img src={jsLogo} alt="JavaScript" />
                        <p>JavaScript</p>
                    </div>
                    <div
                        className="language-card"
                        onClick={() => handleLanguageClick('Python')}
                    >
                        <img src={pythonLogo} alt="Python" />
                        <p>Python</p>
                    </div>
                    <div
                        className="language-card"
                        onClick={() => handleLanguageClick('Java')}
                    >
                        <img src={javaLogo} alt="Java" />
                        <p>Java</p>
                    </div>
                    <div
                        className="language-card"
                        onClick={() => handleLanguageClick('C#')}
                    >
                        <img src={csharpLogo} alt="C#" />
                        <p>C#</p>
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="about-us">
                <div className="about-us-content">
                    <div className="about-text">
                        <h2>About Us</h2>
                        <ul>
                            <li><strong>Our Mission:</strong> Empower learners to acquire programming skills that will help them build successful careers.</li>
                            <li><strong>What We Offer:</strong> High-quality, hands-on courses in various programming languages and technologies.</li>
                            <li><strong>Our Approach:</strong> Personalized learning paths, expert instructors, and real-world projects to ensure your growth.</li>
                            <li><strong>Why Choose Us:</strong> Join a community of learners and professionals dedicated to achieving success in tech.</li>
                        </ul>
                        <div className="more-info">
                            <p>Want to know more about us?</p>
                            <button className="learn-more-btn" onClick={() => navigate('/about')}>
                                More About Us
                            </button>
                        </div>
                    </div>
                    <div className="about-image">
                        <img src={aboutImage} alt="About Us" />
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="upcoming-events">
                <h2>Don't Miss Our Upcoming Events</h2>
                <div className="events-list">
                    {events.map((event) => (
                        <div className="event-card" key={event.id}>
                            <h3>{event.title}</h3>
                            <p><strong>Date:</strong> {event.date}</p>
                            <p>{event.description}</p>
                            <button
                                className="register-btn"
                                onClick={() => handleOpenModal(event)} // Открываем модальное окно
                            >
                                Register Now
                            </button>
                            {/* Показать галочку, если событие зарегистрировано */}
                            {registeredEvents.some((registeredEvent) => registeredEvent.id === event.id) && (
                                <p className="registered-message">
                                    <span role="img" aria-label="checkmark">✔️</span> You are registered for this event!
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Модальное окно для регистрации на мероприятие */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Register for {selectedEvent.title}</h2>
                        <p><strong>Date:</strong> {selectedEvent.date}</p>
                        <p>{selectedEvent.description}</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="modal-button">Register</button>
                        </form>
                        <button className="close-modal" onClick={handleCloseModal}>X</button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Main;
