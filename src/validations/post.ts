import z from "zod";

export const postSchema = z.object({
  title: z
    .string({
      required_error: "タイトルは必須です",
    })
    .min(3, "タイトルは3文字以上である必要があります")
    .max(100, "タイトルは100文字以下である必要があります"),
  content: z
    .string({
      required_error: "コンテンツは必須です",
    })
    .min(10, "コンテンツは10文字以上である必要があります")
    .max(5000, "コンテンツは5000文字以下である必要があります"),
  topImage: z.instanceof(File).nullable().optional(),
});
