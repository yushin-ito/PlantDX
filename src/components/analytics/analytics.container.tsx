"use client";

import { memo } from "react";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";

import AnalyticsPresenter from "./analytics.presenter";
import { getRecords, getSensors } from "@/functions/query";
import { createBrowserClient } from "@/functions/browser";

type AnalyticsContainerProps = {
  plantId: number;
  sensorId: number;
};

const AnalyticsContainer = memo(
  ({ plantId, sensorId }: AnalyticsContainerProps) => {
    const supabase = createBrowserClient();
    const sensors = useQuery(getSensors(supabase, "plantId", plantId));
    const records = useQuery(getRecords(supabase, "sensorId", sensorId));

    return (
      <AnalyticsPresenter
        sensorId={sensorId}
        sensors={sensors.data || []}
        records={records.data || []}
        isLoadingRecords={records.isLoading}
      />
    );
  }
);

export default AnalyticsContainer;
