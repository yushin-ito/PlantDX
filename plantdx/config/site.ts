export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "PlantDX",
	description: "BDF plant monitoring.",
	navItems: [
		{
			label: "Status",
			href: "/",
		},
    {
      label: "Graph",
      href: "/graph",
    },
    {
      label: "Camera",
      href: "/camera",
    },
    {
      label: "Log",
      href: "/log",
    },
	{
		label: "Manual",
		href: "/manual",
	},
	{
		label: "Settings",
		href: "/settings",
	},
	{
		label: "Log out",
		href: "/logout",
	},
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		}
	],
	links: {
		github: "https://github.com/yushin-ito/PlantDX",
		docs: "https://nextui.org",
		notion: "https://www.notion.so/To-Valtteri-aabadd7d5f404bc694c3f79e6b2524ef",
	},
};
