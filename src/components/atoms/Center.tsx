import { HTMLAttributes, memo, ReactNode } from "react";

type CenterProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const Center = memo(({ children, className, ...props }: CenterProps) => (
  <div className={`flex items-center justify-center ${className}`} {...props}>
    {children}
  </div>
));

export default Center;