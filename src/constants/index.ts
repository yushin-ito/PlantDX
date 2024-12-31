export const AUTH_ROUTE = ["signup", "login", "verify"] as const;
export const DASHBOARD_ROUTE = [
  "flow",
  "analytics",
  "history",
  "control",
  "settings",
] as const;

export const PLANT_TEMPLATE = ["none", "bdf"] as const;

export const SENSOR_TYPE = [
  "temperature",
  "humidity",
  "pressure",
  "volume",
] as const;

export const CONTROL_TYPE = ["auto", "manual"] as const;

export const CONTROL_EVENT = [
  "on-off",
  "open-close",
  "enable-disable",
  "connect-disconnect",
] as const;

export const CONTROL_STATUS = ["active", "inactive", "pending"] as const;

export const FILE_TYPE = ["png", "jpg"] as const;
