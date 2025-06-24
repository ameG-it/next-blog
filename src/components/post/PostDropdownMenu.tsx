"use client";
import { useState } from "react";
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
import DeletePostDialog from "@/components/post/DeletePostDialog";

type Post = {
  id: string;
  published: boolean;
};

export default function PostDropdownMenu({ id, published }: Post) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dialogOpen = () => {
    setIsDialogOpen(true);
    setIsDropdownOpen(false);
  };
  return (
    <div>
      <DeletePostDialog
        postId={id}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
            <Link href={`manage/posts/${id}`}>閲覧</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`manage/posts/${id}/edit/`}>編集</Link>
          </DropdownMenuItem>
          {published ? (
            <DropdownMenuItem className="">非公開</DropdownMenuItem>
          ) : (
            <DropdownMenuItem>公開</DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={dialogOpen} className="text-red-500">
            削除
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
