"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useNodesState,
  useEdgesState,
  reconnectEdge,
  addEdge,
  OnConnect,
  OnEdgeUpdateFunc,
  Edge,
  NodeDragHandler,
} from "reactflow";
import {
  useDeleteMutation,
  useInsertMutation,
  useQuery,
  useUpdateMutation,
} from "@supabase-cache-helpers/postgrest-swr";
import toast from "react-hot-toast";
import { z } from "zod";

import { getEdges, getNodes } from "@/functions/query";
import { createBrowserClient } from "@/functions/browser";
import FlowPresenter from "./flow.presenter";
import CustomEdge from "./custom-edge";
import CustomNode from "./custom-node";
import { CreateNodeSchema } from "@/schemas";

type FlowContainerProps = {
  plantId: number;
};

const FlowContainer = memo(({ plantId }: FlowContainerProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const edgeReconnectSuccessful = useRef(true);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const supabase = createBrowserClient();
  const savedNodes = useQuery(getNodes(supabase, "plantId", plantId));
  const savedEdes = useQuery(getEdges(supabase, "plantId", plantId));

  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

  const { trigger: insertNode, isMutating: isLoadingInsertNode } =
    useInsertMutation(supabase.from("node"), ["nodeId"], "*", {
      throwOnError: true,
    });

  const { trigger: updateNode } = useUpdateMutation(
    supabase.from("node"),
    ["nodeId"],
    "*",
    { throwOnError: true }
  );

  const { trigger: insertEdge } = useInsertMutation(
    supabase.from("edge"),
    ["edgeId"],
    "*",
    { throwOnError: true }
  );

  const { trigger: updateEdge } = useUpdateMutation(
    supabase.from("edge"),
    ["edgeId"],
    "*",
    { throwOnError: true }
  );

  const { trigger: deleteEdge } = useDeleteMutation(
    supabase.from("edge"),
    ["edgeId"],
    "*",
    { throwOnError: true }
  );

  useEffect(() => {
    if (savedNodes.data && savedNodes.data.length > 0) {
      const initialNodes = savedNodes.data.map((node) => ({
        id: "node" + node.nodeId,
        position: { x: node.x, y: node.y },
        data: {
          name: node.name,
          value: {
            volume: 0,
            temperature: 0,
          },
          type: node.type,
        },
        type: "custom",
      }));

      setNodes(initialNodes);
    }

    if (savedEdes.data && savedEdes.data.length > 0) {
      const initialEdes = savedEdes.data.map((edge) => ({
        id: "edge" + edge.edgeId,
        source: "node" + edge.sourceId.toString(),
        target: "node" + edge.targetId.toString(),
        type: "custom",
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle,
      }));

      setEdges(initialEdes);
    }
  }, [savedNodes.data, savedEdes.data, setNodes, setEdges]);

  const onConnect: OnConnect = useCallback(
    async (params) => {
      try {
        if (
          params.source &&
          params.target &&
          params.sourceHandle &&
          params.targetHandle
        ) {
          const data = await insertEdge([
            {
              sourceId: Number(params.source.replace("node", "")),
              targetId: Number(params.target.replace("node", "")),
              sourceHandle: params.sourceHandle,
              targetHandle: params.targetHandle,
              plantId,
            },
          ]);

          if (!data || data.length === 0) {
            toast.error("保存中にエラーが発生しました");
            return;
          }

          setEdges((eds) =>
            addEdge(
              { ...params, id: "edge" + data[0].edgeId, type: "custom" },
              eds
            )
          );
        }
      } catch {
        toast.error("保存中にエラーが発生しました");
      }
    },
    [insertEdge, plantId, setEdges]
  );

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect: OnEdgeUpdateFunc = useCallback(
    (oldEdge, newConnection) => {
      edgeReconnectSuccessful.current = true;
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    },
    [setEdges]
  );

  const onReconnectEnd = useCallback(
    async (_event: MouseEvent | TouchEvent, edge: Edge) => {
      try {
        if (!edgeReconnectSuccessful.current) {
          setEdges((eds) => eds.filter((e) => e.id !== edge.id));
          await deleteEdge({ edgeId: Number(edge.id.replace("edge", "")) });
        } else if (edge.sourceHandle && edge.targetHandle) {
          await updateEdge({
            edgeId: Number(edge.id.replace("edge", "")),
            sourceId: Number(edge.source),
            targetId: Number(edge.target),
            sourceHandle: edge.sourceHandle,
            targetHandle: edge.targetHandle,
          });
        }
      } catch {
        toast.error("保存中にエラーが発生しました");
      }
      edgeReconnectSuccessful.current = true;
    },
    [setEdges, deleteEdge, updateEdge]
  );

  const onNodeDragStop: NodeDragHandler = useCallback(
    async (_event, node) => {
      try {
        await updateNode({
          nodeId: Number(node.id.replace("node", "")),
          x: node.position.x,
          y: node.position.y,
        });
      } catch {
        toast.error("保存中にエラーが発生しました");
      }
    },
    [updateNode]
  );

  const getViewport = useCallback(() => {
    if (reactFlowWrapper.current) {
      const rect = reactFlowWrapper.current.getBoundingClientRect();

      return {
        width: rect.width,
        height: rect.height,
      };
    }

    return { width: 0, height: 0 };
  }, []);

  const createNodeHandler = useCallback(
    async (values: z.infer<typeof CreateNodeSchema>) => {
      const viewport = getViewport();
      const center = {
        x: viewport.width / 2,
        y: viewport.height / 2,
      };

      await insertNode([
        {
          name: values.name,
          plantId,
          type: values.type,
          x: center.x,
          y: center.y,
        },
      ]);
    },
    [getViewport, insertNode, plantId]
  );

  return (
    <FlowPresenter
      reactFlowWrapper={reactFlowWrapper}
      isOpenModal={isOpenModal}
      setIsOpenModal={setIsOpenModal}
      readOnly={readOnly}
      setReadOnly={setReadOnly}
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onReconnectStart={onReconnectStart}
      onReconnect={onReconnect}
      onReconnectEnd={onReconnectEnd}
      onNodeDragStop={onNodeDragStop}
      createNodeHandler={createNodeHandler}
      isLoadingCreateNode={isLoadingInsertNode}
    />
  );
});

export default FlowContainer;
