// app/api/users/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const users = await prisma.user.findMany();
    console.log('Users retrieved:', users);
    return new Response(JSON.stringify(users), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error retrieving users:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération des utilisateurs' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

}

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, bio, location, profilePictureUrl } = body;

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
        bio,
        location,
        profilePictureUrl,
      },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la création de l\'utilisateur' }), { status: 400 });
  }
}
