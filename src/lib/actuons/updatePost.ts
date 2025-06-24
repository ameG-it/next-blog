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

export async function updatePost(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  console.log("Updating post with form data...");
  console.log("FormData:", Object.fromEntries(formData.entries()));
  // フォームからのデータを取得
  const id = formData.get("id") ? String(formData.get("id")) : null;
  console.log("Post ID:", id);
  if (!id) {
    return {
      success: false,
      errors: { id: ["IDが必要です。"] },
    };
  }
  const title = formData.get("title") ? String(formData.get("title")) : "";
  const content = formData.get("content")
    ? String(formData.get("content"))
    : "";

  const published = formData.get("published")
    ? Boolean(formData.get("published"))
    : false;
  const topImage =
    formData.get("topImage") instanceof File
      ? (formData.get("topImage") as File)
      : null;
  const oldImageUrl = formData.get("oldImageUrl")
    ? String(formData.get("oldImageUrl"))
    : null;

  // バリデーションチェック
  const validationResult = postSchema.safeParse({
    title,
    content,
    topImage,
  });
  console.log("Validation result:", validationResult);
  if (!validationResult.success) {
    return handleValidationError(validationResult.error);
  }
  //画像を保存
  console.log("Uploading image if necessary...");
  let imageUrl: string | null = oldImageUrl;
  if (
    topImage instanceof File &&
    topImage.size > 0 &&
    topImage.name !== undefined
  ) {
    const newImageUrl = await uploadImage(topImage);
    if (!newImageUrl) {
      return {
        success: false,
        errors: { topImage: ["画像のアップロードに失敗しました。"] },
      };
    }
    imageUrl = newImageUrl;
  }
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user.email || !userId) {
    throw new Error("User not authenticated");
  }

  // DBに新しい投稿を作成
  await prisma.post.update({
    where: { id },
    data: {
      title,
      content,
      topImage: imageUrl,
      published: published, // 初期状態では非公開
      authorId: userId, // 認証されたユーザーのIDを使用
    },
  });

  console.log("Post created successfully:", {
    title,
    content,
    topImage: imageUrl,
    authorId: userId,
  });

  console.log("update action end");
  // ダッシュボードにリダイレクト
  redirect("/dashboard");
}
