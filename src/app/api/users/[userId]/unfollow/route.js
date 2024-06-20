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

    const followerId = parseInt(token.id, 10);
    const followingId = parseInt(params.userId, 10);

    const followExists = await prisma.follow.findFirst({
      where: {
        followerId,
        followingId,
      },
    });

    if (!followExists) {
      return NextResponse.json({ message: 'Not following' }, { status: 400 });
    }

    await prisma.follow.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });

    return NextResponse.json({ message: 'Unfollowed successfully' }, { status: 200 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Erreur lors du désabonnement de l\'utilisateur' }, { status: 500 });
  }
}
