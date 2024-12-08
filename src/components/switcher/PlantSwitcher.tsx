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
import { PlantSchema } from "@/schemas";
import PostPlantDialog from "../dialogs/PostPlantDialog";
import { Center } from "../ui/center";

const plants = [
  {
    id: 1,
    name: "プラント1",
  },
];

const PlantSwitcher = () => {
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selected, setSelected] = useState(plants[0]);

  const onSubmit = (values: z.infer<typeof PlantSchema>) => {
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
            className="h-9 w-[200px] justify-between text-xs"
          >
            <span>{selected.name}</span>
            <ChevronsUpDown className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="プラントを検索"
              className="placeholder:text-xs"
            />
            <CommandList>
              <CommandEmpty className="text-xs">
                <Center className="h-4 text-xs">
                  プラントが見つかりません
                </Center>
              </CommandEmpty>
              {plants.map((plant) => (
                <CommandGroup key={plant.id}>
                  <CommandItem
                    onSelect={() => {
                      setSelected(plant);
                      setIsOpenPopover(false);
                    }}
                    className="flex justify-between text-xs"
                  >
                    {plant.name}
                    <Check
                      className={
                        selected.id === plant.id ? "opacity-100" : "opacity-0"
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
                  プラントを追加
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <PostPlantDialog
        onSubmit={onSubmit}
        isOpen={isOpenDialog}
        setIsOpen={setIsOpenDialog}
      />
    </Fragment>
  );
};

export default PlantSwitcher;
