import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { PostCardProps } from "@/types/post";

export default function PostCard({ post }: PostCardProps) {
  return (
    <div>
      <Card className="pt-0 hover:shadow-lg transition-shadow duration-300">
        <Link href={`/posts/${post.id}`}>
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
            <CardTitle className="text-xl font-bold line-clamp-2">
              {post.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-2 line-clamp-2">
              {post.content}
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-between text-sm text-gray-700">
            <p>{post.author?.name}</p>
            <p>
              {Math.floor(
                (new Date().getTime() - new Date(post.createdAt).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              日前
            </p>
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
}
