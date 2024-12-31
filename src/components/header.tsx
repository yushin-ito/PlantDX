"use client";

import { usePathname } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";
import {
  useInsertMutation,
  useQuery,
} from "@supabase-cache-helpers/postgrest-swr";
import { z } from "zod";

import PlnatSwitcher from "./plant-switcher";
import ColorModeSwitcher from "./color-mode-switcher";
import { HStack } from "./ui/hstack";
import { createBrowserClient } from "@/functions/browser";
import { getMembers } from "@/functions/query";
import { CreatePlantSchema } from "@/schemas";
import CreatePlantSheet from "./create-plant-sheet";
import { DashboardRoute } from "@/types";
import useBreakpoint from "@/hooks/use-breakpoint";
import NavDrawer from "./nav-drawer";

const routes: Record<DashboardRoute, string> = {
  flow: "フロー",
  analytics: "分析",
  history: "ログ",
  control: "操作",
  settings: "設定",
};

type HeaderProps = {
  userId: string;
  plantId: number;
};

const Header = memo(({ userId, plantId }: HeaderProps) => {
  const basename = usePathname().split("/")[2];
  const breakpoint = useBreakpoint({ fallback: "sm" });

  const [isOpenSheet, setIsOpenSheet] = useState(false);

  const supabase = createBrowserClient();

  const members = useQuery(getMembers(supabase, "userId", userId));
  const plants = useMemo(
    () =>
      members.data
        ?.map((member) => member.plant)
        .filter((plant) => plant !== null),
    [members.data]
  );

  const { trigger: insertMember, isMutating: isLoadingInsertMember } =
    useInsertMutation(supabase.from("member"), ["memberId"], "*", {
      throwOnError: true,
    });

  const { trigger: insertPlant, isMutating: isLoadingInsertPlant } =
    useInsertMutation(supabase.from("plant"), ["plantId"], "*", {
      throwOnError: true,
    });

  const createPlantHandler = useCallback(
    async (values: z.infer<typeof CreatePlantSchema>) => {
      const plant = await insertPlant([
        {
          name: values.name,
          deviceId: values.deviceId,
        },
      ]);

      if (!plant || plant.length === 0) {
        return;
      }

      const member = await insertMember([
        {
          userId,
          plantId: plant[0].plantId,
          role: "owner",
        },
      ]);

      if (!member || member.length === 0) {
        return;
      }
    },
    [insertMember, insertPlant, userId]
  );

  return (
    <header className="w-full">
      <HStack className="items-center justify-between px-8 pb-2 pt-6 sm:pt-4">
        <h2 className="text-xl font-bold">
          {routes[basename as DashboardRoute]}
        </h2>
        <HStack className="space-x-4">
          {breakpoint !== "sm" && (
            <PlnatSwitcher
              plantId={plantId}
              plants={plants || []}
              onSwitch={() => {
                setIsOpenSheet(true);
              }}
            />
          )}
          <ColorModeSwitcher />
          {(breakpoint === "sm" || breakpoint === "md") && <NavDrawer />}
        </HStack>
      </HStack>
      <CreatePlantSheet
        isOpen={isOpenSheet}
        setIsOpen={setIsOpenSheet}
        createPlantHandler={createPlantHandler}
        isLoadingCreatePlant={isLoadingInsertPlant || isLoadingInsertMember}
      />
    </header>
  );
});

export default Header;
