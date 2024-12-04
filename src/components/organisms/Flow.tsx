"use client";

import { memo, useCallback, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,
  reconnectEdge,
  Edge,
} from "reactflow";
import { Plus } from "lucide-react";
import { z } from "zod";

import CustomEdge from "../molecules/CustomEdge";
import CustomNode from "../molecules/CustomNode";
import CustomControls from "../molecules/CustomControls";
import CustomConnectionLine from "../molecules/CustomConnectionLine";
import PostSensorDialog from "../molecules/PostSensorDialog";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import { SensorSchema } from "@/schemas";

import "reactflow/dist/style.css";

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
      type: ["volume"],
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
      type: ["temperature"],
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
      type: ["volume", "temperature"],
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
      type: ["temperature"],
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
      type: ["volume"],
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
    sourceHandle: "source-right",
    targetHandle: "target-left",
  },
  {
    id: "3-2",
    source: "3",
    target: "2",
    type: "custom",
    sourceHandle: "source-right",
    targetHandle: "target-left",
  },
  {
    id: "2-4",
    source: "2",
    target: "4",
    type: "custom",
    sourceHandle: "source-right",
    targetHandle: "target-top",
  },
  {
    id: "4-5",
    source: "4",
    target: "5",
    type: "custom",
    sourceHandle: "source-right",
    targetHandle: "target-left",
  },
];

const Flow = memo(() => {
  const edgeReconnectSuccessful = useRef(true);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [readOnly, setReadOnly] = useState(false);

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ ...params, type: "custom" }, eds));
    },
    [setEdges]
  );

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true;
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onReconnectEnd = useCallback(
    (_event: MouseEvent | TouchEvent, edge: Edge) => {
      if (!edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
      }

      edgeReconnectSuccessful.current = true;
    },
    [setEdges]
  );

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const onSubmit = (values: z.infer<typeof SensorSchema>) => {
    console.log(values);
    setIsOpenDialog(false);
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onReconnectStart={onReconnectStart}
        onReconnect={onReconnect}
        onReconnectEnd={onReconnectEnd}
        edgeTypes={edgeTypes}
        nodeTypes={nodeTypes}
        connectionLineComponent={CustomConnectionLine}
        nodesConnectable={!readOnly}
      >
        <CustomControls readOnly={readOnly} setReadOnly={setReadOnly} />
        <Button
          variant="brand"
          className="absolute bottom-8 right-8 z-fab size-12 rounded-full shadow-md"
          onClick={() => setIsOpenDialog(true)}
        >
          <Plus className="size-6" />
        </Button>
      </ReactFlow>
      <PostSensorDialog
        onSubmit={onSubmit}
        onClose={() => setIsOpenDialog(false)}
      />
    </Dialog>
  );
});

export default Flow;
