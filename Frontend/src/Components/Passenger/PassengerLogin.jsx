import React, { useState } from 'react';
import './PassengerLogin.css';
import passengerLoginImg from '../../assets/passlogin.png';
import { useNavigate } from 'react-router-dom';

const PassengerLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const isFormValid = formData.email && formData.password;

    return (
        <div className="passenger-login">
            {/* Left Section: Illustration */}
            <div className="passenger-login__illustration-container">
                <img
                    src={passengerLoginImg}
                    alt="Airport Terminal"
                    className="passenger-login__illustration"
                />
                <div className="passenger-login__overlay"></div>
            </div>

            {/* Right Section: Login Form */}
            <div className="passenger-login__form-container">
                <button className="passenger-login__back-btn" aria-label="Go back">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                </button>

                <div className="passenger-login__card">
                    <h2 className="passenger-login__title">Welcome Back</h2>
                    <p className="passenger-login__subtitle">
                        Login to track your flights
                    </p>

                    <form className="passenger-login__form" onSubmit={(e) => e.preventDefault()}>
                        {/* Email Address */}
                        <div className="passenger-login__input-group">
                            <span className="passenger-login__icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                </svg>
                            </span>
                            <input
                                type="email"
                                name="email"
                                className="passenger-login__input"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <div className="passenger-login__focus-ring"></div>
                        </div>

                        {/* Password */}
                        <div className="passenger-login__input-group">
                            <span className="passenger-login__icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </span>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className="passenger-login__input"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="passenger-login__toggle-password"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                )}
                            </button>
                            <div className="passenger-login__focus-ring"></div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="passenger-login__options">
                            <label className="passenger-login__remember-me">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleChange}
                                    className="passenger-login__checkbox"
                                />
                                Remember Me
                            </label>
                            <a href="/forgot-password" className="passenger-login__forgot-link">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className={`passenger-login__submit-btn ${!isFormValid ? 'passenger-login__submit-btn--disabled' : ''
                                }`}
                            disabled={!isFormValid}
                            onClick={()=>(
                                useNavigate("/passenger/login")
                            )}
                        >
                            Login
                        </button>
                    </form>

                    <p className="passenger-login__footer">
                        Don’t have an account? <a href="/register">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PassengerLogin;
