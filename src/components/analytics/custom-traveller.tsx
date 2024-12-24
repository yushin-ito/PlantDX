import { memo } from "react";

type CustomTravellerProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  stroke: string;
};

const CustomTraveller = memo(
  ({ x, y, width, height }: CustomTravellerProps) => (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fillOpacity={0.2}
      className="fill-neutral-400 dark:fill-neutral-200"
      stroke="transparent"
    />
  )
);

export default CustomTraveller;
