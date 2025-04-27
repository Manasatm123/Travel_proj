import React, { useState } from "react";
import "../CSS/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3005/api/login', formData);

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        alert('Successfully logged in!');
        navigate('/'); // Redirect to homepage or dashboard
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please try again.');
    }
  }

  return (
    <div className="login">
      {/* <img src="login-bg.png" alt="login" className="login__img" /> */}
      <form onSubmit={handleSubmit} className="login__form">
        <h1 className="login__title">Login</h1>

        {error && <p className="login__error">{error}</p>}

        <div className="login__content">
          <div className="login__box">
            <i className="bx bx-user login__icon"></i>
            <div className="login__box-input">
              <input
                type="email"
                name="email"
                required
                className="login__input"
                placeholder=""
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <label className="login__label">Username</label>
            </div>
          </div>

          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>
            <div className="login__box-input">
              <input
                type={showPassword ? "text" : "password"}
                name="pass"
                required
                className="login__input"
                id="login-pass"
                placeholder=""
                value={formData.pass}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <label className="login__label">Password</label>
              <i
                className={`login__eye ${showPassword ? "ri-eye-line" : "ri-eye-off-line"}`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>
        </div>

        <div className="login__check">
          <div className="login__check-group">
            <input type="checkbox" className="login__check-input" />
            <label className="login__check-label">Remember me</label>
          </div>
          <a href="/forgotpwd" className="login__forgot">Forgot Password?</a>
        </div>

        <button type="submit" className="login__button">Login</button>

        <p className="login__register">
          Don't have an account?{" "}
          <a href="/VerifyEmail" onClick={(e) => { e.preventDefault(); navigate('/emailverify'); }}>
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
