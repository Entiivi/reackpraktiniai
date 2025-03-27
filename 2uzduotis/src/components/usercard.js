import React from 'react';

const UserCard = React.memo(({ user }) => {
  return (
    <div className="user-card" style={styles.card}>
      <h3 style={styles.name}>{user.name}</h3>
      <p style={styles.info}><strong>Email:</strong> {user.email}</p>
      <p style={styles.info}><strong>City:</strong> {user.address.city}</p>
    </div>
  );
});

const styles = {
  card: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #7D0A0A',
    borderRadius: '6px',
    padding: '10px',
    margin: '10px',
    width: 'calc(25% - 20px)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  name: {
    color: '#7D0A0A',
    margin: '0 0 10px 0',
  },
  info: {
    color: '#BF3131',
    fontSize: '0.9rem',
    margin: '4px 0',
  },
};

export default UserCard;
