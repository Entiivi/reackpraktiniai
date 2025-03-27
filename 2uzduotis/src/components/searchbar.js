import React from 'react';

const SearchBar = React.memo(({ searchTerm, onSearchChange, onClearSearch }) => {
  return (
    <div className="search-bar" style={styles.container}>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search by name..."
        onChange={onSearchChange}
        style={styles.input}
      />
      <button onClick={onClearSearch} style={styles.clearButton}>
        Clear search
      </button>
    </div>
  );
});

const styles = {
  container: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    padding: '8px',
    fontSize: '1rem',
    width: '60%',
    maxWidth: '300px',
    border: '1px solid #7D0A0A',
    borderRadius: '4px',
    marginRight: '10px',
  },
  clearButton: {
    padding: '8px 12px',
    fontSize: '1rem',
    backgroundColor: '#BF3131',
    color: '#EEEEEE',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default SearchBar;
