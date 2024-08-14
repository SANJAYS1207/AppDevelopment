import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./../../userpage/properties/Properties.css"; // Ensure this path is correct

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:1111/property')
      .then(response => {
        console.log('Fetched data', response.data);
        setProperties(response.data);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
        setError('Error fetching properties.');
      });
  }, []);

  const handleDelete = (propertyId) => {
    axios.delete(`http://localhost:1111/property/${propertyId}`)
      .then(() => {
        // Update state to remove deleted property
        setProperties(properties.filter(property => property.id !== propertyId));
        alert('Property deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting property:', error);
        setError('Error deleting property.');
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
    <div className="buy-container">
      <h1>Manage Properties</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="properties-list">
        {properties.map(property => (
          <div className="property-card" key={property.id}>
            <img src={property.image} alt={property.type} />
            <h2>{property.type}</h2>
            <p>{property.sqft}</p>
            <p>{property.location}</p>
            <button 
              onClick={() => handleDelete(property.id)} 
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

export default ManageProperties;
