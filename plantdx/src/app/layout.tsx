import "@/styles/globals.css";

import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbartop } from "@/src/components/organisms/navbartop";
import { Navbarleft } from "../components/organisms/navbarleft";
import clsx from "clsx";

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
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
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
						<Navbartop />
						<div className="flex flex-grow">
						<Navbarleft />
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
}
