'use client';

import StatusCard from "../components/organisms/statusCard";
import StatusCardBig from "../components/organisms/statusCardBig";

export default function Home() {
	return (
		<section className="flex flex-grid items-center justify-center gap-4 py-8 md:py-10">
			<div className="flex flex-col items-center justify-center gap-4">
			<StatusCard 
				title="Waste Oil Tank"
				showsTemp
				showsWaterLevel
				width={300}
			/>

			<StatusCard
				title="MECH Tank"
				showsTemp={false}
				showsWaterLevel={true}
				width={300}
			/>
			</div>

			<StatusCard
				title="Inline Heater"
				showsTemp={true}
				showsWaterLevel={false}
				width={300}
			/>

			<div className="flex flex-col items-center justify-center gap-4">
			<StatusCardBig
				title="Status"
			/>

			<div className="flex flex-row items-center justify-center gap-4">
			<StatusCard
				title="Water Tank"
				showsTemp={false}
				showsWaterLevel={true}
				width={180}
			/>

			<StatusCard
				title="Separate Tank"
				showsTemp={false}
				showsWaterLevel={true}
				width={190}
			/>
			</div>
			</div>
		</section>
	);
}
