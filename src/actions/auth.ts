"use server";

import { createServerClient } from "@/functions/server";

export const getAuth = async () => {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const signUp = async (email: string, password: string) => {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(data, error);

    if (error) {
      throw error;
    }

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const supabase = await createServerClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return { error };
  } catch (error) {
    return { error };
  }
};

export const verifyOtp = async (email: string, token: string) => {
  try {
    const supabase = await createServerClient();

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) {
      throw error;
    }

    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
};
