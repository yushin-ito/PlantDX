"use client";

import { useReactFlow } from "reactflow";
import { Pencil, PencilOff, Plus, Minus, Maximize } from "lucide-react";
import { Dispatch, memo, SetStateAction } from "react";

import VStack from "../atoms/VStack";
import Center from "../atoms/Center";

type CustomControlsProps = {
  readOnly: boolean;
  setReadOnly: Dispatch<SetStateAction<boolean>>;
};

const CustomControls = memo(
  ({ readOnly, setReadOnly }: CustomControlsProps) => {
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
          {readOnly ? (
            <Pencil className="size-3.5" onClick={() => setReadOnly(false)} />
          ) : (
            <PencilOff className="size-3.5" onClick={() => setReadOnly(true)} />
          )}
        </Center>
      </VStack>
    );
  }
);

export default CustomControls;
