import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const clientId = token.id;
    const user = await prisma.user.findUnique({
      where: { id : clientId},
    });

    if (!user) {
      return NextResponse.json({ message: 'Utilisateur non trouvé' }, { status: 404 });
    }

    const { title, description, budget, status } = await req.json();

    // Ajout de journalisation pour vérifier les données reçues
    console.log('POST Request Body:', { title, description, budget, status, clientId });

    if (!title || !description || !budget || !status || !clientId) {
      throw new Error('Tous les champs sont requis');
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        budget: parseFloat(budget), // Assurez-vous que le budget est un nombre
        status,
        clientId: clientId, // Utilisation de clientId obtenu à partir de user
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error); // Ajout de journalisation pour les erreurs
    return NextResponse.json({ error: 'Erreur lors de la création du projet' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        likes: {
          include: {
            User: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        comments: {
          include: {
            User: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des projets' }, { status: 500 });
  }
}
