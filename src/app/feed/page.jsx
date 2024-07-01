'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

const Feed = () => {
  const { data: session } = useSession();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (session) {
      fetchProjects();
    }
  }, [session]);

  const handleLike = async (projectId) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/likes`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Failed to like project');
      }
      const updatedProjects = projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, likes: project.likes + 1 };
        }
        return project;
      });
      setProjects(updatedProjects);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleComment = async (projectId, content) => {
    try {
      const res = await fetch(`/api/projects/${projectId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        throw new Error('Failed to comment on project');
      }
      const comment = await res.json();
      const updatedProjects = projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, comments: [...project.comments, comment] };
        }
        return project;
      });
      setProjects(updatedProjects);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFollow = async (userId) => {
    try {
      const res = await fetch(`/api/users/${userId}/follow`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error('Failed to follow user');
      }
      // Vous pouvez mettre à jour l'état pour refléter le suivi ici si nécessaire
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Feed</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {projects.map((project) => (
          <div key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>Budget: {project.budget}</p>
            <button onClick={() => handleLike(project.id)}>Like ({project.likes})</button>
            <div>
              <h3>Comments</h3>
              {project.comments.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.content}</p>
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const content = e.target.elements.content.value;
                  handleComment(project.id, content);
                  e.target.reset();
                }}
              >
                <input type="text" name="content" placeholder="Add a comment" required />
                <button type="submit">Comment</button>
              </form>
            </div>
            <button onClick={() => handleFollow(project.Client.id)}>Follow {project.Client.firstName}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
