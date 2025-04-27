import React, { useState } from "react";
import "../CSS/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: localStorage.getItem('email') || '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.');
      return;
    }

    if (formData.phone.length !== 10 || isNaN(formData.phone)) {
      setError('Phone number must be exactly 10 digits.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3005/api/addUser', {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      if (response.status === 201) {
        setSuccess('Registration successful!');
        alert('Registration Successful!');
        navigate('/'); // Redirect to Login
      } else {
        setError(response.data.message || 'Registration failed. Try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login">
      {/* <img src="login-bg.png" alt="register" className="login__img" /> */}
      <form onSubmit={handleSubmit} className="login__form">
        <h1 className="login__title">Register</h1>

        {error && <p className="login__error">{error}</p>}
        {success && <p className="login__success">{success}</p>}

        <div className="login__content">

          {/* Username */}
          <div className="login__box">
            <i className="bx bx-user login__icon"></i>
            <div className="login__box-input">
              <input
                type="text"
                name="username"
                required
                className="login__input"
                placeholder=""
                value={formData.username}
                onChange={handleChange}
              />
              <label className="login__label">Username</label>
            </div>
          </div>

          {/* Email */}
          <div className="login__box">
            <i className="bx bx-envelope login__icon"></i>
            <div className="login__box-input">
              <input
                type="email"
                name="email"
                required
                className="login__input"
                placeholder=""
                value={formData.email}
                onChange={handleChange}
                disabled
              />
              <label className="login__label">Email</label>
            </div>
          </div>

          {/* Phone */}
          <div className="login__box">
            <i className="bx bx-phone login__icon"></i>
            <div className="login__box-input">
              <input
                type="tel"
                name="phone"
                required
                className="login__input"
                placeholder=""
                value={formData.phone}
                onChange={handleChange}
              />
              <label className="login__label">Phone</label>
            </div>
          </div>

          {/* Password */}
          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>
            <div className="login__box-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="login__input"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
              />
              <label className="login__label">Password</label>
              <i
                className={`login__eye ${showPassword ? "ri-eye-line" : "ri-eye-off-line"}`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>
            <div className="login__box-input">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                required
                className="login__input"
                placeholder=""
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <label className="login__label">Confirm Password</label>
              <i
                className={`login__eye ${showPassword ? "ri-eye-line" : "ri-eye-off-line"}`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>

        </div>

        <button type="submit" className="login__button">Register</button>

        <p className="login__register">
          Already have an account?{" "}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;

