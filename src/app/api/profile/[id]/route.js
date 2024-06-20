import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        followers: {
          select: {
            followerId: true,
            Follower: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profilePictureUrl: true,
              },
            },
          },
        },
        following: {
          select: {
            followingId: true,
            Following: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profilePictureUrl: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const formattedUser = {
      ...user,
      followers: user.followers.map(f => f.Follower),
      following: user.following.map(f => f.Following),
    };

    return NextResponse.json(formattedUser, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du profil' }, { status: 500 });
  }
}
