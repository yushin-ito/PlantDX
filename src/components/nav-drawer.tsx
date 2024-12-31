"use client";

import {
  Gauge,
  ChartLine,
  Clock,
  Hand,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { memo, startTransition } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { cn } from "@/functions/tools";
import { signOut } from "@/actions/auth";
import { Button, buttonVariants } from "./ui/button";
import { VStack } from "./ui/vstack";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const routes = [
  {
    label: "フロー",
    href: "flow",
    icon: Gauge,
  },
  {
    label: "分析",
    href: "analytics",
    icon: ChartLine,
  },
  {
    label: "ログ",
    href: "history",
    icon: Clock,
  },
  {
    label: "操作",
    href: "control",
    icon: Hand,
  },
  {
    label: "設定",
    href: "settings",
    icon: Settings,
  },
];

const NavSheet = memo(() => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    startTransition(async () => {
      try {
        const { error } = await signOut();

        if (error) {
          toast.error("ログアウトに失敗しました");
          return;
        }

        toast.success("ログアウトしました");
        router.push("/login");
        router.refresh();
      } catch {
        toast.error("ログアウトに失敗しました");
      }
    });
  };

  return (
    <nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px]">
          <SheetHeader>
            <VisuallyHidden>
              <SheetTitle>ナビゲーション</SheetTitle>
              <SheetDescription />
            </VisuallyHidden>
          </SheetHeader>
          <VStack className="h-full items-center justify-between px-2 py-8">
            <VStack className="w-full space-y-8">
              {routes.map(({ label, href, icon: Icon }, index) => (
                <Link
                  key={index}
                  href={href}
                  className={cn(
                    buttonVariants({
                      variant:
                        href === pathname.split("/")[2] ? "brand" : "ghost",
                    }),
                    "relative w-full rounded-lg"
                  )}
                >
                  <Icon className="absolute left-5 size-[18px]" />
                  {label}
                </Link>
              ))}
            </VStack>

            <Button
              variant="ghost"
              className="relative w-full rounded-lg"
              onClick={onClick}
            >
              <LogOut className="absolute left-5 size-[18px]" />
              ログアウト
            </Button>
          </VStack>
        </SheetContent>
      </Sheet>
    </nav>
  );
});

export default NavSheet;
