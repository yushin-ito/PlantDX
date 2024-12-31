import { useState, useEffect, useCallback } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type UseBreakpointType<T extends string | undefined> = {
  fallback?: T;
};

type UseBreakpointReturnType<T extends string | undefined> = T extends string
  ? string
  : string | undefined;

const useBreakpoint = <T extends string | undefined>({
  fallback,
}: UseBreakpointType<T> = {}): UseBreakpointReturnType<T> => {
  const [breakpoint, setBreakpoint] = useState<string | undefined>(fallback);

  const onResize = useCallback(() => {
    setBreakpoint(() => {
      if (window.innerWidth >= breakpoints["2xl"]) return "2xl";
      if (window.innerWidth >= breakpoints.xl) return "xl";
      if (window.innerWidth >= breakpoints.lg) return "lg";
      if (window.innerWidth >= breakpoints.md) return "md";
      return "sm";
    });
  }, []);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  return breakpoint as UseBreakpointReturnType<T>;
};

export default useBreakpoint;
