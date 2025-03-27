import React from 'react';
import '../css/userlist.css';

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>City:</strong> {user.address?.city}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Company:</strong> {user.company?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
