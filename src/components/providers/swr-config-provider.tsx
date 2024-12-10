"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";

type SWRConfigProviderProps = {
  children: ReactNode;
};

const SWRConfigProvider = ({ children }: SWRConfigProviderProps) => (
  <SWRConfig
    value={{
      revalidateIfStale: false,
      revalidateOnFocus: false,
    }}
  >
    {children}
  </SWRConfig>
);

export default SWRConfigProvider;
