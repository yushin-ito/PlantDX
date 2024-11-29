"use client";

import { memo, useMemo } from "react";
import { ReactFlow, useNodesState, useEdgesState } from "reactflow";

import "reactflow/dist/style.css";

import CustomEdge from "../molecules/CustomEdge";
import CustomNode from "../molecules/CustomNode";
import CustomControls from "../molecules/CustomControls";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      title: "廃油タンク",
      value: {
        volume: 15,
        temperature: -1,
      },
      type: "tank",
    },
    type: "custom",
  },
  {
    id: "2",
    position: { x: 350, y: 300 },
    data: {
      title: "ヒーター1",
      value: {
        volume: -1,
        temperature: 75,
      },
      type: "heater",
    },
    type: "custom",
  },
  {
    id: "3",
    position: { x: 0, y: 300 },
    data: {
      title: "MACHタンク",
      value: {
        volume: 12,
        temperature: 80,
      },
      type: "hybrid",
    },
    type: "custom",
  },
  {
    id: "4",
    position: { x: 550, y: 450 },
    data: {
      title: "恒温槽",
      value: {
        volume: -1,
        temperature: 80,
      },
      type: "heater",
    },
    type: "custom",
  },
  {
    id: "5",
    position: { x: 900, y: 300 },
    data: {
      title: "分離塔",
      value: {
        volume: 15,
        temperature: -1,
      },
      type: "tank",
    },
    type: "custom",
  },
  {
    id: "6",
    position: { x: 400, y: 0 },
    data: {
      title: "ステータス",
      value: {
        volume: -1,
        temperature: -1,
      },
      type: "status",
    },
    type: "custom",
  },
];

const initialEdges = [
  {
    id: "1-2",
    source: "1",
    target: "2",
    type: "custom",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "3-2",
    source: "3",
    target: "2",
    type: "custom",
    sourceHandle: "right",
    targetHandle: "left",
  },
  {
    id: "2-4",
    source: "2",
    target: "4",
    type: "custom",
    sourceHandle: "right",
    targetHandle: "top",
  },
  {
    id: "4-5",
    source: "4",
    target: "5",
    type: "custom",
    sourceHandle: "right",
    targetHandle: "left",
  },
];

const Flow = memo(() => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

  return (
    <ReactFlow
      fitView
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      edgeTypes={edgeTypes}
      nodeTypes={nodeTypes}
    >
      <CustomControls />
    </ReactFlow>
  );
});

export default Flow;
