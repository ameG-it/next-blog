import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { auth } from "@/auth";
import Setting from "@/components/layouts/Setting";

export default async function PrivateHeader() {
  // Check if the user is authenticated
  const session = await auth();
  if (!session?.user?.email) throw new Error("不正なアクセスです。");

  return (
    <div>
      <header className="border-b bg-blue-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/dashboard" className="text-2xl font-bold">
                  管理ページ
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <Setting session={session} />
          </div>
        </div>
      </header>
    </div>
  );
}
