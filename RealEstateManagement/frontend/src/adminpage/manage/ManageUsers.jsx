import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./ManageUsers.css";


const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:1111/api/users/getusers')
      .then(response => {
        console.log('Fetched users data', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError('Error fetching users.');
      });
  }, []);

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:1111/api/users/${userId}`)
      .then(() => {
        // Update state to remove deleted user
        setUsers(users.filter(user => user.id !== userId));
        alert('User deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        setError('Error deleting user.');
      });
  };

  // Define inline styles
  const deleteButtonStyle = {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    cursor: 'pointer',
    borderRadius: '4px',
    fontSize: '14px',
    marginTop: '8px',
  };

  return (
    <div className="users-container">
      <h1 className='user-h1'>Manage Users</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="users-list">
        {users.map(user => (
          <div className="user-card" key={user.id}>
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phoneNumber}</p>
            <button 
              onClick={() => handleDelete(user.id)} 
              style={deleteButtonStyle} // Apply inline styles here
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
