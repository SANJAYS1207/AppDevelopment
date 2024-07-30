import React, { useState, useEffect } from 'react';
import './Rent.css';

const initialProperties = [
  {
    id: 1,
    name: "Cozy Cottage",
    location: "Los Angeles, CA",
    price: "$2827/month",
    image: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A charming bungalow in a quiet neighborhood."
  },
  {
    id: 2,
    name: "Luxury Condo",
    location: "Chicago, IL",
    price: "$2284/month",
    image: "https://images.pexels.com/photos/1000057/pexels-photo-1000057.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A charming bungalow in a quiet neighborhood."
  },
  {
    id: 3,
    name: "Charming Bungalow",
    location: "Chicago, IL",
    price: "$2300/month",
    image: "https://images.pexels.com/photos/681331/pexels-photo-681331.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A modern apartment in the heart of the city."
  },
  {
    id: 4,
    name: "Modern Apartment",
    location: "New York, NY",
    price: "$3877/month",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A cozy cottage with a beautiful garden."
  },
  {
    id: 5,
    name: "Charming Bungalow",
    location: "Los Angeles, CA",
    price: "$3079/month",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=600",
    description: "A modern apartment in the heart of the city."
  }
];

const Rent = () => {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setProperties(initialProperties);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rent-page">
      <h1>Properties for Rent</h1>
      <input 
        type="text" 
        placeholder="Search properties..." 
        value={searchTerm} 
        onChange={handleSearch} 
        className="search-bar"
      />
      <div className="rent-property-list">
        {filteredProperties.map((property) => (
          <div className="rent-property-card" key={property.id}>
            <img src={property.image} alt={property.name} className="rent-property-image" />
            <div className="rent-property-details">
              <h2>{property.name}</h2>
              <p>{property.location}</p>
              <p>{property.price}</p>
              <p>{property.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rent;
