"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ComponentProps } from "react";
import { Toaster } from "react-hot-toast";

export const ThemeProvider = ({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) => (
  <NextThemesProvider {...props}>{children}</NextThemesProvider>
);

export const ToastProvider = () => <Toaster />;
