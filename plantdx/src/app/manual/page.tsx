"use client";

import { title } from "@/src/components/primitives";
import {
  useDeleteUser,
  usePostUser,
  useUpdateUser,
} from "@/src/hook/user/mutate";
import supabase from "@/src/supabase";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSignOut } from "@/src/hook/auth";

export default function BlogPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutateAsync: mutateAsyncPostUser, isPending: isLoadingPostUser } =
    usePostUser({
      onSuccess: () => {
        console.log("[Post] Scuccess");
      },
      onError: () => {
        console.log("[Post] Error");
      },
    });

  const { mutateAsync: mutateAsyncUpdateUser, isPending: isLoadingUpdateUser } =
    useUpdateUser({
      onSuccess: () => {
        console.log("[Update] Success");
      },
      onError: () => {
        console.log("[Update] Error");
      },
    });

  const { mutateAsync: mutateAsyncDeleteUser, isPending: isLoadingDeleteUser } =
    useDeleteUser({
      onSuccess: () => {
        console.log("[Delete] Success");
      },
      onError: () => {
        console.log("[Delete] Error");
      },
    });

  const { mutateAsync: mutateAsyncSignOut, isPending: isLoadingSignOut } =
    useSignOut({
      onSuccess: () => {
        console.log("[SignOut] Success");
      },
      onError: () => {
        console.log("[SignOut] Error");
      },
    });

  return (
    <div>
      <h1 className={title()}>Blog</h1>
      <div className="flex flex-col items-center justify-center gap-4 pt-8">
        <Button
          onPress={async () => {
            console.log("Button pressed");
            await mutateAsyncPostUser({
              avatarUrl: "",
              color: "#fff",
              name: "John Doe",
              profile: "This is a profileq",
            });
          }}
          color="primary"
        >
          Create User Data
        </Button>
        <Button
          onPress={async () => {
            console.log("Button pressed");
            await mutateAsyncUpdateUser({
              userId: 11,
              avatarUrl: "https://" + Math.random().toString(),
              color: "#fff",
              name: "John Doe",
              profile: "This is a profileq",
            });
          }}
          color="primary"
        >
          Update User Data
        </Button>
        <Button
          onPress={async () => {
            console.log("Button pressed");
            await mutateAsyncDeleteUser(11);
          }}
          color="primary"
        >
          Delete User Data
        </Button>
        <Button onPress={onOpen} color="primary">
          Sign Up
        </Button>
        <Button
          onPress={async () => {
            console.log("Button pressed");
          }}
          color="primary"
        >
          Sign Out
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="px-12 pt-8">
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
