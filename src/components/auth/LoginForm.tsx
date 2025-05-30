"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { authenticate } from "@/lib/actuons/authenticate";
import Link from "next/link";

export default function LoginForm() {
  const [errorMessage, formActuon, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <div>
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <h2 className="text-lg font-bold">ログイン</h2>
        </CardHeader>
        <CardContent>
          <form action={formActuon}>
            <div className="mb-4">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="メールアドレスを入力"
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="パスワードを入力"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            アカウントをお持ちでない場合は、登録してください。
          </p>
          <Link href="/register" className="text-blue-500 hover:underline">
            ユーザ登録
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
