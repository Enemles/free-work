'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProject() {
  const [project, setProject] = useState({
    title: '',
    description: '',
    budget: '',
    status: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      if (res.ok) {
        router.push('/projects');
      } else {
        throw new Error('Erreur lors de la création du projet');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Créer un nouveau projet</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre</label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Budget</label>
          <input
            type="number"
            name="budget"
            value={project.budget}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Status</label>
          <input
            type="text"
            name="status"
            value={project.status}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}
