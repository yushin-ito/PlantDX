import { PostgrestError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

import supabase from "@/src/supabase";
import { UseMutationResult, User } from "@/types";

export type PostUserResponse = Awaited<ReturnType<typeof postUser>>;
export type UpdateUserResponse = Awaited<ReturnType<typeof updateUser>>;
export type DeleteUserResponse = Awaited<ReturnType<typeof deleteUser>>;
export type PostAvatarResponse = Awaited<ReturnType<typeof postAvatar>>;
export type SearchUserResponse = Awaited<ReturnType<typeof searchUser>>;

const postUser = async (user: User["Insert"]) => {
  const { data, error } = await supabase
    .from("user")
    .insert(user)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const updateUser = async (user: User["Update"]) => {
  if (!user.userId) {
    throw Error();
  }

  const { data, error } = await supabase
    .from("user")
    .update(user)
    .eq("userId", user.userId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const deleteUser = async (userId: number) => {
  const { data, error } = await supabase
    .from("user")
    .delete()
    .eq("userId", userId)
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const postAvatar = async () => {
  const filePath = `avatar/${Math.random()}.png`;

  /* const { data, error } = await supabase.storage
    .from("image")
    .upload(filePath, , {
      contentType: "image",
      upsert: true,
    }); 

  if (error) {
    throw error;
  }
  return data; */
};

const searchUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("user")
    .select()
    .eq("userId", userId);

  if (error) {
    throw error;
  }
  return data;
};

export const usePostUser = ({
  onSuccess,
  onError,
}: UseMutationResult<PostUserResponse, PostgrestError>) =>
  useMutation({
    mutationFn: postUser,
    onSuccess,
    onError,
  });

export const useUpdateUser = ({
  onSuccess,
  onError,
}: UseMutationResult<UpdateUserResponse, PostgrestError>) =>
  useMutation({
    mutationFn: updateUser,
    onSuccess,
    onError,
  });

export const useDeleteUser = ({
  onSuccess,
  onError,
}: UseMutationResult<DeleteUserResponse, PostgrestError>) =>
  useMutation({
    mutationFn: deleteUser,
    onSuccess,
    onError,
  });

export const usePostAvatar = ({
  onSuccess,
  onError,
}: UseMutationResult<PostAvatarResponse, Error>) =>
  useMutation({
    mutationFn: postAvatar,
    onSuccess,
    onError,
  });

export const useSearchUser = ({
  onSuccess,
  onError,
}: UseMutationResult<SearchUserResponse, PostgrestError>) =>
  useMutation({
    mutationFn: searchUser,
    onSuccess,
    onError,
  });
