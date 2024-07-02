'use client';

// import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function HomeFreelances() {
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     const fetchProjects = async () => {
  //       try {
  //         const res = await fetch('/api/projects');
  //         if (!res.ok) {
  //           throw new Error('Erreur lors de la récupération des projets');
  //         }
  //         const data = await res.json();
  //         setProjects(data);
  //       } catch (error) {
  //         setError(error.message);
  //       }
  //     };

  //     fetchProjects();
  //   }
  // }, [status]);

  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center">
        <p>Vous devez être connecté pour voir les freelances.</p>
      </div>
    );
  }

  return (
    <div className="container flex justify-center">
      <h1>Aucun freelances.</h1>
    </div>
  );
}
