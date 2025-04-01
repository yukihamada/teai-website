const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // テストユーザーを作成
  const user = await prisma.user.create({
    data: {
      email: 'test@teai.io',
      name: 'Test User'
    },
  });
  console.log('Created user:', user);

  // 作成したユーザーを確認
  const users = await prisma.user.findMany();
  console.log('All users:', users);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
