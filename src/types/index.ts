export type Log = {
  id: number;
  type: "auto" | "manual";
  title: string;
  command: string;
  status: "success" | "failed";
  date: string;
};
