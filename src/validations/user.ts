import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "名前は必須です" })
      .min(1, "名前は必須です"),
    email: z
      .string({ required_error: "メールアドレスは必須です" })
      .min(1, "メールアドレスは必須です")
      .email("有効なメールアドレスを入力してください"),
    password: z
      .string({ required_error: "パスワードは必須です" })
      .min(1, "パスワードは必須です")
      .min(8, "パスワードは8文字以上である必要があります")
      .max(32, "パスワードは32文字以下である必要があります"),
    confirmPassword: z
      .string({ required_error: "パスワードの確認は必須です" })
      .min(6, "パスワードは6文字以上である必要があります"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
