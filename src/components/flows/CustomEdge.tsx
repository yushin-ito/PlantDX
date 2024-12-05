"use client";

import { memo } from "react";
import { EdgeProps, getSmoothStepPath } from "reactflow";

const CustomEdge = memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  }: EdgeProps) => {
    const sourceXOffset =
      sourcePosition === "right" ? -4 : sourcePosition === "left" ? 4 : 0;
    const sourceYOffset =
      sourcePosition === "top" ? 4 : sourcePosition === "bottom" ? -4 : 0;

    const targetXOffset =
      targetPosition === "right" ? -4 : targetPosition === "left" ? 4 : 0;
    const targetYOffset =
      targetPosition === "top" ? 4 : targetPosition === "bottom" ? -4 : 0;

    const [edgePath] = getSmoothStepPath({
      sourceX: sourceX + sourceXOffset,
      sourceY: sourceY + sourceYOffset,
      sourcePosition,
      targetX: targetX + targetXOffset,
      targetY: targetY + targetYOffset,
      targetPosition,
      borderRadius: 16,
    });

    return (
      <g>
        <path
          id={id}
          className="fill-none stroke-neutral-400 stroke-2 dark:stroke-neutral-200"
          d={edgePath}
        />
      </g>
    );
  }
);

export default CustomEdge;
