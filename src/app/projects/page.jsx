'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Button from '../components/button';

export default function Projects() {
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
    return <div>Chargement...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen gap-4">
        <p>Vous devez être connecté pour voir les projets.</p>
        <Button text="Go back" href="/" btnStyle="outline" />
      </div>
    );
  }

  return (
    <div>
      <h1>Projets</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {projects.map((project) => {
          const isLiked = project.likes?.some((like) => like.userId === session.user.id);
          return (
            <li key={project.id}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <p>Budget: {project.budget}</p>
              <p>Status: {project.status}</p>
              <button onClick={() => handleLike(project.id, isLiked)}>
                {isLiked ? '-' : '+'} Like ({project.likes?.length || 0})
              </button>
              <div>
                <h3>Commentaires</h3>
                {project.comments?.map((comment) => (
                  <div key={comment.id}>
                    <p>{`${comment.User.firstName} ${comment.User.lastName}: ${comment.content}`}</p>
                  </div>
                ))}
                {session && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const content = e.target.elements.content.value;
                      handleComment(project.id, content);
                      e.target.reset();
                    }}
                  >
                    <input type="text" name="content" placeholder="Ajouter un commentaire" required />
                    <button type="submit">Commenter</button>
                  </form>
                )}
              </div>
              {session && project.clientId === session.user.id && (
                <>
                  <button onClick={() => router.push(`/projects/edit/${project.id}`)}>Modifier</button>
                  <button onClick={() => handleDelete(project.id)}>Supprimer</button>
                </>
              )}
            </li>
          );
        })}
      </ul>
      <button onClick={() => router.push('/projects/create')}>Créer un nouveau projet</button>
    </div>
  );
}
