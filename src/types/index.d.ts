import {
  PLANT_TEMPLATE,
  SENSOR_TYPE,
  CONTROL_TYPE,
  CONTROL_EVENT,
  CONTROL_STATUS,
  DASHBOARD_ROUTE,
  AUTH_ROUTE,
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

export type Control = Database["public"]["Tables"]["control"];
export type Device = Database["public"]["Tables"]["device"];
export type Edge = Database["public"]["Tables"]["edge"];
export type Action = Database["public"]["Tables"]["action"];
export type Member = Database["public"]["Tables"]["member"];
export type Measure = Database["public"]["Tables"]["measure"];
export type Node = Database["public"]["Tables"]["node"];
export type Plant = Database["public"]["Tables"]["plant"];
export type Sensor = Database["public"]["Tables"]["sensor"];
export type User = Database["public"]["Tables"]["user"];
