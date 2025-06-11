"use client";

import { ColumnDef } from "@tanstack/react-table";
import { type Post } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>操作</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`manage/posts/${post.id}`}>閲覧</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`manage/posts/edit/${post.id}`}>編集</Link>
            </DropdownMenuItem>
            {post.published ? (
              <DropdownMenuItem className="">非公開</DropdownMenuItem>
            ) : (
              <DropdownMenuItem>公開</DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem>削除</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
