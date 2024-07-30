import React, { useState, useEffect } from 'react';
import './Sell.css';
import axios from 'axios';

const Sell = () => {
  const [property, setProperty] = useState({
    type: '',
    image: '',
    sqft: '',
    location: '',
    contact: '',
    details: ''
  });
  const [maxId, setMaxId] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/properties');
        const properties = response.data;
        const maxId = properties.reduce((max, property) => (property.id > max ? property.id : max), 0);
        setMaxId(maxId);
      } catch (error) {
        console.error('There was an error fetching the properties!', error);
      }
    };

    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/properties', {
        ...property,
        id: maxId + 1
      });
      console.log('Property added:', response.data);
      setProperty({
        type: '',
        image: '',
        sqft: '',
        location: '',
        contact: '',
        details: ''
      });
      setMaxId(maxId + 1);
    } catch (error) {
      console.error('There was an error adding the property!', error);
    }
  };

  return (
    <div className='sell-div'>
      <h2>Sell Your Property</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={property.type}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={property.image}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Square Footage:</label>
          <input
            type="text"
            name="sqft"
            value={property.sqft}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            value={property.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Details:</label>
          <input
            type='text'
            name="details"
            value={property.details}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Sell;
