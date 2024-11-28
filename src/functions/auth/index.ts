"use server";

import { z } from "zod";

import { SignUpSchema, SignInSchema } from "@/schemas";
import { createServerClient } from "@/functions/client";

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
  try {
    const supabase = await createServerClient();

    const { data } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL,
      },
    });

    if (data && data.user) {
      if (data.user.identities && data.user.identities.length > 0) {
      } else {
        return {
          error: "このメールアドレスは既に登録されています。",
        };
      }
    } else {
      return { error: "エラーが発生しました。" };
    }
  } catch {
    return { error: "エラーが発生しました。" };
  }
};

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    const supabase = await createServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      ...values,
    });

    if (error) {
      return { error: "エラーが発生しました。" };
    }
  } catch {
    return { error: "エラーが発生しました。" };
  }
};

export const signOut = async () => {
  try {
    const supabase = await createServerClient();

    await supabase.auth.signOut();
  } catch {
    return { error: "エラーが発生しました。" };
  }
};