import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        return password.length>=8;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (firstName === '') {
            setError("Firstname should not be null");
            return;
        }
        if (lastName === '') {
            setError("Lastname should not be null");
            return;
        }
        if (!validateEmail(email)) {
            setError("Invalid email format");
            return;
        }
        if (!validatePassword(password)) {
            setError("Password is invalid");
            return;
        }
        if (password !== confirmpassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            await axios.post('http://localhost:3002/users', {
                firstName,
                lastName,
                email,
                password,
            });
            alert("Registration Successful");
            navigate("/");
        } catch (err) {
            setError("Error registering user. Please try again.");
        }
    };

    return (
        <div className='register_body'>
            <div id='register-container'>
                <h2 id='register-heading'>Register</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form id='register-form' onSubmit={handleSubmit}>
                    <input id='register-inputs'
                        type='text'
                        placeholder='First Name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input id='register-inputs'
                        type='text'
                        placeholder='Last Name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <input id='register-inputs'
                        type='text'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input id='register-inputs'
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input id='register-inputs'
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmpassword}
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
                    <button>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
