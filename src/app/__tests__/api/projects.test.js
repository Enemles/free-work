/**
 * @jest-environment node
 */
import { POST, GET } from '../../api/projects/route';
import { getToken } from 'next-auth/jwt';
import { prisma } from '../../../lib/prisma';

// Mock prisma and getToken
jest.mock('next-auth/jwt', () => ({
  getToken: jest.fn(),
}));

jest.mock('../../../lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    project: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

describe('POST /api/projects', () => {

  let consoleSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should create a project and return status 201', async () => {
    const mockToken = { id: '123' };
    getToken.mockResolvedValue(mockToken);

    prisma.user.findUnique.mockResolvedValue({ id: '123' });
    prisma.project.create.mockResolvedValue({
      id: 1,
      title: 'Project Title',
      description: 'Project Description',
      budget: 1000,
      status: 'active',
      clientId: '123',
    });

    const requestObj = {
      json: async () => ({
        title: 'Project Title',
        description: 'Project Description',
        budget: '1000',
        status: 'active',
      }),
    };

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(body.title).toBe('Project Title');
    expect(body.description).toBe('Project Description');
    expect(body.budget).toBe(1000);
    expect(body.status).toBe('active');
    expect(body.clientId).toBe('123');
    expect(prisma.project.create).toHaveBeenCalledTimes(1);
  });

  it('should return status 401 when token is missing', async () => {
    getToken.mockResolvedValue(null);

    const requestObj = {
      json: async () => ({
        title: 'Project Title',
        description: 'Project Description',
        budget: '1000',
        status: 'active',
      }),
    };

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.message).toBe('Unauthorized');
    expect(prisma.project.create).not.toHaveBeenCalled();
  });

  it('should return status 404 when user is not found', async () => {
    const mockToken = { id: '123' };
    getToken.mockResolvedValue(mockToken);

    prisma.user.findUnique.mockResolvedValue(null);

    const requestObj = {
      json: async () => ({
        title: 'Project Title',
        description: 'Project Description',
        budget: '1000',
        status: 'active',
      }),
    };

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.message).toBe('Utilisateur non trouvé');
    expect(prisma.project.create).not.toHaveBeenCalled();
  });

  it('should return status 500 on prisma query rejection', async () => {
    const mockToken = { id: '123' };
    getToken.mockResolvedValue(mockToken);

    prisma.user.findUnique.mockResolvedValue({ id: '123' });
    prisma.project.create.mockRejectedValue(new Error('Failed to create project'));

    const requestObj = {
      json: async () => ({
        title: 'Project Title',
        description: 'Project Description',
        budget: '1000',
        status: 'active',
      }),
    };

    const response = await POST(requestObj);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe('Erreur lors de la création du projet');
    expect(prisma.project.create).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('POST Error:', expect.any(Error));
  });
});

describe('GET /api/projects', () => {
  let consoleSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });


  it('should return projects with status 200', async () => {
    prisma.project.findMany.mockResolvedValue([
      {
        id: 1,
        title: 'Project Title',
        description: 'Project Description',
        budget: 1000,
        status: 'active',
        clientId: '123',
        likes: [
          {
            User: {
              firstName: 'John',
              lastName: 'Doe',
            },
          },
        ],
        comments: [
          {
            User: {
              firstName: 'Jane',
              lastName: 'Doe',
            },
          },
        ],
      },
    ]);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0].title).toBe('Project Title');
    expect(prisma.project.findMany).toHaveBeenCalledTimes(1);
  });

  it('should return status 500 on prisma query rejection', async () => {
    prisma.project.findMany.mockRejectedValue(new Error('Failed to fetch projects'));

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe('Erreur lors de la récupération des projets');
    expect(prisma.project.findMany).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('GET Error:', expect.any(Error));
  });
});
