"use client";
import { useState, useActionState, useEffect } from "react";
import { updatePost } from "@/lib/actuons/updatePost";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehyoeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    post.topImage || null
  );
  const [published, setPublished] = useState(post.published);

  const [state, formAction, isPending] = useActionState(updatePost, {
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

  const handleTopImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      // Blobの一時URLを作成
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== post.topImage) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [post.topImage, previewUrl]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  console.log("imageUrl:", post.topImage);
  return (
    <div>
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">編集</h1>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="title">タイトル</Label>
            <Input
              id="title"
              name="title"
              placeholder="タイトルを入力"
              value={title}
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
              onChange={handleTopImageChange}
            />
          </div>
          {previewUrl && (
            <div className="relative h-64 w-full">
              <Image
                src={previewUrl}
                alt={post.title || "Preview Image"}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="rounded-t-xl object-cover w-full h-64"
              />
            </div>
          )}

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
          <div className="mt-4">
            <Label htmlFor="content">公開設定</Label>
          </div>
          <RadioGroup
            value={published.toString()}
            name="published"
            onValueChange={(value) => {
              setPublished(value === "true");
            }}
          >
            <div className="flex items-center mb-2">
              <RadioGroupItem value="true" id="published" className="mr-4" />
              <Label htmlFor="published">公開</Label>
            </div>
            <div className="flex items-center mb-2">
              <RadioGroupItem value="false" id="draft" className="mr-4" />
              <Label htmlFor="draft">非公開</Label>
            </div>
          </RadioGroup>

          <Button
            type="submit"
            className="bg-blue-500 text-white"
            disabled={isPending}
          >
            {isPending ? "更新中..." : "更新する"}
          </Button>
          <input type="hidden" name="id" value={post.id} />
          <input type="hidden" name="oldImageUrl" value={post.topImage || ""} />
        </form>
      </div>
    </div>
  );
}
