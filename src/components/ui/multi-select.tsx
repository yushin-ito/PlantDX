import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
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

type MultiSelectProps = React.ComponentPropsWithoutRef<typeof Popover> & {
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
};

const MultiSelect = ({
  children,
  defaultValue = [],
  onValueChange,
  ...props
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
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} {...props}>
        {children}
      </Popover>
    </MultiSelectContext.Provider>
  );
};
MultiSelect.displayName = "MultiSelect";

type MultiSelectContextProps = {
  labels: Record<string, string>;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  toggleOption: (value: string, label: string) => void;
  isPopoverOpen: boolean;
  setIsPopoverOpen: (value: boolean) => void;
};

const MultiSelectContext = React.createContext<MultiSelectContextProps | null>(
  null
);

const useMultiSelect = () => {
  const context = React.useContext(MultiSelectContext);

  if (!context) {
    throw new Error("useMultiSelect must be used within a MultiSelect");
  }

  return context;
};

const MultiSelectTrigger = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    VariantProps<typeof multiSelectVariants> & {
      placeholder: string;
    }
>(({ className, placeholder, ...props }, ref) => {
  const { labels, selected, setSelected } = useMultiSelect();

  return (
    <PopoverTrigger asChild>
      <div
        ref={ref}
        className={cn(
          "flex w-full items-center justify-between whitespace-nowrap rounded-md border-[1.5px] border-neutral-200 dark:border-neutral-600 bg-transparent px-1 py-2 text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[state=open]:!border-brand-600",
          className
        )}
        {...props}
      >
        {selected.length > 0 ? (
          <div className="flex flex-wrap items-center">
            {selected.map((value, index) => (
              <Badge key={index} className={multiSelectVariants()}>
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
});
MultiSelectTrigger.displayName = "MultiSelectTrigger";

const MultiSelectContent = React.forwardRef<
  React.ElementRef<typeof PopoverContent>,
  React.ComponentPropsWithoutRef<typeof PopoverContent>
>(({ className, ...props }, ref) => (
  <PopoverContent
    ref={ref}
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
));
MultiSelectContent.displayName = PopoverContent.displayName;

const MultiSelectItem = React.forwardRef<
  React.ElementRef<typeof CommandItem>,
  React.ComponentPropsWithoutRef<typeof CommandItem> & {
    value: string;
    label: string;
  }
>(({ value, label, className, ...props }, ref) => {
  const { selected, toggleOption } = useMultiSelect();
  const isSelected = selected.includes(value);

  return (
    <CommandItem
      ref={ref}
      onSelect={() => toggleOption(value, label)}
      className={cn(
        "flex cursor-pointer items-center justify-between",
        className
      )}
      {...props}
    >
      <span>{label}</span>
      {isSelected && <CheckIcon className="size-4" />}
    </CommandItem>
  );
});
MultiSelectItem.displayName = CommandItem.displayName;

export { MultiSelect, MultiSelectTrigger, MultiSelectContent, MultiSelectItem };
