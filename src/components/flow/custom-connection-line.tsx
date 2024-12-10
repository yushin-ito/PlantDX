import { memo } from "react";
import { ConnectionLineComponentProps, getStraightPath } from "reactflow";

const CustomConnectionLine = memo(
  ({ fromX, fromY, toX, toY }: ConnectionLineComponentProps) => {
    const [edgePath] = getStraightPath({
      sourceX: fromX,
      sourceY: fromY,
      targetX: toX,
      targetY: toY,
    });

    return (
      <g>
        <path
          className="fill-none stroke-neutral-400 stroke-2 dark:stroke-neutral-200"
          d={edgePath}
        />
      </g>
    );
  }
);

export default CustomConnectionLine;
