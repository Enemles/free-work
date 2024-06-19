import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function POST(req) {
  try {
    const { email, firstName, lastName, bio, location, profilePictureUrl } = await req.json();
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        bio,
        location,
        profilePictureUrl,
      },
    });

    await prisma.userRole.create({
      data: {
        userId: user.id,
        roleId: 2, // ID du rôle "client"
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'inscription' }, { status: 500 });
  }
}
