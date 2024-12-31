"use client";

import { memo, useCallback, useState } from "react";
import {
  useInsertMutation,
  useQuery,
  useUpdateMutation,
} from "@supabase-cache-helpers/postgrest-swr";
import { z } from "zod";

import ControlPresenter from "./control.presenter";
import { CreateControlSchema, UpdateControlSchema } from "@/schemas";
import { createBrowserClient } from "@/functions/browser";
import { getControls } from "@/functions/query";

type ControlContainerProps = {
  plantId: number;
};

const ControlCotainer = memo(({ plantId }: ControlContainerProps) => {
  const [isDraggable, setIsDraggable] = useState(false);
  const [isOpenCreateControlSheet, setIsOpenCreateControlSheet] =
    useState(false);
  const [isOpenUpdateControlSheet, setIsOpenUpdateControlSheet] =
    useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const supabase = createBrowserClient();
  const controls = useQuery(getControls(supabase, "plantId", plantId));

  const { trigger: insertControl, isMutating: isLoadingInsertControl } =
    useInsertMutation(supabase.from("control"), ["controlId"], "*", {
      throwOnError: true,
    });

  const { trigger: updateControl, isMutating: isLoadingUpdateControl } =
    useUpdateMutation(supabase.from("control"), ["controlId"], "*", {
      throwOnError: true,
    });

  const createControlHandler = useCallback(
    async (values: z.infer<typeof CreateControlSchema>) => {
      await insertControl([
        {
          name: values.name,
          plantId,
          type: values.type,
          event: values.event,
          command: values.command,
          status: "pending",
        },
      ]);
    },
    [insertControl, plantId]
  );

  const updateControlHandler = useCallback(
    async (values: z.infer<typeof UpdateControlSchema>) => {
      if (selectedId) {
        await updateControl({
          controlId: selectedId,
          name: values.name,
          type: values.type,
          event: values.event,
          command: values.command,
          status: "pending",
        });
      }
    },
    [selectedId, updateControl]
  );

  return (
    <ControlPresenter
      controls={controls.data || []}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      isDraggable={isDraggable}
      setIsDraggable={setIsDraggable}
      isOpenCreateControlSheet={isOpenCreateControlSheet}
      setIsOpenCreateControlSheet={setIsOpenCreateControlSheet}
      isOpenUpdateControlSheet={isOpenUpdateControlSheet}
      setIsOpenUpdateControlSheet={setIsOpenUpdateControlSheet}
      createControlHandler={createControlHandler}
      isLoadingCreateControl={isLoadingInsertControl}
      updateControlHandler={updateControlHandler}
      isLoadingUpdateControl={isLoadingUpdateControl}
    />
  );
});

export default ControlCotainer;
