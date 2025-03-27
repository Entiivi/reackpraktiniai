import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SearchBar from '../components/searchbar';
import UserList from '../components/userlist';
import { Link } from 'react-router-dom';
import '../css/usersearch.css';

const UserSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    // Fetch data from jsonplaceholder (returns 10 users)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        // Duplicate the data to simulate a large array (at least 100 users)
        const bigList = Array.from({ length: 10 }, (_, i) =>
          data.map((user) => ({
            ...user,
            id: user.id + i * data.length, // ensure unique id
          }))
        ).flat();
        setUsers(bigList);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // useMemo to compute filtered users only when users or searchTerm change
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  // Calculate pagination indexes based on filtered users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handlers for pagination
  const nextPage = () => {
    if (indexOfLastUser < filteredUsers.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // useCallback for stable search change handler
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page when search term changes
  }, []);

  // useCallback for clear search handler
  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
    setCurrentPage(1); // Reset page when clearing search
  }, []);

  if (loading)
    return (
      <div className="loading">Loading...</div>
    );

  return (
    <div className="user-search-page">
      <h2 className="page-title">User Search</h2>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
      />
      <UserList users={currentUsers} />
      <div className="pagination-container">
        <button onClick={prevPage} disabled={currentPage === 1} className="pagination-button">
          Atgal
        </button>
        <button onClick={nextPage} disabled={indexOfLastUser >= filteredUsers.length} className="pagination-button">
          Kitas
        </button>
      </div>
      <div className="back-link-container">
        <Link to="/dashboard" className="back-link">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default UserSearchPage;
