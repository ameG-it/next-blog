"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type Post } from "@prisma/client";
import PostDropdownMenu from "@/components/post/PostDropdownMenu";

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "タイトル",
  },
  {
    accessorKey: "published",
    header: "表示状態",
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-right">更新日時</div>,
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;
      // 日時をyyyy/MM/dd hh:mm:ssにフォーマット
      const formatted = new Date(updatedAt).toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "操作",
    cell: ({ row }) => {
      const post = row.original;
      return (
        <div className="flex justify-end">
          <PostDropdownMenu id={post.id} published={post.published} />
        </div>
      );
    },
  },
];
