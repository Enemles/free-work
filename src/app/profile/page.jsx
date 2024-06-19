"use client";
import { useState, useEffect } from 'react';
import { getSession, useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    profilePictureUrl: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (session) {
      fetchProfile();
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
      setProfile(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!session) {
    return <p>Vous devez être connecté pour accéder à cette page.</p>;
  }

  return (
    <div>
      <h1>Mon Profil</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className='text-black' onSubmit={handleSubmit}>
        <div>
          <label>Prénom</label>
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nom</label>
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
          <label>Photo de Profil (URL)</label>
          <input
            type="text"
            name="profilePictureUrl"
            value={profile.profilePictureUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default Profile;
