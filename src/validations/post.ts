import z from "zod";

export const postSchema = z.object({
  title: z
    .string({
      message: "タイトルは必須です",
    })
    .min(3, { message: "タイトルは3文字以上である必要があります" })
    .max(100, { message: "タイトルは100文字以下である必要があります" }),
  content: z
    .string({
      message: "コンテンツは必須です",
    })
    .min(10, { message: "コンテンツは10文字以上である必要があります" })
    .max(5000, { message: "コンテンツは5000文字以下である必要があります" }),
  topImage: z.instanceof(File).nullable().optional(),
});

export type PostSchema = z.infer<typeof postSchema>;
