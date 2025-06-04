import { prisma } from "@/lib/prisma";
import { Post } from "@prisma/client";

export async function getPosts(): Promise<Post[]> {
  return await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getOwnPosts(userId: string): Promise<Post[]> {
  return await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getPostById(id: string): Promise<Post | null> {
  return await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
}

export async function searchPosts(search: string) {
  const decodedSearch = decodeURIComponent(search);
  // 全角のスペースを半角に変換して、トリミング
  const trimmedSearch = decodedSearch.replace(/　/g, " ").trim();
  const searchWords = trimmedSearch.split(/\s+/); // スペースで分割
  const filters = searchWords.map((word) => ({
    OR: [{ title: { contains: word } }, { content: { contains: word } }],
  }));
  return await prisma.post.findMany({
    where: {
      AND: filters,
      published: true,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
