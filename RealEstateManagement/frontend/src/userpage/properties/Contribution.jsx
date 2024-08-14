import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contribution = () => {
  const [properties, setProperties] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const userDetailsString = localStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsString);
    setUserDetails(userDetails);
    if (userDetails && userDetails.properties) {
      setProperties(userDetails.properties);
    }
  }, []);

  const handleDelete = (propertyId) => {
    axios.delete(`http://127.0.0.1:1111/property/${propertyId}`)
      .then(() => {
        const filteredProperties = properties.filter(property => property.id !== propertyId);
        setProperties(filteredProperties);
        if (userDetails) {
          localStorage.setItem('userDetails', JSON.stringify({ ...userDetails, properties: filteredProperties }));
        }
      })
      .catch(error => {
        console.error('Error deleting property:', error);
      });
  };

  const handleUpdateClick = (property) => {
    setSelectedProperty(property);
    setShowUpdateForm(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setSelectedProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://127.0.0.1:1111/property/${selectedProperty.id}`, selectedProperty)
      .then(response => {
        const updatedProperties = properties.map(property => 
          property.id === selectedProperty.id ? response.data : property
        );
        setProperties(updatedProperties);
        setShowUpdateForm(false);
        if (userDetails) {
          localStorage.setItem('userDetails', JSON.stringify({ ...userDetails, properties: updatedProperties }));
        }
      })
      .catch(error => {
        console.error('Error updating property:', error);
      });
  };

  return (
    <div className="buy-container">
      <h1>My Properties</h1>
      <div>
        <div className="properties-list">
          {properties.length > 0 ? (
            properties.map(property => (
              <div className="property-card" key={property.id}>
                <img src={property.image} alt={property.type} />
                <h2>{property.type}</h2>
                <p>{property.sqft}</p>
                <p>{property.location}</p>
                <div className="property-actions">
                  <button 
                    className="update-btn" 
                    onClick={() => handleUpdateClick(property)} 
                    style={{ padding: '10px 20px', marginLeft: '0px' }}
                  >
                    Update
                  </button>
                  <button 
                    className="delete-btn"  
                    style={{ padding: '10px 20px', marginLeft: '209px', backgroundColor:'red' }} 
                    onClick={() => handleDelete(property.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No properties found for the current user.</p>
          )}
        </div>
      </div>

      {showUpdateForm && selectedProperty && (
        <div className="update-form-overlay">
          <form className="update-form" onSubmit={handleUpdateSubmit}>
            <h2>Update Property</h2>
            <div className="form-group">
              <label>Type:</label>
              <input type="text" name="type" value={selectedProperty.type} onChange={handleUpdateChange} required />
            </div>
            <div className="form-group">
              <label>Image URL:</label>
              <input type="text" name="image" value={selectedProperty.image} onChange={handleUpdateChange} required />
            </div>
            <div className="form-group">
              <label>Square Footage:</label>
              <input type="text" name="sqft" value={selectedProperty.sqft} onChange={handleUpdateChange} required />
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input type="text" name="location" value={selectedProperty.location} onChange={handleUpdateChange} required />
            </div>
            <div className="form-group">
              <label>Contact:</label>
              <input type="text" name="contact" value={selectedProperty.contact} onChange={handleUpdateChange} required />
            </div>
            <div className="form-group">
              <label>Details:</label>
              <textarea name="details" value={selectedProperty.details} onChange={handleUpdateChange} required></textarea>
            </div>
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={() => setShowUpdateForm(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Contribution;
