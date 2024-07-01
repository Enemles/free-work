"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function UserList() {
  const { data: session } = useSession();
  const [users, setUsers] = useState({ freelancers: [], clients: [] });
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users/role-based');
      if (!res.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await res.json();
      setUsers({
        freelancers: data.freelancers.filter(user => user.id !== session.user.id),
        clients: data.clients.filter(user => user.id !== session.user.id),
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUsers();
    }
  }, [session]);

  const handleFollow = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}/follow`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Failed to follow user');
      }
      fetchUsers();
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
      fetchUsers();
    } catch (error) {
      setError(error.message);
    }
  };

  // if (!session) {
  //   return <p>Vous devez être connecté pour voir cette page.</p>;
  // }

  return (
    <></>
    // <div>
    //   <h1>Utilisateurs</h1>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}
    //   <div>
    //     <h2>Freelancers</h2>
    //     <ul>
    //       {users.freelancers.map(user => (
    //         <li key={user.id}>
    //           <Image src={user.profilePictureUrl} alt={`${user.firstName} ${user.lastName}`} width={50} height={50} style={{ borderRadius: '50%' }} />
    //           <Link href={`/profile/${user.id}`}>
    //             {user.firstName} {user.lastName}
    //           </Link>
    //           {user.isFollowing ? (
    //             <button onClick={() => handleUnfollow(user.id)}>Arrêter de suivre</button>
    //           ) : (
    //             <button onClick={() => handleFollow(user.id)}>Suivre</button>
    //           )}
    //         </li>
    //       ))}
    //     </ul>
    //   </div>
    //   {session.user.role === 'freelance' && users.clients.length > 0 && (
    //     <div>
    //       <h2>Clients</h2>
    //       <ul>
    //         {users.clients.map(user => (
    //           <li key={user.id}>
    //             <Image src={user.profilePictureUrl} alt={`${user.firstName} ${user.lastName}`} width={50} height={50} style={{ borderRadius: '50%' }} />
    //             <Link href={`/profile/${user.id}`}>
    //               {user.firstName} {user.lastName}
    //             </Link>
    //             {user.isFollowing ? (
    //               <button onClick={() => handleUnfollow(user.id)}>Arrêter de suivre</button>
    //             ) : (
    //               <button onClick={() => handleFollow(user.id)}>Suivre</button>
    //             )}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   )}
    // </div>
  );
}
