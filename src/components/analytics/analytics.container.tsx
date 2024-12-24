"use client";

import { memo, useCallback, useRef, useState } from "react";
import { useQuery } from "@supabase-cache-helpers/postgrest-swr";
import { endOfDay, startOfDay } from "date-fns";
import toast from "react-hot-toast";

import AnalyticsPresenter from "./analytics.presenter";
import { getRecords, getSensors } from "@/functions/query";
import { createBrowserClient } from "@/functions/browser";
import { ChartStyle, FileType } from "@/types";

type AnalyticsContainerProps = {
  plantId: number;
  sensorId: number;
};

const AnalyticsContainer = memo(
  ({ plantId, sensorId }: AnalyticsContainerProps) => {
    const chartWrapper = useRef<HTMLDivElement>(null);

    const [date, setDate] = useState<Date>(new Date());
    const [period, setPeriod] = useState<{
      start: Date;
      end: Date;
    } | null>(null);

    const [style, setChart] = useState<ChartStyle>({
      type: "linear",
      xAxis: { type: "hide" },
      yAxis: { type: "hide" },
      grid: { horizontal: true, vertical: false },
      animation: { type: "disable" },
    });
    const [image, setImage] = useState<string | null>(null);

    const supabase = createBrowserClient();
    const sensors = useQuery(getSensors(supabase, "plantId", plantId));
    const records = useQuery(
      getRecords(supabase, "sensorId", sensorId)
        .gte(
          "createdAt",
          startOfDay(period ? period.start : date).toISOString()
        )
        .lte("createdAt", endOfDay(period ? period.end : date).toISOString())
    );

    const getPreview = useCallback((type: FileType = "png") => {
      if (chartWrapper.current) {
        const origin = chartWrapper.current.querySelector("svg");
        if (!origin) {
          return;
        }

        const element = origin.cloneNode(true) as SVGElement;

        element.style.fontSize = "12px";

        const brush = element.querySelector(".recharts-brush") as HTMLElement;
        if (brush) {
          brush.style.display = "none";
        }

        const svg = new XMLSerializer().serializeToString(element);
        const canvas = document.createElement("canvas");
        canvas.width = origin.clientWidth;
        canvas.height = origin.clientHeight - 40;

        const ctx = canvas.getContext("2d");
        const img = new Image();
        const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);

        img.onload = () => {
          if (ctx) {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            const uri =
              type === "jpg"
                ? canvas.toDataURL("image/jpeg")
                : canvas.toDataURL("image/png");
            setImage(uri);
          }
          URL.revokeObjectURL(url);
        };

        img.src = url;
      }
    }, []);

    const onExport = useCallback(
      ({ name, type }: { name: string; type: FileType }) => {
        if (!image) {
          toast.error("プレビューを確認してください");
          return;
        }

        const link = document.createElement("a");
        link.href = image;
        link.download = name + "." + type;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      [image]
    );

    return (
      <AnalyticsPresenter
        chartWrapper={chartWrapper}
        sensorId={sensorId}
        date={date}
        setDate={setDate}
        period={period}
        setPeriod={setPeriod}
        style={style}
        setStyle={setChart}
        sensors={sensors.data || []}
        records={records.data || []}
        isLoadingSensors={sensors.isLoading}
        isLoadingRecords={records.isLoading}
        image={image}
        getPreview={getPreview}
        onExport={onExport}
      />
    );
  }
);

export default AnalyticsContainer;
