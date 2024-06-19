"use client";
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CompleteProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    profilePictureUrl: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setProfile({
        firstName: session.user.firstName || '',
        lastName: session.user.lastName || '',
        bio: session.user.bio || '',
        location: session.user.location || '',
        profilePictureUrl: session.user.profilePictureUrl || '',
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        throw new Error('Failed to update profile');
      }
      const data = await res.json();
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Complete Your Profile</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profile Picture URL</label>
          <input
            type="text"
            name="profilePictureUrl"
            value={profile.profilePictureUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
