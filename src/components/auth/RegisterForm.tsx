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
import { createUser } from "@/lib/actuons/createUser";

export default function RegisterForm() {
  const [state, formActuon, isPending] = useActionState(createUser, {
    success: false,
    errors: {},
  });
  return (
    <div>
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader>
          <h2 className="text-lg font-bold">ユーザ登録</h2>
        </CardHeader>
        <CardContent>
          <form action={formActuon}>
            <div className="mb-4">
              <Label htmlFor="name">ユーザ名</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="ユーザ名を入力"
                required
              />
              {state.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.name.join(", ")}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="メールアドレスを入力"
                required
              />
              {state.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.email.join(", ")}
                </p>
              )}
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
            {state.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.password.join(", ")}
              </p>
            )}
            <div className="mb-4">
              <Label htmlFor="password">確認用パスワード</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="パスワードを入力"
                required
              />
            </div>
            {state.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {state.errors.confirmPassword.join(", ")}
              </p>
            )}

            <Button type="submit" disabled={isPending}>
              {isPending ? "登録中..." : "登録"}
            </Button>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
