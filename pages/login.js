import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/login', formData);
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" required />
      <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
