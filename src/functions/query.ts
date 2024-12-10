import { SupabaseClient } from "@supabase/supabase-js";

import { Control, Device, Member, Node, Plant } from "@/types";
import { Database } from "@/types/schema";

export const getPlants = <Column extends keyof Plant["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Plant["Row"][Column]
) => supabase.from("plant").select().eq(column, value).throwOnError();

export const getMembers = <Column extends keyof Member["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Member["Row"][Column]
) =>
  supabase
    .from("member")
    .select("*, plant:plant(*)")
    .eq(column, value)
    .throwOnError();

export const getNodes = <Column extends keyof Node["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Node["Row"][Column]
) => supabase.from("node").select().eq(column, value).throwOnError();

export const getEdges = <Column extends keyof Node["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Node["Row"][Column]
) => supabase.from("edge").select().eq(column, value).throwOnError();

export const getActions = <Column extends keyof Node["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Node["Row"][Column]
) => supabase.from("action").select().eq(column, value).throwOnError();

export const getDevices = <Column extends keyof Device["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Device["Row"][Column]
) => supabase.from("device").select().eq(column, value).throwOnError();

export const getControls = <Column extends keyof Control["Row"]>(
  supabase: SupabaseClient<Database>,
  column: Column,
  value: Control["Row"][Column]
) => supabase.from("control").select().eq(column, value).throwOnError();
