"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("FormData:", Object.fromEntries(formData.entries()));
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false, // リダイレクトを無効にして、手動でリダイレクトを行う
    });
    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "メールアドレスまたはパスワードが正しくありません。";
        default:
          return "エラーが発生しました。";
      }
    }
    throw error;
  }
}
