"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChartLine, Clock, Hand, Home, LogOut, Settings } from "lucide-react";
import { memo } from "react";

import HStack from "../atoms/HStack";
import VStack from "../atoms/VStack";
import { signOut } from "@/functions/auth";

const NavBar = memo(() => {
  const router = useRouter();
  const pathname = usePathname().replace("/", "");

  const labels = [
    {
      label: "home",
      title: "ホーム",
      icon: Home,
    },
    {
      label: "graph",
      title: "グラフ",
      icon: ChartLine,
    },
    {
      label: "log",
      title: "ログ",
      icon: Clock,
    },
    {
      label: "operation",
      title: "操作",
      icon: Hand,
    },
    {
      label: "settings",
      title: "設定",
      icon: Settings,
    },
  ];

  return (
    <VStack className="h-full w-72 shrink-0 items-center justify-between bg-white py-12 shadow-md">
      <VStack className=" w-full items-center space-y-8">
        {labels.map(({ label, title, icon: Icon }, index) => (
          <Link key={index} href={label} className="w-4/5">
            <HStack
              className={`w-full items-center justify-center ${
                pathname === label
                  ? "bg-brand-600 hover:bg-brand-700 active:bg-brand-800"
                  : "hover:bg-gray-100 active:bg-gray-200"
              } relative rounded-xl py-3`}
            >
              <Icon
                className={`absolute left-5 size-6 ${pathname === label ? "text-white" : "text-gray-600"}`}
              />
              <div
                className={`${pathname === label ? "text-white" : "text-gray-600"} `}
              >
                {title}
              </div>
            </HStack>
          </Link>
        ))}
      </VStack>

      <HStack
        className="relative w-4/5 items-center justify-center rounded-xl py-3 hover:bg-gray-100 active:bg-gray-200"
        onClick={async () => {
          await signOut();
          router.push("/login");
          router.refresh();
        }}
      >
        <LogOut className="absolute left-5 size-5 text-gray-600" />
        <div className="text-gray-600">ログアウト</div>
      </HStack>
    </VStack>
  );
});

export default NavBar;
