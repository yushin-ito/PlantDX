import { HTMLAttributes, memo, ReactNode } from "react";

type HStackProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const HStack = memo(({ children, className, ...props }: HStackProps) => (
  <div className={`flex ${className}`} {...props}>
    {children}
  </div>
));

export default HStack;
