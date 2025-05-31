"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";

import { cn } from "@/functions/tools";

type TabsContextProps = {
  currentValue?: string;
  variant?: "default" | "outline" | "stepper" | null;
};

const TabsContext = React.createContext<TabsContextProps | null>(null);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error("useTabsContext must be used within a Tabs");
  }

  return context;
};

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    variant?: "default" | "outline" | "stepper" | null;
  }
>(({ className, variant, defaultValue, children, ...props }, ref) => {
  const [currentValue, setCurrentValue] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ currentValue, variant }}>
      <TabsPrimitive.Root
        ref={ref}
        value={currentValue}
        onValueChange={setCurrentValue}
        className={className}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  );
});

const tabsListVariants = cva(
  "inline-flex items-center text-neutral-500 dark:text-neutral-400",
  {
    variants: {
      variant: {
        default:
          "justify-center rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",
        outline:
          "relative z-0 after:absolute after:bottom-0 after:h-[2px] after:w-full after:rounded-full after:bg-neutral-200 after:text-transparent after:content-['border'] after:dark:bg-neutral-800",
        stepper: "justify-between",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const { currentValue, variant } = useTabsContext();

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {variant === "stepper"
        ? React.Children.toArray(children).map((child, index, array) => {
            const checked = index < Number(currentValue);

            return (
              <React.Fragment key={index}>
                {child}
                {index < array.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-1 rounded-full",
                      checked
                        ? "bg-brand-600"
                        : "bg-neutral-200 dark:bg-neutral-800"
                    )}
                  />
                )}
              </React.Fragment>
            );
          })
        : children}
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "rounded-md px-3 py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-neutral-950 data-[state=active]:shadow dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300 dark:data-[state=active]:bg-neutral-950 dark:data-[state=active]:text-neutral-50",
        outline:
          "z-10 w-24 px-2 py-2.5 after:absolute after:bottom-0 after:h-[2px] after:w-24 after:rounded-full after:text-transparent after:content-['border'] first-of-type:ml-0 data-[state=active]:text-brand-600 data-[state=active]:after:bg-brand-600 data-[state=inactive]:after:bg-transparent",
        stepper:
          "size-10 rounded-full bg-neutral-200 text-base text-neutral-950 dark:bg-neutral-800 dark:text-neutral-50 dark:data-[state=active]:bg-brand-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({  className, ...props }, ref) => {
  const { currentValue, variant } = useTabsContext();

  const checked = variant === "stepper" && Number(props.value) < Number(currentValue);

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        tabsTriggerVariants({ variant }),
        className,
        (checked || props.value === currentValue) && "!bg-brand-600 text-white"
      )}
      {...props}
    >
      {checked ? <Check className="size-6" /> : props.children}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2 focus:outline-none", className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
