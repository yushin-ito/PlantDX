// Navbar component for the top of the page
"use client"; // This file is client-side only
import { useState, useEffect } from "react";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarBrand,
	NavbarMenuToggle,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
	Select,
	SelectItem
} from "@nextui-org/select"

import { ThemeSwitch } from "@/src/components/molecules/theme-switch";
import {
	GithubIcon,
	SearchIcon,
	NotionLogo,
} from "@/src/components/atoms/icons";


export const Navbartop = () => {
	const [currentPage, setCurrentPage] = useState("Home");

	const pathname = usePathname();

	useEffect(() => {
		setCurrentPage(pathname === "/" ? "Home" : pathname.slice(1));
	}, [pathname]);


	//TODO: make the search be functional
	const searchInput = (
		<Input
			aria-label="Search"
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className="hidden lg:inline-block" keys={["enter"]}>
					Enter
				</Kbd>
			}
			labelPlacement="outside"
			placeholder="Search..."
			startContent={
				<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
			}
			type="search"
		/>
	);

	return (
		<NextUINavbar 
		position="sticky"
		className="bg-light text-white"
		>
			<NavbarContent className="basis-1"
			justify="start"
			>
			<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<h1 className="light:font-bold text-black
                            dark:text-white font-bold text-2xl
                        ">
                            BDF PROD PLANT
                        </h1>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			{/* shows the current route name */}
			<NavbarContent className="basis-1/2">
				<h1 className="light:text-2xl font-bold
					dark:text-2xl font-bold text-2xl
					text-default-500"
				>{currentPage}</h1>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					<Link isExternal href={siteConfig.links.notion} aria-label="Notion">
						<NotionLogo className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.github} aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
				<NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
			</NavbarContent>

			{/* GitHub link */}
			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<Link isExternal href={siteConfig.links.github} aria-label="Github">
					<GithubIcon className="text-default-500" />
				</Link>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{searchInput}
				<div className="mx-4 mt-2 flex flex-col gap-2">
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={
									index === 2
										? "primary"
										: index === siteConfig.navMenuItems.length - 1
										? "danger"
										: "foreground"
								}
								href="#"
								size="lg"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
			<NavbarContent className="hidden lg:flex basis-1/5" justify="end">
				<Select
					aria-label="Select language"
					style={{ width: "100px" }}
					label="Language"
					items={[
						{ label: 'Japan', value: 'JP' },
						{ label: 'English', value: 'EN' },
					]
					}>
					<SelectItem key={1} value="JP">JP</SelectItem>
					<SelectItem key={2} value="EN">EN</SelectItem>
				</Select>
			</NavbarContent>
		</NextUINavbar>
	);
};
