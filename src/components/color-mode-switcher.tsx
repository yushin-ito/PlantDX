"use client";

import { Check, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { memo } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ColorModeSwitcher = memo(() => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="justify-between"
        >
          ライト
          <Check className={theme === "light" ? "opacity-100" : "opacity-0"} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="justify-between"
        >
          ダーク
          <Check className={theme === "dark" ? "opacity-100" : "opacity-0"} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="justify-between"
        >
          システム
          <Check className={theme === "system" ? "opacity-100" : "opacity-0"} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default ColorModeSwitcher;
