"use client"

import { memo, useCallback, useState } from "react";
import {
  useInsertMutation,
  useQuery,
} from "@supabase-cache-helpers/postgrest-swr";
import { z } from "zod";

import ControlPresenter from "./control.presenter";
import { CreateControlSchema } from "@/schemas";
import { createBrowserClient } from "@/functions/browser";
import { getControls } from "@/functions/query";

type ControlContainerProps = {
  plantId: number;
};

const ControlCotainer = memo(({ plantId }: ControlContainerProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const supabase = createBrowserClient();
  const controls = useQuery(getControls(supabase, "plantId", plantId));

  const { trigger: insertControl, isMutating: isLoadingInsertControl } =
    useInsertMutation(supabase.from("control"), ["controlId"], "*", {
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
          commad: values.command,
          status: "pending",
        },
      ]);
    },
    [insertControl, plantId]
  );

  return (
    <ControlPresenter
      controls={controls.data || []}
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      createControlHandler={createControlHandler}
      isLoadingCreateControl={isLoadingInsertControl}
    />
  );
});

export default ControlCotainer;
