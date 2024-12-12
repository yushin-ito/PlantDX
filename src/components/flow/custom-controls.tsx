"use client";

import { useReactFlow } from "reactflow";
import { Pencil, PencilOff, Plus, Minus, Maximize } from "lucide-react";
import { Dispatch, memo, SetStateAction } from "react";

import { Center } from "../ui/center";
import { VStack } from "../ui/vstack";

type CustomControlsProps = {
  isReadOnly: boolean;
  setIsReadOnly: Dispatch<SetStateAction<boolean>>;
};

const CustomControls = memo(
  ({ isReadOnly, setIsReadOnly }: CustomControlsProps) => {
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    return (
      <VStack className="absolute bottom-5 left-5 z-controls rounded-md bg-white shadow-md dark:bg-neutral-800">
        <Center className="size-7 cursor-pointer">
          <Plus className="size-4" onClick={() => zoomIn()} />
        </Center>
        <Center className="size-7 cursor-pointer">
          <Minus className="size-4" onClick={() => zoomOut()} />
        </Center>
        <Center className="size-7 cursor-pointer">
          <Maximize className="size-4" onClick={() => fitView()} />
        </Center>
        <Center className="size-7 cursor-pointer">
          {isReadOnly ? (
            <Pencil className="size-3.5" onClick={() => setIsReadOnly(false)} />
          ) : (
            <PencilOff
              className="size-3.5"
              onClick={() => setIsReadOnly(true)}
            />
          )}
        </Center>
      </VStack>
    );
  }
);

export default CustomControls;
