import { PrismaClient } from '@prisma/client';

const fakeGmails = [
  'user1@gmail.com',
  'user2@gmail.com',
  'user3@gmail.com',
  'user4@gmail.com',
  'user5@gmail.com',
  'user6@gmail.com',
  'user7@gmail.com',
  'user8@gmail.com',
  'user9@gmail.com',
  'user10@gmail.com',
];

const prisma = new PrismaClient();

async function main() {
  fakeGmails.map(async (gmail, index) => {
    const fake = await prisma.allowedEmails.create({
      data: {
        name: 'Fake User ' + index,
        email: gmail,
      },
    });

    console.log(fake);
  });
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
