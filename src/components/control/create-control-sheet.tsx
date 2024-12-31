"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, memo, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { CreateControlSchema } from "@/schemas";
import { VStack } from "../ui/vstack";
import CreateControlForm from "./create-control-form";
import useBreakpoint from "@/hooks/use-breakpoint";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

type CreateControlSheetProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  createControlHandler: (
    values: z.infer<typeof CreateControlSchema>
  ) => Promise<void>;
  isLoadingCreateControl: boolean;
};

const CreateControlSheet = memo(
  ({
    isOpen,
    setIsOpen,
    createControlHandler,
    isLoadingCreateControl,
  }: CreateControlSheetProps) => {
    const breakpoint = useBreakpoint();

    const [error, setError] = useState("");

    const form = useForm<z.infer<typeof CreateControlSchema>>({
      resolver: zodResolver(CreateControlSchema),
      defaultValues: {
        name: "",
        type: "manual",
        event: "on-off",
        command: "",
      },
    });

    const onSubmit = async (values: z.infer<typeof CreateControlSchema>) => {
      setError("");

      try {
        await createControlHandler(values);

        toast.success("コントロールを作成しました");
        setIsOpen(false);

        form.reset();
      } catch {
        setError("エラーが発生しました。");
      }
    };

    if (breakpoint === "sm" || breakpoint === "md") {
      return (
        <Drawer
          open={isOpen}
          onOpenChange={() => {
            setIsOpen(!isOpen);
            form.reset();
          }}
        >
          <DrawerContent>
            <VStack className="space-y-6">
              <DrawerHeader className="space-y-1">
                <DrawerTitle>コントロールの作成</DrawerTitle>
                <DrawerDescription className="text-xs">
                  コマンドを入力してコントロールを作成しましょう。
                </DrawerDescription>
              </DrawerHeader>
              <CreateControlForm
                form={form}
                onSubmit={onSubmit}
                onCancel={() => {
                  setIsOpen(false);
                  form.reset();
                }}
                error={error}
                isLoading={isLoadingCreateControl}
              />
            </VStack>
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
          form.reset();
        }}
      >
        <DialogContent>
          <VStack className="space-y-6">
            <DialogHeader className="space-y-2">
              <DialogTitle>コントロールの作成</DialogTitle>
              <DialogDescription className="text-xs">
                コマンドを入力してコントロールを作成しましょう。
              </DialogDescription>
            </DialogHeader>
            <CreateControlForm
              form={form}
              onSubmit={onSubmit}
              onCancel={() => {
                setIsOpen(false);
                form.reset();
              }}
              error={error}
              isLoading={isLoadingCreateControl}
            />
          </VStack>
        </DialogContent>
      </Dialog>
    );
  }
);

export default CreateControlSheet;
