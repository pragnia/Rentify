import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await axios.get('/api/properties', { params: filters });
      setProperties(data);
    };

    fetchProperties();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleInterestedClick = async (propertyId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to view seller details');
      window.location.href = '/login';
      return;
    }

    try {
      const { data } = await axios.get(`/api/properties/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`Seller details: ${data.seller.email}`);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch seller details');
    }
  };

  return (
    <div>
      <div>
        <input name="place" placeholder="Place" onChange={handleFilterChange} />
        <input name="bedrooms" type="number" placeholder="Bedrooms" onChange={handleFilterChange} />
        <input name="bathrooms" type="number" placeholder="Bathrooms" onChange={handleFilterChange} />
        <button onClick={() => setFilters({})}>Reset Filters</button>
      </div>
      <div>
        {properties.map((property) => (
          <div key={property._id}>
            <h3>{property.title}</h3>
            <p>{property.description}</p>
            <button onClick={() => handleInterestedClick(property._id)}>I'm Interested</button>
          </div>
        ))}
      </div>
    </div>
  );
}
