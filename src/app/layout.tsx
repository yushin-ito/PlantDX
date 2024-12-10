import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import { ReactNode } from "react";

import ToastProvider from "@/components/providers/toast-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import SWRConfigProvider from "@/components/providers/swr-config-provider";

import "@/styles/globals.css";

const inter = Inter({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const noto_sans_jp = Noto_Sans_JP({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
});

export const metadata: Metadata = {
  title: {
    template: "PlantDX",
    default: "PlantDX",
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="ja" suppressHydrationWarning>
    <body
      className={`${[inter, noto_sans_jp].map((f) => f.variable).join(" ")}`}
    >
      <main className="h-full w-screen bg-white dark:bg-neutral-950">
        <SWRConfigProvider>
          <ToastProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ToastProvider>
        </SWRConfigProvider>
      </main>
    </body>
  </html>
);

export default RootLayout;
