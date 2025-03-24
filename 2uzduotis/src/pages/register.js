// src/pages/register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setDetails({ ...details, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (details.username && details.password) {
      // POST request to save the new user in json-server
      fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details)
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to register user');
          }
          return res.json();
        })
        .then((data) => {
          // Optionally, you can log the returned data
          console.log('User registered:', data);
          // Redirect to login page after successful registration
          navigate('/login');
        })
        .catch((err) => {
          console.error(err);
          setError('Registration failed. Please try again.');
        });
    } else {
      setError('Please fill in both username and password.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '10px' }}>
          <label>Username: </label>
          <input type="text" name="username" value={details.username} onChange={handleChange} />
        </div>
        <div style={{ margin: '10px' }}>
          <label>Password: </label>
          <input type="password" name="password" value={details.password} onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default Register;
