"use client";

import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Fragment, useState } from "react";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { SensorSchema } from "@/schemas";
import PostSensorDialog from "../dialogs/PostSensorDialog";
import { Center } from "../ui/center";

const sensors = [
  {
    sensorId: 1,
    name: "MEOHタンク",
  },
];

const SensorSwitcher = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selected, setSelected] = useState(sensors[0]);

  const onSubmit = (values: z.infer<typeof SensorSchema>) => {
    console.log(values);
    setIsOpenDialog(false);
  };

  return (
    <Fragment>
      <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            aria-expanded={isOpenPopover}
            className="h-9 w-[200px] justify-between py-2 text-xs"
          >
            <span>{selected.name}</span>
            <ChevronsUpDown className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="センサーを検索"
              className="placeholder:text-xs"
            />
            <CommandList>
              <CommandEmpty>
                <Center className="h-4 text-xs">
                  センサーが見つかりません
                </Center>
              </CommandEmpty>
              {sensors.map((sensor, index) => (
                <CommandGroup key={index}>
                  <CommandItem
                    onSelect={() => {
                      setSelected(sensor);
                      setIsOpenPopover(false);
                    }}
                    className="flex justify-between text-xs"
                  >
                    {sensor.name}
                    <Check
                      className={
                        selected.sensorId === sensor.sensorId
                          ? "opacity-100"
                          : "opacity-0"
                      }
                    />
                  </CommandItem>
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setIsOpenPopover(false);
                    setIsOpenDialog(true);
                  }}
                  className="text-xs"
                >
                  <PlusCircle className="size-4" />
                  センサーを追加
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <PostSensorDialog
        onSubmit={onSubmit}
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
      />
    </Fragment>
  );
};

export default SensorSwitcher;
