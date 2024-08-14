import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PropertyForm.css';

const PropertyForm = () => {
  const [property, setProperty] = useState({
    type: '',
    image: '',
    sqft: '',
    location: '',
    contact: '',
    details: '',
    forsale: null,
    forrent: null,
    saleDate: '',
    amount: '',
    rentDate: '',
    startDate: '',
    endDate: '',
    rentPerMonth: '',
    user_id: ''
  });

  useEffect(() => {
    // Retrieve the userDetails from local storage and extract the user_id
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    if (storedUserDetails && storedUserDetails.id) {
      console.log(storedUserDetails.id);
      setProperty(prev => ({ ...prev, user_id: storedUserDetails.id }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle the property status field
    if (name === 'forsale') {
      setProperty(prev => ({
        ...prev,
        forsale: value === 'true',
        forrent: value === 'false' ? true : false
      }));
    } else if (name === 'forrent') {
      setProperty(prev => ({
        ...prev,
        forrent: value === 'true',
        forsale: value === 'false' ? true : false
      }));
    } else {
      setProperty(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Property added");

    try {
      const response = await axios.post(`http://127.0.0.1:1111/property/${property.user_id}`, property, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Property added:', response.data);
      // Reset form or redirect after successful submission
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Type:</label>
        <input className="form-input" type="text" name="type" value={property.type} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label">Image URL:</label>
        <input className="form-input" type="text" name="image" value={property.image} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label">Square Footage:</label>
        <input className="form-input" type="text" name="sqft" value={property.sqft} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label">Location:</label>
        <input className="form-input" type="text" name="location" value={property.location} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label">Contact:</label>
        <input className="form-input" type="text" name="contact" value={property.contact} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label className="form-label">Details:</label>
        <textarea className="form-textarea" name="details" value={property.details} onChange={handleChange} required></textarea>
      </div>

      <div className="form-group">
        <label className="form-label">Property Status:</label>
        <select className="form-select" name="forsale" onChange={handleChange} required>
          <option value="">Select</option>
          <option value="true">For Sale</option>
          <option value="false">For Rent</option>
        </select>
      </div>

      {property.forsale && (
        <>
          <div className="form-group">
            <label className="form-label">Sale Date:</label>
            <input className="form-input" type="date" name="saleDate" value={property.saleDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Amount:</label>
            <input className="form-input" type="number" name="amount" value={property.amount} onChange={handleChange} />
          </div>
        </>
      )}

      {property.forrent && (
        <>
          <div className="form-group">
            <label className="form-label">Rent Date:</label>
            <input className="form-input" type="date" name="rentDate" value={property.rentDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Start Date:</label>
            <input className="form-input" type="date" name="startDate" value={property.startDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">End Date:</label>
            <input className="form-input" type="date" name="endDate" value={property.endDate} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Rent per Month:</label>
            <input className="form-input" type="number" name="rentPerMonth" value={property.rentPerMonth} onChange={handleChange} />
          </div>
        </>
      )}

      <button className="form-button" type="submit">Add Property</button>
    </form>
  );
};

export default PropertyForm;
