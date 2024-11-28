import { HTMLAttributes, memo, ReactNode } from "react";

type VStackProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const VStack = memo(({ children, className, ...props }: VStackProps) => (
  <div className={`flex flex-col ${className}`} {...props}>
    {children}
  </div>
));

export default VStack;
