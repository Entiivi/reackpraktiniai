// src/pages/dashboard.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import RecipeList from '../components/recipelist';
import '../css/dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <h2>Dashboard</h2>
        <div>
          <span className="welcome">Welcome, {user?.username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="dashboard-nav">
        <Link to="/favorites">Favorites</Link>
        <Link to="/usersearch">3 uzduotis</Link>
        {/* Add other links if needed */}
      </nav>

      {/* Recipe List Component */}
      <div className="dashboard-content">
        <RecipeList />
      </div>
    </div>
  );
};

export default Dashboard;
