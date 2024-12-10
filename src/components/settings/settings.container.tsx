"use client";

import { memo } from "react";
import {
  useQuery,
  useUpdateMutation,
} from "@supabase-cache-helpers/postgrest-swr";
import { z } from "zod";

import SettingsPresenter from "./settings.presenter";
import { getPlants } from "@/functions/query";
import { UpdatePlantSchema } from "@/schemas";
import { createBrowserClient } from "@/functions/browser";

type SettingsContainerProps = {
  plantId: number;
};

const SettingsCotainer = memo(({ plantId }: SettingsContainerProps) => {
  const supabase = createBrowserClient();
  const plant = useQuery(getPlants(supabase, "plantId", plantId).single());

  const { trigger: updatePlant, isMutating: isLoadingUpdatePlant } =
    useUpdateMutation(supabase.from("plant"), ["plantId"], "*", {
      throwOnError: true,
    });

  const updatePlantHandler = async (
    values: z.infer<typeof UpdatePlantSchema>
  ) => {
    await updatePlant(values);
  };

  return (
    <SettingsPresenter
      plant={plant.data || null}
      updatePlantHandler={updatePlantHandler}
      isLoadingUpdatePlant={isLoadingUpdatePlant}
    />
  );
});

export default SettingsCotainer;
