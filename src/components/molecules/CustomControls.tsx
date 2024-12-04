"use client";

import { useReactFlow } from "reactflow";
import { Plus, Minus, Maximize } from "lucide-react";

import VStack from "../atoms/VStack";
import Center from "../atoms/Center";

const CustomControls = () => {
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
    </VStack>
  );
};

export default CustomControls;
