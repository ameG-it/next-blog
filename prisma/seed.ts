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
  ];

  // ユーザーの作成
  const user = await prisma.user.create({
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
          },
          {
            title: "My second post",
            content: "This is the content of my second post.",
            topImage: dummyImages[1],
            published: false,
          },
        ],
      },
    },
  });
  console.log("Created user: ", { user });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
