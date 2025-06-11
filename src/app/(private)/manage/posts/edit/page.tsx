import { getOwnPost } from "@/lib/post";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import { Post } from "@/types/post";
import EditPostform from "./EditPostform";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPage({ params }: PageProps) {
  const { id } = await params; // Promise を削除し、通常のオブジェクトとして扱う
  const session = await auth();
  if (!session?.user?.email || !session?.user?.id) {
    throw new Error("Unauthorized access");
  }
  const post = (await getOwnPost(session.user.id, id)) as Post;

  if (!post) {
    notFound();
  }
  return (
    <div>
      <EditPostform
        post={{
          id: post.id,
          title: post.title,
          content: post.content,
          topImage: post.topImage || null,
          published: post.published,
        }}
      />
    </div>
  );
}
