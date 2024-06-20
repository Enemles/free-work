'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const Profile = () => {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    profilePictureUrl: '',
    role: '',
    followers: [],
    following: [],
  });
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile');
      if (!res.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await res.json();
      setProfile({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        bio: data.bio || '',
        location: data.location || '',
        profilePictureUrl: data.profilePictureUrl || '',
        role: data.role || '',
        followers: data.followers || [],
        following: data.following || [],
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
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
      setProfile({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        bio: data.bio || '',
        location: data.location || '',
        profilePictureUrl: data.profilePictureUrl || '',
        role: data.role || '',
        followers: data.followers || [],
        following: data.following || [],
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFollow = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}/follow`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Failed to follow user');
      }
      fetchProfile();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}/unfollow`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Failed to unfollow user');
      }
      fetchProfile();
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
      <form className="text-black" onSubmit={handleSubmit}>
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
          <textarea name="bio" value={profile.bio} onChange={handleChange} />
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
        <div>
          <label>Rôle</label>
          <select name="role" value={profile.role} onChange={handleChange}>
            <option value="">Sélectionner un rôle</option>
            <option value="freelance">Freelance</option>
            <option value="client">Client</option>
          </select>
        </div>
        <button type="submit">Enregistrer</button>
      </form>

      <div>
        <h2>Followers ({profile.followers.length})</h2>
        <ul>
          {profile.followers.map((follower) => (
            <li key={follower.id}>
              <Link href={`/profile/${follower.id}`}>
                {follower.firstName} {follower.lastName}
              </Link>
              {profile.following.some(f => f.id === follower.id) ? (
                <button onClick={() => handleUnfollow(follower.id)}>Arrêter de suivre</button>
              ) : (
                <button onClick={() => handleFollow(follower.id)}>Suivre</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Following ({profile.following.length})</h2>
        <ul>
          {profile.following.map((following) => (
            <li key={following.id}>
              <Link href={`/profile/${following.id}`}>
                {following.firstName} {following.lastName}
              </Link>
              <button onClick={() => handleUnfollow(following.id)}>
                Arrêter de suivre
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
