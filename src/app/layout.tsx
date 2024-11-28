import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

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

const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <html lang="ja">
      <body
        className={`${[inter, noto_sans_jp].map((f) => f.variable).join(" ")}`}
      >
        <Toaster />
        <main className="h-full w-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
