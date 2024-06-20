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

    const userId = parseInt(token.id, 10); // Utilisation de token.id qui est l'id utilisateur
    const { id: projectId } = params;

    const existingLike = await prisma.like.findFirst({
      where: {
        userId,
        projectId: parseInt(projectId, 10),
      },
    });

    if (existingLike) {
      return NextResponse.json({ message: 'Already liked' }, { status: 400 });
    }

    await prisma.like.create({
      data: {
        userId,
        projectId: parseInt(projectId, 10),
      },
    });

    return NextResponse.json({ message: 'Liked successfully' }, { status: 200 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'ajout du like' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = parseInt(token.id, 10); // Utilisation de token.id qui est l'id utilisateur
    const { id: projectId } = params;

    await prisma.like.deleteMany({
      where: {
        userId,
        projectId: parseInt(projectId, 10),
      },
    });

    return NextResponse.json({ message: 'Unliked successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression du like' }, { status: 500 });
  }
}
