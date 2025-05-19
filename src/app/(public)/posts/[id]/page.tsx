import { notFound } from "next/navigation";
import { getPostById } from "@/lib/post";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Post } from "@/types/post";

type Params = {
  params: {
    id: string;
  };
};

export default async function PostPage({ params }: Params) {
  const { id } = params; // Promise を削除し、通常のオブジェクトとして扱う
  const post = (await getPostById(id)) as Post;
  if (!post) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="pt-0 max-w-3xl mx-auto">
        {post?.topImage && (
          <div className="relative h-48 w-full">
            <Image
              src={post?.topImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-t-md object-cover"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <p>投稿者：{post.author?.name}</p>
            <p>{format(new Date(post.createdAt), "yyyy年MM月dd日")}</p>
          </div>
          <CardTitle className="text-xl font-bold line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700 mb-2">{post.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}
