import React, { useState } from "react";
// import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login">
      <img src="login-bg.png" alt="login" className="login__img" />
      <form className="login__form">
        <h1 className="login__title">Login</h1>

        <div className="login__content">
          <div className="login__box">
            <i className="bx bx-user login__icon"></i>
            <div className="login__box-input">
              <input type="email" required className="login__input" placeholder="" />
              <label className="login__label">Username</label>
            </div>
          </div>

          <div className="login__box">
            <i className="ri-lock-2-line login__icon"></i>
            <div className="login__box-input">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="login__input"
                id="login-pass"
                placeholder=""
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
          <a href="#" className="login__forgot">Forgot Password?</a>
        </div>

        <button type="submit" className="login__button">Login</button>

        <p className="login__register">
          Don't have an account? <a href="#">Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
