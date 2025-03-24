// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () =>
{
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Our App!</h1>
            <p>Please login or register to continue.</p>
            <nav>
                <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </div>
    );
};

export default Home;
