"use client";

import { memo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Center } from "../ui/center";
import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { getDevices } from "@/functions/query";
import { CreatePlantSchema } from "@/schemas";
import { createBrowserClient } from "@/functions/browser";

const Walkthrough = memo(() => {
  const [error, setError] = useState("");

  const supabase = createBrowserClient();

  const form = useForm<z.infer<typeof CreatePlantSchema>>({
    resolver: zodResolver(CreatePlantSchema),
    defaultValues: {
      name: "",
      deviceId: "",
      template: "none",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreatePlantSchema>) => {
    setError("");

    try {
      const devices = await getDevices(supabase, "deviceId", values.deviceId);

      if (!devices.data || devices.data.length === 0) {
        setError("デバイスが見つかりません。");
        return;
      }

      await createPlantHandler(values);

      toast.success("プラントを作成しました");
      setIsOpen(false);

      form.reset();
    } catch {
      setError("エラーが発生しました。");
    }
  };

  return (
    <Center className="h-full">
      <Card className="p-6 sm:w-[400px] sm:px-8">
        <Tabs defaultValue="0" variant="stepper">
          <TabsList className="w-full">
            <TabsTrigger value="0">1</TabsTrigger>
            <TabsTrigger value="1">2</TabsTrigger>
            <TabsTrigger value="2">3</TabsTrigger>
          </TabsList>
          <TabsContent value="0"></TabsContent>
          <TabsContent value="1">2</TabsContent>
          <TabsContent value="2">3</TabsContent>
        </Tabs>
      </Card>
    </Center>
  );
});

export default Walkthrough;
