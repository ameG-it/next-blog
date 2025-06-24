import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOwnPost } from "@/lib/post";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehyoeHighlight from "rehype-highlight";
import Image from "next/image";
import { Post } from "@/types/post";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ShowPage({ params }: Params) {
  const session = await auth();
  const { id } = await params; // Promise を削除し、通常のオブジェクトとして扱う
  if (!session?.user?.email || !session?.user?.id) {
    throw new Error("Unauthorized access");
  }
  const post = (await getOwnPost(id, session.user.id)) as Post;
  if (!post) {
    notFound();
  }
  console.log("post", post);

  const topImage = post.topImage || "placeholder.png"; // デフォルトの画像を設定
  return (
    <div>
      <Card className="max-w-3xl mx-auto mt-10 pt-0">
        <div className="relative h-64 w-full">
          <Image
            src={topImage}
            alt={post.title}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="rounded-t-xl object-cover w-full h-64"
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-500">
              投稿者：{post.author?.name || "不明"}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("ja-JP")}
            </p>
          </div>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm sm:prose-base lg:prose-lg">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehyoeHighlight]}
            skipHtml={false}
            unwrapDisallowed={true}
          >
            {post.content}
          </ReactMarkdown>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
