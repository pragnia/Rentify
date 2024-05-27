import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function PostProperty() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    place: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    nearby: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('/api/properties', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Property posted successfully');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Failed to post property');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
      <input name="place" value={formData.place} onChange={handleChange} placeholder="Place" required />
      <input name="area" value={formData.area} onChange={handleChange} placeholder="Area" required />
      <input name="bedrooms" value={formData.bedrooms} onChange={handleChange} type="number" placeholder="Bedrooms" required />
      <input name="bathrooms" value={formData.bathrooms} onChange={handleChange} type="number" placeholder="Bathrooms" required />
      <textarea name="nearby" value={formData.nearby} onChange={handleChange} placeholder="Nearby facilities" required></textarea>
      <button type="submit">Post Property</button>
    </form>
  );
}
