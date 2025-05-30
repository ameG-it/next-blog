"use server";

import { registerSchema } from "@/validations/user";
import z from "zod";
import { RegisterSchema } from "@/validations/user";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

function handleValidationError(
  errors: z.ZodError<RegisterSchema>
): ActionState {
  const { fieldErrors, formErrors } = errors.flatten();
  if (formErrors.length > 0) {
    return {
      success: false,
      errors: { ...fieldErrors, confirmPassword: formErrors },
    };
  } else {
    return {
      success: false,
      errors: fieldErrors,
    };
  }
}

export async function createUser(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  //フォームからのデータを取得
  const rowFormData = Object.fromEntries(
    ["name", "email", "password", "confirmPassword"].map((key) => [
      key,
      formData.get(key) ? String(formData.get(key)) : "",
    ])
  );

  const validationResult = registerSchema.safeParse(rowFormData);
  if (!validationResult.success) {
    return handleValidationError(validationResult.error);
  }

  //メールアドレスの存在を確認
  const existingUser = await prisma.user.findUnique({
    where: { email: rowFormData.email },
  });
  if (existingUser) {
    return {
      success: false,
      errors: { email: ["このメールアドレスはすでに使用されています。"] },
    };
  }

  //DBに新しいユーザーを作成
  await prisma.user.create({
    data: {
      name: rowFormData.name,
      email: rowFormData.email,
      password: await bcrypt.hash(rowFormData.password, 12),
    },
  });

  //dashboardにリダイレクト
  await signIn("credentials", {
    ...Object.fromEntries(formData),
    redirect: false, // リダイレクトを無効にして、手動でリダイレクトを行う
  });
  redirect("/dashboard");
}
