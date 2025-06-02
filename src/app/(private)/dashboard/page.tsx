import { auth } from "@/auth";
import { getOwnPosts } from "@/lib/post";
import React from "react";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashbordPage() {
  const session = await auth();
  if (!session?.user?.email || !session?.user?.id) {
    throw new Error("Unauthorized access");
  }
  const posts = await getOwnPosts(session.user.id);

  return (
    <>
      <div className="container flex items-center justify-between mx-auto py-4">
        <h1 className="text-2xl font-bold">記事一覧</h1>

        <Link href="/dashboard/create">
          <Button>
            <Link href="/manage/posts/create">新規作成</Link>
          </Button>
        </Link>
      </div>
      <div className="container mx-auto ">
        <DataTable columns={columns} data={posts} />
      </div>
    </>
  );
}
