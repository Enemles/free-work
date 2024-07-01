'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '../../../components/Header';
import ButtonSubmit from '../../../components/ButtonSubmit';

export default function EditProject({ session }) {
  const { id } = useParams();
  const [project, setProject] = useState({
    title: '',
    description: '',
    budget: '',
    status: '',
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (error) {
        setError('Erreur lors de la récupération du projet');
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
      if (res.ok) {
        router.push('/');
      } else {
        throw new Error('Erreur lors de la mise à jour du projet');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Header session={session} />
      <div className="container">
        <h1 className="text-[60px] flex justify-center">Modifier le projet</h1>
        <div className="h-[1px] relative top-[10px] translate-x-[-50%] left-[50%] bg-[black] w-[50%] mb-[60px]"></div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex justify-between gap-5">
            <input type="text" placeholder="Project name" required name="title" value={project.title} onChange={handleChange} className="form-input w-[33%]" />
            <span className="required" />
            <input type="number" placeholder="Budget" required name="budget" value={project.budget} onChange={handleChange} className="form-input w-[33%]" />
            <span className="required" />
            <select name="status" value={project.status} required onChange={handleChange} className="form-input w-[33%]">
              <option value="active">Active</option>
              <option value="close">Close</option>
              <option value="pause">Pause</option>
            </select>
            <span className="required" />
          </div>
          <div className="flex justify-between gap-5">
            <textarea placeholder="Project description" required name="description" value={project.description} onChange={handleChange} className="form-input w-[100%]" />
            <span className="required" />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="flex items-center justify-center">
            <ButtonSubmit text="Update" btnStyle="outline" />
          </div>
        </form>
      </div>
    </div>
  );
}
