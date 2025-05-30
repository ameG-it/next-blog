import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  //ユーザーがサインインしようとしたときに、デフォルトのNextAuthサインインページではなく、/loginパスにリダイレクトするように設定
  // これは、NextAuthのデフォルトのサインインページを使用せずに、カスタムサインインページを使用するためのものです。
  // これにより、ユーザーは/ログインパスにリダイレクトされます。
  // これは、NextAuthのデフォルトのサインインページを使用せずに、カスタムサインインページを使用するためのものです。
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      //ユーザが認証済みかどうかを確認
      const isLoggedIn = !!auth?.user;
      console.log("isLoggedIn:", isLoggedIn);
      console.log("nextUrl:", nextUrl);
      //遷移先が権限が必要なページかどうかを確認
      const isOnRegistered =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/manage");
      //ユーザが認証済みで、遷移先が権限が必要なページの場合、trueを返す
      if (isOnRegistered) {
        if (isLoggedIn) return true;
        return Response.redirect(new URL("/login", nextUrl));
        //認証済みであればダッシュボードにリダイレクト
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      //ユーザが未認証で、遷移先が権限が必要なページでない場合、trueを返す
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
