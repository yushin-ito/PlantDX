"use client";

import { usePathname } from "next/navigation";

import HStack from "../atoms/HStack";
import ColorModeSwitcher from "../molecules/ColorModeSwitcher";
import PlnatSwitcher from "../molecules/PlantSwitcher";

const routes: Record<string, string> = {
  home: "ホーム",
  graph: "グラフ",
  log: "ログ",
  operation: "操作",
  settings: "設定",
};

const Header = () => {
  const basename = usePathname().split("/")[1];

  return (
    <header className="w-full">
      <HStack className="items-center justify-between px-8 pb-2 pt-5">
        <h2 className="text-xl font-bold">{routes[basename]}</h2>
        <HStack className="space-x-4">
          <PlnatSwitcher />
          <ColorModeSwitcher />
        </HStack>
      </HStack>
    </header>
  );
};

export default Header;
