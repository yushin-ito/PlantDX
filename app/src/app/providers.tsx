"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import {
  QueryClient,
  QueryClientProvider,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <NextUIProvider navigate={router.push}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </NextUIProvider>
  );
}