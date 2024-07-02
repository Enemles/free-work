'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const UserProfile = ({ params }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = params;
  const defaultAvatar = '/images/default-avatar.png';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/profile/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfile();
  }, [id]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!profile) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      <h1>
        Profil de {profile.firstName} {profile.lastName}
      </h1>
      <p>Bio: {profile.bio}</p>
      <p>Location: {profile.location}</p>
      <Image src={profile.profilePictureUrl || defaultAvatar} alt="" width={50} height={50} />
      <div>
        <h2>Followers ({profile.followers.length})</h2>
        <ul>
          {profile.followers.map((follower) => (
            <li key={follower.id}>
              <a href={`/profile/${follower.id}`}>
                {follower.firstName} {follower.lastName}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Following ({profile.following.length})</h2>
        <ul>
          {profile.following.map((following) => (
            <li key={following.id}>
              <a href={`/profile/${following.id}`}>
                {following.firstName} {following.lastName}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
