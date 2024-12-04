"use client";

import React, { memo } from "react";
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
    const [edgePath] = getSmoothStepPath({
      sourceX: sourceX - 4,
      sourceY,
      sourcePosition,
      targetX: targetX + 4,
      targetY,
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
