import Link from "next/link";
import { Button } from "@/components/ui/button";
import SerachBox from "@/components/post/SerachBox";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function PublicHeader() {
  return (
    <div>
      <header className="border-b bg-blue-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" className="text-2xl font-bold">
                  Blog
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <SerachBox />
            <Link href="/login">
              <Button variant="outline" className="mr-2">
                ログイン
              </Button>
            </Link>
            <Link href="/register">
              <Button>登録</Button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
