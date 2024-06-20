import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req, { params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = token.id; // Utilisation de token.id qui est l'id utilisateur
    const { id: projectId } = params;
    const { content } = await req.json();

    const comment = await prisma.comment.create({
      data: {
        content,
        userId: parseInt(userId, 10),
        projectId: parseInt(projectId, 10),
      },
      include: {
        User: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json(comment, { status: 200 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'ajout du commentaire' }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const { id: projectId } = params;

    const comments = await prisma.comment.findMany({
      where: {
        projectId: parseInt(projectId, 10),
      },
      include: {
        User: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des commentaires' }, { status: 500 });
  }
}
