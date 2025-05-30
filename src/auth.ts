import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUserByEmail } from "./lib/user";
import bcrypt from "bcryptjs";

/**
 * NextAuthの設定を行い、認証関連の関数やハンドラをエクスポートします。
 *
 * @constant
 * @property {object} auth - 認証に関する設定オブジェクト。
 * @property {Function} signIn - サインイン処理を行う関数。
 * @property {Function} signOut - サインアウト処理を行う関数。
 * @property {object} handlers - 認証関連のハンドラ。
 *
 * @description
 * `NextAuth`を使用して認証を設定します。`authConfig`をベースにし、プロバイダーとして
 * `Credentials`を使用しています。`authorize`メソッドでは、渡された資格情報を検証し、
 * 有効でない場合はエラーをスローします。
 *
 * @throws {Error} 資格情報が無効な場合にスローされます。
 */
// NextAuthの設定をエクスポートします。
// `auth`、`signIn`、`signOut`、`handlers`を提供し、認証関連の操作を簡単に行えるようにします。
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    //ユーザーが入力した資格情報（例: メールアドレスとパスワード）を使用して認証を行うためのプロバイダー
    Credentials({
      // `authorize`メソッドは、資格情報を検証し、ユーザーを認証します。
      async authorize(credentials) {
        // 資格情報をZodスキーマで検証します。
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          // メールアドレスでユーザーを取得します。
          const user = await getUserByEmail(email);
          if (!user) return null;
          // パスワードを検証します。
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (isValidPassword) return user;
        }
        // 資格情報が無効な場合はnullを返します。
        return null;
      },
    }),
  ],
});
