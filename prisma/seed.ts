import { PrismaClient } from "@prisma/client"; // PrismaClientをインポート
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
const main = async () => {
  await prisma.user.deleteMany(); // 既存のユーザーを削除
  await prisma.post.deleteMany(); // 既存の投稿を削除

  const hash = async (password: string, saltRounds: number) => {
    return await bcrypt.hash(password, saltRounds);
  };

  const dummyImages = [
    "https://picsum.photos/seed/picsum/600/400",
    "https://picsum.photos/seed/picsum2/600/400",
    "https://picsum.photos/seed/picsum3/600/400",
    "https://picsum.photos/seed/picsum4/600/400",
    "https://picsum.photos/seed/picsum5/600/400",
    "https://picsum.photos/seed/picsum6/600/400",
  ];

  // ユーザー1の作成
  const user1 = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "jshonDoe@example.com",
      password: await hash("password123", 10), // パスワードをハッシュ化
      posts: {
        create: [
          {
            title: "My first post",
            content: "This is the content of my first post.",
            topImage: dummyImages[0],
            published: true,
            createdAt: new Date("2023-01-01"),
          },
          {
            title: "My second post",
            content: "This is the content of my second post.",
            topImage: dummyImages[1],
            published: false,
            createdAt: new Date("2023-02-01"),
          },
        ],
      },
    },
  });

  // ユーザー2の作成
  const user2 = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "janeSmith@example.com",
      password: await hash("securepassword", 10), // パスワードをハッシュ化
      posts: {
        create: [
          {
            title: "Jane's first post",
            content: "This is Jane's first post content.",
            topImage: dummyImages[2],
            published: true,
            createdAt: new Date("2023-03-01"),
          },
          {
            title: "Jane's second post",
            content: "This is Jane's second post content.",
            topImage: dummyImages[3],
            published: true,
            createdAt: new Date("2023-04-01"),
          },
        ],
      },
    },
  });

  // ユーザー3の作成
  const user3 = await prisma.user.create({
    data: {
      name: "Alice Johnson",
      email: "aliceJohnson@example.com",
      password: await hash("alicepassword", 10), // パスワードをハッシュ化
      posts: {
        create: [
          {
            title: "Alice's first post",
            content: "This is Alice's first post content.",
            topImage: dummyImages[4],
            published: true,
            createdAt: new Date("2023-05-01"),
          },
          {
            title: "Alice's second post",
            content: "This is Alice's second post content.",
            topImage: dummyImages[5],
            published: false,
            createdAt: new Date("2023-06-01"),
          },
        ],
      },
    },
  });

  console.log("Created users: ", { user1, user2, user3 });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
