import { AnimationTiming } from "recharts/types/util/types";

import {
  PLANT_TEMPLATE,
  SENSOR_TYPE,
  CONTROL_TYPE,
  CONTROL_EVENT,
  CONTROL_STATUS,
  DASHBOARD_ROUTE,
  AUTH_ROUTE,
  FILE_TYPE,
} from "@/constants";
import { Database } from "./schema";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    title?: string;
  }
}

export type DashboardRoute = (typeof DASHBOARD_ROUTE)[number];
export type AuthRoute = (typeof AUTH_ROUTE)[number];

export type PlantTemplate = (typeof PLANT_TEMPLATE)[number];
export type SensorType = (typeof SENSOR_TYPE)[number];
export type ControlType = (typeof CONTROL_TYPE)[number];
export type ControlEvent = (typeof CONTROL_EVENT)[number];
export type ControlStatus = (typeof CONTROL_STATUS)[number];
export type FileType = (typeof FILE_TYPE)[number];

export type Control = Database["public"]["Tables"]["control"];
export type Device = Database["public"]["Tables"]["device"];
export type Edge = Database["public"]["Tables"]["edge"];
export type History = Database["public"]["Tables"]["history"];
export type Member = Database["public"]["Tables"]["member"];
export type Record = Database["public"]["Tables"]["record"];
export type Node = Database["public"]["Tables"]["node"];
export type Plant = Database["public"]["Tables"]["plant"];
export type Sensor = Database["public"]["Tables"]["sensor"];
export type User = Database["public"]["Tables"]["user"];

type LineChartStyle = {
  type: "linear" | "monotone" | "scatter";
};

type XAxisStyle = {
  type: "show" | "hide" | "custom";
  min?: number;
  max?: number;
};

type YAxisStyle = {
  type: "show" | "hide" | "custom";
  min?: string;
  max?: string;
};

type GridStyle = {
  horizontal: boolean;
  vertical: boolean;
};

type AnimationStyle = {
  type: "enable" | "disable" | "custom";
  easing?: AnimationTiming;
  duration?: number;
};

export type ChartStyle = LineChartStyle & {
  xAxis: XAxisStyle;
  yAxis: YAxisStyle;
  grid: GridStyle;
  animation: AnimationStyle;
};
