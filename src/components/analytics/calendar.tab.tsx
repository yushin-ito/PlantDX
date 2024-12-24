"use client";

import { Dispatch, SetStateAction, memo, useState } from "react";
import { ja } from "date-fns/locale";
import { CalendarArrowDown, CalendarArrowUp } from "lucide-react";
import { format } from "date-fns";

import { Calendar } from "../ui/calendar";
import { VStack } from "../ui/vstack";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/functions/tools";
import { Button } from "../ui/button";
import { HStack } from "../ui/hstack";

type CalendarTabProps = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  period: {
    start: Date;
    end: Date;
  } | null;
  setPeriod: Dispatch<SetStateAction<{ start: Date; end: Date } | null>>;
};

const CalendarTab = memo(
  ({ date, setDate, period, setPeriod }: CalendarTabProps) => {
    const [start, setStart] = useState<Date | undefined>(period?.start);
    const [end, setEnd] = useState<Date | undefined>(period?.end);

    const onSelect = (date?: Date) => {
      if (date) {
        setDate(date);
      }
    };

    const onSelectStart = (date?: Date) => {
      if (date) {
        setStart(date);
      }
    };

    const onSelectEnd = (date?: Date) => {
      if (date) {
        setEnd(date);
      }
    };

    return (
      <VStack className="items-center space-y-4 pt-1">
        <Calendar
          locale={ja}
          required
          mode="single"
          selected={date}
          onSelect={onSelect}
        />
        <Separator orientation="horizontal" className="w-[90%]" />
        <VStack className="w-[90%] space-y-6 px-2 pt-4">
          <VStack className="w-full items-center space-y-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full relative text-xs h-9 rounded-md",
                    !start && "text-neutral-500"
                  )}
                >
                  <CalendarArrowUp className="absolute left-2.5 size-4" />
                  {start ? (
                    format(start, "yyyy年MM月dd日から", { locale: ja })
                  ) : (
                    <span>開始日を選択する</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto rounded-lg p-0">
                <Calendar
                  locale={ja}
                  required
                  mode="single"
                  selected={start}
                  onSelect={onSelectStart}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full relative text-xs h-9 rounded-md",
                    !end && "text-neutral-500"
                  )}
                >
                  <CalendarArrowDown className="absolute left-2.5 size-4" />
                  {end ? (
                    format(end, "yyyy年MM月dd日まで", { locale: ja })
                  ) : (
                    <span>終了日を選択する</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto rounded-lg p-0">
                <Calendar
                  locale={ja}
                  required
                  mode="single"
                  selected={end}
                  onSelect={onSelectEnd}
                />
              </PopoverContent>
            </Popover>
          </VStack>
          <HStack className="items-center justify-end space-x-2">
            <Button
              variant="outline"
              className="h-8 px-2.5"
              onClick={() => {
                setStart(undefined);
                setEnd(undefined);
                setPeriod(null);
              }}
            >
              <span className="text-2xs">クリア</span>
            </Button>
            <Button
              type="submit"
              className="h-8 px-4"
              variant="brand"
              onClick={() => {
                if (start && end) {
                  setPeriod({ start, end });
                }
              }}
            >
              <span className="text-2xs">適用</span>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    );
  }
);

export default CalendarTab;
