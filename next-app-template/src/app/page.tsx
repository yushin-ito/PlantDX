import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import StatusCard from "../components/organisms/statusCard";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<StatusCard 
				showsTemp
				showsWaterLevel
				title="Waste Oil Tank"
			/>

			<StatusCard
				showsTemp={false}
				showsWaterLevel={false}
				title="MECH Tank"
			/>

			<div className="flex gap-3">
				<Link
					isExternal
					href={siteConfig.links.docs}
					className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })}
				>
					Documentation
				</Link>
			</div>
		</section>
	);
}
