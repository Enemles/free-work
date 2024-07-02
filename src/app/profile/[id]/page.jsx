'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '../../components/Header';
import ButtonSubmit from '../../components/ButtonSubmit';
import { useSession } from 'next-auth/react';

const UserProfile = ({ params }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = params;
  const defaultAvatar = '/assets/images/default-avatar.png';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log(`Fetching profile for ID: ${id}`);
        const res = await fetch(`/api/profile/${id}`);
        console.log(`Response status: ${res.status}`);
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await res.json();
        console.log('Profile data fetched successfully:', data);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/profile/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        router.push('/profile');
      } else {
        throw new Error('Erreur lors de la mise à jour du profil');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div>
      <Header session={session} />
      <div className="container">
        <h1 className="text-[60px] flex justify-center">My profile</h1>
        <div className="h-[1px] relative top-[10px] translate-x-[-50%] left-[50%] bg-[black] w-[50%] mb-[60px]"></div>
        <div className="flex flex-col items-center mt-2 mb-10">
          <Image className="rounded-full margin-auto w-[100px] mb-4" src={profile.profilePictureUrl || defaultAvatar} alt="Profile Picture" width={100} height={100} />
          <div className="flex gap-5">
            <p>Created At: {new Date(profile.createdAt).toLocaleDateString()}</p>
            <p>Updated At: {new Date(profile.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
        <form onSubmit={handleUpdateProfile} className="flex flex-col gap-10">
          <div className="flex justify-between gap-5">
            <input type="text" placeholder="First Name" name="firstName" value={profile.firstName} onChange={handleChange} className="form-input w-[33%]" />
            <input type="text" placeholder="Last Name" name="lastName" value={profile.lastName} onChange={handleChange} className="form-input w-[33%]" />
            <input type="text" placeholder="Location" name="location" value={profile.location} onChange={handleChange} className="form-input w-[33%]" />
            <input type="text" placeholder="Email" name="Email" value={profile.email} onChange={handleChange} className="form-input w-[33%]" />
          </div>
          <div className="flex justify-between gap-5">
            <textarea placeholder="Bio" name="bio" value={profile.bio} onChange={handleChange} className="form-input w-[100%]" />
          </div>
          <div className="flex justify-between gap-5">
            <input type="number" placeholder="TJM" name="tjm" value={profile.tjm} onChange={handleChange} className="form-input w-[33%]" />
            <input type="text" placeholder="Profile Picture URL" name="profilePictureUrl" value={profile.profilePictureUrl} onChange={handleChange} className="form-input w-[33%]" />
            <select name="status" value={profile.role} onChange={handleChange} className="form-input w-[33%]">
              <option value="freelance">Freelance</option>
              <option value="client">Client</option>
            </select>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="flex items-center justify-center">
            <ButtonSubmit text="Update" btnStyle="outline" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
