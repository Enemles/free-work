import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = token.id;

    const freelancers = await prisma.user.findMany({
      where: { role: 'freelance' },
      include: {
        followers: {
          where: { followerId: parseInt(userId) },
        },
      },
    });

    const clients = await prisma.user.findMany({
      where: { role: 'client' },
      include: {
        followers: {
          where: { followerId: parseInt(userId) },
        },
      },
    });

    const formattedFreelancers = freelancers.map((user) => ({
      ...user,
      isFollowing: user.followers.length > 0,
    }));

    const formattedClients = clients.map((user) => ({
      ...user,
      isFollowing: user.followers.length > 0,
    }));

    return NextResponse.json(
      { freelancers: formattedFreelancers, clients: formattedClients },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    );
  }
}
