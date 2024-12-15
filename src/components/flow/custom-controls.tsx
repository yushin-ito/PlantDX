"use client";

import { useReactFlow } from "reactflow";
import {
  Pencil,
  PencilOff,
  Plus,
  Minus,
  Maximize,
  Pause,
  Play,
  RotateCw,
} from "lucide-react";
import { Dispatch, memo, SetStateAction } from "react";

import { VStack } from "../ui/vstack";
import { Button } from "../ui/button";

type CustomControlsProps = {
  isReadOnly: boolean;
  setIsReadOnly: Dispatch<SetStateAction<boolean>>;
  isListening: boolean;
  setIsListening: Dispatch<SetStateAction<boolean>>;
  createActionHandler: () => Promise<void>;
};

const CustomControls = memo(
  ({
    isReadOnly,
    setIsReadOnly,
    isListening,
    setIsListening,
    createActionHandler,
  }: CustomControlsProps) => {
    const { zoomIn, zoomOut, fitView } = useReactFlow();

    return (
      <VStack className="absolute bottom-5 left-5 z-controls rounded-md bg-white shadow-md dark:bg-neutral-800">
        <Button variant="ghost" className="size-7 rounded-sm" onClick={() => zoomIn()}>
          <Plus className="size-4" />
        </Button>

        <Button variant="ghost" className="size-7 rounded-sm" onClick={() => zoomOut()}>
          <Minus className="size-4" />
        </Button>
        <Button variant="ghost" className="size-7 rounded-sm" onClick={() => fitView()}>
          <Maximize className="size-4" />
        </Button>
        <Button
          variant="ghost"
          className="size-7 rounded-sm"
          onClick={() => setIsReadOnly(!isReadOnly)}
        >
          {isReadOnly ? (
            <Pencil className="size-3.5" />
          ) : (
            <PencilOff className="size-3.5" />
          )}
        </Button>
        <Button
          variant="ghost"
          className="size-7 rounded-sm"
          onClick={() => setIsListening(!isListening)}
        >
          {isListening ? (
            <Pause className="size-3.5" />
          ) : (
            <Play className="size-3.5" />
          )}
        </Button>
        <Button
          variant="ghost"
          className="size-7 rounded-sm"
          onClick={createActionHandler}
        >
          <RotateCw className="size-3.5" />
        </Button>
      </VStack>
    );
  }
);

export default CustomControls;
