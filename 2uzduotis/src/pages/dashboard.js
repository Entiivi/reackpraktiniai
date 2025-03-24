// src/pages/dashboard.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import RecipeList from '../components/recipelist';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Dashboard</h2>
        <div>
          <span>Welcome, {user?.username}!</span>
          <button onClick={handleLogout} style={{ marginLeft: '20px' }}>Logout</button>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{ margin: '20px 0' }}>
        <Link to="/favorites" style={{ marginRight: '20px' }}>Favorites</Link>
        {/* You could add other links if needed */}
      </nav>

      {/* Recipe List Component */}
      <div>
        <RecipeList />
      </div>
    </div>
  );
};

export default Dashboard;
