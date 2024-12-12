"use client";

import { Pause, Play, RotateCw } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import { Button } from "../ui/button";
import { HStack } from "../ui/hstack";
import { Center } from "../ui/center";

type RequestToolbarProps = {
  isListening: boolean;
  setIsListening: Dispatch<SetStateAction<boolean>>;
  createActionHandler: () => Promise<void>;
};

const RequestToolbar = ({
  isListening,
  setIsListening,
  createActionHandler,
}: RequestToolbarProps) => (
  <Center className="absolute bottom-5 w-full">
    <HStack className="z-toolbar space-x-2 rounded-lg bg-white p-1 shadow-md dark:bg-neutral-800">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsListening(!isListening)}
      >
        {isListening ? (
          <Pause className="size-[18px] stroke-[2.2px]" />
        ) : (
          <Play className="size-[18px] stroke-[2.2px]" />
        )}
      </Button>
      <Button size="icon" variant="ghost" onClick={createActionHandler}>
        <RotateCw className="size-[18px] stroke-[2.2px]" />
      </Button>
    </HStack>
  </Center>
);

export default RequestToolbar;
