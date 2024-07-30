import React, { useState, useEffect } from 'react';
import './Buy.css';

const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/properties')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data', data);
        setProperties(data);
      })
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  const handlePropertyClick = (property) => {
    console.log('Selected property', property);
    setSelectedProperty(property);
  };

  const closeDetails = () => {
    console.log('Closing details');
    setSelectedProperty(null);
  };

  return (
    <div className="buy-container">
      <div className={selectedProperty ? 'blur-background' : ''}>
      <h1>Properties for Sale</h1>
        <div className="properties-list">
          {properties.map(property => (
            <div className="property-card" key={property.id} onClick={() => handlePropertyClick(property)}>
              <img src={property.image} alt={property.type} />
              <h2>{property.type}</h2>
              <p>{property.sqft}</p>
              <p>{property.location}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedProperty && (
        <div className="property-details">
          <button onClick={closeDetails}>X</button>
          <h2>{selectedProperty.type}</h2>
          <img src={selectedProperty.image} alt={selectedProperty.type} />
          <p><strong>Square Footage:</strong> {selectedProperty.sqft}</p>
          <p><strong>Location:</strong> {selectedProperty.location}</p>
          <p><strong>Contact:</strong> {selectedProperty.contact}</p>
          <p><strong>Details:</strong> {selectedProperty.details}</p>
        </div>
      )}
    </div>
  );
};

export default Buy;
