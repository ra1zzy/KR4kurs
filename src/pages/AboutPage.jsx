import React, { useState } from 'react'; // Импортируйте useState
import './AboutPage.css'; // Для подключения внешнего CSS файла


const AboutPage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия/закрытия модального окна
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const reviews = [
        {
            name: 'Anna S.',
            role: 'Data Analyst',
            avatar: '/assets/avatar-anna.png',
            comment: 'I never thought online learning could be so effective until I took my first course here. The lessons were clear, the instructors were so helpful, and I was able to apply what I learned right away in my job. I now have the skills I need to advance in my career, and I can’t wait to take my next course!',
            date: '2024-12-01',
        },
        {
            name: 'John D.',
            role: 'Marketing Specialist',
            avatar: '/assets/avatar-john.png',
            comment: 'I’ve taken many online courses, but none were as engaging and well-structured as the ones offered here. The platform is easy to use, and the courses are packed with valuable information. The instructor was patient and thorough, and I loved how interactive the lessons were. This course was a game-changer for my career!',
            date: '2024-12-02',
        },
        {
            name: 'Maria P.',
            role: 'Graphic Designer',
            avatar: '/assets/avatar-maria.png',
            comment: 'I’ve been a designer for years, but this course taught me things I didn’t even know I needed to know! The hands-on approach really helped me understand the concepts, and I feel much more confident in my work. I highly recommend this platform to anyone looking to enhance their skills.',
            date: '2024-12-03',
        },
        {
            name: 'James L.',
            role: 'Software Engineer',
            avatar: '/assets/avatar-john.png',
            comment: 'The courses here have been fantastic! The interactive lessons kept me engaged, and I could apply the knowledge in real-world scenarios. The instructors are incredibly knowledgeable, and I love the community support offered throughout the course.',
            date: '2024-12-04',
        },
        {
            name: 'Emily T.',
            role: 'Product Manager',
            avatar: '/assets/avatar-anna.png',
            comment: 'I have taken several courses on this platform, and each one has been excellent. The structure is clear, and the content is presented in a way that is easy to understand and apply. The practical examples made the learning process much more enjoyable.',
            date: '2024-12-05',
        },
        {
            name: 'David M.',
            role: 'Web Developer',
            avatar: '/assets/avatar-john.png',
            comment: 'These courses are top-notch. They provide real-world examples and the instructors are approachable and helpful. I gained skills that helped me land a new job, and I can’t thank the platform enough for that!',
            date: '2024-12-06',
        },
    ];

    // Функция для изменения данных формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Функция для отправки формы (можно подключить API или логику)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Очистить форму и закрыть окно после отправки
        setFormData({ name: '', email: '', phone: '', password: '' });
        setIsModalOpen(false);
    };

    return (
        <div className="about-container">
            <h2 className="about-title">About Us</h2>
            <div className="about-content">
                <p className="about-text">
                    Welcome to our Online Education Platform! At the heart of what we do is a simple belief: learning should be accessible, engaging, and transformative. We are committed to making high-quality education available to everyone, no matter where you are in your journey. Whether you're taking your first steps into a new field or advancing your existing skills, we have the right course for you.
                </p>
                <p className="about-text">
                    Our platform is designed to provide you with an immersive learning experience. You won’t just watch lessons—you'll actively engage with the material through interactive exercises, real-life projects, and hands-on tutorials. With expert instructors by your side, you can be sure you're getting top-notch education that’s both practical and applicable. We also pride ourselves on our vibrant community of learners, where you can share experiences, ask questions, and build valuable connections.
                </p>
                <p className="about-text">
                    Whether you are just starting out or already an expert, we cater to all levels. From programming to digital marketing, data science to design, our diverse range of courses covers every aspect of modern education. Our goal is to ensure that you gain not just theoretical knowledge but real-world skills that will help you thrive in your career and personal projects.
                </p>
                <p className="about-text">
                    Over the years, we’ve helped thousands of learners achieve their goals. Many have made successful career transitions, launched their own businesses, and achieved promotions—all thanks to the skills they’ve developed on our platform. We’ve seen firsthand how education can change lives, and we are proud to be a part of that journey.
                </p>
                <p className="about-text">
                    Here’s what some of our students have to say:
                </p>
            </div>

            {/* Call to Action Section */}
            <div className="cta-container">
                <p className="cta-text">
                    Ready to start your learning journey? Join us today and unlock new career opportunities.
                </p>
                <button className="cta-button" onClick={() => setIsModalOpen(true)}>Sign Up Now</button>
            </div>

            {/* Partners Section */}
            <div className="partners">
                <h3>Our Trusted Partners</h3>
                <div className="partner-logos">
                    <img src="/assets/partner1.png" alt="Partner 1" />
                    <img src="/assets/partner2.png" alt="Partner 2" />
                    <img src="/assets/partner3.png" alt="Partner 3" />
                </div>
            </div>

            {/* Модальное окно с регистрацией */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Register</h2>
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
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="modal-button">Register</button>
                        </form>
                        <p className="login-link">
                            Already have an account? <a href="/login">Log In</a>
                        </p>
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>X</button>
                    </div>
                </div>
            )}

            {/* Achievements Section */}
            <div className="achievements">
                <h3>Our Achievements</h3>
                <div className="achievements-stats">
                    <div className="stat-item">
                        <h4>10,000+</h4>
                        <p>Students Enrolled</p>
                    </div>
                    <div className="stat-item">
                        <h4>95%</h4>
                        <p>Course Completion Rate</p>
                    </div>
                    <div className="stat-item">
                        <h4>1,000+</h4>
                        <p>Successful Graduates</p>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <h3>What Our Students Say</h3>
            <div className="reviews">
                {reviews.map((review, index) => (
                    <div key={index} className="review">
                        <div className="review-header">
                            <img src={review.avatar} alt={review.name} className="review-avatar" />
                            <div className="review-author">
                                <h4>{review.name}</h4>
                                <p className="role">{review.role}</p>
                            </div>
                            <p className="review-date">{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                        <p className="review-comment">{review.comment}</p>
                    </div>
                ))}
            </div>
            {/* FAQ Section */}
            <div className="faq-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-item">
                    <h4>What courses do you offer?</h4>
                    <p>We offer a wide range of courses in programming, marketing, design, and more. You can check our full catalog on our Courses page.</p>
                </div>
                <div className="faq-item">
                    <h4>How long are the courses?</h4>
                    <p>Our courses vary in length, typically ranging from a few hours to several weeks, depending on the subject and depth of content.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
