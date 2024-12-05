"use client";

import { Fragment, useState } from "react";
import { Plus } from "lucide-react";
import { z } from "zod";

import Flow from "../flows/Flow";
import { Button } from "../ui/button";
import { SensorSchema } from "@/schemas";
import PostSensorDialog from "../dialogs/PostSensorDialog";

const Home = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const onSubmit = (values: z.infer<typeof SensorSchema>) => {
    console.log(values);
    setIsOpenDialog(false);
  };

  return (
    <Fragment>
      <Flow />
      <Button
        variant="brand"
        className="absolute bottom-8 right-8 z-fab size-12 rounded-full shadow-md"
        onClick={() => setIsOpenDialog(true)}
      >
        <Plus className="size-6" />
      </Button>
      <PostSensorDialog
        onSubmit={onSubmit}
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
      />
    </Fragment>
  );
};

export default Home;
