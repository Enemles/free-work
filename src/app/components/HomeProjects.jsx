'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
// import Button from '../components/button';
import { BiLike } from 'react-icons/bi';
import { FaPen } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';

export default function HomeProjects() {
  const { data: session, status } = useSession();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchProjects = async () => {
        try {
          const res = await fetch('/api/projects');
          if (!res.ok) {
            throw new Error('Erreur lors de la récupération des projets');
          }
          const data = await res.json();
          setProjects(data);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchProjects();
    }
  }, [status]);

  const handleLike = async (id, isLiked) => {
    try {
      const res = await fetch(`/api/projects/${id}/likes`, {
        method: isLiked ? 'DELETE' : 'POST',
      });
      if (res.ok) {
        setProjects(
          projects.map((project) => {
            if (project.id === id) {
              const likes = project.likes || [];
              return {
                ...project,
                likes: isLiked
                  ? likes.filter((like) => like.userId !== session.user.id)
                  : likes.concat([{ userId: session.user.id, User: { firstName: session.user.firstName, lastName: session.user.lastName } }]),
              };
            }
            return project;
          })
        );
      } else {
        throw new Error(isLiked ? 'Erreur lors du retrait du like' : "Erreur lors de l'ajout du like");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleComment = async (id, content) => {
    try {
      const res = await fetch(`/api/projects/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        const comment = await res.json();
        setProjects(
          projects.map((project) => {
            if (project.id === id) {
              return {
                ...project,
                comments: (project.comments || []).concat([comment]),
              };
            }
            return project;
          })
        );
      } else {
        throw new Error("Erreur lors de l'ajout du commentaire");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p>Chargement...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center">
        <p>Vous devez être connecté pour voir les projets.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul className="flex flex-col gap-[60px]">
          {projects.length === 0 ? (
            <p className='flex justify-center'>Aucun projet</p>
          ) : (
            projects.map((project) => {
              const isLiked = project.likes?.some((like) => like.userId === session.user.id);
              return (
                <li key={project.id} className="w-4/5 mx-[auto] my-[0] border-b-[1px] border-b-[solid] border-b-[black] pb-[30px]">
                  <div className="flex items-center justify-between gap-2 mb-[20px]">
                    <div className="flex items-center gap-2">
                      <Image src={project.Client.profilePictureUrl} alt="Img" className="w-[30px] rounded-[50%]" />
                      <p className="leading-none">
                        {project.Client.firstName} {project.Client.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-[grey] leading-none text-[8px]">{formatDistanceToNow(new Date(project.createdAt))} ago</p>
                    </div>
                  </div>
                  <div className="flex justify-between mb-[20px]">
                    <h2 className="text-[20px] font-semibold">{project.title}</h2>
                    <div className="flex flex-col gap-2">
                      <p className="text-[grey] leading-none">{project.budget}$/days</p>
                      <p
                        className={`leading-none capitalize ${
                          project.status === 'active' ? 'text-[green]' : project.status === 'close' ? 'text-[red]' : project.status === 'pause' ? 'text-[orange]' : ''
                        }`}
                      >
                        {project.status}
                      </p>
                    </div>
                  </div>
                  <p className="mb-5">{project.description}</p>
                  <div className="flex justify-between">
                    <button onClick={() => handleLike(project.id, isLiked)} className="flex items-center gap-2 ">
                      <span className="flex items-center gap-1">
                        <BiLike />
                        <span className="text-[grey] leading-none text-[12px]">{project.likes?.length || 0}</span>
                      </span>
                    </button>
                    {session && project.clientId === session.user.id && (
                      <div className="flex gap-2 ">
                        <button onClick={() => router.push(`/projects/edit/${project.id}`)}>
                          <FaPen className="text-[16px]" />
                        </button>
                        <button onClick={() => handleDelete(project.id)}>
                          <MdDelete className="text-[20px]" />
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
}
