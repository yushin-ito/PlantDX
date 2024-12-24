import { cn } from "@/functions/tools";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-full bg-neutral-900/10 dark:bg-neutral-50/10",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
