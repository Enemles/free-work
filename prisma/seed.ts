import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const users = [
    {
      email: 'user1@example.com',
      firstName: 'John',
      lastName: 'Doe',
      bio: 'Bio of John Doe',
      location: 'New York',
      profilePictureUrl: 'https://picsum.photos/50',
      role: 'freelance',
    },
    {
      email: 'user2@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      bio: 'Bio of Jane Smith',
      location: 'Los Angeles',
      profilePictureUrl: 'https://picsum.photos/50',
      role: 'client',
    }
  ];

  const createdUsers = [];
  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    createdUsers.push(createdUser);
  }

  // Crée des projets associés aux utilisateurs créés
  const projects = [
    {
      title: 'Projet 1',
      description: 'Description du Projet 1',
      budget: 1000,
      status: 'Ouvert',
      clientId: 2,
    },
    {
      title: 'Projet 2',
      description: 'Description du Projet 2',
      budget: 2000,
      status: 'En cours',
      clientId: 1,
    },
    {
      title: 'Projet 3',
      description: 'Description du Projet 3',
      budget: 3000,
      status: 'Fermé',
      clientId: 2,
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: project,
    });
  }
  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
