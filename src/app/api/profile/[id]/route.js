import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(req, { params }) {
  try {
    const { id } = params;
    console.log('Fetching user with ID:', id);

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
      console.error('User not found with ID:', id);
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const formattedUser = {
      ...user,
      followers: user.followers.map((f) => f.Follower),
      following: user.following.map((f) => f.Following),
    };

    console.log('User fetched successfully:', formattedUser);

    return NextResponse.json(formattedUser, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du profil' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const data = await req.json();
    console.log('Updating user with ID:', id, 'with data:', data);

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id, 10) },
      data,
    });

    console.log('User updated successfully:', updatedUser);

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du profil' }, { status: 500 });
  }
}
