import React, { useState } from 'react';
import axios from 'axios';
import "../signin/RegisterForm.css"

const RegisterForm = ({ role, onRegisterSuccess, onhandleCancel }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Input validation
    let error = '';
    if (value.trim() === '') {
      error = 'This field is required';
    } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Please enter a valid email address';
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleRegister = () => {
    // Check for any remaining errors before submitting
    const hasErrors = Object.values(errors).some(error => error !== '');
    const isEmptyField = Object.values(userData).some(value => value.trim() === '');

    if (hasErrors || isEmptyField) {
      alert('Please fix the errors before submitting.');
      return;
    }

    // Only make the POST request if validation passes
    axios.post(`http://127.0.0.1:1111/api/users/register`, userData)
      .then(response => {
        console.log('User registered:', response.data);
        onRegisterSuccess();
      })
      .catch(error => {
        console.error('Error registering user:', error);
        alert('Registration failed. Please try again later.');
      });
  };

  const handleCancel = () => {
    // Directly call the onRegisterSuccess to go back to the login form
    onhandleCancel();
  };

  return (
    <div className="register-form-container">
      <h2 className="register-form-title">Register</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
        className="register-form-input"
      />
      {errors.email && <p className="error-message">{errors.email}</p>}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleChange}
        className="register-form-input"
      />
      {errors.password && <p className="error-message">{errors.password}</p>}
      <input
        type="text"
        name="firstname"
        placeholder="First Name"
        value={userData.firstname}
        onChange={handleChange}
        className="register-form-input"
      />
      {errors.firstname && <p className="error-message">{errors.firstname}</p>}
      <input
        type="text"
        name="lastname"
        placeholder="Last Name"
        value={userData.lastname}
        onChange={handleChange}
        className="register-form-input"
      />
      {errors.lastname && <p className="error-message">{errors.lastname}</p>}
      <button onClick={handleRegister} className="register-form-button">Register</button>
      <button onClick={handleCancel} className="register-form-button">Cancel</button>
    </div>
  );
};

export default RegisterForm;
