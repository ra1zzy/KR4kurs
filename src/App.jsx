import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Main from './pages/Main';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import './App.css'; // добавьте общий CSS

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="app-container">
                <Sidebar />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/courses" element={<CoursesPage />} />
                        <Route path="/about" element={<AboutPage />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </Router>
    );
};

export default App;
