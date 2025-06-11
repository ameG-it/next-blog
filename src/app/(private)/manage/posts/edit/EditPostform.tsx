"use client";
import { useState, useActionState } from "react";
import { createPost } from "@/lib/actuons/createPost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehyoeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EditPostformProps = {
  post: {
    id: string;
    title: string;
    content: string;
    topImage: string | null;
    published: boolean;
  };
};

export default function EditPostform({ post }: EditPostformProps) {
  const [content, setContent] = useState(post.content);
  const [contentLength, setContentLength] = useState(post.content.length);
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [topImage, setTopImage] = useState(post.topImage);
  const [published, setPublished] = useState(post.published);

  const [state, formAction, isPending] = useActionState(createPost, {
    success: false,
    errors: {},
  });

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newContent = event.target.value;
    setContent(newContent);
    setContentLength(newContent.length);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">新規作成</h1>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              name="title"
              placeholder="タイトルを入力"
              onChange={handleTitleChange}
            />
          </div>

          {/**画像を添付 */}
          <div>
            <Label htmlFor="topImage">トップ画像</Label>
            <Input
              id="topImage"
              name="topImage"
              type="file"
              accept="image/*"
              className="mt-2"
            />
          </div>

          {state.errors.title && (
            <p className="text-red-500 text-sm">
              {state.errors.title.join(", ")}
            </p>
          )}
          <div>
            <Label htmlFor="content">内容</Label>
            <TextareaAutosize
              id="content"
              name="content"
              className="w-full p-2 border rounded mt-2 resize-none"
              value={content}
              onChange={handleContentChange}
              minRows={8}
            />
          </div>
          {state.errors.content && (
            <p className="text-red-500 text-sm">
              {state.errors.content.join(", ")}
            </p>
          )}
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-500">
              文字数: {contentLength}
            </span>
          </div>
          <div>
            <Button type="button" onClick={() => setPreview(!preview)}>
              {preview ? "プレビューを閉じる" : "プレビューを開く"}
            </Button>
          </div>
          {preview && (
            <div className="mt-4 p-4 border rounded bg-gray-50 prose max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehyoeHighlight]}
                skipHtml={false}
                unwrapDisallowed={true}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}

          <Button
            type="submit"
            className="bg-blue-500 text-white"
            disabled={isPending}
          >
            {isPending ? "更新中..." : "更新する"}
          </Button>
          <input type="hidden" name="postId" value={post.id} />
          <input type="hidden" name="oldImageUrl" value={post.topImage || ""} />
        </form>
      </div>
    </div>
  );
}
