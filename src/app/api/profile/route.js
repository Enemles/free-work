import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req) {
  try {
    const token = await getToken({ req, secret });
    console.log('Token:', token);

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const githubId = token.sub;
    console.log('GitHub ID:', githubId);

    const user = await prisma.user.findUnique({
      where: { githubId: githubId },
    });
    console.log('User:', user);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du profil' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const token = await getToken({ req, secret });
    console.log('Token:', token);

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const githubId = token.sub;
    console.log('GitHub ID:', githubId);

    const { firstName, lastName, bio, location, profilePictureUrl } = await req.json();
    console.log('Request body:', { firstName, lastName, bio, location, profilePictureUrl });

    const user = await prisma.user.update({
      where: { githubId: githubId },
      data: { firstName, lastName, bio, location, profilePictureUrl },
    });
    console.log('Updated user:', user);

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du profil' }, { status: 500 });
  }
}
