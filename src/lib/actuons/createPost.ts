"use server";
import { z } from "zod";
import { postSchema, PostSchema } from "@/validations/post";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { uploadImage } from "@/utils/image";
import { auth } from "@/auth";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

function handleValidationError(errors: z.ZodError<PostSchema>): ActionState {
  const { fieldErrors, formErrors } = errors.flatten();
  if (formErrors.length > 0) {
    return {
      success: false,
      errors: { ...fieldErrors, topImage: formErrors },
    };
  } else {
    return {
      success: false,
      errors: fieldErrors,
    };
  }
}

export async function createPost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォームからのデータを取得
  const title = formData.get("title") ? String(formData.get("title")) : "";
  const content = formData.get("content")
    ? String(formData.get("content"))
    : "";
  const topImage =
    formData.get("topImage") instanceof File
      ? (formData.get("topImage") as File)
      : null;

  // バリデーションチェック
  const validationResult = postSchema.safeParse({
    title,
    content,
    topImage,
  });
  if (!validationResult.success) {
    return handleValidationError(validationResult.error);
  }
  //画像を保存
  const imageUrl = topImage ? await uploadImage(topImage) : null;
  if (topImage && !imageUrl) {
    return {
      success: false,
      errors: { topImage: ["画像のアップロードに失敗しました。"] },
    };
  }

  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user.email || !userId) {
    throw new Error("User not authenticated");
  }

  console.log(session.user);
  // DBに新しい投稿を作成
  await prisma.post.create({
    data: {
      title,
      content,
      topImage: imageUrl,
      published: false, // 初期状態では非公開
      authorId: userId, // 認証されたユーザーのIDを使用
    },
  });

  console.log("Post created successfully:", {
    title,
    content,
    topImage: imageUrl,
    authorId: userId,
  });

  // ダッシュボードにリダイレクト
  redirect("/dashboard");
}
