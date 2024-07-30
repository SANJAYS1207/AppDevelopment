import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Manage.css';  // Make sure to import your CSS file

const Manage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:3001/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties', error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/properties/${id}`);
      setProperties(properties.filter(property => property.id !== id));
    } catch (error) {
      console.error('Error deleting property', error);
    }
  };

  return (
    <div>
      <h1 className='manage-header'>Manage Properties</h1>
      <ul  style={{ listStyleType: 'none', padding: 0 }}>
        {properties.map(property => (
          <li key={property.id}>
            <div className="manage-container">
              <img src={property.image} alt={property.type} />
              <span>{property.type}</span>
              <button className="manage-button" onClick={() => deleteProperty(property.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Manage;
