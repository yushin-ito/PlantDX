"use client";

import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { Dispatch, memo, SetStateAction, useEffect, useState } from "react";
import { notFound, usePathname, useRouter } from "next/navigation";

import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Plant } from "@/types";
import { Center } from "./ui/center";

type PlantSwitcherProps = {
  plantId: number;
  plants: Plant["Row"][];
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
};

const PlantSwitcher = memo(
  ({ plantId, plants, setIsOpenModal }: PlantSwitcherProps) => {
    const router = useRouter();
    const basename = usePathname().split("/")[2];

    const [isOpenPopover, setIsOpenPopover] = useState(false);
    const [selected, setSelected] = useState<Plant["Row"] | null>(null);

    useEffect(() => {
      if (plants && plants.length > 0) {
        const plant = plants.find((plant) => plant.plantId === plantId);

        if (plant) {
          setSelected(plant);
        } else {
          notFound();
        }
      }
    }, [plants, plantId]);

    return (
      <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            aria-expanded={isOpenPopover}
            className="h-9 w-[200px] justify-between text-xs"
          >
            <span>{selected?.name}</span>
            <ChevronsUpDown className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandList>
              <CommandInput
                placeholder="プラントを検索"
                className="placeholder:text-xs"
              />
              <CommandEmpty className="text-xs">
                <Center className="h-16 text-xs">
                  プラントが見つかりません
                </Center>
              </CommandEmpty>
              {plants?.map((plant, index) => (
                <CommandGroup key={index}>
                  <CommandItem
                    onSelect={() => {
                      document.cookie = `plantId=${plant.plantId}; path=/`;

                      router.push(`/${plant.plantId}/${basename}`);
                      router.refresh();

                      setSelected(plant);
                      setIsOpenPopover(false);
                    }}
                    className="flex justify-between text-xs"
                  >
                    {plant.name}
                    <Check
                      className={
                        selected?.plantId === plant.plantId
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
                    setIsOpenModal(true);
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
    );
  }
);

export default PlantSwitcher;
