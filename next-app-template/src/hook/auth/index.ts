import {
  SignUpWithPasswordCredentials,
  SignInWithPasswordCredentials,
  AuthError,
  Provider,
} from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

import supabase from "@/src/supabase";
import { UseMutationResult } from "@/types";

export type SignUpWithEmailResponse = Awaited<
  ReturnType<typeof signUpWithEmail>
>;
export type SignInWithEmailResponse = Awaited<
  ReturnType<typeof signInWithEmail>
>;
export type SignInWithProviderResponse = Awaited<
  ReturnType<typeof signInWithProvider>
>;
export type SignOutResponse = Awaited<ReturnType<typeof signOut>>;

const signUpWithEmail = async (credentials: SignUpWithPasswordCredentials) => {
  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    throw error;
  }

  return data;
};

const signInWithEmail = async (credentials: SignInWithPasswordCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    throw error;
  }

  return data;
};

const signInWithProvider = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
};

export const useSignUpWithEmail = ({
  onSuccess,
  onError,
}: UseMutationResult<SignUpWithEmailResponse, AuthError>) =>
  useMutation({
    mutationFn: signUpWithEmail,
    onSuccess,
    onError,
  });

export const useSignInWithEmail = ({
  onSuccess,
  onError,
}: UseMutationResult<SignInWithEmailResponse, AuthError>) =>
  useMutation({
    mutationFn: signInWithEmail,
    onSuccess,
    onError,
  });

export const useSignInWithProvider = ({
  onSuccess,
  onError,
}: UseMutationResult<SignInWithProviderResponse, Error>) =>
  useMutation({
    mutationFn: signInWithProvider,
    onSuccess,
    onError,
  });

export const useSignOut = ({
  onSuccess,
  onError,
}: UseMutationResult<SignOutResponse, AuthError>) =>
  useMutation({
    mutationFn: signOut,
    onSuccess,
    onError,
  });
