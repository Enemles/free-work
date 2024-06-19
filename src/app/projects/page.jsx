'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        setError('Erreur lors de la récupération des projets');
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProjects(projects.filter((project) => project.id !== id));
      } else {
        throw new Error('Erreur lors de la suppression du projet');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Projets</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Budget: {project.budget}</p>
            <p>Status: {project.status}</p>
            <button onClick={() => router.push(`/projects/edit/${project.id}`)}>Modifier</button>
            <button onClick={() => handleDelete(project.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/projects/create')}>Créer un nouveau projet</button>
    </div>
  );
}
