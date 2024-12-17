import { SupabaseClient } from "@supabase/supabase-js";

import {
  Control,
  Device,
  Edge,
  Member,
  Node,
  Plant,
  Sensor,
  Record,
  Action,
} from "@/types";
import { Database } from "@/types/schema";

export const getPlants = <Column extends keyof Plant["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Exclude<Plant["Row"][Column], null>
) => supabase.from("plant").select().eq(column, value).throwOnError();

export const getMembers = <Column extends keyof Member["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Exclude<Member["Row"][Column], null>
) =>
  supabase
    .from("member")
    .select("*, plant:plant(*)")
    .eq(column, value)
    .throwOnError();

export const getNodes = <Column extends keyof Node["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Exclude<Node["Row"][Column], null>
) => supabase.from("node").select().eq(column, value).throwOnError();

export const getEdges = <Column extends keyof Edge["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Exclude<Edge["Row"][Column], null>
) => supabase.from("edge").select().eq(column, value).throwOnError();

export const getSensors = <Column extends keyof Sensor["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Exclude<Sensor["Row"][Column], null>
) =>
  supabase
    .from("sensor")
    .select("*, node:node(*)")
    .eq(column, value)
    .throwOnError();

export const getRecords = <Column extends keyof Record["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Exclude<Record["Row"][Column], null>
) => supabase.from("record").select().eq(column, value).throwOnError();

export const getActions = <Column extends keyof Action["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Exclude<Action["Row"][Column], null>
) => supabase.from("action").select().eq(column, value).throwOnError();

export const getDevices = <Column extends keyof Device["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Exclude<Device["Row"][Column], null>
) => supabase.from("device").select().eq(column, value).throwOnError();

export const getControls = <Column extends keyof Control["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Exclude<Control["Row"][Column], null>
) => supabase.from("control").select().eq(column, value).throwOnError();
