'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Header from '../../components/Header';
import ButtonSubmit from '../../components/ButtonSubmit';

export default function CustomProfile() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    location: '',
    profilePictureUrl: '',
    role: '',
    tjm: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();
  const defaultAvatar = '/assets/images/default-avatar.png';

  useEffect(() => {
    if (status === 'authenticated' && session) {
      const fetchUser = async () => {
        try {
          const res = await fetch('/api/profile/custom-profile');
          if (!res.ok) {
            throw new Error('Failed to fetch profile');
          }
          const data = await res.json();
          setUser({
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            bio: data.bio || '',
            location: data.location || '',
            profilePictureUrl: data.profilePictureUrl || '',
            role: data.role || '',
            tjm: data.tjm || '',
          });
          console.log('Profile data fetched successfully:', data);
        } catch (error) {
          setError('Erreur lors de la récupération des informations utilisateur');
        }
      };
      fetchUser();
    }
  }, [status, session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/profile/custom-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
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

  return (
    <div>
      <Header session={session} />
      <div className="container">
        <h1 className="text-[60px] flex justify-center">Mettre à jour le profil</h1>
        <div className="h-[1px] relative top-[10px] translate-x-[-50%] left-[50%] bg-[black] w-[50%] mb-[60px]"></div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex justify-between gap-5">
            <input type="text" placeholder="First Name" required name="firstName" value={user.firstName} onChange={handleChange} className="form-input w-[33%]" />
            <input type="text" placeholder="Last Name" required name="lastName" value={user.lastName} onChange={handleChange} className="form-input w-[33%]" />
          </div>
          <div className="flex justify-between gap-5">
            <input type="text" placeholder="Location" name="location" value={user.location} onChange={handleChange} className="form-input w-[33%]" />
            <input type="text" placeholder="Profile Picture URL" name="profilePictureUrl" value={user.profilePictureUrl} onChange={handleChange} className="form-input w-[33%]" />
          </div>
          <div className="flex justify-between gap-5">
            <textarea placeholder="Bio" name="bio" value={user.bio} onChange={handleChange} className="form-input w-[100%]" />
          </div>
          <div className="flex justify-between gap-5">
            <input type="text" placeholder="Role" name="role" value={user.role} onChange={handleChange} className="form-input w-[33%]" />
            <input type="number" placeholder="TJM" name="tjm" value={user.tjm} onChange={handleChange} className="form-input w-[33%]" />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="flex items-center justify-center">
            <ButtonSubmit text="Update" btnStyle="outline" />
          </div>
        </form>
        <div className="flex flex-col items-center mt-10">
          <Image className="rounded-full margin-auto w-[100px]" src={user.profilePictureUrl || defaultAvatar} alt="Profile Picture" width={100} height={100} />
          <p>Email: {session?.user.email}</p>
          <p>GitHub ID: {user.githubId}</p>
          <p>Created At: {new Date(user.createdAt).toLocaleDateString()}</p>
          <p>Updated At: {new Date(user.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
