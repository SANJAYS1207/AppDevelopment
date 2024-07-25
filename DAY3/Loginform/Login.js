import React, { useState } from 'react';
import './Login.css';

const Login = ({ switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Assuming a basic validation for the password length
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (email === "" || password === "") {
      setError("Enter Details Correctly");
      return;
    }
    if (!validateEmail(email)) {
      setError("Email is invalid");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password is invalid");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/users");
      const users = await response.json();

      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        alert("Login Success");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='logined'>
      <div id="login-container" className="container">
        <h2 id="login-heading" className="heading">Login</h2>
        {error && <p id="login-error" className="error">{error}</p>}
        <form id="login-form" className="form" onSubmit={handleLogin}>
          <input
            id="login-email"
            className="input"
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="login-password"
            className="input"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button id="login-button" className="button">Login</button>
        </form>
        <p id='para'>
          Don't have an account?{' '}
          <span className='switch' onClick={switchToRegister}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
