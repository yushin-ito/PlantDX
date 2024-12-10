"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChartLine, Clock, Gauge, Hand, LogOut, Settings } from "lucide-react";
import { memo, startTransition } from "react";
import toast from "react-hot-toast";

import { signOut } from "@/actions/auth";
import { Button, buttonVariants } from "./ui/button";
import { VStack } from "./ui/vstack";
import { cn } from "@/functions/tools";

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
    href: "actions",
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

const NavBar = memo(() => {
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
      <VStack className="h-full w-[240px] items-center justify-between border-r px-6 py-12 dark:border-neutral-800">
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
    </nav>
  );
});

export default NavBar;
