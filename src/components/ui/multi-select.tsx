import * as React from "react";
import { cva } from "class-variance-authority";
import { CheckIcon, ChevronDown, X } from "lucide-react";

import { cn } from "@/functions/tools";
import { Badge } from "./badge";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Command, CommandItem, CommandList } from "./command";

const multiSelectVariants = cva("mx-1 rounded-full", {
  variants: {
    variant: {
      default:
        "bg-white text-neutral-950 shadow-sm hover:bg-neutral-100 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface MultiSelectProps {
  children: React.ReactNode;
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

export const MultiSelect = ({
  children,
  defaultValue = [],
  onValueChange,
}: MultiSelectProps) => {
  const [selected, setSelected] = React.useState<string[]>(defaultValue);
  const [labels, setLabels] = React.useState<Record<string, string>>({});
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const toggleOption = (option: string, label: string) => {
    const value = selected.includes(option)
      ? selected.filter((v) => v !== option)
      : [...selected, option];
    setSelected(value);
    setLabels((prev) => ({ ...prev, [option]: label }));
    onValueChange?.(value);
  };

  return (
    <MultiSelectContext.Provider
      value={{
        labels,
        selected,
        setSelected,
        toggleOption,
        isPopoverOpen,
        setIsPopoverOpen,
      }}
    >
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        {children}
      </Popover>
    </MultiSelectContext.Provider>
  );
};

const MultiSelectContext = React.createContext<{
  labels: Record<string, string>;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  toggleOption: (value: string, label: string) => void;
  isPopoverOpen: boolean;
  setIsPopoverOpen: (value: boolean) => void;
} | null>(null);

const useMultiSelectContext = () => {
  const context = React.useContext(MultiSelectContext);
  if (!context) {
    throw new Error("MultiSelect components must be used within a MultiSelect");
  }
  return context;
};

interface MultiSelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  className?: string;
}

export const MultiSelectTrigger = ({
  placeholder = "",
  className,
  ...props
}: MultiSelectTriggerProps) => {
  const { labels, selected, setSelected } = useMultiSelectContext();

  return (
    <PopoverTrigger asChild>
      <div
        className={cn(
          "flex w-full items-center justify-between whitespace-nowrap rounded-md border-[1.5px] border-neutral-200 dark:border-neutral-600 bg-transparent px-1 py-2 text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[state=open]:!border-brand-600",
          className
        )}
        {...props}
      >
        {selected.length > 0 ? (
          <div className="flex flex-wrap items-center">
            {selected.map((value, index) => (
              <Badge
                key={index}
                className={multiSelectVariants({ variant: "default" })}
              >
                {labels[value]}
                <X
                  className="ml-2 size-3 cursor-pointer"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelected((prev) => prev.filter((v) => v !== value));
                  }}
                />
              </Badge>
            ))}
          </div>
        ) : (
          <span className="mx-3 text-sm text-neutral-500 dark:text-neutral-400">
            {placeholder}
          </span>
        )}
        <ChevronDown className="mx-2 size-4 cursor-pointer" />
      </div>
    </PopoverTrigger>
  );
};

type MultiSelectContentProps = React.ComponentPropsWithoutRef<
  typeof PopoverContent
>;

export const MultiSelectContent = ({
  className,
  ...props
}: MultiSelectContentProps) => {
  return (
    <PopoverContent
      className={cn(
        "max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0",
        className
      )}
      {...props}
    >
      <Command>
        <CommandList>{props.children}</CommandList>
      </Command>
    </PopoverContent>
  );
};

interface MultiSelectItemProps {
  value: string;
  label: string;
}

export const MultiSelectItem = ({ value, label }: MultiSelectItemProps) => {
  const { selected, toggleOption } = useMultiSelectContext();
  const isSelected = selected.includes(value);

  return (
    <CommandItem
      onSelect={() => toggleOption(value, label)}
      className="flex cursor-pointer items-center justify-between"
    >
      <span>{label}</span>
      {isSelected && <CheckIcon className="size-4" />}
    </CommandItem>
  );
};
