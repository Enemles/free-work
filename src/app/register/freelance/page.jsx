'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterFreelance() {
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    profilePictureUrl: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register/freelance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push('/api/auth/signin');
      } else {
        console.error('Failed to register');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Register as Freelance</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} required></textarea>
        <input type="text" name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
        <input type="text" name="profilePictureUrl" placeholder="Profile Picture URL" value={form.profilePictureUrl} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
