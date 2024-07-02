'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Header from '../../components/Header';
// import ButtonSubmit from '../../components/ButtonSubmit';

export default function CustomProfile() {
  const { data: session, status } = useSession();

//   const [user, setUser] = useState({
//     firstName: '',
//     lastName: '',
//     bio: '',
//     location: '',
//     profilePictureUrl: '',
//   });
//   const [error, setError] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'authenticated' && session) {
//       const fetchUser = async () => {
//         try {
//           const res = await fetch(`/api/profile/${session.user.id}`);
//           const data = await res.json();
//           setUser(data);
//         } catch (error) {
//           setError('Erreur lors de la récupération des informations utilisateur');
//         }
//       };
//       fetchUser();
//     }
//   }, [status, session]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`/api/profile/${session.user.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(user),
//       });
//       if (res.ok) {
//         router.push('/profile');
//       } else {
//         throw new Error('Erreur lors de la mise à jour du profil');
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

  // if (status === 'loading') {
  //   return <p>Chargement...</p>;
  // }

  return (
    <div>
      <Header session={session} />
      {/* <div className="container">
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="flex items-center justify-center">
            <ButtonSubmit text="Update" btnStyle="outline" />
          </div>
        </form>
      </div> */}
    </div>
  );
}
