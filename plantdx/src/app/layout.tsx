import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import Providers from "./providers";
import NavbarTop from "@/src/components/organisms/NavbarTop";
import NavbarLeft from "../components/organisms/NavbarLeft";
import clsx from "clsx";
import { ReactNode } from "react";
import useAuth from "../hook/auth/useAuth";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <NavbarTop />
            <div className="flex flex-grow">
              <NavbarLeft />
              <main className="container mx-auto max-w7xl pt-16 px-6 flex-grow">
                {children}
                <p className="text-center text-sm text-default-500 mt-8">
                  © {new Date().getFullYear()} {siteConfig.name}
                </p>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
