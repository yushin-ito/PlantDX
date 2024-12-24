"use client";

import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import { memo, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
import { Center } from "../ui/center";
import { Node, Sensor, SensorType } from "@/types";
import { HStack } from "../ui/hstack";

const labels: Record<SensorType, string> = {
  temperature: "温度",
  humidity: "湿度",
  pressure: "圧力",
  volume: "容量",
};

type SensorSwitcherProps = {
  sensorId: number | null;
  sensors: (Sensor["Row"] & { node: Node["Row"] | null })[];
  onSwitch?: () => void;
};

const SensorSwitcher = memo(
  ({ sensorId, sensors, onSwitch }: SensorSwitcherProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const [isOpenPopover, setIsOpenPopover] = useState(false);
    const [selected, setSelected] = useState<
      (Sensor["Row"] & { node: Node["Row"] | null }) | null
    >(null);

    useEffect(() => {
      if (sensors && sensors.length > 0) {
        const sensor = sensors.find((sensor) => sensor.sensorId === sensorId);

        if (sensor) {
          setSelected(sensor);
        } else {
          router.push(`${pathname}?id=${sensors[0].sensorId}`);
        }
      }
    }, [sensors, sensorId, router, pathname]);

    return (
      <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            aria-expanded={isOpenPopover}
            className="h-9 w-[200px] justify-between py-2 text-xs"
          >
            <HStack>
              <span>{selected?.node?.name}</span>
              {selected && (
                <span>{`（${labels[selected.type as SensorType]}）`}</span>
              )}
            </HStack>
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
                <Center className="h-16 text-xs">
                  センサーが見つかりません
                </Center>
              </CommandEmpty>
              {sensors.map((sensor, index) => (
                <CommandGroup key={index}>
                  <CommandItem
                    onSelect={() => {
                      // document.cookie = `sensorId=${sensor.sensorId}; path=/`;

                      router.push(`${pathname}?id=${sensor.sensorId}`);
                      router.refresh();

                      setSelected(sensor);
                      setIsOpenPopover(false);
                    }}
                  >
                    <HStack className="w-full items-center justify-between text-xs">
                      {`${sensor.node?.name}（${
                        labels[sensor.type as SensorType]
                      }）`}
                      <Check
                        className={
                          selected?.sensorId === sensor.sensorId
                            ? "opacity-100"
                            : "opacity-0"
                        }
                      />
                    </HStack>
                  </CommandItem>
                </CommandGroup>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <Link href="/">
                  <CommandItem
                    onSelect={() => {
                      setIsOpenPopover(false);
                      onSwitch?.();
                    }}
                    className="text-xs"
                  >
                    <PlusCircle className="size-4" />
                    センサーを追加
                  </CommandItem>
                </Link>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

export default SensorSwitcher;
