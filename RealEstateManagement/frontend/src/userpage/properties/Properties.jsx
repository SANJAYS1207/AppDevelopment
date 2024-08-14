import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Properties.css';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [paymentPhone, setPaymentPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:1111/property')
      .then(response => {
        console.log('Fetched data', response.data);
        setProperties(response.data);
      })
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  const handlePropertyClick = (property) => {
    console.log('Selected property', property);
    setSelectedProperty(property);
  };

  const closeDetails = () => {
    setPaymentDone(false);
    console.log('Closing details');
    setSelectedProperty(null);
    setPhoneError('');
  };

  const handlePayment = () => {
    if (validatePhoneNumber(paymentPhone)) {
      alert('Payment succeeded!');
      setPaymentDone(true);
      setPhoneError('');
    } else {
      setPhoneError('Please enter a valid 10-digit phone number.');
    }
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e) => {
    setPaymentPhone(e.target.value);
  };

  return (
    <div className="buy-container">
      <div className={selectedProperty ? 'blur-background' : ''}>
        <h1>Properties</h1>
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
          <button className="close-btn" onClick={closeDetails}>X</button>
          <h2>{selectedProperty.type}</h2>
          <img src={selectedProperty.image} alt={selectedProperty.type} />
          <p><strong>Square Footage:</strong> {selectedProperty.sqft}</p>
          <p><strong>Details:</strong> {selectedProperty.details}</p>
          {!paymentDone ? (
            <div className="payment-section">
              <p className="payment-message">Pay to see the location:</p>
              <input
                type="text"
                value={paymentPhone}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
              />
              {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
              <button onClick={handlePayment} className="paynow-btn">Pay Now</button>
            </div>
          ) : (
            <div className="location-revealed">
              <p><strong>Location:</strong> {selectedProperty.location}</p>
              <p><strong>Contact:</strong> {selectedProperty.contact}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Properties;
