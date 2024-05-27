import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    role: 'buyer',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', formData);
      alert('Registration successful');
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
      <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required />
      <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required />
      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}
