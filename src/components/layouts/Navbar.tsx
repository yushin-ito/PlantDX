"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChartLine, Clock, Hand, Home, LogOut, Settings } from "lucide-react";
import { memo, startTransition } from "react";
import toast from "react-hot-toast";

import { signOut } from "@/functions/auth";
import { Button } from "../ui/button";
import { VStack } from "../ui/vstack";

const routes = {
  home: {
    title: "ホーム",
    icon: Home,
  },
  graph: {
    title: "グラフ",
    icon: ChartLine,
  },
  log: {
    title: "ログ",
    icon: Clock,
  },
  control: {
    title: "操作",
    icon: Hand,
  },
  settings: {
    title: "設定",
    icon: Settings,
  },
};

const Navbar = memo(() => {
  const router = useRouter();
  const basename = usePathname().split("/")[1];

  const onClick = () => {
    startTransition(async () => {
      try {
        const res = await signOut();

        if (res?.error) {
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
    <VStack className="h-full w-60 items-center justify-between border-r px-6 py-12 dark:border-neutral-800">
      <VStack className="w-full space-y-8">
        {Object.entries(routes).map(([key, { title, icon: Icon }], index) => (
          <Link key={index} href={key}>
            <Button
              variant={basename === key ? "brand" : "ghost"}
              className="relative w-full rounded-lg"
            >
              <Icon className="absolute left-5 size-[18px]" />
              {title}
            </Button>
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
  );
});

export default Navbar;
