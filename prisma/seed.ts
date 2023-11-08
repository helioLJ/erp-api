import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  await prisma.allowedEmails.create({
    data: {
      role: 'Admin',
      email: 'helio.lucio.jr54@gmail.com',
      name: 'Hélio Lúcio',
    },
  });

  for (let i = 0; i < 10; i++) {
    const fakeEmail = faker.internet.email();
    const fakeName = faker.person.fullName();

    await prisma.allowedEmails.create({
      data: {
        role: 'Student',
        email: fakeEmail,
        name: fakeName,
      },
    });

    const user = await prisma.user.create({
      data: {
        email: fakeEmail,
        displayName: fakeName,
        profilePicture: faker.image.avatarGitHub(),
      },
    });

    await prisma.student.create({
      data: {
        userId: user.id,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
