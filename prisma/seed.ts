const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


async function main() {
  // Clear existing data (optional, for clean seeding)
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create users and their blogs
  const user1 = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@example.com",
      password: "securepassword1",
      posts: {
        create: [
          {
            title: "Alice's First Blog",
            content: "This is the content of Alice's first blog.",
            published: true,
          },
          {
            title: "Alice's Second Blog",
            content: "This is the content of Alice's second blog.",
            published: false,
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Bob",
      email: "bob@example.com",
      password: "securepassword2",
      posts: {
        create: [
          {
            title: "Bob's First Blog",
            content: "Bob writes about his adventures.",
            published: true,
          },
        ],
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Charlie",
      email: "charlie@example.com",
      password: "securepassword3",
      posts: {
        create: [
          {
            title: "Charlie's Tech Blog",
            content: "Charlie discusses the latest in technology.",
            published: true,
          },
          {
            title: "Charlie's Travel Blog",
            content: "Charlie shares travel stories and tips.",
            published: true,
          },
        ],
      },
    },
  });

  console.log({ user1, user2, user3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });