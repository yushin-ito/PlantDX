export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "PlantDX",
	description: "BDF plant monitoring.",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: "About",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/nextui-org/nextui",
		docs: "https://nextui.org",
		notion: "https://www.notion.so/To-Valtteri-aabadd7d5f404bc694c3f79e6b2524ef",
	},
};
