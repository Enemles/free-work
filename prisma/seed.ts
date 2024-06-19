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
      profilePictureUrl: 'https://example.com/profile1.jpg',
    },
    {
      email: 'user2@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      bio: 'Bio of Jane Smith',
      location: 'Los Angeles',
      profilePictureUrl: 'https://example.com/profile2.jpg',
    },
    {
      email: 'user3@example.com',
      firstName: 'Alice',
      lastName: 'Johnson',
      bio: 'Bio of Alice Johnson',
      location: 'Chicago',
      profilePictureUrl: 'https://example.com/profile3.jpg',
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
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
