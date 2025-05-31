"use client";

import { memo, useCallback, useState } from "react";
import { useUpsertMutation } from "@supabase-cache-helpers/postgrest-swr";
import { z } from "zod";

import WalktroughPresenter from "./walkthrough.presenter";
import { CreateUserSchema, CreatePlantSchema } from "@/schemas";
import { createBrowserClient } from "@/functions/browser";

type WalktroughContainerProps = {
  userId: string;
};

const WalktroughContainer = memo(({ userId }: WalktroughContainerProps) => {
  const [plantId, setPlantId] = useState<number>();
  const [tab, setTab] = useState("0");

  const supabase = createBrowserClient();

  const { trigger: upsertUser, isMutating: isLoadingUpsertUser } =
    useUpsertMutation(supabase.from("user"), ["userId"], "*", {
      throwOnError: true,
    });

  const { trigger: upsertMember, isMutating: isLoadingUpsertMember } =
    useUpsertMutation(supabase.from("member"), ["memberId"], "*", {
      throwOnError: true,
    });

  const { trigger: upsertPlant, isMutating: isLoadingUpsertPlant } =
    useUpsertMutation(supabase.from("plant"), ["plantId"], "*", {
      throwOnError: true,
    });

  const upsertUserHandler = useCallback(
    async (values: z.infer<typeof CreateUserSchema>) => {
      const user = await upsertUser([
        {
          userId,
          name: values.name,
          color: values.color,
        },
      ]);

      if (!user || user.length === 0) {
        return;
      }
    },
    [upsertUser, userId]
  );

  const upsertPlantHandler = useCallback(
    async (values: z.infer<typeof CreatePlantSchema>) => {
      const plant = await upsertPlant([
        {
          name: values.name,
          deviceId: values.deviceId,
        },
      ]);

      if (!plant || plant.length === 0) {
        return;
      }

      const member = await upsertMember([
        {
          userId,
          plantId: plant[0].plantId,
          role: "owner",
        },
      ]);

      if (!member || member.length === 0) {
        return;
      }

      setPlantId(plant[0].plantId);
    },
    [upsertMember, upsertPlant, userId]
  );

  return (
    <WalktroughPresenter
      plantId={plantId}
      tab={tab}
      setTab={setTab}
      upsertUserHandler={upsertUserHandler}
      isLoadingUpsertUser={isLoadingUpsertUser}
      upsertPlantHandler={upsertPlantHandler}
      isLoadingUpsertPlant={isLoadingUpsertPlant || isLoadingUpsertMember}
    />
  );
});

export default WalktroughContainer;
