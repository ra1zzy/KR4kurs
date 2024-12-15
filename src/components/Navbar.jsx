import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Подключаем контекст
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import userIcon from '../assets/user-icon.png';

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Используем контекст
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLogInOpen, setIsLogInOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [signUpForm, setSignUpForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const openSignUp = () => setIsSignUpOpen(true);
    const openLogIn = () => setIsLogInOpen(true);
    const closeSignUp = () => setIsSignUpOpen(false);
    const closeLogIn = () => setIsLogInOpen(false);

    const handleInputChange = (e, formSetter) => {
        const { name, value, type, checked } = e.target;
        formSetter(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleLogInSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginForm),
            });
                
            const data = await response.json();
            if (response.ok) {
                console.log('Login successful:', data);
                setIsAuthenticated(true);
                closeLogIn();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signUpForm),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Sign-up successful:', data);
                setIsAuthenticated(true);
                closeSignUp();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error during sign-up:', error);
        }
    };

    const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

    return (
        <nav className="navbar">
            {/* Левая часть */}
            <div className="navbar-left">
                <img src={logo} alt="Logo" className="navbar-logo" />
                <h1 className="navbar-title">Educate</h1>
            </div>

            {/* Центральная часть */}
            <div className="navbar-center">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/courses" className="navbar-link">Courses</Link>
                <Link to="/about" className="navbar-link">About</Link>
            </div>

            {/* Правая часть */}
            <div className="navbar-right">
                {isAuthenticated ? (
                    <div className="profile-menu">
                        <img
                            src={userIcon}
                            alt="User"
                            className="profile-icon"
                            onClick={toggleProfileMenu}
                        />
                        {isProfileOpen && (
                            <div className="dropdown-menu">
                                <Link to="/profile" className="dropdown-link">Profile</Link>
                                <button
                                    className="dropdown-link"
                                    onClick={() => setIsAuthenticated(false)}
                                >
                                    Log out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button className="navbar-button" onClick={openSignUp}>Sign up</button>
                        <button className="navbar-button" onClick={openLogIn}>Log in</button>
                    </>
                )}
            </div>
            {/* Модальное окно регистрации */}
            {isSignUpOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSignUpSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={signUpForm.name}
                                    onChange={(e) => handleInputChange(e, setSignUpForm)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={signUpForm.email}
                                    onChange={(e) => handleInputChange(e, setSignUpForm)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={signUpForm.password}
                                    onChange={(e) => handleInputChange(e, setSignUpForm)}
                                    required
                                />
                            </div>
                            <button type="submit" className="modal-button">Sign Up</button>
                        </form>
                        <button className="close-modal" onClick={closeSignUp}>X</button>
                    </div>
                </div>
            )}

            {/* Модальное окно входа */}
            {isLogInOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Log In</h2>
                        <form onSubmit={handleLogInSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={loginForm.email}
                                    onChange={(e) => handleInputChange(e, setLoginForm)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={loginForm.password}
                                    onChange={(e) => handleInputChange(e, setLoginForm)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className='checkbox-form'>
                                    <div className='remember-me'>
                                     Remember me 
                                     </div>
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={loginForm.rememberMe}
                                        onChange={(e) => handleInputChange(e, setLoginForm)}
                                    />
                                </label>
                            </div>
                            <button type="submit" className="modal-button">Log In</button>
                        </form>
                        <button className="close-modal" onClick={closeLogIn}>X</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
