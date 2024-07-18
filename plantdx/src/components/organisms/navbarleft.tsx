"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import IconSelector from "../molecules/IconSelector";

const NavbarLeft = () => {
  return (
    <NextUINavbar
      className="bg-light text-white shadow-lg
			dark:bg-dark dark:text-white
			flex flex-col
			lg:flex-row
			lg:justify-between
			lg:items-center
			lg:gap-4
			px-3
			py-2
			lg:px-6
			lg:py-4
			lg:sticky
			top-0
			z-5
			w-full
			lg:w-auto
			h-8
			lg:h-auto
			lg:min-h-screen
			lg:max-h-screen
			overflow-y-auto
		"
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full
            flex-col
            "
        justify="end"
      >
        <ul className="hidden lg:flex gap-4 justify-start ml-2 flex-col">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({
                    color: "primary",
                    size: "lg",
                    underline: "hover",
                    isBlock: true,
                  }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="primary"
                href={item.href}
              >
                <IconSelector icon={item.label} /> {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>
    </NextUINavbar>
  );
};

export default NavbarLeft;
